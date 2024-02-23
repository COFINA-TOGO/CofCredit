<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'

const headers = [
  {
    title: 'Numéro comitée',
    key: 'committee_id',
  },
  {
    title: 'Prénom client',
    key: 'applicant_first_name',
  },
  {
    title: 'Nom client',
    key: 'applicant_last_name',
  },
  {
    title: 'Type Credit',
    key: 'type_of_credit.name',
  },
  {
    title: 'Montant',
    key: 'amount',
  },
  {
    title: 'Durée',
    key: 'duration',
  },
  {
    title: 'CAF',
    key: 'caf.full_name',
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
} = await useApi(createUrl('/verbal-trial', {
  query: {
    search: searchQuery,
    page: page,
    with_caf: 1,
    with_type_of_credit: 1,
  },
}))


const deletePv = async id => {
  await $api(`verbal-trial/${id}`, { method: 'DELETE' })
  fetchPv()
}

const pvList = computed(() => pvData.value.data)
const totalPv = computed(() => pvData.value.total)
const lastPage = computed(() => pvData.value.last_page)
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
              Liste des Procès verbaux en attente de contrat
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
            <AppSelect v-model="selectedStatus" placeholder="Type de crédit" :items="status" clearable
              clear-icon="tabler-x" />
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

          <VBtn color="primary" prepend-icon="tabler-plus" @click="$router.push('/pv/add')">
            Ajouter un PV
          </VBtn>
          <VBtn color="primary" prepend-icon="tabler-refresh" @click="fetchPv()">
            Recharger
          </VBtn>
        </div>
      </div>

      <VDivider class="mt-4" />


      <!-- 👉 Datatable  -->
      <VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers" :items="pvList"
        :items-length="totalPv" class="text-no-wrap" @update:options="updateOptions">
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="$router.push('/pv/' + item.id)">
            <VIcon icon=" tabler-eye" />
          </IconBtn>
          <IconBtn @click="$router.push('/pv/edit/' + item.id)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="$router.push('/pv/download/' + item.id)">
            <VIcon icon="tabler-download" />
          </IconBtn>
          <IconBtn @click="deletePv(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

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
                  Précedent
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
                  Suivant
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>
