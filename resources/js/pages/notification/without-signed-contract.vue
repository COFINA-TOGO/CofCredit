<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'
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

// Snackbar
const isSnackbarVisible = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const showSnackbar = (color, message) => {
  snackbarColor.value = color
  snackbarMessage.value = message
  isSnackbarVisible.value = true
}

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
    title: 'Numéro comitée',
    key: 'verbal_trial.committee_id',
  },
  {
    title: 'Admin Crédit',
    key: 'creator.full_name',
  },
  {
    title: 'Nom client',
    key: 'verbal_trial.applicant_full_name',
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
    new JsFileDownloader({
      url: url,
      headers: [
        { name: 'Authorization', value: `Bearer ${useCookie('userToken').value}` },
        { name: 'Accept', value: `application/json` },
      ],
      nameCallback: function (name) {
        return fileName
      },
    })
    showSnackbar('success', 'Téléchargement en cours...')
    await fetchItemList([4])
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    showSnackbar('error', 'Erreur lors du téléchargement')
  }
}

// Change status
const apiChangeStatus = async id => {
  try {
    await $api(`notification/change-status/${id}`, { 
      method: 'PUT', 
      body: { status: actionStatus.value, comment: actionComment.value } 
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
    showSnackbar('error', 'Erreur lors du changement de statut')
  }
}

// Send notification
const apiSendNotification = async id => {
  try {
    await $api(`notification/send/${id}`, { method: 'PUT' })
    await fetchItemList([4])
    showSnackbar('success', 'Notification envoyée avec succès')
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    showSnackbar('error', 'Erreur lors de l\'envoi de la notification')
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
        const response = await fetch(`/api/notification/upload/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('userToken').value}`,
          },
          body: JSON.stringify({
            [uploadState.value]: base64Image,
          }),
        })
        
        if (response.ok) {
          await fetchItemList([4])
          showSnackbar('success', 'Document ajouté avec succès')
        } else {
          showSnackbar('error', 'Échec de l\'envoi du document')
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du document:', error)
        showSnackbar('error', 'Erreur lors de l\'envoi du document')
      }
    }
    reader.readAsDataURL(files[0])
  } else {
    showSnackbar('error', 'Veuillez sélectionner un seul fichier')
  }
}

// Watchers
watch(
  () => [filterDataArray[0].filter.value, searchQuery.value, page.value],
  () => {
    fetchItemList([4])
  },
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
            <h2>Liste des {{ viewData.data.title.plural }} sans CAT</h2>
          </VCardText>
        </VRow>
      </VCardText>
    </VCard>

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
      <VDataTableServer 
        v-model:items-per-page="itemsPerPage" 
        v-model:page="page" 
        :loading="loadings[4]"
        :headers="headers"
        :items="notificationList" 
        :items-length="totalPv" 
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.verbal_trial.amount="{ item }">
          {{ String(item.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
        </template>

        <template #item.observations="{ item }">
          <VList density="compact">
            <VListItem v-if="item.observations.length > 0" v-for="observation in item.observations">
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
                <VChip label color="warning">
                  Billet à ordre manquant
                </VChip>
              </VListItemTitle>
            </VListItem>
          </VList>
        </template>

        <template #item.actions="{ item }">
          <span>
            <IconBtn :to="{ name: 'notification-id', params: { id: item.id } }">
              <VTooltip activator="parent" transition="scroll-x-transition" location="start">
                Détails
              </VTooltip>
              <VIcon icon="tabler-eye" />
            </IconBtn>
            
            <VBtn icon variant="text" size="small" color="medium-emphasis">
              <VIcon size="24" icon="tabler-dots-vertical" />
              <VMenu activator="parent">
                <VList>
                  <input 
                    ref="refInputEl" 
                    type="file" 
                    name="signed_notification" 
                    hidden
                    @input="uploadFile(item.id, $event)" 
                  />

                  <VBadge v-if="$can('read', 'guarantor')" inline :content="item.guarantors_count">
                    <VListItem
                      :to="{ name: 'notification-notification_id-guarantor', params: { notification_id: item.id } }"
                    >
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
                    
                    <VListItem
                      @click="downloadFile(`/api/notification/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`)"
                    >
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
              <VCol col="12" class="text-center">
                <IconBtn 
                  v-if="!item.sent"
                  @click="selectedItemId = item.id; actionTitle = 'Envoyer le dossier de la notification'; actionText = 'Voulez vous vraiment envoyer le dossier de cette notification?'; actionFunction = apiSendNotification; actionButtonText = 'Envoyer'; commentPresence = false; isActionDialogVisible = true"
                >
                  <VTooltip activator="parent" transition="scroll-x-transition" location="start">
                    Envoyer
                  </VTooltip>
                  <VIcon icon="tabler-send" color="success" />
                </IconBtn>
              </VCol>
            </VRow>
          </span>
          
          <span
            v-if="item.sent && (($can('reject', 'pv') && item.status != 'rejected' && item.observations.length == 0) || ($can('validate', 'pv') && item.status == 'waiting' && item.observations.length == 0) || ($can('create', 'cat') && item.status == 'validated'))"
          >
            <VDivider />
            
            <IconBtn
              v-if="$can('reject', 'pv') && item.status != 'rejected' && item.observations.length == 0"
              @click="selectedItemId = item.id; actionTitle = 'Rejeter la notification'; actionText = 'Voulez vous vraiment rejeter cette notification?'; actionFunction = apiChangeStatus; actionButtonText = 'Rejeter'; commentPresence = true; actionStatus = 'rejected'; isActionDialogVisible = true"
            >
              <VTooltip activator="parent" transition="scroll-x-transition" location="start">
                Rejeter
              </VTooltip>
              <VIcon icon="tabler-x" color="error" />
            </IconBtn>
            
            <IconBtn
              v-if="$can('validate', 'pv') && item.status == 'waiting' && item.observations.length == 0"
              @click="selectedItemId = item.id; actionTitle = 'Valider la notification'; actionText = 'Voulez vous vraiment valider cette notification?'; actionFunction = apiChangeStatus; actionButtonText = 'Valider'; commentPresence = false; actionStatus = 'validated'; isActionDialogVisible = true"
            >
              <VTooltip activator="parent" transition="scroll-x-transition" location="end">
                Valider
              </VTooltip>
              <VIcon icon="tabler-check" color="success" />
            </IconBtn>
            
            <IconBtn 
              v-if="$can('create', 'cat') && item.status == 'validated'"
              :to="{ name: 'cat-notification-add', query: { id: item.id } }"
            >
              <VTooltip activator="parent" transition="scroll-x-transition" location="end">
                Créer le CAT
              </VTooltip>
              <VIcon icon="tabler-file-plus" color="success" />
            </IconBtn>
          </span>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalPv) }}
            </p>

            <VPagination 
              v-model="page" 
              :length="lastPage"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(lastPage, 5)"
            >
              <template #prev="slotProps">
                <VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
                  <VIcon start icon="tabler-arrow-left" />
                  Précédent
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
                  Suivant
                  <VIcon end icon="tabler-arrow-right" />
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
          <VBtn color="secondary" variant="tonal" @click="isActionDialogVisible = false">
            Annuler
          </VBtn>
          <VBtn @click="actionFunction(selectedItemId); isActionDialogVisible = false">
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
