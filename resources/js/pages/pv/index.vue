<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import AppAutocomplete from '@/@core/components/app-form-elements/AppAutocomplete.vue'
import { $api } from '@/utils/api'
import { useRouter } from 'vue-router'

// Configuration de la page
definePage({
  meta: {
    action: 'read' || 'historical',
    subject: 'pv',
  },
})

// Router
const router = useRouter()

// Configuration de la vue
const viewData = reactive({
  filter: {
    title: 'Filtres',
  },
  data: {
    title: {
      singular: 'Procès verbal',
      plural: 'Procès verbaux',
    },
    actions: {
      singular: 'le PV',
      plural: 'les PV',
    },
    rule: {
      name: 'pv',
    },
    link: {
      base: 'pv',
    },
    api: {
      end_point: 'verbal-trial',
      data: null,
      query: {
        has_next: 0,
        with_caf: 1,
        with_type_of_credit: 1,
      },
    },
  },
})

// Refs et états
const searchQuery = ref('')
const loadings = ref([])
const itemsPerPage = ref(8)
const page = ref(1)
const downloadLoadings = ref({})
const ability = useAbility()
const can = (action, subject) => ability.can(action, subject)

// Dialogue de confirmation des actions sur un PV
const dialog = reactive({
  visible: false,
  action: null,
  item: null,
  comment: '',
  loading: false,
})

// Headers de la table
const headers = [
  {
    title: 'Numéro comité',
    key: 'committee_id',
  },
  {
    title: 'Client',
    key: 'entity_name',
  },
  {
    title: 'Type Crédit',
    key: 'type_of_credit.full_name',
  },
  {
    title: 'Montant',
    key: 'amount_fr',
  },
  {
    title: 'Statut',
    key: 'status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// Configuration des filtres
const filterDataArray = reactive([
  {
    view: {
      cols: {
        col: 12,
        sm: 4,
      },
      name: {
        item_title: 'full_name',
        item_value: 'id',
      },
    },
    base: {
      name: 'Type de crédit',
      data_source: 'api',
      api_endpoint: 'type-of-credit',
      query: { paginate: 0 },
    },
    filter: {
      key: 'type_of_credit_id',
      value: null,
    },
    api: {
      datac: [],
    },
  },
  {
    view: {
      cols: {
        col: 12,
        sm: 4,
      },
      name: {
        item_title: 'title',
        item_value: 'value',
      },
    },
    base: {
      name: 'Statut',
      data_source: 'array',
    },
    filter: {
      key: 'status',
      value: null,
    },
    api: {
      datac: [
        { value: 'v', title: 'Validé' },
        { value: 'w', title: 'En attente' },
        { value: 'r', title: 'Rejeté' },
      ],
    },
  },
  {
    view: {
      cols: {
        col: 12,
        sm: 4,
      },
      name: {
        item_title: 'title',
        item_value: 'value',
      },
    },
    base: {
      name: 'Niveau de validation',
      data_source: 'array',
    },
    filter: {
      key: 'validation_level',
      value: null,
    },
    api: {
      datac: [
        { value: 'yahm', title: 'Tout' },
        { value: 'y', title: 'Analyste Crédit' },
        { value: 'a', title: 'Admin Crédit' },
        { value: 'h', title: 'Head Crédit' },
        { value: 'm', title: 'MD' },
      ],
    },
  },
])

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
  // Activer les états de chargement
  id_list.forEach(id => {
    loadings.value[id] = true
  })

  try {
    const { data } = await useApi(
      createUrl('/verbal-trial', {
        query: {
          search: searchQuery.value,
          type_of_credit_id: filterDataArray[0].filter.value,
          status: filterDataArray[1].filter.value,
          page: page.value,
          per_page: itemsPerPage.value,
          in_validation_level: filterDataArray[2].filter.value,
          ...viewData.data.api.query,
        },
      }),
    )

    pvData.value = data.value
  } catch (error) {
    console.error('Erreur lors de la récupération des PV:', error)
    pvData.value = { data: [], total: 0, last_page: 1 }
  } finally {
    // Désactiver les états de chargement
    id_list.forEach(id => {
      loadings.value[id] = false
    })
  }
}

// Données PV
const pvData = ref({ data: [], total: 0, last_page: 1 })

// Charger les types de crédit
const { data: type_of_credit_list_data } = await useApi(
  createUrl('/type-of-credit', {
    query: {
      paginate: 0,
    },
  }),
)

// Computed
const pvList = computed(() => pvData.value?.data || [])
const totalPv = computed(() => pvData.value?.total || 0)
const lastPage = computed(() => pvData.value?.last_page || 1)
const type_of_credit_list = computed(() => type_of_credit_list_data.value?.data || [])

// Méthodes

const updateOptions = options => {
  page.value = options.page
}


const formatAmount = amount => {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

const downloadFile = async (url, fileName) => {
  try {
    await downloadAuthenticatedFile(url, fileName)
    showSnackbar('success', 'Téléchargement en cours...')
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    showSnackbar('error', errorMessage(error, 'Erreur lors du téléchargement'))
  }
}

const changeStatus = (id, status, comment) => $apiOrThrow(`verbal-trial/change-status/${id}`, {
  method: 'PUT',
  body: { status, comment },
})

// Actions confirmées par le dialogue
const ACTIONS = {
  delete: {
    title: 'Supprimer le PV',
    text: 'Le PV sera retiré de la liste.',
    button: 'Supprimer',
    icon: 'tabler-trash',
    color: 'error',
    success: 'PV supprimé',
    run: id => $apiOrThrow(`verbal-trial/analyst/${id}`, { method: 'DELETE' }),
  },
  sendBack: {
    title: 'Renvoyer le PV à l\'admin crédit',
    text: 'Ce PV validé n\'a pas encore de contrat. Il repassera chez l\'admin crédit pour correction, puis reviendra à votre validation.',
    button: 'Renvoyer',
    icon: 'tabler-arrow-back-up',
    color: 'warning',
    comment: 'Motif du renvoi',
    success: 'PV renvoyé à l\'admin crédit',
    run: (id, comment) => changeStatus(id, 'rejected', comment),
  },
  validate: {
    title: 'Valider le PV',
    text: 'L\'admin crédit sera prévenu pour créer la suite du dossier.',
    button: 'Valider',
    icon: 'tabler-check',
    color: 'success',
    success: 'PV validé',
    run: id => changeStatus(id, 'validated'),
  },
  reject: {
    title: 'Rejeter le PV',
    text: 'Le PV repassera chez l\'admin crédit pour correction.',
    button: 'Rejeter',
    icon: 'tabler-x',
    color: 'error',
    comment: 'Motif du rejet',
    success: 'PV rejeté',
    run: (id, comment) => changeStatus(id, 'rejected', comment),
  },
}

const currentAction = computed(() => ACTIONS[dialog.action] ?? {})

const openAction = (action, item) => {
  Object.assign(dialog, { visible: true, action, item, comment: '', loading: false })
}

const confirmAction = async () => {
  const action = currentAction.value
  if (action.comment && !dialog.comment.trim())
    return
  dialog.loading = true
  try {
    await action.run(dialog.item.id, dialog.comment.trim())
    dialog.visible = false
    showSnackbar('success', action.success)
    await fetchItemList([4])
  } catch (error) {
    console.error(`Erreur (${dialog.action}):`, error)
    showSnackbar('error', errorMessage(error, 'L\'action n\'a pas abouti'))
  } finally {
    dialog.loading = false
  }
}

const download = async (item, file) => {
  downloadLoadings.value[item.id] = true
  try {
    await downloadFile(file.url, file.name)
  } finally {
    downloadLoadings.value[item.id] = false
  }
}

// Actions d'une ligne en trois sections : le PV lui-même, son circuit de validation, ses documents
const rowActions = item => {
  const editable = isAdmin() || item.status != 'validated'
  const waitingHeadCredit = item.status == 'waiting' && item.validation_level == 'head_credit'
  const validated = item.status == 'validated'

  const manage = [
    (can('read', 'pv') || can('historical', 'pv')) && { label: 'Détails', icon: 'tabler-eye', to: { name: 'pv-id', params: { id: item.id } } },
    can('update', 'pv') && editable && { label: 'Modifier', icon: 'tabler-edit', to: { name: 'pv-edit-id', params: { id: item.id } } },
    can('analyst_delete', 'pv') && editable && { label: 'Supprimer', icon: 'tabler-trash', color: 'error', action: 'delete' },
  ]

  const workflow = [
    can('reject', 'pv') && validated && !item.next && { label: 'Renvoyer à l\'admin crédit', icon: 'tabler-arrow-back-up', color: 'warning', action: 'sendBack' },
    can('validate', 'pv') && waitingHeadCredit && { label: 'Valider', icon: 'tabler-check', color: 'success', action: 'validate' },
    can('reject', 'pv') && waitingHeadCredit && { label: 'Rejeter', icon: 'tabler-x', color: 'error', action: 'reject' },
    can('create', 'basic-contract') && validated && !item.has_mortgage && !item.next && { label: 'Créer le contrat', icon: 'tabler-file-plus', color: 'primary', to: { name: 'contract-add', query: { id: item.id } } },
    can('create', 'notarized-contract') && validated && item.has_mortgage && !item.next && { label: 'Créer la notification notariée', icon: 'tabler-file-plus', color: 'primary', to: { name: 'notification-add', query: { id: item.id } } },
  ]

  const downloads = [
    can('download', 'pv') && { label: 'Procès verbal', url: `/api/verbal-trial/download/${item.id}`, name: `PV-${item.committee_id}.docx` },
    can('download', 'pv-notification') && validated && { label: 'Notification', url: `/api/verbal-trial/notification/download/${item.id}`, name: `notification-${item.committee_id}.docx` },
  ]

  return {
    buttons: [manage, workflow].map(group => group.filter(Boolean)).filter(group => group.length),
    downloads: downloads.filter(Boolean),
  }
}

// Watchers
watch(
  () => [
    filterDataArray[0].filter.value,
    filterDataArray[1].filter.value,
    filterDataArray[2].filter.value,
    searchQuery.value,
    page.value,
    itemsPerPage.value,
  ],
  () => {
    fetchItemList([4])
  },
)

// Lifecycle
onMounted(async () => {
  // Charger les types de crédit dans le filtre
  if (type_of_credit_list.value.length > 0) {
    filterDataArray[0].api.datac = type_of_credit_list.value
  }
	
  // Charger les données initiales
  await fetchItemList([4])
})
</script>

<template>
  <div>
    <AppPageHeader
      title="Procès verbaux sans contrat"
      subtitle="PV de comité en cours de validation ou en attente de contrat"
    />

    <!-- Filtres et table -->
    <VCard
      :title="viewData.filter.title"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <VCol 
            v-for="filterData in filterDataArray" 
            :key="filterData.filter.key"
            :cols="filterData.view.cols.col"
            :sm="filterData.view.cols.sm ?? 6"
          >
            <AppAutocomplete 
              v-model="filterData.filter.value" 
              :placeholder="filterData.base.name"
              :item-title="filterData.view.name.item_title ?? 'name'"
              :item-value="filterData.view.name.item_value ?? 'id'" 
              :items="filterData.api.datac" 
              clearable
              clear-icon="tabler-x" 
            />
          </VCol>
        </VRow>

        <VDivider class="my-4" />
      </VCardText>

      <!-- Barre d'actions -->
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="flex-grow-1">
          <AppTextField 
            v-model="searchQuery" 
            placeholder="Rechercher un PV" 
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn 
            :loading="loadings[3]" 
            :disabled="loadings[3]" 
            prepend-icon="tabler-refresh"
            @click="fetchItemList([3, 4])"
          >
            Recharger
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="tabler-refresh" />
              </span>
            </template>
          </VBtn>
        </div>
      </div>

      <VDivider class="mt-4" />

      <!-- 👉 Datatable  -->
      <VDataTableServer 
        v-model:items-per-page="itemsPerPage" 
        v-model:page="page" 
        :loading="loadings[4]"
        :headers="headers"
        :items="pvList" 
        :items-length="totalPv" 
        class="text-no-wrap" 
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <!-- Actions -->

        <template #item.duration="{ item }">
          {{ item.duration }} mois
        </template>

        <template #item.status="{ item }">
          <VChip
            label
            :color="{
              validated: 'success',
              rejected: 'error',
              waiting: 'warning',
            }[item.status]
            "
          >
            <VTooltip
              v-if="item.comment"
              activator="parent"
              transition="scroll-x-transition"
              location="start"
            >
              Raison:
              {{ item.comment }}
            </VTooltip>
            {{
              {
                validated: "Validé",
                waiting: "En attente",
                rejected: "Rejeté",
              }[item.status]
            }}
            ({{
              {
                credit_analyst: "Analyste Crédit",
                credit_admin: "Admin Crédit",
                head_credit: "Head Crédit",
                md: "MD",
              }[item.validation_level]
            }})
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="pv-actions">
            <template
              v-for="(group, index) in rowActions(item).buttons"
              :key="index"
            >
              <VDivider
                v-if="index > 0"
                vertical
                class="pv-actions__divider"
              />
              <IconBtn
                v-for="button in group"
                :key="button.label"
                :to="button.to"
                :color="button.color"
                :aria-label="button.label"
                @click="button.action && openAction(button.action, item)"
              >
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  {{ button.label }}
                </VTooltip>
                <VIcon :icon="button.icon" />
              </IconBtn>
            </template>

            <template v-if="rowActions(item).downloads.length">
              <VDivider
                v-if="rowActions(item).buttons.length"
                vertical
                class="pv-actions__divider"
              />
              <!-- Un seul document : téléchargement direct ; plusieurs : menu -->
              <IconBtn
                v-if="rowActions(item).downloads.length == 1"
                :loading="downloadLoadings[item.id]"
                :aria-label="`Télécharger : ${rowActions(item).downloads[0].label}`"
                @click="download(item, rowActions(item).downloads[0])"
              >
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Télécharger : {{ rowActions(item).downloads[0].label }}
                </VTooltip>
                <VIcon icon="tabler-download" />
              </IconBtn>
              <IconBtn
                v-else
                :loading="downloadLoadings[item.id]"
                aria-label="Télécharger"
              >
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Télécharger
                </VTooltip>
                <VIcon icon="tabler-download" />
                <VMenu
                  activator="parent"
                  location="bottom end"
                >
                  <VList density="compact">
                    <VListSubheader>Télécharger</VListSubheader>
                    <VListItem
                      v-for="file in rowActions(item).downloads"
                      :key="file.url"
                      prepend-icon="tabler-file-type-docx"
                      :title="file.label"
                      @click="download(item, file)"
                    />
                  </VList>
                </VMenu>
              </IconBtn>
            </template>
          </div>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <TablePagination
            v-model:page="page"
            v-model:items-per-page="itemsPerPage"
            :total-items="totalPv"
            :last-page="lastPage"
          />
        </template>
      </VDataTableServer>
    </VCard>

    <!-- Dialogue de confirmation -->
    <VDialog
      v-model="dialog.visible"
      class="v-dialog-sm"
      :persistent="dialog.loading"
    >
      <DialogCloseBtn
        :disabled="dialog.loading"
        @click="dialog.visible = false"
      />

      <VCard v-if="dialog.item">
        <VCardItem>
          <template #prepend>
            <VAvatar
              :color="currentAction.color"
              variant="tonal"
              rounded
            >
              <VIcon :icon="currentAction.icon" />
            </VAvatar>
          </template>
          <VCardTitle>{{ currentAction.title }}</VCardTitle>
          <VCardSubtitle>
            {{ dialog.item.committee_id }} · {{ dialog.item.entity_name }} · {{ dialog.item.amount_fr }}
          </VCardSubtitle>
        </VCardItem>

        <VCardText>
          <p class="mb-0">
            {{ currentAction.text }}
          </p>

          <AppTextarea
            v-if="currentAction.comment"
            v-model="dialog.comment"
            class="mt-4"
            :label="`${currentAction.comment} *`"
            placeholder="Ce que l'admin crédit doit corriger"
            rows="3"
            autofocus
            :disabled="dialog.loading"
          />
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="dialog.loading"
            @click="dialog.visible = false"
          >
            Annuler
          </VBtn>
          <VBtn
            :color="currentAction.color"
            :prepend-icon="currentAction.icon"
            :loading="dialog.loading"
            :disabled="!!currentAction.comment && !dialog.comment.trim()"
            @click="confirmAction"
          >
            {{ currentAction.button }}
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
.custom-loader {
	display: flex;
	animation: loader 1s infinite;
}

@keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

.pv-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2px;
}

.pv-actions__divider {
	align-self: center;
	height: 24px;
	margin-inline: 6px;
}

// La colonne Actions reste visible quand le tableau défile horizontalement
:deep(.v-table__wrapper > table) {
	> thead > tr > th:last-child,
	> tbody > tr > td:last-child {
		position: sticky;
		right: 0;
		z-index: 1;
		background: rgb(var(--v-theme-surface));
		box-shadow: -6px 0 6px -6px rgba(var(--v-shadow-key-umbra-color), 0.3);
	}
}
</style>
