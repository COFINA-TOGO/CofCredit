<!-- eslint-disable camelcase -->

<script setup>
definePage({
  meta: {
    action: 'historical',
    subject: 'simple-notification',
  },
})
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { $api } from '@/utils/api'

const isDialogVisible = ref(false)
const contractIdToDelete = ref(0)
const selectedType = ref()
const searchQuery = ref('')
const loadings = ref([])
const itemsPerPage = ref(8)
const page = ref(1)

const headers = [
  {
    title: 'Numéro comité',
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
    title: 'Type de contrat',
    key: 'type',
  },
  {
    title: 'Montant',
    key: 'verbal_trial.amount',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const typeList = {
  "company": 'Société',
  "individual_business": 'Entreprise Individuel',
  "particular": 'Particulier',
}

const {
  data: notificationData,
  execute: fetchSimpleNotifications,
} = await useApi(createUrl('/notification', {
  query: {
    search: searchQuery,
    type: selectedType,
    page: page,
    per_page: itemsPerPage,
    with_type_of_credit: 1,
    with_company: 1,
    has_notification: 1,
    has_contract: 0,
    with_individual_business: 1,
    with_creator: 1,
    has_upload_completed: 1,
    has_cat: 1,
    is_simple: 1,
    status: 'v',
  },
}))

const load = i => {
  loadings.value[i] = true
  setTimeout(() => {
    loadings.value[i] = false
  }, 1000)
}

const updateOptions = options => {
  page.value = options.page
}

const downloadFile = async (url, fileName) => {
  try {
    await downloadAuthenticatedFile(url, fileName)
    fetchSimpleNotifications()
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}

const apiDelete = async id => {
  try {
    await $apiOrThrow(`notification/${id}`, { method: 'DELETE' })
    fetchSimpleNotifications()
    showSnackbar('success', 'Suppression effectuée avec succès')
  } catch (error) {
    showSnackbar('error', errorMessage(error, 'Erreur lors de la suppression'))
  }
}

const notificationList = computed(() => notificationData.value.data)
const totalPv = computed(() => notificationData.value.total)
const lastPage = computed(() => notificationData.value.last_page)

// Actions groupées sur les lignes cochées (mêmes droits et conditions que les boutons de ligne)
const selected = ref([])
const ability = useAbility()

const bulkActions = computed(() => bulkActionList(
  ability.can('download', 'notification') && bulkDownload('notification non signée', item => ({ url: `/api/notification/download/${item.id}`, name: `Notification-${item.verbal_trial.committee_id}.docx` })),
  ability.can('download', 'notification') && bulkDownload('billet à ordre non signé', item => ({ url: `/api/notification/promissory-note/download/${item.id}`, name: `Billet-à-ordre-${item.verbal_trial.committee_id}.docx` })),
  ability.can('download', 'notification') && bulkDownload('notification signée', item => item.signed_notification_path && { url: item.signed_notification_path, name: storedFileName(item.signed_notification_path, 'Notification') }),
  ability.can('download', 'notification') && bulkDownload('billet à ordre signé', item => item.signed_promissory_note_path && { url: item.signed_promissory_note_path, name: storedFileName(item.signed_promissory_note_path, 'Billet-à-ordre') }),
  ability.can('delete', 'notification') && bulkDelete('notification'),
))

const bulkItemTitle = item => item.verbal_trial?.committee_id ?? `Notification ${item.id}`
</script>

<template>
  <div>
    <AppPageHeader title="Historique des notifications simplifiées" />

    <VCard
      title="Filtres"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedType"
              placeholder="Type de contrat"
              :items="[{ value: 'company', title: 'Société' }, { value: 'particular', title: 'Particulier' }, { value: 'individual_business', title: 'Entreprise Individuel' }]"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider class="my-4" />

      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <AppTextField
            v-model="searchQuery"
            placeholder="Rechercher un contrat"
            density="compact"
            style="inline-size: 200px;"
            class="me-3"
          />
        </div>

        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <VBtn
            v-if="$can('create', 'simple-notification')"
            color="primary"
            prepend-icon="tabler-plus"
            :to="{ name: 'simple-notification-add' }"
          >
            Ajouter
          </VBtn>
          <VBtn
            :loading="loadings[3]"
            :disabled="loadings[3]"
            prepend-icon="tabler-refresh"
            @click="fetchSimpleNotifications(); load(3)"
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


      <BulkActions
        v-model="selected"
        :items="notificationList"
        :actions="bulkActions"
        :item-title="bulkItemTitle"
        @done="fetchSimpleNotifications"
      />

      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        v-model="selected"
        :show-select="bulkActions.length > 0"
        :headers="headers"
        :items="notificationList"
        :items-length="totalPv"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.verbal_trial.amount="{ item }">
          {{ String(item.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
        </template>

        <template #item.actions="{ item }">
          <IconBtn :to="{ name: 'simple-notification-id', params: { id: item.id } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            v-if="$can('update', 'notification')"
            :to="{ name: 'simple-notification-edit-id', params: { id: item.id } }"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn
            v-if="$can('delete', 'notification')"
            @click="contractIdToDelete = item.id; isDialogVisible = true"
          >
            <VIcon
              icon="tabler-trash"
              color="error"
            />
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
                <VBadge
                  v-if="$can('read', 'guarantor')"
                  inline
                  :content="item.guarantors_count"
                >
                  <VListItem :to="{ name: 'simple-notification-notification_id-guarantor', params: { notification_id: item.id } }">
                    <template #prepend>
                      <VIcon icon="tabler-users" />
                    </template>

                    <VListItemTitle>
                      Voir les Cautions
                    </VListItemTitle>
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


                <div v-if="$can('download', 'notification')">
                  <VDivider />
                  <!-- Télécharger contrat non-signé -->
                  <VListItem @click="downloadFile(`/api/notification/download/${item.id}`, `Notification-${item.verbal_trial.committee_id}.docx`)">
                    <template #prepend>
                      <VIcon icon="tabler-download" />
                    </template>
                    <VListItemTitle>Télécharger Notification non signée</VListItemTitle>
                  </VListItem>
                  <!-- Télécharger contrat signé -->
                  <VListItem
                    v-if="item.signed_notification_path"
                    @click="downloadFile(item.signed_notification_path, `Notification-${item.signed_notification_path.split('/').slice(-1)[0]}`)"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-download" />
                    </template>
                    <VListItemTitle>Télécharger Notification signée</VListItemTitle>
                  </VListItem>
                  <!-- Télécharger billet à ordre non-signé -->
                  <VListItem @click="downloadFile(`/api/notification/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`);">
                    <template #prepend>
                      <VIcon icon="tabler-download" />
                    </template>
                    <VListItemTitle>Télécharger Billet à ordre non signé</VListItemTitle>
                  </VListItem>
                  <!-- Télécharger billet à ordre signé -->
                  <VListItem
                    v-if="item.signed_promissory_note_path"
                    @click="downloadFile(item.signed_promissory_note_path, `Billet-à-ordre-${item.signed_promissory_note_path.split('/').slice(-1)[0]}`)"
                  >
                    <template #prepend>
                      <VIcon icon="tabler-download" />
                    </template>
                    <VListItemTitle>Télécharger Billet à ordre signé</VListItemTitle>
                  </VListItem>
                </div>
              </VList>
            </VMenu>
          </VBtn>
        </template>

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

    <VDialog
      v-model="isDialogVisible"
      class="v-dialog-sm"
    >
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard title="Suppression">
        <VCardText>
          Etes vous sûr de vouloir supprimer ce contrat?
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="isDialogVisible = false"
          >
            Annuler
          </VBtn>
          <VBtn @click="apiDelete(contractIdToDelete); isDialogVisible = false">
            Supprimer
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
