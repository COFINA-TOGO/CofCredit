<!-- eslint-disable camelcase -->
<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue'

// Configuration de la page
definePage({
	meta: {
		action: 'read',
		subject: 'basic-cat',
	},
})

// Configuration de la vue
const viewData = reactive({
	filter: {
		title: 'Filtres',
	},
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
			name: 'basic-cat',
		},
		link: {
			base: 'cat',
		},
		api: {
			end_point: 'cat',
			data: null,
			query: {
				with_type_of_applicant: 1,
				with_creator: 1,
				with_contract: 1,
				has_contract: 1,
			},
		},
	},
})

// Configuration des filtres
const filterDataArray = reactive([
	{
		view: {
			cols: {
				col: 12,
				sm: 12,
			},
			name: {
				item_title: 'title',
				item_value: 'value',
			},
		},
		base: {
			name: 'Type de CAT',
			data_source: 'array',
			api_endpoint: 'cat',
			query: { paginate: 'false' },
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
])

// Headers de la table
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
		key: 'contract.verbal_trial.entity_name',
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
		title: 'Status',
		key: 'status',
	},
	{
		title: 'Actions',
		key: 'actions',
		sortable: false,
	},
]

// Constants
const TYPE_LIST = {
	company: 'Société',
	individual_business: 'Entreprise Individuel',
	particular: 'Particulier',
}

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

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
	// Activer les états de chargement
	id_list.forEach(id => {
		loadings.value[id] = true
	})

	try {
		const { data } = await useApi(createUrl('/cat', {
			query: {
				search: searchQuery.value,
				type: filterDataArray[0].filter.value,
				page: page.value,
				...viewData.data.api.query,
			},
		}))

		catData.value = data.value
	} catch (error) {
		console.error('Erreur lors de la récupération des CAT:', error)
		catData.value = { data: [], total: 0, last_page: 1 }
	} finally {
		// Désactiver les états de chargement
		id_list.forEach(id => {
			loadings.value[id] = false
		})
	}
}

// Données CAT
const catData = ref({ data: [], total: 0, last_page: 1 })

// Computed
const catList = computed(() => catData.value?.data || [])
const totalCAT = computed(() => catData.value?.total || 0)
const lastPage = computed(() => catData.value?.last_page || 1)

// Méthodes
const updateOptions = options => {
	page.value = options.page
}

const showSnackbar = (color, message) => {
	snackbarColor.value = color
	snackbarMessage.value = message
	isSnackbarVisible.value = true
}

const formatAmount = amount => {
	return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

const downloadFile = async (url, fileName) => {
	const userToken = useCookie('userToken').value

	try {
		new JsFileDownloader({
			url: url,
			headers: [
				{ name: 'Authorization', value: `Bearer ${userToken}` },
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

const apiDelete = async id => {
	deleteLoadings.value[id] = true
	try {
		await $api(`cat/${id}`, { method: 'DELETE' })
		showSnackbar('success', 'CAT supprimé avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors de la suppression:', error)
		showSnackbar('error', 'Erreur lors de la suppression')
	} finally {
		deleteLoadings.value[id] = false
	}
}

const validateCAT = async id => {
	try {
		await $api(`cat/validate/${id}`, { method: 'PUT' })
		actionComment.value = null
		showSnackbar('success', 'CAT validé avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors de la validation:', error)
		showSnackbar('error', 'Erreur lors de la validation')
	}
}

const unblockCAT = async id => {
	try {
		await $api(`cat/unblock/${id}`, { method: 'PUT' })
		actionComment.value = null
		showSnackbar('success', 'CAT débloqué avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors du déblocage:', error)
		showSnackbar('error', 'Erreur lors du déblocage')
	}
}

const rejectValidationCAT = async id => {
	try {
		await $api(`cat/reject-validation/${id}`, { method: 'PUT', body: { comment: actionComment.value } })
		actionComment.value = null
		showSnackbar('success', 'CAT rejeté avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors du rejet:', error)
		showSnackbar('error', 'Erreur lors du rejet')
	}
}

const rejectUnblockCAT = async id => {
	try {
		await $api(`cat/reject-unblock/${id}`, { method: 'PUT', body: { comment: actionComment.value } })
		actionComment.value = null
		showSnackbar('success', 'Déblocage rejeté avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors du rejet du déblocage:', error)
		showSnackbar('error', 'Erreur lors du rejet du déblocage')
	}
}

// Watchers
watch(
	() => [
		filterDataArray[0].filter.value,
		searchQuery.value,
		page.value,
	],
	() => {
		fetchItemList([4])
	}
)

// Lifecycle
onMounted(async () => {
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
						<h2>
							Liste des {{ viewData.data.title.plural }}
						</h2>
					</VCardText>
				</VRow>
			</VCardText>
		</VCard>

		<!-- Filtres et table -->
		<VCard :title="viewData.filter.title" class="mb-6">
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
						placeholder="Rechercher un CAT" 
					/>
				</div>

				<div class="d-flex gap-4">
					<VBtn 
						variant="tonal" 
						color="secondary" 
						prepend-icon="tabler-download"
					>
						Export
					</VBtn>

					<VBtn 
						v-if="$can('create', viewData.data.rule.name)" 
						color="primary" 
						prepend-icon="tabler-plus"
						:to="{ name: `${viewData.data.link.base}-add` }"
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

			<!-- 👉 Datatable  -->
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
				<!-- Type de CAT -->
				<template #item.type="{ item }">
					{{ TYPE_LIST[item.type] }}
				</template>

				<!-- Statut -->
				<template #item.status="{ item }">
					<VChip label :color="item.status.color">
						<VTooltip v-if="item.validation_comment && !item.unblock_comment" activator="parent"
							transition="scroll-x-transition" location="start">
							Raison: {{ item.validation_comment }}
						</VTooltip>
						<VTooltip v-if="item.unblock_comment" activator="parent" transition="scroll-x-transition"
							location="start">
							Raison: {{ item.unblock_comment }}
						</VTooltip>
						{{ item.status.message }}
					</VChip>
				</template>

				<!-- Montant -->
				<template #item.contract.verbal_trial.amount="{ item }">
					{{ formatAmount(item.contract.verbal_trial.amount) }}
				</template>

				<template #item.actions="{ item }">
					<span>
						<IconBtn v-if="$can('read', 'basic-cat')" :to="{ name: 'cat-id', params: { id: item.id } }">
							<VTooltip activator="parent" transition="scroll-x-transition" location="top">Details
							</VTooltip>
							<VIcon icon="tabler-eye" />
						</IconBtn>
						<VBtn icon variant="text" size="small" color="medium-emphasis">
							<VIcon size="24" icon="tabler-dots-vertical" />
							<VMenu activator="parent">
								<VList>
									<VListItem v-if="$can('historical', 'pv') || $can('read', 'pv')"
										:to="{ name: 'pv-id', params: { id: item.contract.verbal_trial.id } }">
										<template #prepend>
											<VIcon icon="tabler-eye" />
										</template>

										<VListItemTitle>Voir Pv</VListItemTitle>
									</VListItem>
									<VListItem v-if="$can('read', 'contract') || $can('historical', 'contract')"
										:to="{ name: 'contract-id', params: { id: item.contract.id } }">
										<template #prepend>
											<VIcon icon="tabler-eye" />
										</template>

										<VListItemTitle>Voir Contrat</VListItemTitle>
									</VListItem>
									<VListItem v-if="$can('download', 'basic-cat')"
										@click="downloadFile(`/api/cat/download/${item.id}`, `CAT-${item.contract.verbal_trial.committee_id}.docx`)">
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger CAT</VListItemTitle>
									</VListItem>
									<VDivider v-if="$can('validate', 'basic-cat') && item.validation_status == 'waiting'" />
									<VListItem v-if="$can('validate', 'basic-cat') && item.validation_status == 'waiting'"
										@click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Valider CAT', actionText = 'Voulez vous vraiment valider ce CAT?', actionFunction = validateCAT; actionButtonText = 'Valider'; needComment = false">
										<template #prepend>
											<VIcon icon="tabler-check" />
										</template>
										<VListItemTitle>Valider CAT</VListItemTitle>
									</VListItem>
									<VListItem
										v-if="$can('reject_validation', 'basic-cat') && item.validation_status == 'waiting'"
										@click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Rejeter CAT', actionText = 'Voulez vous vraiment rejeter ce CAT?', actionFunction = rejectValidationCAT; actionButtonText = 'Rejeter'; needComment = true">
										<template #prepend>
											<VIcon icon="tabler-x" />
										</template>
										<VListItemTitle>Rejeter CAT</VListItemTitle>
									</VListItem>
									<VDivider
										v-if="$can('unblock', 'basic-cat') && item.unblock_status == 'waiting' && item.validation_status == 'validated'" />
									<VListItem
										v-if="$can('unblock', 'basic-cat') && item.unblock_status == 'waiting' && item.validation_status == 'validated'"
										@click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Débloquer CAT', actionText = 'Voulez vous vraiment débloquer ce CAT?', actionFunction = unblockCAT; actionButtonText = 'Débloquer'; needComment = false">
										<template #prepend>
											<VIcon icon="tabler-lock-open" />
										</template>
										<VListItemTitle>Débloquer CAT</VListItemTitle>
									</VListItem>
									<VListItem
										v-if="$can('reject_unblock', 'basic-cat') && item.unblock_status == 'waiting' && item.validation_status == 'validated'"
										@click="catSelectedId = item.id; isActionDialogVisible = true; actionTitle = 'Rejeter deblocage CAT', actionText = 'Voulez vous vraiment rejeter le déblocage de ce CAT?', actionFunction = rejectUnblockCAT; actionButtonText = 'Rejeter'; needComment = true">
										<template #prepend>
											<VIcon icon="tabler-x" />
										</template>
										<VListItemTitle>Refuser déblocage CAT</VListItemTitle>
									</VListItem>
								</VList>
							</VMenu>
						</VBtn>
					</span>
					<span v-if="$can('update', 'basic-cat') || $can('delete', 'basic-cat')">
						<VDivider />
						<IconBtn v-if="$can('update', 'basic-cat')" :to="{ name: 'cat-edit-id', params: { id: item.id } }"
							:disabled="item.validation_status == 'validated'">
							<VIcon icon="tabler-edit" />
						</IconBtn>
						<IconBtn v-if="$can('delete', 'basic-cat')" @click="catSelectedId = item.id; isDialogVisible = true"
							:disabled="item.validation_status == 'validated'">
							<VIcon icon="tabler-trash" color='error' />
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
								<VBtn 
									variant="tonal" 
									color="default" 
									v-bind="slotProps" 
									:icon="false"
								>
									<VIcon 
										start 
										icon="tabler-arrow-left" 
									/>
									Précédent
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
									<VIcon 
										end 
										icon="tabler-arrow-right" 
									/>
								</VBtn>
							</template>
						</VPagination>
					</div>
				</template>
			</VDataTableServer>
		</VCard>

		<VDialog v-model="isActionDialogVisible" class="v-dialog-sm">
			<!-- Dialog close btn -->
			<DialogCloseBtn @click="isActionDialogVisible = !isActionDialogVisible" />

			<!-- Dialog De suppression -->
			<VCard :title="actionTitle">
				<VCardText>
					{{ actionText }}

					<AppTextarea v-if="needComment" class="mt-3" v-model="actionComment" label="Commentaire"
						placeholder="Ex: RAS" />
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
					Êtes-vous sûr de vouloir supprimer ce {{ viewData.data.actions.singular }} ?
				</VCardText>

				<VCardText class="d-flex justify-end gap-3 flex-wrap">
					<VBtn color="secondary" variant="tonal" @click="isDialogVisible = false">
						Annuler
					</VBtn>
					<VBtn 
						:loading="deleteLoadings[catSelectedId]"
						@click="apiDelete(catSelectedId); isDialogVisible = false"
					>
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
			<!-- eslint-disable-next-line vue/no-v-html -->
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
