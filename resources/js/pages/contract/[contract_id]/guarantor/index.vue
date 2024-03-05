<!-- eslint-disable camelcase -->
<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'


const router = useRouter()
const route = useRoute("contract-contract_id-guarantor")
const isDialogVisible = ref(false)
const guarantorIdToDelete = ref(0)
const searchQuery = ref('')

const headers = [
  {
    title: 'Nom',
    key: 'full_name',
  },
  {
    title: 'Fonction',
    key: 'function',
  },
  {
    title: 'Pièce d\identité',
    key: 'number_of_identity_document',
  },
  {
    title: 'Addresse',
    key: 'home_address',
  },
  {
    title: 'Numéro de téléphone',
    key: 'phone_number',
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
  data: guarantorData,
  execute: fetchGuarantors,
} = await useApi(createUrl('/contract/guarantor', {
  query: {
    search: searchQuery,
    with_verbal_trial: 1,
    contract_id: route.params.contract_id,
    page: page,
  },
}))

const guarantorList = computed(() => guarantorData.value.data)
const totalGuarantor = computed(() => guarantorData.value.total)
const lastPage = computed(() => guarantorData.value.last_page)

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
  await $api(`contract/guarantor/${id}`, { method: 'DELETE' })
  fetchGuarantors()
}
</script>

<template>
  <div>
    <VCard title="Liste des garants" class="mb-6">
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <VRow>
            <VCol>
              <VBtn prepend-icon="tabler-arrow-left" :to="{ name: 'contract' }">
                Contrats
              </VBtn>
            </VCol>
            <VCol>
              <AppTextField v-model="searchQuery" placeholder="Rechercher" density="compact" style="inline-size: 200px;"
                class="me-3" />
            </VCol>
          </VRow>
        </div>

        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <!-- 👉 Export button -->
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
            Export
          </VBtn>

          <VBtn color="primary" prepend-icon="tabler-plus"
            :to="{ name: 'contract-contract_id-guarantor-add', params: { contract_id: route.params.contract_id } }">
            Ajouter
          </VBtn>
          <VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh"
            @click="fetchGuarantors(); load(3)">
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
      <VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers"
        :items="guarantorList" :items-length="totalGuarantor" class="text-no-wrap" @update:options="updateOptions">
        <template #item.actions="{ item }">
          <IconBtn
            :to="{ name: 'contract-contract_id-guarantor-id', params: { contract_id: route.params.contract_id, id: item.id } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'contract-contract_id-guarantor-edit-id', params: { contract_id: route.params.contract_id, id: item.id } }">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="guarantorIdToDelete = item.id; isDialogVisible = true">
            <VIcon icon="tabler-trash" />
          </IconBtn>
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  @click="downloadFile(`/api/guarantor/download/${item.id}`, `Contrat-caution-${item.id}-credit-${item.contract.verbal_trial.committee_id}.docx`)">
                  <template #prepend>
                    <VIcon icon="tabler-download" />
                  </template>
                  <VListItemTitle>Contrat</VListItemTitle>
                </VListItem>

                <VListItem
                  @click="downloadFile(`/api/guarantor/promissory-note/download/${item.id}`, `Billet-à-ordre-caution-${item.id}-${item.contract.verbal_trial.committee_id}.docx`);">
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
              {{ paginationMeta({ page, itemsPerPage }, totalGuarantor) }}
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
          Etes vous sûr de vouloir supprimer ce garant?
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn color="secondary" variant="tonal" @click="isDialogVisible = false">
            Annuler
          </VBtn>
          <VBtn @click="apiDelete(guarantorIdToDelete); isDialogVisible = false">
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
