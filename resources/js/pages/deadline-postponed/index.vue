<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import AppAutocomplete from '@/@core/components/app-form-elements/AppAutocomplete.vue'
import JsFileDownloader from 'js-file-downloader'
import { $api } from '@/utils/api'
import { useRouter } from 'vue-router'

// Configuration de la page
definePage({
  meta: {
    action: 'read' || 'historical',
    subject: 'deadline-postponed',
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
			singular: "Report d'échéance",
			plural: "Reports d'échéance",
		},
		actions: {
			singular: "le report d'échéance",
			plural: "les reports d'échéance",
		},
		rule: {
			name: 'deadline-postponed',
		},
		link: {
			base: 'deadline-postponed',
		},
		api: {
			end_point: 'deadline-postponed',
			data: null,
			query: {
				with_caf: 1,
			},
		},
	},
})

// Refs et états
const searchQuery = ref('')
const loadings = ref([])
const deleteLoadings = ref({})
const itemsPerPage = ref(8)
const page = ref(1)
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref('')
const actionText = ref('')
const actionButtonText = ref('')
const actionFunction = ref()
const actionComment = ref('')
const commentPresence = ref(false)
const actionStatus = ref('waiting')

// Snackbar
const isSnackbarVisible = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
// Headers de la table
const headers = [
  {
    title: 'Client',
    key: 'beneficiary_label',
  },
  {
    title: 'Montant',
    key: 'loan_amount',
  },
  {
    title: 'Numéro Crédit',
    key: 'credit_number',
  },
  {
    title: 'Rallonge',
    key: 'extension',
  },
  {
    title: 'Échéance',
    key: 'deadline_number',
  },
  {
    title: 'Ancienne date',
    key: 'old_date',
  },
  {
    title: 'Nouvelle date',
    key: 'new_date',
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
])

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
  // Activer les états de chargement
  id_list.forEach(id => {
    loadings.value[id] = true
  })

  try {
    const { data } = await useApi(createUrl('/deadline-postponed', {
      query: {
        search: searchQuery.value,
        status: filterDataArray[0].filter.value,
        page: page.value,
        ...viewData.data.api.query,
      },
    }))

    deadlinePostponedData.value = data.value
  } catch (error) {
    console.error('Erreur lors de la récupération des reports d\'échéance:', error)
    deadlinePostponedData.value = { data: [], total: 0, last_page: 1 }
  } finally {
    // Désactiver les états de chargement
    id_list.forEach(id => {
      loadings.value[id] = false
    })
  }
}

// Données reports d'échéance
const deadlinePostponedData = ref({ data: [], total: 0, last_page: 1 })

// Computed
const deadlinePostponedList = computed(() => deadlinePostponedData.value?.data || [])
const totalDeadlinePostponed = computed(() => deadlinePostponedData.value?.total || 0)
const lastPage = computed(() => deadlinePostponedData.value?.last_page || 1)

// Méthodes

const updateOptions = options => {
  page.value = options.page
}

const showSnackbar = (color, message) => {
  snackbarColor.value = color
  snackbarMessage.value = message
  isSnackbarVisible.value = true
}

const formatAmount = amount => {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

const downloadFile = async (url, fileName) => {
  const userToken = useCookie('userToken').value

  try {
    new JsFileDownloader({
      url: url,
      headers: [
        { name: 'Authorization', value: `Bearer ${userToken}` },
        { name: 'Accept', value: `application/json` },
      ],
      nameCallback: function (name) {
        return fileName
      },
    })
    showSnackbar('success', 'Téléchargement en cours...')
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    showSnackbar('error', 'Erreur lors du téléchargement')
  }
}

const apiDelete = async id => {
  deleteLoadings.value[id] = true
  try {
    await $api(`verbal-trial/${id}`, { method: 'DELETE' })
    actionComment.value = ''
    showSnackbar('success', 'Report d\'échéance supprimé avec succès')
    await fetchItemList()
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    showSnackbar('error', 'Erreur lors de la suppression')
  } finally {
    deleteLoadings.value[id] = false
  }
}

const apiChangeStatus = async id => {
  try {
    await $api(`verbal-trial/change-status/${id}`, { 
      method: 'PUT', 
      body: { 
        status: actionStatus.value, 
        comment: actionComment.value 
      } 
    })
    actionComment.value = ''
    const statusMessage = actionStatus.value === 'validated' ? 'validé' : 'rejeté'
    showSnackbar('success', `Report d'échéance ${statusMessage} avec succès`)
    
    if (actionStatus.value === 'validated') {
      router.push(`/contract/add?id=${id}`)
    }
    
    await fetchItemList()
  } catch (error) {
    console.error('Erreur lors du changement de statut:', error)
    showSnackbar('error', 'Erreur lors du changement de statut')
  }
}

// Watchers
watch(
  () => [
    filterDataArray[0].filter.value,
    searchQuery.value,
    page.value,
  ],
  () => {
    fetchItemList([4])
  }
)

// Lifecycle
onMounted(async () => {
  await fetchItemList([4])
})
</script>

<template>
  <div>
    <!-- En-tête -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCardText>
            <h2>
              Liste des {{ viewData.data.title.plural }} en attente
            </h2>
          </VCardText>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Filtres et table -->
    <VCard :title="viewData.filter.title" class="mb-6">
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
            placeholder="Rechercher un report d'échéance" 
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn 
            variant="tonal" 
            color="secondary" 
            prepend-icon="tabler-download"
          >
            Export
          </VBtn>

          <VBtn 
            v-if="$can('create', viewData.data.rule.name)" 
            color="primary" 
            prepend-icon="tabler-plus"
            :to="{ name: `${viewData.data.link.base}-add` }"
          >
            Ajouter
          </VBtn>

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
        :items="deadlinePostponedList" 
        :items-length="totalDeadlinePostponed" 
        class="text-no-wrap" 
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <!-- Actions -->

        <template #item.status="{ item }">
          <VChip label :color="item.status_fr.color">
            <VTooltip v-if="item.comment" activator="parent" transition="scroll-x-transition" location="start">Raison:
              {{ item.comment }}</VTooltip>
            {{ item.status_fr.value }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div>
            <IconBtn v-if="$can('read', 'deadline-postponed') || $can('historical', 'deadline-postponed')"
              :to="{ name: 'deadline-postponed-id', params: { id: item.id } }">
              <VTooltip activator="parent" transition="scroll-x-transition" location="start">Details</VTooltip>
              <VIcon icon=" tabler-eye" />
            </IconBtn>
            <VBtn icon variant="text" size="small" color="medium-emphasis">
              <VIcon size="24" icon="tabler-dots-vertical" />
              <VMenu activator="parent">
                <VList>
                  <div v-if="$can('download', 'deadline-postponed')">
                    <!-- Télécharger document report d'éc -->
                    <VListItem
                      @click="downloadFile(item.request_path, `${item.id}-Demande-${item.beneficiary_label.split('/').slice(-1)[0]}}`)">
                      <template #prepend>
                        <VIcon icon="tabler-download" />
                      </template>
                      <VListItemTitle>Télécharger Demande</VListItemTitle>
                    </VListItem>
                    <!-- Télécharger contrat signé -->
                    <VListItem v-if="item.signed_contract_path"
                    @click="downloadFile(item.memo_path, `${item.id}-Memo-${item.beneficiary_label.split('/').slice(-1)[0]}}`)">

                      <template #prepend>
                        <VIcon icon="tabler-download" />
                      </template>
                      <VListItemTitle>Télécharger Mémo</VListItemTitle>
                    </VListItem>
                  </div>
                </VList>
              </VMenu>
            </VBtn>
          </div>

          <div v-if="$can('update', 'deadline-postponed') || $can('delete', 'deadline-postponed')">
            <VDivider />
            <IconBtn v-if="$can('update', 'deadline-postponed')"
              :to="{ name: 'deadline-postponed-edit-id', params: { id: item.id } }"
              :disabled="item.status == 'validated'">
              <VTooltip activator="parent" transition="scroll-x-transition" location="start">Modifier</VTooltip>
              <VIcon icon="tabler-edit" />
            </IconBtn>

            <IconBtn v-if="$can('delete', 'deadline-postponed')" :disabled="item.status == 'validated'" @click=" selectedItemId = item.id; actionTitle = 'Supprimer le PV',
              actionText = 'Voulez vous vraiment supprimer ce pv?', actionFunction = apiDelete;
            actionButtonText = 'Supprimer'; commentPresence = false; isActionDialogVisible = true;">
              <VTooltip activator="parent" transition="scroll-x-transition" location="end">Supprimer</VTooltip>
              <VIcon icon="tabler-trash" color='error' />
            </IconBtn>
          </div>

          <div
            v-if="$can('reject', 'deadline-postponed') || $can('validate', 'deadline-postponed') || $can('create', 'deadline-postponed')">
            <VDivider />
            <IconBtn v-if="$can('reject', 'deadline-postponed') && item.status != 'rejected'"
              @click="selectedItemId = item.id; actionTitle = 'Rejeter le PV', actionText = 'Voulez vous vraiment rejeter ce PV?', actionFunction = apiChangeStatus; actionButtonText = 'Rejeter'; commentPresence = true; actionStatus = 'rejected'; isActionDialogVisible = true;">
              <VTooltip activator="parent" transition="scroll-x-transition" location="start">Rejeter</VTooltip>
              <VIcon icon="tabler-x" color="error" />
            </IconBtn>
            <span v-if="item.status == 'waiting'">
              <IconBtn v-if="$can('validate', 'deadline-postponed')"
                @click="selectedItemId = item.id; actionTitle = 'Valider le PV', actionText = 'Voulez vous vraiment valider ce PV?', actionFunction = apiChangeStatus; actionButtonText = 'Valider'; commentPresence = false; actionStatus = 'validated'; isActionDialogVisible = true;">
                <VTooltip activator="parent" transition="scroll-x-transition" location="end">Valider</VTooltip>
                <VIcon icon="tabler-check" color="success" />
              </IconBtn>
            </span>
            <span v-if="item.status == 'validated'">
              <IconBtn v-if="$can('create', 'deadline-postponed')"
                :to="{ name: 'contract-add', query: { id: item.id } }">
                <VTooltip activator="parent" transition="scroll-x-transition" location="end">Créer le contrat</VTooltip>
                <VIcon icon="tabler-file-plus" color="success" />
              </IconBtn>
            </span>
          </div>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalDeadlinePostponed) }}
            </p>

            <VPagination 
              v-model="page" 
              :length="lastPage"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(lastPage, 5)"
            >
              <template #prev="slotProps">
                <VBtn 
                  variant="tonal" 
                  color="default" 
                  v-bind="slotProps" 
                  :icon="false"
                >
                  <VIcon 
                    start 
                    icon="tabler-arrow-left" 
                  />
                  Précédent
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn 
                  variant="tonal" 
                  color="default" 
                  v-bind="slotProps" 
                  :icon="false"
                >
                  Suivant
                  <VIcon 
                    end 
                    icon="tabler-arrow-right" 
                  />
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>

    <!-- Dialog d'action -->
    <VDialog v-model="isActionDialogVisible" class="v-dialog-sm">
      <DialogCloseBtn @click="isActionDialogVisible = !isActionDialogVisible" />

      <VCard :title="actionTitle">
        <VCardText>
          {{ actionText }}

          <AppTextarea 
            v-if="commentPresence" 
            v-model="actionComment" 
            class="mt-3"
            label="Commentaire"
            placeholder="Ex: RAS" 
          />
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn 
            color="secondary" 
            variant="tonal" 
            @click="isActionDialogVisible = false"
          >
            Annuler
          </VBtn>
          <VBtn 
            :loading="deleteLoadings[selectedItemId]"
            @click="actionFunction(selectedItemId); isActionDialogVisible = false"
          >
            {{ actionButtonText }}
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Snackbar -->
    <VSnackbar 
      v-model="isSnackbarVisible" 
      transition="scale-transition" 
      location="top end"
      :color="snackbarColor"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="snackbarMessage" />
    </VSnackbar>
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
</style>
