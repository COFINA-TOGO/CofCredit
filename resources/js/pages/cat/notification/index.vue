<!-- eslint-disable camelcase -->
<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'cat',
  },
})

// Refs et états
const isDialogVisible = ref(false)
const catSelectedId = ref(0)
const searchQuery = ref('')
const loadings = ref([])
const deleteLoadings = ref({})
const itemsPerPage = ref(8)
const page = ref(1)
const isActionDialogVisible = ref(false)
const needComment = ref(false)
const actionTitle = ref('')
const actionText = ref('')
const actionButtonText = ref('')
const actionFunction = ref()
const actionComment = ref(null)

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
      singular: 'CAT',
      plural: 'CAT',
    },
    actions: {
      singular: 'le CAT',
      plural: 'les CAT',
    },
    rule: {
      name: 'cat',
    },
    api: {
      end_point: 'cat',
    },
  },
})

// Headers de la table
const headers = [
  {
    title: 'Numéro comitée',
    key: 'notification.verbal_trial.committee_id',
  },
  {
    title: 'Admin Crédit',
    key: 'notification.creator.full_name',
  },
  {
    title: 'Nom client',
    key: 'notification.verbal_trial.applicant_full_name',
  },
  {
    title: 'Secteur',
    key: 'sector',
  },
  {
    title: 'Numéro de prêt',
    key: 'credit_number',
  },
  {
    title: 'Montant',
    key: 'notification.verbal_trial.amount',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const typeList = {
  'company': 'Société',
  'individual_business': 'Entreprise Individuel',
  'particular': 'Particulier',
}

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

// Data refs
const catData = ref({ data: [], total: 0, last_page: 1 })

const catList = computed(() => catData.value.data)
const totalCAT = computed(() => catData.value.total)
const lastPage = computed(() => catData.value.last_page)

// Initialisation des filtres
const initializeFilters = async () => {
  for (const filter of filterDataArray) {
    if (filter.base.data_source === 'api') {
      try {
        const { data } = await useApi(
          createUrl(`/${filter.base.api_endpoint}`, {
            query: filter.base.query,
          }),
        )
        filter.api.datac = data.value.data
      } catch (error) {
        console.error(`Erreur lors du chargement du filtre ${filter.base.name}:`, error)
      }
    }
  }
}

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
  id_list.forEach(id => {
    loadings.value[id] = true
  })

  try {
    const { data } = await useApi(
      createUrl('/cat', {
        query: {
          search: searchQuery.value,
          type: filterDataArray[0].filter.value,
          creator_id: filterDataArray[1].filter.value,
          page: page.value,
          with_creator: 1,
          with_verbal_trial: 1,
          with_notification: 1,
          has_notification: 1,
          is_simple: 0,
        },
      }),
    )
    catData.value = data.value
  } catch (error) {
    console.error('Erreur lors de la récupération des CAT:', error)
    catData.value = { data: [], total: 0, last_page: 1 }
    showSnackbar('error', 'Erreur lors de la récupération des CAT')
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
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    showSnackbar('error', 'Erreur lors du téléchargement')
  }
}

// Delete CAT
const apiDelete = async id => {
  deleteLoadings.value[id] = true
  try {
    await $api(`cat/${id}`, { method: 'DELETE' })
    await fetchItemList([4])
    showSnackbar('success', 'CAT supprimé avec succès')
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    showSnackbar('error', 'Erreur lors de la suppression du CAT')
  } finally {
    deleteLoadings.value[id] = false
  }
}

// Validate CAT
const validateCAT = async id => {
  try {
    await $api(`cat/validate/${id}`, { method: 'PUT' })
    actionComment.value = null
    await fetchItemList([4])
    showSnackbar('success', 'CAT validé avec succès')
  } catch (error) {
    console.error('Erreur lors de la validation:', error)
    showSnackbar('error', 'Erreur lors de la validation du CAT')
  }
}

// Unblock CAT
const unblockCAT = async id => {
  try {
    await $api(`cat/unblock/${id}`, { method: 'PUT' })
    actionComment.value = null
    await fetchItemList([4])
    showSnackbar('success', 'CAT débloqué avec succès')
  } catch (error) {
    console.error('Erreur lors du déblocage:', error)
    showSnackbar('error', 'Erreur lors du déblocage du CAT')
  }
}

// Reject validation CAT
const rejectValidationCAT = async id => {
  try {
    await $api(`cat/reject-validation/${id}`, { method: 'PUT', body: { comment: actionComment.value } })
    actionComment.value = null
    await fetchItemList([4])
    showSnackbar('success', 'Validation du CAT rejetée')
  } catch (error) {
    console.error('Erreur lors du rejet:', error)
    showSnackbar('error', 'Erreur lors du rejet de la validation')
  }
}

// Reject unblock CAT
const rejectUnblockCAT = async id => {
  try {
    await $api(`cat/reject-unblock/${id}`, { method: 'PUT', body: { comment: actionComment.value } })
    actionComment.value = null
    await fetchItemList([4])
    showSnackbar('success', 'Déblocage du CAT refusé')
  } catch (error) {
    console.error('Erreur lors du refus:', error)
    showSnackbar('error', 'Erreur lors du refus du déblocage')
  }
}

// Watchers
watch(
  () => [filterDataArray[0].filter.value, filterDataArray[1].filter.value, searchQuery.value, page.value],
  () => {
    fetchItemList([4])
  },
)

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
            <h2>Liste des {{ viewData.data.title.plural }}</h2>
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
            placeholder="Rechercher un CAT" 
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn 
            variant="tonal" 
            color="secondary" 
            prepend-icon="tabler-download"
          >
            Exporter
          </VBtn>

          <VBtn 
            v-if="$can('create', viewData.data.rule.name)" 
            color="primary" 
            prepend-icon="tabler-plus" 
            :to="{ name: 'cat-add' }"
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
        :items="catList"
        :items-length="totalCAT" 
        class="text-no-wrap" 
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.status="{ item }">
          <VChip label :color="item.status.color">
            <VTooltip 
              v-if="item.validation_comment && !unblock_comment" 
              activator="parent"
              transition="scroll-x-transition" 
              location="start"
            >
              Raison: {{ item.validation_comment }}
            </VTooltip>
            <VTooltip 
              v-if="item.unblock_comment" 
              activator="parent" 
              transition="scroll-x-transition" 
              location="start"
            >
              Raison: {{ item.unblock_comment }}
            </VTooltip>
            {{ item.status.message }}
          </VChip>
        </template>

        <template #item.comment="{ item }">
          {{ item.comment }}
        </template>

        <template #item.notification.verbal_trial.amount="{ item }">
          {{ String(item.notification.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
        </template>

        <template #item.actions="{ item }">
          <span>
            <IconBtn 
              v-if="$can('read', viewData.data.rule.name)" 
              :to="{ name: 'cat-notification-id', params: { id: item.id } }"
            >
              <VTooltip activator="parent" transition="scroll-x-transition" location="top">
                Détails
              </VTooltip>
              <VIcon icon="tabler-eye" />
            </IconBtn>
            
            <VBtn icon variant="text" size="small" color="medium-emphasis">
              <VIcon size="24" icon="tabler-dots-vertical" />
              <VMenu activator="parent">
                <VList>
                  <VListItem 
                    v-if="$can('historical', 'pv') || $can('read', 'pv')"
                    :to="{ name: 'pv-id', params: { id: item.notification.verbal_trial.id } }"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-eye" />
                    </template>
                    <VListItemTitle>Voir Pv</VListItemTitle>
                  </VListItem>
                  
                  <VListItem 
                    v-if="$can('read', 'notification') || $can('historical', 'notification')"
                    :to="{ name: 'notification-id', params: { id: item.notification.id } }"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-eye" />
                    </template>
                    <VListItemTitle>Voir la notification</VListItemTitle>
                  </VListItem>
                  
                  <VListItem 
                    v-if="$can('download', viewData.data.rule.name)"
                    @click="downloadFile(`/api/cat/download/${item.id}`, `CAT-${item.notification.verbal_trial.committee_id}.docx`)"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-download" />
                    </template>
                    <VListItemTitle>Télécharger CAT</VListItemTitle>
                  </VListItem>
                  
                  <VDivider v-if="$can('validate', viewData.data.rule.name) && item.validation_status == 'waiting'" />
                  
                  <VListItem 
                    v-if="$can('validate', viewData.data.rule.name) && item.validation_status == 'waiting'"
                    @click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Valider CAT'; actionText = 'Voulez vous vraiment valider ce CAT?'; actionFunction = validateCAT; actionButtonText = 'Valider'; needComment = false"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-check" />
                    </template>
                    <VListItemTitle>Valider CAT</VListItemTitle>
                  </VListItem>
                  
                  <VListItem 
                    v-if="$can('reject_validation', viewData.data.rule.name) && item.validation_status == 'waiting'"
                    @click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Rejeter CAT'; actionText = 'Voulez vous vraiment rejeter ce CAT?'; actionFunction = rejectValidationCAT; actionButtonText = 'Rejeter'; needComment = true"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-x" />
                    </template>
                    <VListItemTitle>Rejeter CAT</VListItemTitle>
                  </VListItem>
                  
                  <VDivider
                    v-if="$can('unblock', viewData.data.rule.name) && item.unblock_status == 'waiting' && item.validation_status == 'validated'" 
                  />
                  
                  <VListItem
                    v-if="$can('unblock', viewData.data.rule.name) && item.unblock_status == 'waiting' && item.validation_status == 'validated'"
                    @click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Débloquer CAT'; actionText = 'Voulez vous vraiment débloquer ce CAT?'; actionFunction = unblockCAT; actionButtonText = 'Débloquer'; needComment = false"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-lock-open" />
                    </template>
                    <VListItemTitle>Débloquer CAT</VListItemTitle>
                  </VListItem>
                  
                  <VListItem
                    v-if="$can('reject_unblock', viewData.data.rule.name) && item.unblock_status == 'waiting' && item.validation_status == 'validated'"
                    @click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Rejeter deblocage CAT'; actionText = 'Voulez vous vraiment rejeter le déblocage de ce CAT?'; actionFunction = rejectUnblockCAT; actionButtonText = 'Rejeter'; needComment = true"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-x" />
                    </template>
                    <VListItemTitle>Refuser déblocage CAT</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </span>
          
          <span>
            <VDivider />
            <IconBtn 
              v-if="$can('update', viewData.data.rule.name)" 
              :to="{ name: 'cat-notification-edit-id', params: { id: item.id } }"
              :disabled="item.validation_status == 'validated'"
            >
              <VTooltip activator="parent" transition="scroll-x-transition" location="top">
                Modifier
              </VTooltip>
              <VIcon icon="tabler-edit" />
            </IconBtn>
            
            <IconBtn 
              v-if="$can('delete', viewData.data.rule.name)" 
              :loading="deleteLoadings[item.id]"
              :disabled="item.validation_status == 'validated'"
              @click="catSelectedId = item.id; isDialogVisible = true"
            >
              <VTooltip activator="parent" transition="scroll-x-transition" location="top">
                Supprimer
              </VTooltip>
              <VIcon icon="tabler-trash" />
            </IconBtn>
          </span>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalCAT) }}
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
            v-if="needComment" 
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
          <VBtn @click="actionFunction(catSelectedId); isActionDialogVisible = false">
            {{ actionButtonText }}
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Dialog de suppression -->
    <VDialog v-model="isDialogVisible" class="v-dialog-sm">
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <VCard title="Suppression">
        <VCardText>
          Êtes-vous sûr de vouloir supprimer {{ viewData.data.actions.singular }} ?
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn color="secondary" variant="tonal" @click="isDialogVisible = false">
            Annuler
          </VBtn>
          <VBtn @click="apiDelete(catSelectedId); isDialogVisible = false">
            Supprimer
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
