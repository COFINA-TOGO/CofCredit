<script setup>
import { useDisplay, useTheme } from 'vuetify'

definePage({
  meta: {
    action: 'manage',
    subject: 'settings-user',
  },
})

const route = useRoute()
const router = useRouter()
const theme = useTheme()
const { mdAndUp } = useDisplay()

// ─── Manuels accessibles (filtrés par le serveur selon le profil) ─────────
const { data: listeData } = await useApi('/manual')
const manuels = computed(() => listeData.value?.data?.manuels ?? [])
const plusieurs = computed(() => manuels.value.length > 1)

const choisi = ref(null)
const html = ref('')
const chargement = ref(false)
const erreur = ref('')
const cadre = ref()
const recherche = ref('')

// Le manuel du compte d'abord, puis celui demandé dans l'adresse, sinon le premier.
watch(manuels, liste => {
  if (choisi.value || !liste.length)
    return

  // Un manuel caché n'est pas dans la liste : son lien direct l'ouvre quand
  // même, le serveur décide s'il est permis.
  choisi.value = route.query.manuel
    ?? liste.find(m => m.mien)?.slug
    ?? liste[0].slug
}, { immediate: true })

const manuelCourant = computed(() => manuels.value.find(m => m.slug === choisi.value))

// Titre renvoyé avec le contenu : seul connu pour un manuel caché.
const titreCharge = ref('')

// ─── Liste latérale : « Votre profil », puis une rubrique par famille ─────
const normaliser = t => (t ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const filtres = computed(() => {
  const q = normaliser(recherche.value.trim())
  if (!q)
    return manuels.value

  return manuels.value.filter(m => normaliser([m.titre, m.description, m.famille].join(' ')).includes(q))
})

const rubriques = computed(() => {
  const liste = []
  const miens = filtres.value.filter(m => m.mien)
  if (miens.length)
    liste.push({ titre: 'Votre profil', manuels: miens })

  const familles = new Map()
  for (const m of filtres.value.filter(m => !m.mien)) {
    if (!familles.has(m.famille))
      familles.set(m.famille, [])
    familles.get(m.famille).push(m)
  }
  for (const [titre, liste2] of familles)
    liste.push({ titre, manuels: liste2 })

  return liste
})

// Liste déroulante des petits écrans, rangée comme la liste latérale.
const elementsSelect = computed(() => rubriques.value.flatMap(r =>
  r.manuels.map(m => ({ title: m.titre, value: m.slug, subtitle: r.titre }))))

// Panneau replié ou non : préférence de ce navigateur seulement.
const CLE_PANNEAU = 'manuel-panneau-replie'
const lirePanneau = () => { try { return localStorage.getItem(CLE_PANNEAU) === '1' } catch { return false } }
const panneauReplie = ref(lirePanneau())

watch(panneauReplie, v => { try { localStorage.setItem(CLE_PANNEAU, v ? '1' : '0') } catch {} })

const afficherPanneau = computed(() => plusieurs.value && mdAndUp.value && !panneauReplie.value)

// ─── Chargement du manuel choisi ───────────────────────────────────────────
watch(choisi, async slug => {
  if (!slug)
    return
  router.replace({ query: { ...route.query, manuel: slug } })
  chargement.value = true
  erreur.value = ''
  html.value = ''
  try {
    const res = await $api(`/manual/${slug}`)
    if (res.status === 200) {
      html.value = res.data.html
      titreCharge.value = res.data.titre ?? ''
    }
    else
      erreur.value = res.errors?.manuel?.[0] ?? 'Ce manuel ne peut pas être affiché.'
  }
  catch {
    erreur.value = 'Le serveur ne répond pas.'
  }
  finally {
    chargement.value = false
  }
}, { immediate: true })

// Le manuel suit le thème de l'application plutôt que celui du système.
function appliquerTheme() {
  const doc = cadre.value?.contentDocument
  if (doc?.documentElement)
    doc.documentElement.dataset.theme = theme.global.current.value.dark ? 'dark' : 'light'
}

watch(() => theme.global.current.value.dark, appliquerTheme)

// ─── Export PDF : impression du manuel (« Enregistrer au format PDF ») ────
function exporterPdf() {
  const fenetre = cadre.value?.contentWindow
  if (!fenetre)
    return
  fenetre.focus()
  fenetre.print()
}

function ouvrirDansUnOnglet() {
  const url = URL.createObjectURL(new Blob([html.value], { type: 'text/html' }))

  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

// ─── Recherche dans le manuel affiché ─────────────────────────────────────
// Les occurrences sont surlignées dans le cadre (même origine : srcdoc) ;
// Entrée ou les flèches passent de l'une à l'autre. Sans accents ni casse.
const texteCherche = ref('')
const occurrences = ref([])
const courante = ref(-1)

// Repli caractère par caractère : la longueur du texte ne change pas, les
// positions trouvées restent valables dans le texte d'origine.
const replier = t => Array.from(t, c => c.normalize('NFD')[0].toLowerCase()).join('')

function effacerSurlignage(doc) {
  for (const m of doc.querySelectorAll('mark.recherche-manuel')) {
    const parent = m.parentNode

    parent.replaceChild(doc.createTextNode(m.textContent), m)
    parent.normalize()
  }
}

function surligner() {
  const doc = cadre.value?.contentDocument

  occurrences.value = []
  courante.value = -1
  if (!doc?.body)
    return
  effacerSurlignage(doc)

  const q = replier((texteCherche.value ?? '').trim())
  if (q.length < 2)
    return

  if (!doc.getElementById('style-recherche-manuel')) {
    const style = doc.createElement('style')

    style.id = 'style-recherche-manuel'
    style.textContent = 'mark.recherche-manuel{background:#ffe08a;color:#1a1a1a;border-radius:2px;padding:0 1px}mark.recherche-manuel.courante{background:#ff9f43;outline:2px solid #ff9f43}@media print{mark.recherche-manuel{background:none;color:inherit;outline:0}}'
    doc.head.appendChild(style)
  }

  const noeuds = []

  const parcours = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
    acceptNode: n => n.parentElement?.closest('script,style,dialog') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  })

  while (parcours.nextNode())
    noeuds.push(parcours.currentNode)

  const trouvees = []
  for (const noeud of noeuds) {
    const texte = replier(noeud.nodeValue)
    const positions = []
    for (let i = texte.indexOf(q); i !== -1; i = texte.indexOf(q, i + q.length))
      positions.push(i)

    // De la fin vers le début : les découpes n'invalident pas les positions restantes.
    const marques = []
    for (const i of positions.reverse()) {
      const milieu = noeud.splitText(i)

      milieu.splitText(q.length)

      const mark = doc.createElement('mark')

      mark.className = 'recherche-manuel'
      milieu.parentNode.replaceChild(mark, milieu)
      mark.appendChild(milieu)
      marques.unshift(mark)
    }
    trouvees.push(...marques)
  }
  occurrences.value = trouvees
  if (trouvees.length)
    aller(0)
}

function aller(index) {
  const liste = occurrences.value
  if (!liste.length)
    return
  liste[courante.value]?.classList.remove('courante')
  courante.value = (index + liste.length) % liste.length

  const mark = liste[courante.value]

  mark.classList.add('courante')

  // Un bloc replié (details) qui contient l'occurrence s'ouvre.
  for (let el = mark.parentElement; el; el = el.parentElement) {
    if (el.tagName === 'DETAILS')
      el.open = true
  }

  // Défile le cadre seul : scrollIntoView déplacerait aussi la page de l'application.
  const fenetre = mark.ownerDocument.defaultView
  const haut = mark.getBoundingClientRect().top + fenetre.scrollY - fenetre.innerHeight / 2

  fenetre.scrollTo({ top: Math.max(0, haut) })
}

let minuterie
watch(texteCherche, () => {
  clearTimeout(minuterie)
  minuterie = setTimeout(surligner, 250)
})

function toucheRecherche(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    aller(courante.value + (e.shiftKey ? -1 : 1))
  }
  else if (e.key === 'Escape') {
    texteCherche.value = ''
  }
}

function cadreCharge() {
  appliquerTheme()
  if (texteCherche.value?.trim())
    surligner()
}

const formatDate = iso => iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR') : ''
</script>

<template>
  <div>
    <VCard
      v-if="!manuels.length"
      class="text-center pa-12"
    >
      <VIcon
        icon="tabler-book-off"
        size="48"
        class="mb-3 text-disabled"
      />
      <div class="text-h6 mb-1">
        Aucun manuel pour votre profil
      </div>
      <div class="text-body-2 text-medium-emphasis">
        Le manuel de votre profil n'a pas encore été rédigé.
      </div>
    </VCard>

    <div
      v-else
      class="manuel-page"
    >
      <!-- Liste des manuels (écrans larges, plusieurs manuels) -->
      <VCard
        v-if="afficherPanneau"
        class="manuel-liste"
      >
        <VCardText class="pb-2">
          <div class="d-flex align-center mb-3">
            <VIcon
              icon="tabler-books"
              class="me-2"
            />
            <span class="text-h6 flex-grow-1">Manuels</span>
            <VChip
              size="small"
              variant="tonal"
              class="me-1"
            >
              {{ manuels.length }}
            </VChip>
            <IconBtn
              size="small"
              @click="panneauReplie = true"
            >
              <VIcon icon="tabler-layout-sidebar-left-collapse" />
              <VTooltip
                activator="parent"
                location="bottom"
              >
                Masquer la liste
              </VTooltip>
            </IconBtn>
          </div>
          <AppTextField
            v-model="recherche"
            placeholder="Profil, écran, sujet…"
            prepend-inner-icon="tabler-search"
            density="compact"
            clearable
          />
        </VCardText>

        <VList
          density="compact"
          nav
          class="manuel-liste-items pt-0"
        >
          <template
            v-for="rubrique in rubriques"
            :key="rubrique.titre"
          >
            <VListSubheader class="text-uppercase">
              {{ rubrique.titre }}
            </VListSubheader>
            <VListItem
              v-for="m in rubrique.manuels"
              :key="m.slug"
              :active="m.slug === choisi"
              color="primary"
              rounded
              @click="choisi = m.slug"
            >
              <template #prepend>
                <VIcon
                  :icon="m.mien ? 'tabler-user-star' : 'tabler-book-2'"
                  size="20"
                />
              </template>
              <VListItemTitle>{{ m.titre }}</VListItemTitle>
              <VListItemSubtitle class="manuel-liste-desc">
                {{ m.description }}
              </VListItemSubtitle>
            </VListItem>
          </template>
          <div
            v-if="!rubriques.length"
            class="text-body-2 text-medium-emphasis pa-4 text-center"
          >
            Aucun manuel ne correspond à « {{ recherche }} ».
          </div>
        </VList>
      </VCard>

      <div class="manuel-contenu">
        <VCard class="mb-4">
          <VCardText class="d-flex align-center flex-wrap gap-4">
            <IconBtn
              v-if="plusieurs && mdAndUp && panneauReplie"
              @click="panneauReplie = false"
            >
              <VIcon icon="tabler-layout-sidebar-left-expand" />
              <VTooltip
                activator="parent"
                location="bottom"
              >
                Afficher la liste des manuels
              </VTooltip>
            </IconBtn>
            <VAvatar
              color="primary"
              variant="tonal"
              rounded
              size="48"
            >
              <VIcon
                icon="tabler-book"
                size="26"
              />
            </VAvatar>
            <div class="flex-grow-1 manuel-entete">
              <div class="d-flex align-center flex-wrap gap-2">
                <h4 class="text-h5">
                  {{ manuelCourant?.titre ?? (titreCharge || 'Manuel d\'utilisation') }}
                </h4>
                <VChip
                  v-if="manuelCourant?.mien"
                  size="small"
                  color="primary"
                  variant="tonal"
                  prepend-icon="tabler-user-star"
                >
                  Votre profil
                </VChip>
                <VChip
                  v-else-if="manuelCourant"
                  size="small"
                  variant="tonal"
                >
                  {{ manuelCourant.famille }}
                </VChip>
              </div>
              <div
                v-if="manuelCourant"
                class="text-body-2 text-medium-emphasis"
              >
                {{ manuelCourant.description }}
                <span v-if="manuelCourant.mis_a_jour"> · mis à jour le {{ formatDate(manuelCourant.mis_a_jour) }}</span>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <VBtn
                variant="tonal"
                prepend-icon="tabler-external-link"
                :disabled="!html"
                @click="ouvrirDansUnOnglet"
              >
                Plein écran
              </VBtn>
              <VBtn
                color="primary"
                prepend-icon="tabler-file-type-pdf"
                :disabled="!html"
                @click="exporterPdf"
              >
                Exporter en PDF
                <VTooltip
                  activator="parent"
                  location="bottom"
                  max-width="300"
                >
                  Ouvre l'impression du manuel : choisissez « Enregistrer au format PDF » comme imprimante.
                </VTooltip>
              </VBtn>
            </div>

            <!-- Recherche dans le manuel affiché -->
            <div class="d-flex align-center gap-2 w-100">
              <AppTextField
                v-model="texteCherche"
                placeholder="Rechercher dans ce manuel…"
                prepend-inner-icon="tabler-search"
                density="compact"
                clearable
                :disabled="!html"
                class="flex-grow-1"
                @keydown="toucheRecherche"
              />
              <span
                v-if="texteCherche?.trim().length >= 2"
                class="text-body-2 text-medium-emphasis text-no-wrap"
              >
                {{ occurrences.length ? `${courante + 1} / ${occurrences.length}` : 'Aucun résultat' }}
              </span>
              <IconBtn
                :disabled="!occurrences.length"
                @click="aller(courante - 1)"
              >
                <VIcon icon="tabler-chevron-up" />
                <VTooltip
                  activator="parent"
                  location="bottom"
                >
                  Précédent (Maj+Entrée)
                </VTooltip>
              </IconBtn>
              <IconBtn
                :disabled="!occurrences.length"
                @click="aller(courante + 1)"
              >
                <VIcon icon="tabler-chevron-down" />
                <VTooltip
                  activator="parent"
                  location="bottom"
                >
                  Suivant (Entrée)
                </VTooltip>
              </IconBtn>
            </div>

            <!-- Petits écrans : la liste devient un sélecteur -->
            <AppAutocomplete
              v-if="plusieurs && !mdAndUp"
              v-model="choisi"
              :items="elementsSelect"
              item-props
              label="Manuel"
              prepend-inner-icon="tabler-books"
              density="compact"
              class="w-100"
            />
          </VCardText>
        </VCard>

        <VAlert
          v-if="erreur"
          type="error"
          variant="tonal"
          :text="erreur"
        />

        <VCard
          v-else
          class="manuel-cadre"
        >
          <div
            v-if="chargement"
            class="d-flex flex-column align-center justify-center py-16 gap-3"
          >
            <VProgressCircular
              indeterminate
              color="primary"
            />
            <span class="text-body-2 text-medium-emphasis">Chargement du manuel…</span>
          </div>
          <iframe
            v-else-if="html"
            ref="cadre"
            :srcdoc="html"
            :title="manuelCourant?.titre ?? (titreCharge || 'Manuel d\'utilisation')"
            class="manuel-iframe"
            @load="cadreCharge"
          />
        </VCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manuel-page {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.manuel-liste {
  position: sticky;
  display: flex;
  flex: 0 0 300px;
  flex-direction: column;
  inset-block-start: 80px;
  max-block-size: calc(100vh - 110px);
}

.manuel-liste-items {
  overflow-y: auto;
}

.manuel-liste-desc {
  -webkit-line-clamp: 2 !important;
  white-space: normal;
}

.manuel-contenu {
  flex: 1 1 auto;
  min-inline-size: 0;
}

.manuel-entete {
  min-inline-size: 220px;
}

.manuel-cadre {
  overflow: hidden;
}

.manuel-iframe {
  display: block;
  border: 0;
  block-size: calc(100vh - 230px);
  inline-size: 100%;
  min-block-size: 560px;
}
</style>
