<!-- eslint-disable camelcase -->

<script setup>
definePage({
  meta: {
    action: "historical",
    subject: "pv",
  },
})

import { VDataTableServer } from "vuetify/labs/VDataTable"
import { paginationMeta } from "@api-utils/paginationMeta"
import AppAutocomplete from "@/@core/components/app-form-elements/AppAutocomplete.vue"
import JsFileDownloader from "js-file-downloader"

// Refs et états
const isDialogVisible = ref(false)
const idToDelete = ref(0)
const searchQuery = ref("")
const loadings = ref([])
const deleteLoadings = ref({})
const itemsPerPage = ref(8)
const page = ref(1)


// Headers de la table
const headers = [
  {
    title: "Dossier",
    key: "committee_id",
  },
  {
    title: "Type Credit",
    key: "type_of_credit.full_name",
  },
  {
    title: "Montant",
    key: "amount_fr",
  },
  {
    title: "Durée",
    key: "duration",
  },
  {
    title: "CAF",
    key: "caf.full_name",
  },
  {
    title: "Actions",
    key: "actions",
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
        item_title: "full_name",
        item_value: "id",
      },
    },
    base: {
      name: "Type de crédit",
      data_source: "api",
      api_endpoint: "type-of-credit",
      query: { paginate: 0 },
    },
    filter: {
      key: "type_of_credit_id",
      value: null,
    },
    api: {
      datac: [],
    },
  },
])

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
  // Activer les états de chargement
  id_list.forEach(id => {
    loadings.value[id] = true
  })

  try {
    const { data } = await useApi(
      createUrl("/verbal-trial", {
        query: {
          search: searchQuery.value,
          type_of_credit_id: filterDataArray[0].filter.value,
          page: page.value,
          per_page: itemsPerPage.value,
          has_next: 1,
          status: "v",
          with_caf: 1,
          with_type_of_credit: 1,
        },
      }),
    )

    pvData.value = data.value
  } catch (error) {
    console.error("Erreur lors de la récupération des PV:", error)
    pvData.value = { data: [], total: 0, last_page: 1 }
  } finally {
    // Désactiver les états de chargement
    id_list.forEach(id => {
      loadings.value[id] = false
    })
  }
}

// Données PV
const pvData = ref({ data: [], total: 0, last_page: 1 })

// Charger les types de crédit
const { data: type_of_credit_list_data } = await useApi(
  createUrl("/type-of-credit", {
    query: {
      paginate: 0,
    },
  }),
)

// Méthodes

const updateOptions = options => {
  page.value = options.page
}


const downloadFile = async (url, fileName) => {
  try {
    await downloadAuthenticatedFile(url, fileName)
    showSnackbar("success", "Téléchargement en cours...")
    await fetchItemList()
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error)
    showSnackbar("error", "Erreur lors du téléchargement")
  }
}

const apiDelete = async id => {
  deleteLoadings.value[id] = true
  try {
    await $apiOrThrow(`verbal-trial/${id}`, { method: "DELETE" })
    showSnackbar("success", "PV supprimé avec succès")
    await fetchItemList()
  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    showSnackbar("error", "Erreur lors de la suppression")
  } finally {
    deleteLoadings.value[id] = false
  }
}

// Computed
const pvList = computed(() => pvData.value?.data || [])
const totalPv = computed(() => pvData.value?.total || 0)
const lastPage = computed(() => pvData.value?.last_page || 1)
const type_of_credit_list = computed(() => type_of_credit_list_data.value?.data || [])

// Watchers
watch(
  () => [filterDataArray[0].filter.value, searchQuery.value, page.value, itemsPerPage.value],
  () => {
    fetchItemList([4])
  },
)

// Lifecycle
onMounted(async () => {
  // Charger les types de crédit dans le filtre
  if (type_of_credit_list.value.length > 0) {
    filterDataArray[0].api.datac = type_of_credit_list.value
  }

  // Charger les données initiales
  await fetchItemList([4])
})

// Math.min(Math.ceil(totalPv / itemsPerPage), 5)

// Actions groupées sur les lignes cochées (mêmes droits et conditions que les boutons de ligne)
const selected = ref([])
const ability = useAbility()

const bulkActions = computed(() => bulkActionList(
  ability.can('download', 'pv') && bulkDownload('PV', item => ({ url: `/api/verbal-trial/download/${item.id}`, name: `PV-${item.committee_id}.docx` })),
  ability.can('download', 'pv-notification') && bulkDownload('notification', item => item.status == 'validated' && { url: `/api/verbal-trial/notification/download/${item.id}`, name: `notification-${item.committee_id}.docx` }),
  ability.can('delete', 'pv') && bulkDelete('verbal-trial'),
))

const bulkItemTitle = item => item.committee_id
</script>

<template>
  <div>
    <AppPageHeader
      title="Historique des procès verbaux"
      subtitle="Tous les PV de comité"
    />

    <!-- 👉 pvs -->
    <VCard
      title="Filtres"
      class="mb-6"
    >
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
            placeholder="Rechercher un PV" 
          />
        </div>

        <div class="d-flex gap-4">
          <ExportButton
            endpoint="/verbal-trial"
            name="pv"
          />
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

      <!-- 👉 Datatable  -->
      <BulkActions
        v-model="selected"
        :items="pvList"
        :actions="bulkActions"
        :item-title="bulkItemTitle"
        export-endpoint="/verbal-trial"
        export-name="pv"
        @done="fetchItemList([4])"
      />

      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        v-model="selected"
        :show-select="bulkActions.length > 0"
        :loading="loadings[4]"
        :headers="headers"
        :items="pvList"
        :items-length="totalPv"
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <!-- Actions -->

        <template #item.committee_id="{ item }">
          <div class="py-2">
            <div class="text-no-wrap font-weight-medium">
              {{ item?.committee_id }}
            </div>

            <div class="text-body-2 text-medium-emphasis">
              {{ item?.entity_name || item?.applicant_full_name }}
            </div>
          </div>
        </template>

        <template #item.actions="{ item }">
          <IconBtn
            v-if="$can('read', 'pv') || $can('historical', 'pv')"
            :to="{ name: 'pv-id', params: { id: item.id } }"
          >
            <VTooltip
              activator="parent"
              transition="scroll-x-transition"
              location="top"
            >
              Détails
            </VTooltip>
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            v-if="$can('download', 'pv')"
            @click="
              downloadFile(
                `/api/verbal-trial/download/${item.id}`,
                `PV-${item.committee_id}.docx`
              )
            "
          >
            <VTooltip
              activator="parent"
              transition="scroll-x-transition"
              location="top"
            >
              Télécharger PV
            </VTooltip>
            <VIcon icon="tabler-download" />
          </IconBtn>
          <IconBtn
            v-if="$can('download', 'pv-notification') && item.status == 'validated'"
            @click="
              downloadFile(
                `/api/verbal-trial/notification/download/${item.id}`,
                `notification-${item.committee_id}.docx`
              )
            "
          >
            <VTooltip
              activator="parent"
              transition="scroll-x-transition"
              location="top"
            >
              Télécharger
              Notification
            </VTooltip>
            <VIcon icon="tabler-download" />
          </IconBtn>
          <IconBtn
            v-if="$can('delete', 'pv')"
            :loading="deleteLoadings[item.id]"
            @click="
              idToDelete = item.id;
              isDialogVisible = true;
            "
          >
            <VTooltip
              activator="parent"
              transition="scroll-x-transition"
              location="top"
            >
              Supprimer
            </VTooltip>
            <VIcon icon="tabler-trash" />
          </IconBtn>
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
        <VCardText> Etes vous sûr de vouloir supprimer ce pv? </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="isDialogVisible = false"
          >
            Annuler
          </VBtn>
          <VBtn
            @click="
              apiDelete(idToDelete);
              isDialogVisible = false;
            "
          >
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
