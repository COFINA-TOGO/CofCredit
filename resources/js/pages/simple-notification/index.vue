<!-- eslint-disable camelcase -->

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'
import { $api } from '@/utils/api'
import { useRouter } from 'vue-router'

// Configuration de la page
definePage({
	meta: {
		action: 'read',
		subject: 'simple-notification',
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
			singular: 'Notification simple',
			plural: 'Notifications simples',
		},
		actions: {
			singular: 'la notification simple',
			plural: 'les notifications simples',
		},
		rule: {
			name: 'simple-notification',
		},
		link: {
			base: 'simple-notification',
		},
		api: {
			end_point: 'notification',
			data: null,
			query: {
				with_type_of_credit: 1,
				with_creator: 1,
				is_simple: 1,
				head_credit_validation: 'wr',
				has_cat: 0,
				has_notification: 1,
				has_contract: 0,
			},
		},
	},
})

// Constants
const TYPE_DATA = {
	particular: { icon: 'tabler-user', color: 'primary', name: 'Particulier' },
	company: { icon: 'tabler-users', color: 'success', name: 'Société' },
	individual_business: { icon: 'tabler-box-multiple-1', color: 'info', name: 'Entreprise individuelle' },
}

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
		title: 'Type de notification',
		key: 'type',
	},
	{
		title: 'Téléphone',
		key: 'representative_phone_number',
	},
	{
		title: 'Montant',
		key: 'verbal_trial.amount',
	},
	{
		title: 'Statut',
		key: 'head_credit_validation',
	},
	{
		title: 'Actions',
		key: 'actions',
		sortable: false,
	},
]

// Refs et états
const selectedType = ref()
const searchQuery = ref('')
const refInputEl = ref()
const uploadState = ref('signed_notification')
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
		const { data } = await useApi(createUrl('/notification', {
			query: {
				search: searchQuery.value,
				type: selectedType.value,
				page: page.value,
				...viewData.data.api.query,
			},
		}))

		notificationData.value = data.value
	} catch (error) {
		console.error('Erreur lors de la récupération des notifications simples:', error)
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

// Computed
const notificationList = computed(() => notificationData.value?.data || [])
const totalPv = computed(() => notificationData.value?.total || 0)
const lastPage = computed(() => notificationData.value?.last_page || 1)

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

const uploadFile = async (id, event) => {
	const { files } = event.target
	if (files && files.length === 1) {
		const reader = new FileReader()
		reader.onload = async () => {
			const base64Image = reader.result
			try {
				const response = await fetch(`/api/notification/upload/${id}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${useCookie('userToken').value}`,
					},
					body: JSON.stringify({
						[uploadState.value]: base64Image,
					}),
				})

				if (response.ok) {
					showSnackbar('success', 'Document envoyé avec succès')
					await fetchItemList()
				} else {
					showSnackbar('error', 'Échec de l\'envoi du document')
				}
			} catch (error) {
				console.error('Erreur lors de l\'envoi du document:', error)
				showSnackbar('error', 'Erreur lors de l\'envoi du document')
			}
		}
		reader.readAsDataURL(files[0])
	} else {
		showSnackbar('error', 'Veuillez sélectionner un seul fichier')
	}
}

const apiDelete = async id => {
	deleteLoadings.value[id] = true
	try {
		await $api(`notification/${id}`, { method: 'DELETE' })
		showSnackbar('success', 'Notification simple supprimée avec succès')
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors de la suppression:', error)
		showSnackbar('error', 'Erreur lors de la suppression')
	} finally {
		deleteLoadings.value[id] = false
	}
}

const apiChangeStatus = async id => {
	try {
		await $api(`notification/change-head-credit-status/${id}`, { 
			method: 'PUT', 
			body: { 
				head_credit_validation: actionStatus.value, 
				head_credit_observation: actionComment.value 
			} 
		})
		actionComment.value = ''
		const statusMessage = actionStatus.value === 'validated' ? 'validée' : 'rejetée'
		showSnackbar('success', `Notification simple ${statusMessage} avec succès`)
		
		if (actionStatus.value === 'validated') {
			router.push('/notification/without-signed-contract')
		}
		
		await fetchItemList()
	} catch (error) {
		console.error('Erreur lors du changement de statut:', error)
		showSnackbar('error', 'Erreur lors du changement de statut')
	}
}

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
		<VCard class="mb-6">
			<!-- Barre d'actions -->
			<div class="d-flex flex-wrap gap-4 mt-5 mx-5">
				<div class="flex-grow-1">
					<AppTextField 
						v-model="searchQuery" 
						placeholder="Rechercher une notification simple" 
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

			<VDataTableServer 
				v-model:items-per-page="itemsPerPage" 
				v-model:page="page" 
				:loading="loadings[4]"
				:headers="headers"
				:items="notificationList" 
				:items-length="totalPv" 
				class="text-no-wrap" 
				loading-text="En cours de chargement"
				@update:options="updateOptions"
			>
				<!-- Type de notification -->
				<template #item.type="{ item }">
					<div class="d-flex align-center">
						<VAvatar size="26" :color="TYPE_DATA[item.type].color" variant="tonal">
							<VIcon 
								:icon="TYPE_DATA[item.type].icon" 
								size="20" 
								:color="TYPE_DATA[item.type].color"
								class="rounded-0" 
							/>
						</VAvatar>
						<span class="ms-1 text-no-wrap">{{ TYPE_DATA[item.type].name }}</span>
					</div>
				</template>

				<!-- Montant -->
				<template #item.verbal_trial.amount="{ item }">
					{{ formatAmount(item.verbal_trial.amount) }}
				</template>

				<template #item.head_credit_validation="{ item }">
					<VChip label
						:color="{ 'validated': 'success', 'rejected': 'error', 'waiting': 'warning' }[item.head_credit_validation]">
						<VTooltip v-if="item.head_credit_observation" activator="parent"
							transition="scroll-x-transition" location="start">Raison: {{ item.head_credit_observation }}
						</VTooltip>
						{{ item.head_credit_validation == 'validated' ? 'Validé' : null }}
						{{ item.head_credit_validation == 'waiting' ? 'En attente de validation' : null }}
						{{ item.head_credit_validation == 'rejected' ? 'Rejeté' : null }}
					</VChip>
				</template>


				<template #item.actions="{ item }">
					<span>
						<IconBtn :to="{ name: 'simple-notification-id', params: { id: item.id } }">
							<VTooltip activator="parent" transition="scroll-x-transition" location="start">Details
							</VTooltip>
							<VIcon icon="tabler-eye" />
						</IconBtn>
						<VBtn icon variant="text" size="small" color="medium-emphasis">
							<VIcon size="24" icon="tabler-dots-vertical" />
							<VMenu activator="parent">
								<VList>
									<input ref="refInputEl" type="file" name="signed_notification" hidden
										@input="uploadFile(item.id, $event)" />

									<VBadge v-if="$can('read', 'guarantor')" inline :content="item.guarantors_count">
										<VListItem
											:to="{ name: 'simple-notification-notification_id-guarantor', params: { notification_id: item.id } }">
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
										<VListItem
											@click="downloadFile(`/api/notification/download/${item.id}`, `Notification-${item.verbal_trial.committee_id}.docx`);">

											<template #prepend>
												<VIcon icon="tabler-download" />
											</template>
											<VListItemTitle>Télécharger Notification non signé</VListItemTitle>
										</VListItem>
										<!-- Télécharger billet à ordre non-signé -->
										<VListItem
											@click="downloadFile(`/api/notification/promissory-note/download/${item.id}`, `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`);">

											<template #prepend>
												<VIcon icon="tabler-download" />
											</template>
											<VListItemTitle>Télécharger Billet à ordre non signé</VListItemTitle>
										</VListItem>
									</div>

									<div v-if="$can('upload', 'notification')">
										<VDivider />
										<!-- Ajouter Billet à ordre -->
										<VListItem v-if="item.signed_promissory_note_path == null"
											@click="uploadState = 'signed_promissory_note'; refInputEl?.click()">

											<template #prepend>
												<VIcon icon="tabler-cloud-upload" />
											</template>
											<VListItemTitle>Ajouter billet à ordre signé</VListItemTitle>
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
								</VList>
							</VMenu>
						</VBtn>
					</span>
					<span>
						<VDivider />
						<IconBtn v-if="$can('update', 'notification')"
							:to="{ name: 'simple-notification-edit-id', params: { id: item.id } }">
							<VTooltip activator="parent" transition="scroll-x-transition" location="start">Modifier
							</VTooltip>
							<VIcon icon="tabler-edit" />
						</IconBtn>
						<IconBtn v-if="$can('delete', 'notification')"
							@click="selectedItemId = item.id; actionTitle = 'Supprimer le PV', actionText = 'Voulez vous vraiment supprimer ce pv?', actionFunction = apiDelete; actionButtonText = 'Supprimer'; commentPresence = false; isActionDialogVisible = true;">
							<VTooltip activator="parent" transition="scroll-x-transition" location="end">Supprimer
							</VTooltip>
							<VIcon icon="tabler-trash" color='error' />
						</IconBtn>
					</span>

					<VDivider />
					<IconBtn v-if="$can('reject', 'notification') && item.head_credit_validation != 'rejected'"
						@click="selectedItemId = item.id; actionTitle = 'Rejeter le PV', actionText = 'Voulez vous vraiment rejeter ce PV?', actionFunction = apiChangeStatus; actionButtonText = 'Rejeter'; commentPresence = true; actionStatus = 'rejected'; isActionDialogVisible = true;">
						<VTooltip activator="parent" transition="scroll-x-transition" location="start">Rejeter
						</VTooltip>
						<VIcon icon="tabler-x" color="error" />
					</IconBtn>
					<span v-if="item.head_credit_validation == 'waiting'">
						<IconBtn v-if="$can('validate', 'notification')"
							@click="selectedItemId = item.id; actionTitle = 'Valider le PV', actionText = 'Voulez vous vraiment valider ce PV?', actionFunction = apiChangeStatus; actionButtonText = 'Valider'; commentPresence = false; actionStatus = 'validated'; isActionDialogVisible = true;">
							<VTooltip activator="parent" transition="scroll-x-transition" location="end">Valider
							</VTooltip>
							<VIcon icon="tabler-check" color="success" />
						</IconBtn>
					</span>
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
						:loading="deleteLoadings[selectedItemId]"
						@click="actionFunction(selectedItemId); isActionDialogVisible = false"
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
</style>
