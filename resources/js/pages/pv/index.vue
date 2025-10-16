<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import AppAutocomplete from '@/@core/components/app-form-elements/AppAutocomplete.vue'
import JsFileDownloader from 'js-file-downloader'
import { $api } from '@/utils/api'
import { useRouter } from 'vue-router'

// Configuration de la page
definePage({
	meta: {
		action: 'read' || 'historical',
		subject: 'pv',
	},
})

// Router
const router = useRouter()

// Configuration de la vue
const viewData = reactive({
	filter: {
		title: 'Filtres',
	},
	data: {
		title: {
			singular: 'Procès verbal',
			plural: 'Procès verbaux',
		},
		actions: {
			singular: 'le PV',
			plural: 'les PV',
		},
		rule: {
			name: 'pv',
		},
		link: {
			base: 'pv',
		},
		api: {
			end_point: 'verbal-trial',
			data: null,
			query: {
				has_next: 0,
				with_caf: 1,
				with_type_of_credit: 1,
			},
		},
	},
})

// Refs et états
const type_of_credit_id = ref()
const status = ref()
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
const actionComment = ref('')
const commentPresence = ref(false)
const actionStatus = ref('waiting')
const validation_level = ref('ahm')

// Snackbar
const isSnackbarVisible = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
// Headers de la table
const headers = [
	{
		title: 'Numéro comitée',
		key: 'committee_id',
	},
	{
		title: 'Client',
		key: 'entity_name',
	},
	{
		title: 'Type Crédit',
		key: 'type_of_credit.full_name',
	},
	{
		title: 'Montant',
		key: 'amount_fr',
	},
	{
		title: 'Statut',
		key: 'status',
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
				sm: 4,
			},
			name: {
				item_title: 'full_name',
				item_value: 'id',
			},
		},
		base: {
			name: 'Type de crédit',
			data_source: 'api',
			api_endpoint: 'type-of-credit',
			query: { paginate: 0 },
		},
		filter: {
			key: 'type_of_credit_id',
			value: type_of_credit_id,
		},
		api: {
			datac: [],
		},
	},
	{
		view: {
			cols: {
				col: 12,
				sm: 4,
			},
			name: {
				item_title: 'title',
				item_value: 'value',
			},
		},
		base: {
			name: 'Statut',
			data_source: 'array',
		},
		filter: {
			key: 'status',
			value: status,
		},
		api: {
			datac: [
				{ value: 'v', title: 'Validé' },
				{ value: 'w', title: 'En attente' },
				{ value: 'r', title: 'Rejeté' },
			],
		},
	},
	{
		view: {
			cols: {
				col: 12,
				sm: 4,
			},
			name: {
				item_title: 'title',
				item_value: 'value',
			},
		},
		base: {
			name: 'Niveau de validation',
			data_source: 'array',
		},
		filter: {
			key: 'validation_level',
			value: validation_level,
		},
		api: {
			datac: [
				{ value: 'ahm', title: 'Tout' },
				{ value: 'a', title: 'Admin Crédit' },
				{ value: 'h', title: 'Head Crédit' },
				{ value: 'm', title: 'MD' },
			],
		},
	},
])

// API
const { data: pvData, execute: fetchPv } = await useApi(
	createUrl('/verbal-trial', {
		query: {
			search: searchQuery,
			type_of_credit_id: type_of_credit_id,
			status: status,
			page: page,
			in_validation_level: validation_level,
			...viewData.data.api.query,
		},
	})
)

const { data: type_of_credit_list_data } = await useApi(
	createUrl('/type-of-credit', {
		query: {
			paginate: 0,
		},
	})
)

// Computed
const pvList = computed(() => pvData.value?.data || [])
const totalPv = computed(() => pvData.value?.total || 0)
const lastPage = computed(() => pvData.value?.last_page || 1)
const type_of_credit_list = computed(() => type_of_credit_list_data.value?.data || [])

// Méthodes
const load = i => {
	loadings.value[i] = true
	setTimeout(() => {
		loadings.value[i] = false
	}, 1000)
}

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
		await $api(`verbal-trial/analyst/${id}`, { method: 'DELETE' })
		actionComment.value = ''
		showSnackbar('success', 'PV supprimé avec succès')
		await fetchPv()
	} catch (error) {
		console.error('Erreur lors de la suppression:', error)
		showSnackbar('error', 'Erreur lors de la suppression')
	} finally {
		deleteLoadings.value[id] = false
	}
}

const apiChangeStatus = async id => {
	try {
		await $api(`verbal-trial/change-status/${id}`, {
			method: 'PUT',
			body: { status: actionStatus.value, comment: actionComment.value },
		})
		actionComment.value = ''
		const statusMessage = actionStatus.value === 'validated' ? 'validé' : 'rejeté'
		showSnackbar('success', `PV ${statusMessage} avec succès`)
		await fetchPv()
	} catch (error) {
		console.error('Erreur lors du changement de statut:', error)
		showSnackbar('error', 'Erreur lors du changement de statut')
	}
}

// Initialisation des filtres
onMounted(() => {
	// Charger les types de crédit dans le filtre
	if (type_of_credit_list.value.length > 0) {
		filterDataArray[0].api.datac = type_of_credit_list.value
	}
})
</script>

<template>
	<div>
		<!-- En-tête -->
		<VCard class="mb-6">
			<VCardText>
				<VRow>
					<VCardText>
						<h2>Liste des {{ viewData.data.title.plural }} sans contrat</h2>
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
							v-model="filterData.filter.value.value" 
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
						placeholder="Rechercher un PV" 
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
						:loading="loadings[3]" 
						:disabled="loadings[3]" 
						prepend-icon="tabler-refresh"
						@click="fetchPv(); load(3)"
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
				:items="pvList" 
				:items-length="totalPv" 
				class="text-no-wrap" 
				loading-text="En cours de chargement"
				@update:options="updateOptions"
			>
				<!-- Actions -->

				<template #item.duration="{ item }"> {{ item.duration }} mois </template>

				<template #item.status="{ item }">
					<VChip label :color="{
						validated: 'success',
						rejected: 'error',
						waiting: 'warning',
					}[item.status]
						">
						<VTooltip v-if="item.comment" activator="parent" transition="scroll-x-transition"
							location="start">Raison:
							{{ item.comment }}
						</VTooltip>
						{{
							{
								validated: "Validé",
								waiting: "En attente",
								rejected: "Rejeté",
							}[item.status]
						}}
						({{
							{
								credit_analyst: "Analyste Crédit",
								credit_admin: "Admin Crédit",
								head_credit: "Head Crédit",
								md: "MD",
							}[item.validation_level]
						}})
					</VChip>
				</template>

				<template #item.actions="{ item }">
					<div class="text-center">
						<div>
							<IconBtn v-if="$can('read', 'pv') || $can('historical', 'pv')"
								:to="{ name: 'pv-id', params: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Details
								</VTooltip>
								<VIcon icon=" tabler-eye" />
							</IconBtn>
							<IconBtn v-if="$can('download', 'pv')" @click="
								downloadFile(
									`/api/verbal-trial/download/${item.id}`,
									`PV-${item.committee_id}.docx`
								)
								">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Télécharger
									PV
								</VTooltip>
								<VIcon icon="tabler-download" v-tooltip="'Ceci est une icône'" />
							</IconBtn>
							<IconBtn v-if="$can('download', 'pv-notification') && item.status == 'validated'" @click="
								downloadFile(
									`/api/verbal-trial/notification/download/${item.id}`,
									`notification-${item.committee_id}.docx`
								)
								">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Télécharger
									Notification
								</VTooltip>
								<VIcon icon="tabler-download" v-tooltip="'Ceci est une icône'" />
							</IconBtn>
						</div>
						<div v-if="
							($can('update', 'pv') || $can('delete', 'pv')) &&
							(item.status == 'rejected' ||
								(item.status == 'waiting' &&
									item.validation_level == 'credit_admin'))
						">
							<VDivider />
							<IconBtn v-if="
								$can('update', 'pv') &&
								(item.status == 'rejected' ||
									(item.status == 'waiting' &&
										item.validation_level == 'credit_admin'))
							" :to="{ name: 'pv-edit-id', params: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Modifier
								</VTooltip>
								<VIcon icon="tabler-edit" />
							</IconBtn>

							<IconBtn v-if="
								$can('analyst_delete', 'pv') &&
								(item.status == 'rejected' ||
									(item.status == 'waiting' &&
										item.validation_level == 'credit_admin'))
							" @click="
								selectedItemId = item.id;
							(actionTitle = 'Supprimer le PV'),
								(actionText =
									'Voulez vous vraiment supprimer ce pv?'),
								(actionFunction = apiDelete);
							actionButtonText = 'Supprimer';
							commentPresence = false;
							isActionDialogVisible = true;
							">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Supprimer
								</VTooltip>
								<VIcon icon="tabler-trash" color="error" />
							</IconBtn>
						</div>
						<div v-if="
							($can('reject', 'pv') || $can('validate', 'pv')) &&
							useCookie('userData').value['role'] ==
							item.validation_level
						">
							<VDivider />
							<span :class="item.status == 'validated' ? 'full-width-icon' : ''
								">
								<IconBtn v-if="
									$can('reject', 'pv') && item.status != 'rejected'
								" @click="
									selectedItemId = item.id;
								(actionTitle = 'Rejeter le PV'),
									(actionText =
										'Voulez vous vraiment rejeter ce PV?'),
									(actionFunction = apiChangeStatus);
								actionButtonText = 'Rejeter';
								commentPresence = true;
								actionStatus = 'rejected';
								isActionDialogVisible = true;
								">
									<VTooltip activator="parent" transition="scroll-x-transition" location="start">
										Rejeter</VTooltip>
									<VIcon icon="tabler-x" color="error" />
								</IconBtn>
							</span>
							<span v-if="item.status == 'waiting'">
								<IconBtn v-if="$can('validate', 'pv')" @click="
									selectedItemId = item.id;
								(actionTitle = 'Valider le PV'),
									(actionText =
										'Voulez vous vraiment valider ce PV?'),
									(actionFunction = apiChangeStatus);
								actionButtonText = 'Valider';
								commentPresence = false;
								actionStatus = 'validated';
								isActionDialogVisible = true;
								">
									<VTooltip activator="parent" transition="scroll-x-transition" location="end">Valider
									</VTooltip>
									<VIcon icon="tabler-check" color="success" />
								</IconBtn>
							</span>
						</div>
						<div
							v-if="$can('create', 'basic-contract') && item.status == 'validated' && !item.has_mortgage">
							<VDivider />
							<IconBtn :to="{ name: 'contract-add', query: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Créer le
									contrat</VTooltip>
								<VIcon icon="tabler-file-plus" color="success" />
							</IconBtn>
						</div>
						<div
							v-if="$can('create', 'notarized-contract') && item.status == 'validated' && item.has_mortgage">
							<VDivider />
							<IconBtn :to="{ name: 'notification-add', query: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Créer la
									notification notarié</VTooltip>
								<VIcon icon="tabler-file-plus" color="success" />
							</IconBtn>
						</div>
					</div>
				</template>

				<!-- Pagination -->
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

		<!-- Dialog d'action -->
		<VDialog v-model="isActionDialogVisible" class="v-dialog-sm">
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
						Annuler
					</VBtn>
					<VBtn 
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

.full-width-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
