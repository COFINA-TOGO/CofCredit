<script setup>
import { useDisplay } from 'vuetify'

// Recherche globale : numéro de comité, client, numéro de compte, utilisateur (Ctrl+K)
const router = useRouter()
const { smAndUp } = useDisplay()

const ICONS = {
  pv: 'tabler-file-description',
  contract: 'tabler-signature',
  notification: 'tabler-bell-ringing',
  cat: 'tabler-file-check',
  user: 'tabler-user',
}

const query = ref('')
const results = ref([])
const loading = ref(false)
const open = ref(false)
const field = ref()

// La liste des résultats prend la largeur du champ
const { width: fieldWidth } = useElementSize(field)

let timer = null
let lastSearch = 0

const search = () => {
  clearTimeout(timer)

  const text = query.value?.trim() ?? ''
  if (text.length < 2) {
    results.value = []
    
    return
  }
  timer = setTimeout(async () => {
    const id = ++lastSearch

    loading.value = true

    const res = await $api(createUrl('/search', { query: { q: text } }).value).catch(() => null)

    // Une réponse plus ancienne n'écrase pas la plus récente
    if (id !== lastSearch)
      return
    results.value = res?.status == 200 ? res.data.results : []
    loading.value = false
    open.value = true
  }, 300)
}

watch(query, search)

// Résultats groupés par type, dans l'ordre de l'API
const groups = computed(() => results.value.reduce((groups, result) => {
  (groups[result.type_label] ??= []).push(result)

  return groups
}, {}))

const go = result => {
  open.value = false
  query.value = ''
  results.value = []
  router.push(result.to)
}

const goFirst = () => {
  if (results.value.length)
    go(results.value[0])
}

const shortcut = event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    field.value?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', shortcut))
onBeforeUnmount(() => window.removeEventListener('keydown', shortcut))
</script>

<template>
  <VMenu
    v-model="open"
    location="bottom start"
    :close-on-content-click="false"
    :open-on-click="false"
    max-height="460"
    :width="Math.max(fieldWidth, 380)"
  >
    <template #activator="{ props: menuProps }">
      <VTextField
        ref="field"
        v-bind="menuProps"
        v-model="query"
        density="compact"
        variant="solo-filled"
        flat
        hide-details
        clearable
        prepend-inner-icon="tabler-search"
        :placeholder="smAndUp ? 'Rechercher un dossier, un client… (Ctrl+K)' : 'Rechercher'"
        :loading="loading"
        class="navbar-search"
        aria-label="Recherche globale"
        @focus="results.length && (open = true)"
        @keydown.enter="goFirst"
        @keydown.esc="open = false"
      />
    </template>

    <VCard>
      <VList
        v-if="results.length"
        density="compact"
      >
        <template
          v-for="(items, label) in groups"
          :key="label"
        >
          <VListSubheader>{{ label }}</VListSubheader>
          <VListItem
            v-for="result in items"
            :key="`${result.type}-${result.to.params.id}`"
            :prepend-icon="ICONS[result.type]"
            :title="result.title"
            :subtitle="result.subtitle"
            @click="go(result)"
          />
        </template>
      </VList>
      <VCardText
        v-else-if="!loading && (query?.trim().length ?? 0) >= 2"
        class="text-medium-emphasis"
      >
        Aucun résultat pour « {{ query }} »
      </VCardText>
    </VCard>
  </VMenu>
</template>

<style scoped>
.navbar-search {
  flex: 1 1 auto;
  margin-inline-end: 1rem;
  min-inline-size: 160px;
}
</style>
