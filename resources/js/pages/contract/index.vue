<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { useRouter } from 'vue-router'

// Composables
import { useContractList } from '@/composables/useContractList'
import { useContractActions } from '@/composables/useContractActions'
import { useContractDownload } from '@/composables/useContractDownload'

// Components
import ObservationsList from '@/components/contract/ObservationsList.vue'
import ContractStatusCard from '@/components/contract/ContractStatusCard.vue'
import ContractActionsMenu from '@/components/contract/ContractActionsMenu.vue'
import ValidationActions from '@/components/contract/ValidationActions.vue'

// Configuration de la page
definePage({
  meta: {
    action: 'read',
    subject: 'contract',
  },
})

// Router
const router = useRouter()

// User data
const userData = useCookie('userData')

// Refs pour les fichiers et dialogs
const refInputEl = ref()
const uploadState = ref('signed_contract')
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref('')
const actionText = ref('')
const actionButtonText = ref('')
const actionFunction = ref()
const actionComment = ref('')
const commentPresence = ref(false)

// Headers de la table
const headers = [
  {
    title: 'Numéro comitée',
    key: 'verbal_trial.committee_id',
  },
  {
    title: 'Admin Crédit',
    key: 'creator.full_name',
  },
  {
    title: 'Nom client',
    key: 'verbal_trial.entity_name',
  },
  {
    title: 'Type de contrat',
    key: 'type',
  },
  {
    title: 'Montant',
    key: 'verbal_trial.amount',
  },
  {
    title: 'Observations',
    key: 'observations',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]

// Configuration de la vue
const viewData = reactive({
  filter: {
    title: 'Filtres',
  },
  data: {
    title: {
      singular: 'Contrat',
      plural: 'Contrats',
    },
    actions: {
      singular: 'le contrat',
      plural: 'les contrats',
    },
    rule: {
      name: 'basic-contract',
    },
    link: {
      base: 'contract',
    },
    api: {
      end_point: 'contract',
      data: null,
      query: {
        with_type_of_credit: 1,
        with_company: 1,
        with_individual_business: 1,
        with_creator: 1,
        with_c_a_t: 1,
        has_cat: 0,
      },
    },
  },
})

// Configuration des filtres
const filterDataArray = reactive([
  {
    view: {
      cols: {
        col: 12,
        sm: 6,
      },
      name: {
        item_title: 'title',
        item_value: 'value',
      },
    },
    base: {
      name: 'Type de contrat',
      data_source: 'array',
      api_endpoint: 'contract',
      query: { paginate: 'false' },
    },
    filter: {
      key: 'type',
      value: null,
    },
    api: {
      datac: [
        { value: 'company', title: 'Société' },
        { value: 'particular', title: 'Particulier' },
        { value: 'individual_business', title: 'Entreprise Individuel' },
      ],
    },
  },
  {
    view: {
      cols: {
        col: 12,
        sm: 6,
      },
      name: {
        item_title: 'full_name',
        item_value: 'id',
      },
    },
    base: {
      name: 'Admin Crédit',
      data_source: 'api',
      api_endpoint: 'user',
      query: { paginate: 'false', profile: 'credit_admin' },
    },
    filter: {
      key: 'creator_id',
      value: null,
    },
    api: {
      datac: [],
    },
  },
])

// Constants
const TYPE_LIST = {
  company: 'Société',
  individual_business: 'Entreprise Individuel',
  particular: 'Particulier',
}

// Composables
const {
  searchQuery,
  itemsPerPage,
  page,
  loadings,
  contractList,
  totalContracts,
  lastPage,
  fetchItemList,
  initializeFilters,
  updateOptions,
} = useContractList(viewData, filterDataArray)

const {
  isSnackbarVisible,
  snackbarMessage,
  snackbarColor,
  deleteLoadings,
  deleteContract,
  adminValidate,
  headValidate,
  uploadFile,
  showSnackbar,
} = useContractActions()

const {
  downloadUnsignedContract,
  downloadSignedContract,
  downloadUnsignedPromissoryNote,
  downloadSignedPromissoryNote,
  downloadHandwrittenMention,
} = useContractDownload()

// Méthodes

/**
 * Gère l'upload d'un fichier
 */
const handleUploadFile = async (contractId, event) => {
  const success = await uploadFile(contractId, event, uploadState.value)
  if (success) {
    await fetchItemList()
  }
}

/**
 * Gère la suppression d'un contrat
 */
const handleDelete = async contractId => {
  const success = await deleteContract(contractId, viewData)
  if (success) {
    await fetchItemList()
  }
}

/**
 * Ouvre le dialog de validation admin
 */
const openAdminValidateDialog = contractId => {
  selectedItemId.value = contractId
  actionTitle.value = "Valider l'envoi"
  actionText.value = 
    "Êtes-vous sûr de vouloir valider l'envoi de ce contrat ? Le Head Crédit pourra ensuite procéder à la validation finale."
  actionButtonText.value = "Valider l'envoi"
  actionFunction.value = async id => {
    const success = await adminValidate(id, actionComment.value)
    if (success) {
      actionComment.value = ''
      await fetchItemList()
    }
  }
  commentPresence.value = true
  isActionDialogVisible.value = true
}

/**
 * Ouvre le dialog de validation head
 */
const openHeadValidateDialog = contractId => {
  selectedItemId.value = contractId
  actionTitle.value = 'Valider le contrat'
  actionText.value = 'Êtes-vous sûr de vouloir valider ce contrat ?'
  actionButtonText.value = 'Valider'
  actionFunction.value = async id => {
    const success = await headValidate(id, 'validate', actionComment.value)
    if (success) {
      actionComment.value = ''
      await fetchItemList()
    }
  }
  commentPresence.value = true
  isActionDialogVisible.value = true
}

/**
 * Ouvre le dialog de rejet head
 */
const openHeadRejectDialog = contractId => {
  selectedItemId.value = contractId
  actionTitle.value = 'Rejeter le contrat'
  actionText.value = 
    "Êtes-vous sûr de vouloir rejeter ce contrat ? L'admin crédit devra re-uploader les documents."
  actionButtonText.value = 'Rejeter'
  actionFunction.value = async id => {
    const success = await headValidate(id, 'reject', actionComment.value)
    if (success) {
      actionComment.value = ''
      await fetchItemList()
    }
  }
  commentPresence.value = true
  isActionDialogVisible.value = true
}

/**
 * Gère les téléchargements avec feedback
 */
const handleDownload = (downloadFn, ...args) => {
  downloadFn(
    ...args,
    () => {
      showSnackbar('success', 'Téléchargement en cours...')
      fetchItemList()
    },
    error => {
      console.error('Erreur de téléchargement:', error)
      showSnackbar('error', 'Erreur lors du téléchargement')
    },
  )
}

/**
 * Formate le montant avec des espaces
 */
const formatAmount = amount => {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

/**
 * Configure l'upload de contrat signé
 */
const triggerContractUpload = () => {
  uploadState.value = 'signed_contract'
  refInputEl.value?.click()
}

/**
 * Configure l'upload de billet à ordre signé
 */
const triggerPromissoryNoteUpload = () => {
  uploadState.value = 'signed_promissory_note'
  refInputEl.value?.click()
}

// Lifecycle
onMounted(async () => {
  await initializeFilters()
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
              Liste des {{ viewData.data.title.plural }}
            </h2>
          </VCardText>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Filtres -->
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
            placeholder="Rechercher" 
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
            Nouveau
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

      <!-- Table -->
      <VDataTableServer 
        v-model:items-per-page="itemsPerPage" 
        v-model:page="page"
        :loading="loadings[4]" 
        :headers="headers" 
        :items="contractList" 
        :items-length="totalContracts" 
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <!-- Type de contrat -->
        <template #item.type="{ item }">
          {{ TYPE_LIST[item.type] }}
        </template>

        <!-- Montant -->
        <template #item.verbal_trial.amount="{ item }">
          {{ formatAmount(item.verbal_trial.amount) }}
        </template>

        <!-- Observations -->
        <template #item.observations="{ item }">
          <!-- Liste des observations -->
          <ObservationsList
            v-if="item.observations.length > 0"
            :observations="item.observations"
            :contract-id="item.id"
            @upload-contract="triggerContractUpload"
            @upload-promissory-note="triggerPromissoryNoteUpload"
          />

          <!-- Statut sans observations -->
          <ContractStatusCard
            v-else
            :status="item.status"
            :status-observation="item.status_observation"
          />
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <div class="text-right">
            <div class="d-flex align-center gap-2">
              <!-- Bouton détails -->
              <IconBtn 
                v-if="$can('read', viewData.data.rule.name)"
                :to="{ 
                  name: `${viewData.data.link.base}-id`, 
                  params: { id: item.id },
                }"
              >
                <VTooltip 
                  activator="parent" 
                  transition="scroll-x-transition" 
                  location="top"
                >
                  Détails
                </VTooltip>
                <VIcon icon="tabler-eye" />
              </IconBtn>

              <!-- Actions de validation -->
              <ValidationActions
                :contract="item"
                :user-role="userData.role"
                :user-id="userData.id"
                @admin-validate="openAdminValidateDialog"
                @head-validate="openHeadValidateDialog"
                @head-reject="openHeadRejectDialog"
              />

              <!-- Menu d'actions -->
              <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
              >
                <VIcon
                  size="24"
                  icon="tabler-dots-vertical"
                />
                
                <!-- Input caché pour l'upload -->
                <input
                  ref="refInputEl"
                  type="file"
                  name="signed_contract"
                  hidden
                  @input="handleUploadFile(item.id, $event)"
                >

                <ContractActionsMenu
                  :contract="item"
                  :can-read="$can('read', 'guarantor')"
                  :can-download="$can('download', 'basic-contract')"
                  :can-upload="$can('upload', 'basic-contract')"
                  @download-unsigned-contract="
                    (c) => handleDownload(
                      downloadUnsignedContract, 
                      c.id, 
                      c.verbal_trial.committee_id
                    )
                  "
                  @download-signed-contract="
                    (c) => handleDownload(downloadSignedContract, c.signed_contract_path)
                  "
                  @download-unsigned-promissory-note="
                    (c) => handleDownload(
                      downloadUnsignedPromissoryNote, 
                      c.id, 
                      c.verbal_trial.committee_id
                    )
                  "
                  @download-signed-promissory-note="
                    (c) => handleDownload(
                      downloadSignedPromissoryNote, 
                      c.signed_promissory_note_path
                    )
                  "
                  @download-handwritten-mention="
                    (c) => handleDownload(
                      downloadHandwrittenMention, 
                      c.id, 
                      c.verbal_trial.committee_id
                    )
                  "
                  @upload-contract="triggerContractUpload"
                  @upload-promissory-note="triggerPromissoryNoteUpload"
                />
              </VBtn>
            </div>
          </div>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalContracts) }}
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
    <VDialog
      v-model="isActionDialogVisible"
      class="v-dialog-sm"
    >
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
            Retour
          </VBtn>
          <VBtn 
            @click="
              actionFunction(selectedItemId); 
              isActionDialogVisible = false
            "
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
