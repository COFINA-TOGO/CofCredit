<!-- eslint-disable camelcase -->
<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'

const isDialogVisible = ref(false)
const catIdToDelete = ref(0)
const selectedType = ref()
const searchQuery = ref('')

const headers = [
  {
    title: 'Numéro comitée',
    key: 'contract.verbal_trial.committee_id',
  },
  {
    title: 'Admin Crédit',
    key: 'contract.creator.full_name',
  },
  {
    title: 'Nom client',
    key: 'contract.verbal_trial.applicant_full_name',
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
    key: 'contract.verbal_trial.amount',
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
  data: catData,
  execute: fetchCAT,
} = await useApi(createUrl('/cat', {
  query: {
    search: searchQuery,
    type: selectedType,
    page: page,
    with_type_of_applicant: 1,
    with_creator: 1,
  },
}))

const catList = computed(() => catData.value.data)
const totalCAT = computed(() => catData.value.total)
const lastPage = computed(() => catData.value.last_page)

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
  await $api(`cat/${id}`, { method: 'DELETE' })
  fetchCAT()
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
              Liste des CAT
            </h2>
          </VCardText>
        </VRow>
      </VCardText>
    </VCard>

    <!-- 👉 cats -->
    <VCard class="mb-6">
      <VCardText>
        <div class="d-flex flex-wrap gap-4 mx-5">
          <div class="d-flex align-center">
            <!-- 👉 Search  -->
            <AppTextField v-model="searchQuery" placeholder="Rechercher un cat" density="compact"
              style="inline-size: 200px;" class="me-3" />
          </div>

          <VSpacer />
          <div class="d-flex gap-4 flex-wrap align-center">
            <!-- 👉 Export button -->
            <VBtn variant="tonal" color="secondary" prepend-icon="tabler-download">
              Exporter
            </VBtn>

            <VBtn color="primary" prepend-icon="tabler-plus" :to="{ name: 'cat-add' }">
              Ajouter un CAT
            </VBtn>
            <VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh"
              @click="fetchCAT(); load(3)">
              Recharger
              <template #loader>
                <span class="custom-loader">
                  <VIcon icon="tabler-refresh" />
                </span>
              </template>
            </VBtn>
          </div>
        </div>
      </VCardText>

      <!-- 👉 Datatable  -->
      <VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers" :items="catList"
        :items-length="totalCAT" class="text-no-wrap" @update:options="updateOptions">
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.contract.verbal_trial.amount="{ item }">
          {{ String(item.contract.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
        </template>

        <template #item.actions="{ item }">
          <IconBtn :to="{ name: 'cat-id', params: { id: item.id } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn :to="{ name: 'cat-edit-id', params: { id: item.id } }">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="catIdToDelete = item.id; isDialogVisible = true">
            <VIcon icon="tabler-trash" />
          </IconBtn>
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'contract-id', params: { id: item.contract.id } }">
                  <template #prepend>
                    <VIcon icon="tabler-eye" />
                  </template>

                  <VListItemTitle>Contrat</VListItemTitle>
                </VListItem>
                <VListItem :to="{ name: 'pv-id', params: { id: item.contract.verbal_trial.id } }">
                  <template #prepend>
                    <VIcon icon="tabler-eye" />
                  </template>

                  <VListItemTitle>Pv</VListItemTitle>
                </VListItem>
                <VListItem
                  @click="downloadFile(`/api/cat/download/${item.id}`, `CAT-${item.contract.verbal_trial.committee_id}.docx`)">
                  <template #prepend>
                    <VIcon icon="tabler-download" />
                  </template>
                  <VListItemTitle>CAT</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalCAT) }}
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
          Etes vous sûr de vouloir supprimer ce CAT?
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn color="secondary" variant="tonal" @click="isDialogVisible = false">
            Annuler
          </VBtn>
          <VBtn @click="apiDelete(catIdToDelete); isDialogVisible = false">
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
