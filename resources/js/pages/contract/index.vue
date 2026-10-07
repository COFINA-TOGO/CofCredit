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
const currentContractId = ref(null)
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref('')
const actionText = ref('')
const actionButtonText = ref('')
const actionFunction = ref()
const actionComment = ref('')
const commentPresence = ref(false)

// Documents manquants qui bloquent l'envoi ou la validation du contrat choisi
const actionBlockers = ref([])

// Headers de la table
const headers = [
  {
    title: 'Dossier',
    key: 'verbal_trial.committee_id',
  },
  {
    title: 'Admin Crédit',
    key: 'creator.full_name',
  },
  {
    title: 'Prêt',
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
const handleUploadFile = async event => {
  if (!currentContractId.value) {
    showSnackbar('error', 'Erreur: ID du contrat non défini')
    
    return
  }
  
  const success = await uploadFile(currentContractId.value, event, uploadState.value)

  // Vide le champ pour pouvoir choisir à nouveau le même fichier
  event.target.value = ''

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
const blockersOf = contractId => contractList.value.find(contract => contract.id === contractId)?.blockers ?? []

const openAdminValidateDialog = contractId => {
  selectedItemId.value = contractId
  actionBlockers.value = blockersOf(contractId)
  actionTitle.value = "Envoyer en validation"
  actionText.value = 
    "Envoyer ce contrat au Head Crédit pour validation ?"
  actionButtonText.value = "Envoyer"
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
  actionBlockers.value = blockersOf(contractId)
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
  actionBlockers.value = []
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
const triggerContractUpload = contractId => {
  uploadState.value = 'signed_contract'
  currentContractId.value = contractId
  refInputEl.value?.click()
}

/**
 * Configure l'upload de billet à ordre signé
 */
const triggerPromissoryNoteUpload = contractId => {
  uploadState.value = 'signed_promissory_note'
  currentContractId.value = contractId
  refInputEl.value?.click()
}

// Lifecycle
onMounted(async () => {
  await initializeFilters()
  await fetchItemList([4])
})


// Nombre de lignes et filtres mémorisés pour la prochaine visite
useListPreferences({ itemsPerPage, filterDataArray })

// Actions groupées sur les lignes cochées (mêmes droits et conditions que les boutons de ligne)
const selected = ref([])
const ability = useAbility()

const bulkActions = computed(() => bulkActionList(
  hasRole('credit_admin') && bulkPut({ label: 'Envoyer en validation', icon: 'tabler-send', color: 'primary', eligible: item => item.status === 'pending_admin_validation' && actingIds().includes(item.creator_id) && !item.blockers?.length, url: item => `contract/admin-validate/${item.id}`, body: () => ({ comment: '' }) }),
  hasRole('head_credit') && bulkValidate({ eligible: item => item.status === 'pending_head_validation' && !item.blockers?.length, url: item => `contract/head-validate/${item.id}`, body: () => ({ action: 'validate', comment: '' }) }),
  hasRole('head_credit') && bulkReject({ eligible: item => item.status === 'pending_head_validation', url: item => `contract/head-validate/${item.id}`, body: (item, comment) => ({ action: 'reject', comment }) }),
  ability.can('download', 'basic-contract') && bulkDownload('contrat non signé', item => ({ url: `/api/contract/download/${item.id}`, name: `Contrat-${item.verbal_trial.committee_id}.docx` })),
  ability.can('download', 'basic-contract') && bulkDownload('contrat signé', item => item.signed_contract_path && { url: item.signed_contract_path, name: storedFileName(item.signed_contract_path, 'Contrat') }),
  ability.can('download', 'basic-contract') && bulkDownload('billet à ordre non signé', item => ({ url: `/api/contract/promissory-note/download/${item.id}`, name: `Billet-à-ordre-${item.verbal_trial.committee_id}.docx` })),
  ability.can('download', 'basic-contract') && bulkDownload('billet à ordre signé', item => item.signed_promissory_note_path && { url: item.signed_promissory_note_path, name: storedFileName(item.signed_promissory_note_path, 'Billet-à-ordre') }),
  ability.can('download', 'basic-contract') && bulkDownload('mention manuscrite', item => ({ url: `/api/contract/handwritten-mention/download/${item.id}`, name: `Mention-manuscrite-${item.verbal_trial.committee_id}.docx` })),
))

const bulkItemTitle = item => item.verbal_trial?.committee_id ?? `Contrat ${item.id}`
</script>

<template>
  <div>
    <AppPageHeader
      title="Contrats sans CAT"
      subtitle="Contrats en cours de signature et de validation, en attente de leur CAT"
    />

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
            v-if="$can('create', viewData.data.rule.name)" 
            color="primary" 
            prepend-icon="tabler-plus"
            :to="{ name: `${viewData.data.link.base}-add` }"
          >
            Nouveau
          </VBtn>

          <ExportButton
            endpoint="/contract"
            name="contrats"
          />
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

      <!--
        Champ caché de l'envoi des documents signés : hors des menus de ligne, sinon
        son clic remonte jusqu'au bouton « ⋮ » et ouvre le menu
      -->
      <input
        ref="refInputEl"
        type="file"
        name="signed_contract"
        hidden
        @input="handleUploadFile($event)"
      >

      <!-- Table -->
      <BulkActions
        v-model="selected"
        :items="contractList"
        :actions="bulkActions"
        :item-title="bulkItemTitle"
        export-endpoint="/contract"
        export-name="contrats"
        @done="fetchItemList([4])"
      />

      <VDataTableServer 
        v-model:items-per-page="itemsPerPage" 
        v-model:page="page"
        v-model="selected"
        :show-select="bulkActions.length > 0"
        :loading="loadings[4]" 
        :headers="headers" 
        :items="contractList" 
        :items-length="totalContracts" 
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <!-- Type de contrat -->
        <template #item.verbal_trial.committee_id="{ item }">
          <div class="py-2">
            <div class="text-no-wrap font-weight-medium">
              {{ item.verbal_trial?.committee_id }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              {{ item.verbal_trial?.entity_name || item.verbal_trial?.applicant_full_name }}
            </div>
          </div>
        </template>
        <template #item.type="{ item }">
          {{ TYPE_LIST[item.type] }}
        </template>

        <!-- Montant -->
        <template #item.verbal_trial.amount="{ item }">
          <div class="py-2 text-no-wrap">
            <div class="font-weight-medium">
              {{ formatAmount(item.verbal_trial.amount) }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              {{ TYPE_LIST[item.type] }}
            </div>
          </div>
        </template>

        <!-- Observations -->
        <template #item.observations="{ item }">
          <!-- Liste des observations -->
          <ObservationsList
            v-if="item.observations.length > 0"
            :observations="item.observations"
            :contract-id="item.id"
            @upload-contract="() => triggerContractUpload(item.id)"
            @upload-promissory-note="() => triggerPromissoryNoteUpload(item.id)"
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
                  @upload-contract="() => triggerContractUpload(item.id)"
                  @upload-promissory-note="() => triggerPromissoryNoteUpload(item.id)"
                />
              </VBtn>
            </div>
          </div>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <TablePagination
            v-model:page="page"
            v-model:items-per-page="itemsPerPage"
            :total-items="totalContracts"
            :last-page="lastPage"
          />
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

          <VAlert
            v-if="actionBlockers.length"
            type="warning"
            variant="tonal"
            class="mt-3"
            title="Dossier incomplet"
          >
            <ul class="ps-4 mb-0">
              <li
                v-for="blocker in actionBlockers"
                :key="blocker"
              >
                {{ blocker }}
              </li>
            </ul>
          </VAlert>

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
            :disabled="actionBlockers.length > 0"
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
