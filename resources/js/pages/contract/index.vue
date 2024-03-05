<!-- eslint-disable camelcase -->
<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'

const isDialogVisible = ref(false)
const pvIdToDelete = ref(0)
const selectedType = ref()
const searchQuery = ref('')

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

const loadings = ref([])

const load = i => {
  loadings.value[i] = true
  setTimeout(() => {
    loadings.value[i] = false
  }, 1000)
}

const itemsPerPage = ref(8)
const page = ref(1)

const updateOptions = options => {
  page.value = options.page
}

const {
  data: pvData,
  execute: fetchContracts,
} = await useApi(createUrl('/contract', {
  query: {
    search: searchQuery,
    type: selectedType,
    page: page,
    with_type_of_credit: 1,
    with_company: 1,
    with_individual_business: 1,
    with_creator: 1,
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
    new JsFileDownloader({
      url: url,
      headers: [
        { name: 'Authorization', value: `Bearer ${userToken}` },
      ],
      nameCallback: function (name) {
        return fileName
      },
    })
    console.log('Téléchargement réussi')
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}

const apiDelete = async id => {
  await $api(`contract/${id}`, { method: 'DELETE' })
  fetchContracts()
}
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
    <VCard title="Filtres" class="mb-6">
      <VCardText>
        <VRow>
          <!-- 👉 Select Status -->
          <VCol cols="12" sm="4">
            <AppSelect v-model="selectedType" placeholder="Type de contrat"
              :items="[{ value: 'company', title: 'Société' }, { value: 'particular', title: 'Particulier' }, { value: 'individual_business', title: 'Entreprise Individuel' }]"
              clearable clear-icon="tabler-x" />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider class="my-4" />

      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- 👉 Search  -->
          <AppTextField v-model="searchQuery" placeholder="Rechercher un pv" density="compact" style="inline-size: 200px;"
            class="me-3" />
        </div>

        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <!-- 👉 Export button -->
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
            Export
          </VBtn>

          <VBtn color="primary" prepend-icon="tabler-plus" :to="{ name: 'contract-add' }">
            Ajouter un contrat
          </VBtn>
          <VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh"
            @click="fetchContracts(); load(3)">
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
      <VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers" :items="pvList"
        :items-length="totalPv" class="text-no-wrap" @update:options="updateOptions">
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.verbal_trial.amount="{ item }">
          {{ String(item.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
        </template>

        <template #item.actions="{ item }">
          <IconBtn :to="{ name: 'contract-id', params: { id: item.id } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn :to="{ name: 'contract-edit-id', params: { id: item.id } }">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="pvIdToDelete = item.id; isDialogVisible = true">
            <VIcon icon="tabler-trash" />
          </IconBtn>
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'contract-contract_id-guarantor', params: { contract_id: item.id } }">
                  <template #prepend>
                    <VIcon icon="tabler-users" />
                  </template>

                  <VListItemTitle>Garants</VListItemTitle>
                </VListItem>
                <VListItem :to="{ name: 'pv-id', params: { id: item.verbal_trial.id } }">
                  <template #prepend>
                    <VIcon icon="tabler-eye" />
                  </template>

                  <VListItemTitle>Pv</VListItemTitle>
                </VListItem>
                <VDivider />
                <VListItem
                  @click="downloadFile(`/api/contract/download/${item.id}`, `Contrat-${item.verbal_trial.committee_id}.docx`)">
                  <template #prepend>
                    <VIcon icon="tabler-upload" />
                  </template>
                  <VListItemTitle>Contrat</VListItemTitle>
                </VListItem>
                <VListItem
                  @click="downloadFile(`/api/contract/download/${item.id}`, `Contrat-${item.verbal_trial.committee_id}.docx`)">
                  <template #prepend>
                    <VIcon icon="tabler-download" />
                  </template>
                  <VListItemTitle>Contrat</VListItemTitle>
                </VListItem>
                <VDivider />
                <VListItem
                  @click="downloadFile(`/api/contract/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`);">
                  <template #prepend>
                    <VIcon icon="tabler-upload" />
                  </template>
                  <VListItemTitle>Billet à ordre</VListItemTitle>
                </VListItem>
                <VListItem
                  @click="downloadFile(`/api/contract/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`);">
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

            <VPagination v-model="page" :length="lastPage"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(lastPage, 5)">
              <template #prev="slotProps">
                <VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
                  <VIcon start icon="tabler-arrow-left" />
                  Précedent
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

    <VDialog v-model="isDialogVisible" class="v-dialog-sm">
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard title="Suppression">
        <VCardText>
          Etes vous sûr de vouloir supprimer ce contrat?
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn color="secondary" variant="tonal" @click="isDialogVisible = false">
            Annuler
          </VBtn>
          <VBtn @click="apiDelete(pvIdToDelete); isDialogVisible = false">
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
