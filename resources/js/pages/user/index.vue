<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { $api } from '@/utils/api'

// Configuration de la page
definePage({
  meta: {
    action: 'read',
    subject: 'user',
  },
})

// Configuration de la vue
const viewData = reactive({
  filter: {
    title: 'Filtres',
  },
  data: {
    title: {
      singular: 'Utilisateur',
      plural: 'Utilisateurs',
    },
    actions: {
      singular: "l'utilisateur",
      plural: 'les utilisateurs',
    },
    rule: {
      name: 'user',
    },
    link: {
      base: 'user',
    },
    api: {
      end_point: 'user',
      data: null,
      query: {
        with_agency: 'true',
      },
    },
  },
})

// Refs et états
const searchQuery = ref('')
const loadings = ref([])
const deleteLoadings = ref({})
const itemsPerPage = ref(8)
const page = ref(1)
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref('')
const actionText = ref('')
const actionButtonText = ref('')
const actionFunction = ref()
const actionComment = ref('cancel')
const commentPresence = ref(false)
const agencyIdFilter = ref(null)

// Headers de la table
const headers = [
  {
    title: 'Nom',
    key: 'full_name',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Profil',
    key: 'profile_fr',
  },
  {
    title: 'Activation',
    key: 'activated',
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
        sm: 6,
      },
      name: {
        item_title: 'name',
        item_value: 'id',
      },
    },
    base: {
      name: 'Profil',
      data_source: 'array',
    },
    filter: {
      key: 'profile',
      value: null,
    },
    api: {
      datac: [
        { name: 'Administrateur', id: 'admin' },
        { name: 'Analyste Crédit', id: 'credit_analyst' },
        { name: 'Admin Crédit', id: 'credit_admin' },
        { name: 'Head Crédit', id: 'head_credit' },
        { name: 'Opération', id: 'operation' },
        { name: 'Juriste', id: 'legal' },
        { name: 'DEX', id: 'dex' },
        { name: "Chargé d'affaire", id: 'caf' },
        { name: 'Chef ', id: 'ca' },
        { name: 'MD', id: 'md' },
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
        item_title: 'name',
        item_value: 'id',
      },
    },
    base: {
      name: 'Activation',
      data_source: 'array',
    },
    filter: {
      key: 'activated',
      value: null,
    },
    api: {
      datac: [
        { name: 'Activé', id: 'true' },
        { name: 'Désactivé', id: 'false' },
      ],
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
      createUrl('/user', {
        query: {
          search: searchQuery.value,
          page: page.value,
          per_page: itemsPerPage.value,
          profile: filterDataArray[0].filter.value,
          activated: filterDataArray[1].filter.value,
          ...viewData.data.api.query,
        },
      }),
    )

    userListData.value = data.value
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    userListData.value = { data: [], total: 0, last_page: 1 }
  } finally {
    // Désactiver les états de chargement
    id_list.forEach(id => {
      loadings.value[id] = false
    })
  }
}

// Données utilisateurs
const userListData = ref({ data: [], total: 0, last_page: 1 })

const { data: agencyListData, execute: fetchAgencyList } = await useApi(
  createUrl('/agency', {
    query: {
      search: searchQuery,
      page: page,
      with_agency: 'true',
    },
  }),
)

// Computed
const userList = computed(() => userListData.value?.data || [])
const agencyList = computed(() => agencyListData.value?.data || [])
const totalTransfer = computed(() => userListData.value?.total || 0)
const lastPage = computed(() => userListData.value?.last_page || 1)

// Méthodes

const updateOptions = options => {
  page.value = options.page
}


const apiDelete = async id => {
  deleteLoadings.value[id] = true
  try {
    const response = await $api(`user/${id}`, {
      method: 'DELETE',
    })
		
    if (response.status === 204) {
      actionComment.value = ''
      showSnackbar('success', 'Utilisateur supprimé avec succès')
    } else {
      showApiErrors(response.errors)
    }
		
    await fetchItemList()
    await fetchAgencyList()
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    showSnackbar('error', errorMessage(error, 'Erreur lors de la suppression'))
  } finally {
    deleteLoadings.value[id] = false
  }
}

// Watchers
watch(
  () => [
    filterDataArray[0].filter.value,
    filterDataArray[1].filter.value,
    searchQuery.value,
    page.value,
    itemsPerPage.value,
  ],
  () => {
    fetchItemList([4])
  },
)

// Lifecycle
onMounted(async () => {
  await fetchItemList([4])
})


// Nombre de lignes et filtres mémorisés pour la prochaine visite
useListPreferences({ itemsPerPage, filterDataArray })

// Actions groupées sur les lignes cochées (mêmes droits et conditions que les boutons de ligne)
const selected = ref([])
const ability = useAbility()

// Le compte connecté n'est jamais désactivé ni supprimé en masse
const currentUserId = useCookie('userData').value?.id

const userBody = (item, activated) => ({
  full_name: item.full_name,
  email: item.email,
  profile: item.profile,
  password_change_required: !!item.password_change_required,
  activated,
})

const bulkActions = computed(() => bulkActionList(
  ability.can('update', 'user') && bulkPut({ label: 'Activer', icon: 'tabler-lock-open', color: 'success', eligible: item => !item.activated && item.id != currentUserId, url: item => `user/${item.id}`, body: item => userBody(item, true) }),
  ability.can('update', 'user') && bulkPut({ label: 'Désactiver', icon: 'tabler-lock', color: 'warning', eligible: item => item.activated && item.id != currentUserId, url: item => `user/${item.id}`, body: item => userBody(item, false) }),
  ability.can('delete', 'user') && bulkDelete('user', item => item.id != currentUserId),
))

const bulkItemTitle = item => item.full_name
</script>

<template>
  <div>
    <AppPageHeader
      title="Utilisateurs"
      subtitle="Comptes, profils et activation"
    />

    <!-- Filtres et table -->
    <VCard
      :title="viewData.filter.title"
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

        <VDivider class="my-4" />
      </VCardText>

      <!-- Barre d'actions -->
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="flex-grow-1">
          <AppTextField 
            v-model="searchQuery" 
            placeholder="Rechercher un utilisateur" 
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn 
            v-if="$can('create', viewData.data.rule.name)" 
            color="primary" 
            prepend-icon="tabler-plus"
            :to="{ name: `${viewData.data.link.base}-add` }"
          >
            Nouveau
          </VBtn>

          <ExportButton
            endpoint="/user"
            name="utilisateurs"
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
        :items="userList"
        :actions="bulkActions"
        :item-title="bulkItemTitle"
        export-endpoint="/user"
        export-name="utilisateurs"
        @done="fetchItemList([4])"
      />

      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        v-model="selected"
        :show-select="bulkActions.length > 0"
        :loading="loadings[4]"
        :headers="headers"
        :items="userList"
        :items-length="totalTransfer"
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <template #item.activated="{ item }">
          <VAvatar
            variant="tonal"
            :color="{ true: 'success', false: 'error' }[item.activated]"
            class="me-4"
            size="40"
          >
            <VIcon
              :icon="
                { false: 'tabler-lock-check', true: 'tabler-lock-open' }[
                  item.activated
                ]
              "
              size="28"
            />
          </VAvatar>
          <div class="text-link text-base font-weight-medium d-inline-block">
            {{ { false: "Désactivé", true: "Activé" }[item.activated] }}
          </div>
        </template>

        <template #item.actions="{ item }">
          <div class="text-center">
            <div>
              <IconBtn
                v-if="$can('read', 'user') || $can('historical', 'user')"
                :to="{ name: 'user-id', params: { id: item.id } }"
              >
                <VTooltip
                  activator="parent"
                  transition="scroll-x-transition"
                  location="start"
                >
                  Details
                </VTooltip>
                <VIcon icon=" tabler-eye" />
              </IconBtn>
              <IconBtn
                v-if="$can('update', 'user')"
                :to="{ name: 'user-edit-id', params: { id: item.id } }"
              >
                <VTooltip
                  activator="parent"
                  transition="scroll-x-transition"
                  location="top"
                >
                  Modifier
                </VTooltip>
                <VIcon icon=" tabler-edit" />
              </IconBtn>
              <IconBtn
                v-if="$can('create', 'user')"
                :to="{ name: 'user-add', query: { from: item.id } }"
              >
                <VTooltip
                  activator="parent"
                  transition="scroll-x-transition"
                  location="top"
                >
                  Copier
                </VTooltip>
                <VIcon icon="tabler-copy" />
              </IconBtn>
              <IconBtn
                v-if="$can('delete', 'user')"
                @click="
                  selectedItemId = item.id;
                  (actionTitle = 'Supprimer le utilisateur'),
                  (actionText =
                    'Voulez vous vraiment supprimer cet utilisateur?'),
                  (actionFunction = apiDelete);
                  actionButtonText = 'Supprimer';
                  commentPresence = false;
                  isActionDialogVisible = true;
                "
              >
                <VTooltip
                  activator="parent"
                  transition="scroll-x-transition"
                  location="end"
                >
                  Supprimer
                </VTooltip>
                <VIcon
                  icon="tabler-trash"
                  color="error"
                />
              </IconBtn>
            </div>
          </div>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <TablePagination
            v-model:page="page"
            v-model:items-per-page="itemsPerPage"
            :total-items="totalTransfer"
            :last-page="lastPage"
          />
        </template>
      </VDataTableServer>
    </VCard>

    <!-- Dialog d'action -->
    <VDialog
      v-model="isActionDialogVisible"
      class="v-dialog-sm"
    >
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
          <VBtn 
            color="secondary" 
            variant="tonal" 
            @click="isActionDialogVisible = false"
          >
            Retour
          </VBtn>
          <VBtn 
            :loading="deleteLoadings[selectedItemId]"
            @click="
              actionFunction(selectedItemId);
              isActionDialogVisible = false;
            "
          >
            {{ actionButtonText }}
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

.full-width-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
