<!-- eslint-disable camelcase -->
<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { $api } from '@/utils/api'
import JsFileDownloader from 'js-file-downloader'

const isDialogVisible = ref(false)
const pvIdToDelete = ref(0)

const headers = [
  {
    title: 'Numéro comitée',
    key: 'verbal_trial.committee_id',
  },
  {
    title: 'Prénom client',
    key: 'verbal_trial.applicant_first_name',
  },
  {
    title: 'Nom client',
    key: 'verbal_trial.applicant_last_name',
  },
  {
    title: 'Type de contrat',
    key: 'type',
  },
  {
    title: 'Type Credit',
    key: 'verbal_trial.type_of_credit.name',
  },
  {
    title: 'Montant',
    key: 'verbal_trial.amount',
  },
  {
    title: 'Durée',
    key: 'verbal_trial.duration',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const selectedStatus = ref()
const searchQuery = ref('')

const status = ref([
  {
    title: 'Scheduled',
    value: 'Scheduled',
  },
  {
    title: 'Publish',
    value: 'Published',
  },
  {
    title: 'Inactive',
    value: 'Inactive',
  },
])

const itemsPerPage = ref(8)
const page = ref(1)

const updateOptions = options => {
  page.value = options.page
}

const {
  data: pvData,
  execute: fetchPv,
} = await useApi(createUrl('/contract', {
  query: {
    search: searchQuery,
    page: page,
    with_type_of_credit: 1,
    with_company: 1,
    with_individual_business: 1,
  },
}))

const pvList = computed(() => pvData.value.data)
const totalPv = computed(() => pvData.value.total)
const lastPage = computed(() => pvData.value.last_page)

const typeList = {
  "company": 'Société',
  "individual_business": 'Entreprise Individuel',
  "particular": 'Particulier',
}

const downloadFile = async (url, fileName) => {
  const userToken = useCookie('userToken').value

  try {
    const downloader = new JsFileDownloader({
      url: url,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      forceDesktopMode: true, // Forcer le téléchargement sur les appareils mobiles
    })

    await downloader.download(fileName)
    
    console.log('Téléchargement réussi')
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}

// Math.min(Math.ceil(totalPv / itemsPerPage), 5)
</script>

<template>
  <div>
    <!-- 👉 widgets -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCardText>
            <h2>
              Liste des contrats
            </h2>
          </VCardText>
        </VRow>
      </VCardText>
    </VCard>

    <!-- 👉 pvs -->
    <VCard
      title="Filtres"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Status -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedStatus"
              placeholder="Type de crédit"
              :items="status"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider class="my-4" />

      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Rechercher un pv"
            density="compact"
            style="inline-size: 200px;"
            class="me-3"
          />
        </div>

        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <!-- 👉 Export button -->
          <VBtn
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-upload"
          >
            Export
          </VBtn>

          <VBtn
            color="primary"
            prepend-icon="tabler-plus"
            @click="$router.push('/contract/add')"
          >
            Ajouter un contrat
          </VBtn>
          <VBtn
            color="primary"
            prepend-icon="tabler-refresh"
            @click="fetchPv"
          >
            Recharger
          </VBtn>
        </div>
      </div>

      <VDivider class="mt-4" />


      <!-- 👉 Datatable  -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="pvList"
        :items-length="totalPv"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Type -->
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.actions="{ item }">
          <IconBtn @click="$router.push('/contract/' + item.id)">
            <VIcon icon=" tabler-eye" />
          </IconBtn>
          <IconBtn @click="$router.push('/contract/edit/' + item.id)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="pvIdToDelete = item.id; isDialogVisible = true">
            <VIcon icon="tabler-trash" />
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
                <VListItem :to="{ name: 'contract-guarantor-id', params: { id: item.id } }">
                  <template #prepend>
                    <VIcon icon="tabler-users" />
                  </template>

                  <VListItemTitle>Garants</VListItemTitle>
                </VListItem>

                <VListItem @click="downloadFile(`/api/contract/download/${item.id}`, `Contrat-${item.verbal_trial.committee_id}`)">
                  <template #prepend>
                    <VIcon icon="tabler-download" />
                  </template>
                  <VListItemTitle>Contrat</VListItemTitle>
                </VListItem>

                <VListItem @click="downloadFile(`/api/contract/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}`);">
                  <template #prepend>
                    <VIcon icon="tabler-download" />
                  </template>
                  <VListItemTitle>Billet à ordre</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

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
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Précedent
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
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>

    <VDialog
      v-model="isDialogVisible"
      persistent
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
          <VBtn @click="deleteContract(pvIdToDelete); isDialogVisible = false">
            Supprimer
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
