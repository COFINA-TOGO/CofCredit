<!-- eslint-disable camelcase -->

<script setup>
definePage({
	meta: {
		action: 'read',
		subject: 'contract',
	},
})
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'
import { $api } from '@/utils/api';

// Refs et états
const isDialogVisible = ref(false)
const contractIdToDelete = ref(0)
const searchQuery = ref('')
const loadings = ref([])
const deleteLoadings = ref({})
const itemsPerPage = ref(8)
const page = ref(1)

// Snackbar
const isSnackbarVisible = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

// Headers de la table
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
		title: 'Montant',
		key: 'verbal_trial.amount',
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

// Configuration des filtres
const filterDataArray = reactive([
	{
		view: {
			cols: {
				col: 12,
				sm: 6,
			},
			name: {
				item_title: 'title',
				item_value: 'value',
			},
		},
		base: {
			name: 'Type de notification',
			data_source: 'array',
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

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
	// Activer les états de chargement
	id_list.forEach(id => {
		loadings.value[id] = true
	})

	try {
		const { data } = await useApi(
			createUrl('/notification', {
				query: {
					search: searchQuery.value,
					type: filterDataArray[0].filter.value,
					page: page.value,
					with_verbal_trial: 1,
					has_cat: 1,
					is_simple: 0,
					head_credit_validation: 'v',
					status: 'wrv',
				},
			})
		)

		notificationData.value = data.value
	} catch (error) {
		console.error('Erreur lors de la récupération des notifications:', error)
		notificationData.value = { data: [], total: 0, last_page: 1 }
	} finally {
		// Désactiver les états de chargement
		id_list.forEach(id => {
			loadings.value[id] = false
		})
	}
}

// Données notifications
const notificationData = ref({ data: [], total: 0, last_page: 1 })

// Méthodes

const updateOptions = options => {
	page.value = options.page
}

const showSnackbar = (color, message) => {
	snackbarColor.value = color
	snackbarMessage.value = message
	isSnackbarVisible.value = true
}

const downloadFile = async (url, fileName) => {
	try {
		new JsFileDownloader({
			url: url,
			headers: [
				{ name: 'Authorization', value: `Bearer ${useCookie('userToken').value}` },
				{ name: 'Accept', value: `application/json` },
			],
			nameCallback: function (name) {
				return fileName
			},
		})
		showSnackbar('success', 'Téléchargement en cours...')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors du téléchargement:', error)
		showSnackbar('error', 'Erreur lors du téléchargement')
	}
}

const apiDelete = async id => {
	deleteLoadings.value[id] = true
	try {
		await $api(`notification/${id}`, { method: 'DELETE' })
		showSnackbar('success', 'Notification supprimée avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors de la suppression:', error)
		showSnackbar('error', 'Erreur lors de la suppression')
	} finally {
		deleteLoadings.value[id] = false
	}
}

// Computed
const notificationList = computed(() => notificationData.value?.data || [])
const totalPv = computed(() => notificationData.value?.total || 0)
const lastPage = computed(() => notificationData.value?.last_page || 1)

// Watchers
watch(
	() => [filterDataArray[0].filter.value, searchQuery.value, page.value],
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
		<VCard class="mb-6">
			<VCardText>
				<VRow>
					<VCardText>
						<h2>
							Liste des contrats en attente de CAT
						</h2>
					</VCardText>
				</VRow>
			</VCardText>
		</VCard>

		<VCard title="Filtres" class="mb-6">
			<VCardText>
				<VRow>
					<VCol cols="12" sm="4">
						<AppAutocomplete v-model="filterDataArray[0].filter.value" placeholder="Type de notification"
							:items="[{ value: 'company', title: 'Société' }, { value: 'particular', title: 'Particulier' }, { value: 'individual_business', title: 'Entreprise Individuel' }]"
							clearable clear-icon="tabler-x" />
					</VCol>
				</VRow>
			</VCardText>

		<VDivider class="my-4" />

		<!-- Barre d'actions -->
		<div class="d-flex flex-wrap gap-4 mx-5">
			<div class="flex-grow-1">
				<AppTextField 
					v-model="searchQuery" 
					placeholder="Rechercher une notification" 
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
					v-if="$can('create', 'notification')" 
					color="primary" 
					prepend-icon="tabler-plus"
					:to="{ name: 'notification-add' }"
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


		<VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :loading="loadings[4]"
			:headers="headers" :items="notificationList" :items-length="totalPv" class="text-no-wrap"
			loading-text="En cours de chargement" @update:options="updateOptions">

			<template #item.type="{ item }">
				{{ TYPE_LIST[item.type] }}
			</template>

				<template #item.verbal_trial.amount="{ item }">
					{{ String(item.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
				</template>

				<template #item.actions="{ item }">
					<IconBtn :to="{ name: 'notification-id', params: { id: item.id } }">
						<VIcon icon="tabler-eye" />
					</IconBtn>
					<VBtn icon variant="text" size="small" color="medium-emphasis">
						<VIcon size="24" icon="tabler-dots-vertical" />
						<VMenu activator="parent">
							<VList>

								<VBadge v-if="$can('read', 'guarantor')" inline :content="item.guarantors_count">
									<VListItem
										:to="{ name: 'notification-notification_id-guarantor', params: { notification_id: item.id } }">
										<template #prepend>
											<VIcon icon="tabler-users" />
										</template>

										<VListItemTitle>
											Voir les Cautions
										</VListItemTitle>
									</VListItem>
								</VBadge>
								<VListItem v-if="$can('read', 'pv')"
									:to="{ name: 'pv-id', params: { id: item.verbal_trial.id } }">

									<template #prepend>
										<VIcon icon="tabler-eye" />
									</template>

									<VListItemTitle>Voir le Pv</VListItemTitle>
								</VListItem>


								<div v-if="$can('download', 'notification')">
									<VDivider />
									<!-- Télécharger notification non-signé -->
									<!-- <VListItem
										@click="downloadFile(`/api/notification/download/${item.id}`, `Notification-${item.verbal_trial.committee_id}.docx`)">

										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger notification non-signé</VListItemTitle>
									</VListItem> -->
									<!-- Télécharger billet à ordre non-signé -->
									<VListItem
										@click="downloadFile(`/api/contract/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`);">

										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Billet à ordre non signé</VListItemTitle>
									</VListItem>
									<VDivider />
									<!-- Télécharger contrat signé -->
									<VListItem v-if="item.signed_contract_path"
										@click="downloadFile(item.signed_contract_path, `Contrat-${item.signed_contract_path.split('/').slice(-1)[0]}`)">

										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Notification signé</VListItemTitle>
									</VListItem>
									<!-- Télécharger billet à ordre signé -->
									<VListItem v-if="item.signed_promissory_note_path"
										@click="downloadFile(item.signed_promissory_note_path, `Billet-à-ordre-${item.signed_promissory_note_path.split('/').slice(-1)[0]}`)">

										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
									<VListItemTitle>Télécharger Billet à ordre signé</VListItemTitle>
								</VListItem>
							</div>

							<div v-if="$can('delete', 'notification')">
								<VDivider />
								<!-- Supprimer -->
								<VListItem :loading="deleteLoadings[item.id]" @click="
									contractIdToDelete = item.id;
									isDialogVisible = true;
								">
									<template #prepend>
										<VIcon icon="tabler-trash" />
									</template>
									<VListItemTitle>Supprimer</VListItemTitle>
								</VListItem>
							</div>

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

		<!-- Snackbar -->
		<VSnackbar v-model="isSnackbarVisible" transition="scale-transition" location="top end"
			:color="snackbarColor">
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
