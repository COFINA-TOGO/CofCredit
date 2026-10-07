<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { $api } from '@/utils/api'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    action: 'without-signed-contract',
    subject: 'notification',
  },
})

// Router
const router = useRouter()

// Refs et états
const searchQuery = ref('')
const refInputEl = ref()
const uploadState = ref('signed_notification')
const itemsPerPage = ref(8)
const page = ref(1)
const loadings = ref([])
const deleteLoadings = ref({})
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref('')
const actionText = ref('')
const actionButtonText = ref('')
const actionFunction = ref()
const actionComment = ref('')
const commentPresence = ref(false)
const actionStatus = ref('waiting')



// Configuration de la vue
const viewData = reactive({
  data: {
    title: {
      singular: 'Notification',
      plural: 'Notifications',
    },
    actions: {
      singular: 'la notification',
      plural: 'les notifications',
    },
    rule: {
      name: 'notification',
    },
    api: {
      end_point: 'notification',
    },
  },
})

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
    title: 'Téléphone',
    key: 'representative_phone_number',
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
  },
]

// Configuration des filtres
const filterDataArray = reactive([
  {
    view: {
      cols: {
        col: 12,
        sm: 12,
      },
      name: {
        item_title: 'title',
        item_value: 'value',
      },
    },
    base: {
      name: 'Type de notification',
      data_source: 'array',
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
])

// Data refs
const notificationData = ref({ data: [], total: 0, last_page: 1 })

const notificationList = computed(() => notificationData.value.data)
const totalPv = computed(() => notificationData.value.total)
const lastPage = computed(() => notificationData.value.last_page)

// Constants
const typeList = {
  'company': 'Société',
  'individual_business': 'Entreprise Individuel',
  'particular': 'Particulier',
}

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
  id_list.forEach(id => {
    loadings.value[id] = true
  })

  try {
    const { data } = await useApi(
      createUrl('/notification', {
        query: {
          search: searchQuery.value,
          type: filterDataArray[0].filter.value,
          page: page.value,
          per_page: itemsPerPage.value,
          with_type_of_credit: 1,
          with_company: 1,
          with_individual_business: 1,
          with_creator: 1,
          head_credit_validation: 'v',
          has_cat: 0,
          is_simple: 0,
        },
      }),
    )

    notificationData.value = data.value
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error)
    notificationData.value = { data: [], total: 0, last_page: 1 }
    showSnackbar('error', 'Erreur lors de la récupération des notifications')
  } finally {
    id_list.forEach(id => {
      loadings.value[id] = false
    })
  }
}

// Update options
const updateOptions = options => {
  page.value = options.page
}

// Download file
const downloadFile = async (url, fileName) => {
  try {
    await downloadAuthenticatedFile(url, fileName)
    showSnackbar('success', 'Téléchargement en cours...')
    await fetchItemList([4])
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    showSnackbar('error', errorMessage(error, 'Erreur lors du téléchargement'))
  }
}

// Change status
const apiChangeStatus = async id => {
  try {
    await $apiOrThrow(`notification/change-status/${id}`, { 
      method: 'PUT', 
      body: { status: actionStatus.value, comment: actionComment.value }, 
    })
    actionComment.value = ''
    
    if (actionStatus.value == 'validated') {
      router.push(`/cat/notification/add?id=${id}`)
    } else {
      await fetchItemList([4])
      showSnackbar('success', 'Statut modifié avec succès')
    }
  } catch (error) {
    console.error('Erreur lors du changement de statut:', error)
    showSnackbar('error', errorMessage(error, 'Erreur lors du changement de statut'))
  }
}

// Send notification
const apiSendNotification = async id => {
  try {
    await $apiOrThrow(`notification/send/${id}`, { method: 'PUT' })
    await fetchItemList([4])
    showSnackbar('success', 'Notification envoyée avec succès')
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    showSnackbar('error', errorMessage(error, 'Erreur lors de l\'envoi de la notification'))
  }
}

// Upload file
const uploadFile = async (id, event) => {
  const { files } = event.target
  if (files && files.length === 1) {
    const reader = new FileReader()

    reader.onload = async () => {
      const base64Image = reader.result
      try {
        const response = await $api(`notification/upload/${id}`, {
          method: 'POST',
          body: { [uploadState.value]: base64Image },
        })
        
        if (response.status === 200) {
          await fetchItemList([4])
          showSnackbar('success', 'Document ajouté avec succès')
        } else {
        
        	showApiErrors(response.errors)
        
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du document:', error)
        showSnackbar('error', errorMessage(error, 'Erreur lors de l\'envoi du document'))
      }
    }
    reader.readAsDataURL(files[0])
  } else {
    showSnackbar('error', 'Veuillez sélectionner un seul fichier')
  }
}

// Watchers
watch(
  () => [filterDataArray[0].filter.value, searchQuery.value, page.value, itemsPerPage.value],
  () => {
    fetchItemList([4])
  },
)

// Lifecycle
onMounted(async () => {
  await fetchItemList([4])
})

// Actions groupées sur les lignes cochées (mêmes droits et conditions que les boutons de ligne)
const selected = ref([])
const ability = useAbility()

const bulkActions = computed(() => bulkActionList(
  ability.can('send', 'notification') && bulkPut({ label: 'Envoyer le dossier', icon: 'tabler-send', color: 'primary', eligible: item => item.observations.length == 0 && !item.sent, url: item => `notification/send/${item.id}` }),
  ability.can('validate', 'pv') && bulkValidate({ eligible: item => item.sent && item.status == 'waiting' && item.observations.length == 0, url: item => `notification/change-status/${item.id}`, body: () => ({ status: 'validated' }) }),
  ability.can('reject', 'pv') && bulkReject({ eligible: item => item.sent && item.status != 'rejected' && item.observations.length == 0, url: item => `notification/change-status/${item.id}`, body: (item, comment) => ({ status: 'rejected', comment }) }),
  ability.can('download', 'notification') && bulkDownload('billet à ordre non signé', item => ({ url: `/api/notification/promissory-note/download/${item.id}`, name: `Billet-à-ordre-${item.verbal_trial.committee_id}.docx` })),
  ability.can('download', 'notification') && bulkDownload('contrat signé', item => item.signed_contract_path && { url: item.signed_contract_path, name: storedFileName(item.signed_contract_path, 'Contrat') }),
  ability.can('download', 'notification') && bulkDownload('billet à ordre signé', item => item.signed_promissory_note_path && { url: item.signed_promissory_note_path, name: storedFileName(item.signed_promissory_note_path, 'Billet-à-ordre') }),
))

const bulkItemTitle = item => item.verbal_trial?.committee_id ?? `Notification ${item.id}`
</script>

<template>
  <div>
    <AppPageHeader
      title="Notifications sans contrat notarié"
      subtitle="Notifications validées dont le contrat notarié n'est pas encore chargé"
    />

    <!-- Filtres et table -->
    <VCard class="mb-6">
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
      </VCardText>

      <VDivider class="my-4" />

      <!-- Barre d'actions -->
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="flex-grow-1">
          <AppTextField 
            v-model="searchQuery" 
            placeholder="Rechercher une notification" 
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn 
            v-if="$can('create', viewData.data.rule.name)" 
            color="primary" 
            prepend-icon="tabler-plus"
            :to="{ name: 'notification-add' }"
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

      <!-- Table -->
      <BulkActions
        v-model="selected"
        :items="notificationList"
        :actions="bulkActions"
        :item-title="bulkItemTitle"
        @done="fetchItemList([4])"
      />

      <VDataTableServer 
        v-model:items-per-page="itemsPerPage" 
        v-model:page="page" 
        v-model="selected"
        :show-select="bulkActions.length > 0"
        :loading="loadings[4]"
        :headers="headers"
        :items="notificationList" 
        :items-length="totalPv" 
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
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
          {{ typeList[item.type] }}
        </template>

        <template #item.verbal_trial.amount="{ item }">
          {{ String(item.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
        </template>

        <template #item.observations="{ item }">
          <VList density="compact">
            <VListItem
              v-for="observation in item.observations"
              :key="observation"
            >
              <VListItemTitle>
                <VChip label>
                  {{ observation }}
                </VChip>
              </VListItemTitle>
            </VListItem>
            
            <VListItem v-if="item.observations.length == 0">
              <VChip 
                label
                :color="{ 'validated': 'success', 'rejected': 'error', 'waiting': (item.sent) ? 'warning' : 'success' }[item.status]"
              >
                <VTooltip 
                  v-if="item.status_observation" 
                  activator="parent" 
                  transition="scroll-x-transition"
                  location="start"
                >
                  Raison: {{ item.status_observation }}
                </VTooltip>
                {{ (item.status == 'validated') ? 'Dossier validé' : '' }}
                {{ (item.status == 'waiting') ? (item.sent) ? 'Dossier en attente de validation' : 'Dossier prêt' : '' }}
                {{ (item.status == 'rejected') ? 'Dossier rejeté' : '' }}
              </VChip>
            </VListItem>
            
            <VListItem v-if="!item.signed_promissory_note_path">
              <VListItemTitle>
                <VChip
                  label
                  color="warning"
                >
                  Billet à ordre manquant
                </VChip>
              </VListItemTitle>
            </VListItem>
          </VList>
        </template>

        <template #item.actions="{ item }">
          <span>
            <IconBtn :to="{ name: 'notification-id', params: { id: item.id } }">
              <VTooltip
                activator="parent"
                transition="scroll-x-transition"
                location="start"
              >
                Détails
              </VTooltip>
              <VIcon icon="tabler-eye" />
            </IconBtn>
            
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
              <VMenu activator="parent">
                <VList>
                  <input 
                    ref="refInputEl" 
                    type="file" 
                    name="signed_notification" 
                    hidden
                    @input="uploadFile(item.id, $event)" 
                  >

                  <VBadge
                    v-if="$can('read', 'guarantor')"
                    inline
                    :content="item.guarantors_count"
                  >
                    <VListItem :to="{ name: 'notification-notification_id-guarantor', params: { notification_id: item.id } }">
                      <template #prepend>
                        <VIcon icon="tabler-users" />
                      </template>
                      <VListItemTitle>Voir les Cautions</VListItemTitle>
                    </VListItem>
                  </VBadge>
                  
                  <VListItem 
                    v-if="$can('read', 'pv')"
                    :to="{ name: 'pv-id', params: { id: item.verbal_trial.id } }"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-eye" />
                    </template>
                    <VListItemTitle>Voir le Pv</VListItemTitle>
                  </VListItem>

                  <span v-if="$can('download', viewData.data.rule.name)">
                    <VDivider />
                    
                    <VListItem @click="downloadFile(`/api/notification/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`)">
                      <template #prepend>
                        <VIcon icon="tabler-download" />
                      </template>
                      <VListItemTitle>Télécharger Billet à ordre non signé</VListItemTitle>
                    </VListItem>

                    <VListItem 
                      v-if="item.signed_contract_path"
                      @click="downloadFile(item.signed_contract_path, `Contrat-${item.signed_contract_path.split('/').slice(-1)[0]}`)"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-download" />
                      </template>
                      <VListItemTitle>Télécharger Contrat signé</VListItemTitle>
                    </VListItem>
                    
                    <VListItem 
                      v-if="item.signed_promissory_note_path"
                      @click="downloadFile(item.signed_promissory_note_path, `Billet-à-ordre-${item.signed_promissory_note_path.split('/').slice(-1)[0]}`)"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-download" />
                      </template>
                      <VListItemTitle>Télécharger Billet à ordre signé</VListItemTitle>
                    </VListItem>
                  </span>

                  <span v-if="$can('upload', 'notarized-contract')">
                    <VDivider />
                    
                    <!-- Ajouter Contrat signé -->
                    <VListItem
                      v-if="(item.signed_contract_path == null || item.status == 'rejected' || (item.status != 'pending_head_validation' && item.status != 'validated'))"
                      @click="uploadState = 'signed_contract'; refInputEl?.click()"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-cloud-upload" />
                      </template>
                      <VListItemTitle>Ajouter contrat signé</VListItemTitle>
                    </VListItem>
                    
                    <!-- Ajouter Billet à ordre -->
                    <VListItem
                      v-if="(item.signed_promissory_note_path == null || item.status == 'rejected' || (item.status != 'pending_head_validation' && item.status != 'validated'))"
                      @click="uploadState = 'signed_promissory_note'; refInputEl?.click()"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-cloud-upload" />
                      </template>
                      <VListItemTitle>Ajouter billet à ordre signé</VListItemTitle>
                    </VListItem>
                  </span>
                </VList>
              </VMenu>
            </VBtn>
          </span>
          
          <span v-if="item.observations.length == 0 && $can('send', viewData.data.rule.name)">
            <VDivider />
            <VRow>
              <VCol
                col="12"
                class="text-center"
              >
                <IconBtn 
                  v-if="!item.sent"
                  @click="selectedItemId = item.id; actionTitle = 'Envoyer le dossier de la notification'; actionText = 'Voulez vous vraiment envoyer le dossier de cette notification?'; actionFunction = apiSendNotification; actionButtonText = 'Envoyer'; commentPresence = false; isActionDialogVisible = true"
                >
                  <VTooltip
                    activator="parent"
                    transition="scroll-x-transition"
                    location="start"
                  >
                    Envoyer
                  </VTooltip>
                  <VIcon
                    icon="tabler-send"
                    color="success"
                  />
                </IconBtn>
              </VCol>
            </VRow>
          </span>
          
          <span v-if="item.sent && (($can('reject', 'pv') && item.status != 'rejected' && item.observations.length == 0) || ($can('validate', 'pv') && item.status == 'waiting' && item.observations.length == 0) || ($can('create', 'cat') && item.status == 'validated'))">
            <VDivider />
            
            <IconBtn
              v-if="$can('reject', 'pv') && item.status != 'rejected' && item.observations.length == 0"
              @click="selectedItemId = item.id; actionTitle = 'Rejeter la notification'; actionText = 'Voulez vous vraiment rejeter cette notification?'; actionFunction = apiChangeStatus; actionButtonText = 'Rejeter'; commentPresence = true; actionStatus = 'rejected'; isActionDialogVisible = true"
            >
              <VTooltip
                activator="parent"
                transition="scroll-x-transition"
                location="start"
              >
                Rejeter
              </VTooltip>
              <VIcon
                icon="tabler-x"
                color="error"
              />
            </IconBtn>
            
            <IconBtn
              v-if="$can('validate', 'pv') && item.status == 'waiting' && item.observations.length == 0"
              @click="selectedItemId = item.id; actionTitle = 'Valider la notification'; actionText = 'Voulez vous vraiment valider cette notification?'; actionFunction = apiChangeStatus; actionButtonText = 'Valider'; commentPresence = false; actionStatus = 'validated'; isActionDialogVisible = true"
            >
              <VTooltip
                activator="parent"
                transition="scroll-x-transition"
                location="end"
              >
                Valider
              </VTooltip>
              <VIcon
                icon="tabler-check"
                color="success"
              />
            </IconBtn>
            
            <IconBtn 
              v-if="$can('create', 'cat') && item.status == 'validated'"
              :to="{ name: 'cat-notification-add', query: { id: item.id } }"
            >
              <VTooltip
                activator="parent"
                transition="scroll-x-transition"
                location="end"
              >
                Créer le CAT
              </VTooltip>
              <VIcon
                icon="tabler-file-plus"
                color="success"
              />
            </IconBtn>
          </span>
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
            Annuler
          </VBtn>
          <VBtn @click="actionFunction(selectedItemId); isActionDialogVisible = false">
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
