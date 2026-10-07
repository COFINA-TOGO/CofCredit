<!-- eslint-disable camelcase -->
<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'

definePage({
  meta: {
    action: 'read',
    subject: 'guarantee-list',
  },
})

// State
const searchQuery = ref('')
const itemsPerPage = ref(8)
const page = ref(1)
const loadings = ref([])
const exportLoading = ref(false)



// Configuration de la vue
const viewData = reactive({
  data: {
    title: {
      singular: 'Garantie',
      plural: 'Garanties',
    },
  },
})

// Headers de la table
const headers = [
  {
    title: 'Type de garantie',
    key: 'type_of_guarantee',
  },
  {
    title: 'Demandeur',
    key: 'applicant',
  },
  {
    title: 'ID Comité',
    key: 'committee_id',
  },
  {
    title: 'Commentaire',
    key: 'comment',
  },
  {
    title: 'Créé le',
    key: 'created_at_fr',
  },
]

// Data refs
const guaranteeData = ref({ data: [], total: 0, last_page: 1 })

const guaranteeList = computed(() => guaranteeData.value.data)
const totalGuarantee = computed(() => guaranteeData.value.total)
const lastPage = computed(() => guaranteeData.value.last_page)

// Fetch guarantees
const fetchItemList = async (id_list = []) => {
  id_list.forEach(id => {
    loadings.value[id] = true
  })

  try {
    const { data } = await useApi(createUrl('/guarantee', {
      query: {
        search: searchQuery.value,
        with_verbal_trial: 1,
        with_type_of_guarantee: 1,
        page: page.value,
        per_page: itemsPerPage.value,
      },
    }))

    guaranteeData.value = data.value
  } catch (error) {
    console.error('Erreur lors de la récupération des garanties:', error)
    guaranteeData.value = { data: [], total: 0, last_page: 1 }
    showSnackbar('error', 'Erreur lors de la récupération des garanties')
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

// Export guarantees
const exportGuarantees = async () => {
  exportLoading.value = true

  const currentDate = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')

  try {
    await downloadAuthenticatedFile('/api/guarantee/export', `garanties-${currentDate}.xlsx`)
    showSnackbar('success', 'Export en cours...')
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    showSnackbar('error', errorMessage(error, 'Erreur lors de l\'export des garanties'))
  } finally {
    exportLoading.value = false
  }
}

// Watchers
watch([searchQuery, page, itemsPerPage], () => {
  fetchItemList([4])
})

// Lifecycle
onMounted(async () => {
  await fetchItemList([4])
})

// Nombre de lignes et filtres mémorisés pour la prochaine visite
useListPreferences({ itemsPerPage })
</script>

<template>
  <div>
    <AppPageHeader
      title="Garanties"
      subtitle="Toutes les garanties prévues dans les PV de comité"
    />
    <VCard class="mb-6">
      <!-- Barre d'actions -->
      <div class="d-flex flex-wrap gap-4 mx-5 mt-5">
        <div class="flex-grow-1">
          <AppTextField
            v-model="searchQuery"
            placeholder="Rechercher une garantie"
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn
            v-if="$can('download', 'guarantee')"
            color="success"
            prepend-icon="tabler-download"
            :loading="exportLoading"
            :disabled="exportLoading"
            @click="exportGuarantees"
          >
            Exporter
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="tabler-refresh" />
              </span>
            </template>
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
        :items="guaranteeList"
        :items-length="totalGuarantee"
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <template #item.type_of_guarantee="{ item }">
          <VChip
            color="primary"
            label
          >
            {{ item.type_of_guarantee ? item.type_of_guarantee.name : '-' }}
          </VChip>
        </template>

        <template #item.applicant="{ item }">
          {{ item.verbal_trial ? item.verbal_trial.applicant_full_name : '-' }}
        </template>

        <template #item.committee_id="{ item }">
          {{ item.verbal_trial ? item.verbal_trial.committee_id : '-' }}
        </template>

        <template #item.comment="{ item }">
          {{ item.comment || '-' }}
        </template>

        <!-- Pagination -->
        <template #bottom>
          <TablePagination
            v-model:page="page"
            v-model:items-per-page="itemsPerPage"
            :total-items="totalGuarantee"
            :last-page="lastPage"
          />
        </template>
      </VDataTableServer>
    </VCard>
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
