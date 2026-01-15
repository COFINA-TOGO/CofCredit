<!-- eslint-disable camelcase -->
<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'

definePage({
	meta: {
		action: 'read',
		subject: 'guarantor',
	},
})

// Router & State
const route = useRoute("notification-notification_id-guarantor")
const isDialogVisible = ref(false)
const guarantorIdToDelete = ref(0)
const searchQuery = ref('')
const refInputEl = ref()
const uploadState = ref('signed_notification')
const itemsPerPage = ref(8)
const page = ref(1)
const loadings = ref([])
const deleteLoadings = ref({})
const exportLoading = ref(false)

// Snackbar
const isSnackbarVisible = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const showSnackbar = (color, message) => {
	snackbarColor.value = color
	snackbarMessage.value = message
	isSnackbarVisible.value = true
}

// Configuration de la vue
const viewData = reactive({
	data: {
		title: {
			singular: 'Caution',
			plural: 'Cautions',
		},
		actions: {
			singular: 'la caution',
			plural: 'les cautions',
		},
		rule: {
			name: 'guarantor',
		},
		api: {
			end_point: 'guarantor',
		},
	},
})

// Headers de la table
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
		title: 'Pièce d\'identité',
		key: 'number_of_identity_document',
	},
	{
		title: 'Numéro de téléphone',
		key: 'phone_number',
	},
	{
		title: 'Observations',
		key: 'observations',
	},
	{
		title: 'Actions',
		key: 'actions',
		sortable: false,
	},
]

// Data refs
const guarantorData = ref({ data: [], total: 0, last_page: 1 })
const notificationData = ref(null)
const backRouteName = ref({ name: 'notification' })

const guarantorList = computed(() => guarantorData.value.data)
const totalGuarantor = computed(() => guarantorData.value.total)
const lastPage = computed(() => guarantorData.value.last_page)

// Fetch guarantors
const fetchItemList = async (id_list = []) => {
	id_list.forEach(id => {
		loadings.value[id] = true
	})
	
	try {
		const { data } = await useApi(createUrl('/guarantor', {
			query: {
				search: searchQuery.value,
				with_notification_verbal_trial: 1,
				notification_id: route.params.notification_id,
				page: page.value,
			},
		}))
		guarantorData.value = data.value
	} catch (error) {
		console.error('Erreur lors de la récupération des cautions:', error)
		guarantorData.value = { data: [], total: 0, last_page: 1 }
		showSnackbar('error', 'Erreur lors de la récupération des cautions')
	} finally {
		id_list.forEach(id => {
			loadings.value[id] = false
		})
	}
}

// Fetch notification data
const fetchNotificationData = async () => {
	try {
		const { data } = await useApi(createUrl(`/notification/${route.params.notification_id}`))
		notificationData.value = data.value
		
		if (notificationData.value.data.notification.head_credit_validation == 'validated') {
			if (notificationData.value.data.notification.status == 'validated') {
				backRouteName.value = { name: 'notification-historical' }
			} else {
				backRouteName.value = { name: 'notification-without-signed-contract' }
			}
		}
	} catch (error) {
		console.error('Erreur lors de la récupération de la notification:', error)
	}
}

// Update options
const updateOptions = options => {
	page.value = options.page
}

// Download file
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

// Upload file
const uploadFile = async (id, event) => {
	const { files } = event.target
	if (files && files.length === 1) {
		const reader = new FileReader()
		reader.onload = async () => {
			const base64Image = reader.result
			try {
				const response = await fetch(`/api/guarantor/upload/${id}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${useCookie('userToken').value}`,
					},
					body: JSON.stringify({
						[uploadState.value]: base64Image,
					}),
				})

				if (response.ok) {
					// Rafraîchir les données des garanties
					await fetchItemList([4])
					// Rafraîchir aussi les données de la notification parent
					await fetchNotificationData()
					// Réinitialiser l'input file pour permettre de sélectionner le même fichier
					event.target.value = ''
					showSnackbar('success', 'Document mis à jour avec succès')
				} else {
					const errorData = await response.json()
					showSnackbar('error', errorData.error || 'Échec de l\'envoi du document')
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

// Export guarantors
const exportGuarantors = async () => {
	exportLoading.value = true
	const userToken = useCookie('userToken').value
	const currentDate = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')

	try {
		new JsFileDownloader({
			url: '/api/guarantor/export',
			headers: [
				{ name: 'Authorization', value: `Bearer ${userToken}` },
				{ name: 'Accept', value: `application/json` },
			],
			nameCallback: function (name) {
				return `garants-${currentDate}.xlsx`
			},
		})
		showSnackbar('success', 'Export en cours...')
	} catch (error) {
		console.error('Erreur lors de l\'export:', error)
		showSnackbar('error', 'Erreur lors de l\'export des garants')
	} finally {
		exportLoading.value = false
	}
}

// Delete guarantor
const apiDelete = async id => {
	deleteLoadings.value[id] = true
	try {
		await $api(`guarantor/${id}`, { method: 'DELETE' })
		await fetchItemList([4])
		showSnackbar('success', 'Caution supprimée avec succès')
	} catch (error) {
		console.error('Erreur lors de la suppression:', error)
		showSnackbar('error', 'Erreur lors de la suppression de la caution')
	} finally {
		deleteLoadings.value[id] = false
	}
}

// Fonctions de vérification des conditions d'upload (mêmes que pour les contrats)
const canUploadGuarantorPromissoryNote = (guarantor) => {
	if (!guarantor.notification) return false
	
	const { status, signed_promissory_note_path } = guarantor.notification
	
	// Si le fichier n'existe pas, on peut toujours uploader (sauf si validé)
	if (signed_promissory_note_path == null && status !== 'pending_head_validation' && status !== 'validated') {
		return true
	}
	
	// Si la notification est rejetée, on peut uploader à nouveau
	if (status === 'rejected') {
		return true
	}
	
	// Si la notification n'est pas encore validée par l'admin, on peut uploader indéfiniment
	if (status !== 'pending_head_validation' && status !== 'validated') {
		return true
	}
	
	return false
}

// Watchers
watch([searchQuery, page], () => {
	fetchItemList([4])
})

// Lifecycle
onMounted(async () => {
	await fetchNotificationData()
	await fetchItemList([4])
})
</script>

<template>
	<div>
		<VCard class="mb-6">
			<VCardText>
				<div class="d-flex align-center gap-4 mb-4">
					<VBtn 
						prepend-icon="tabler-arrow-left" 
						:to="backRouteName"
					>
						Notifications
					</VBtn>
					<h2 class="mb-0">
						Liste des {{ viewData.data.title.plural }}
					</h2>
				</div>
			</VCardText>

			<VDivider />

			<!-- Barre d'actions -->
			<div class="d-flex flex-wrap gap-4 mx-5 mt-4">
				<div class="flex-grow-1">
					<AppTextField 
						v-model="searchQuery" 
						placeholder="Rechercher une caution" 
					/>
				</div>

				<div class="d-flex gap-4">
					<VBtn
						variant="tonal"
						color="secondary"
						prepend-icon="tabler-download"
						:loading="exportLoading"
						:disabled="exportLoading"
						@click="exportGuarantors"
					>
						Export
						<template #loader>
							<span class="custom-loader">
								<VIcon icon="tabler-refresh" />
							</span>
						</template>
					</VBtn>

					<VBtn 
						v-if="$can('create', viewData.data.rule.name)" 
						color="primary" 
						prepend-icon="tabler-plus"
						:to="{ name: 'notification-notification_id-guarantor-add', params: { notification_id: route.params.notification_id } }"
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

			<!-- Table -->
			<VDataTableServer 
				v-model:items-per-page="itemsPerPage" 
				v-model:page="page" 
				:loading="loadings[4]"
				:headers="headers"
				:items="guarantorList" 
				:items-length="totalGuarantor" 
				class="text-no-wrap"
				loading-text="En cours de chargement"
				@update:options="updateOptions"
			>
				<template #item.observations="{ item }">
					<VList density="compact">
						<VListItem v-for="observation in item.observations">
							<VListItemTitle>
								<VChip label>
									{{ observation }}
								</VChip>
							</VListItemTitle>
						</VListItem>
						<VListItem v-if="item.observations.length == 0" v-for="observation in ['Dossier complet']">
							<VListItemTitle>
								<VChip color="success" label>
									{{ observation }}
								</VChip>
							</VListItemTitle>
						</VListItem>
					</VList>
				</template>

				<template #item.actions="{ item }">
					<IconBtn 
						v-if="$can('read', viewData.data.rule.name)"
						:to="{ name: 'notification-notification_id-guarantor-id', params: { notification_id: route.params.notification_id, id: item.id } }"
					>
						<VTooltip activator="parent" transition="scroll-x-transition" location="top">
							Détails
						</VTooltip>
						<VIcon icon="tabler-eye" />
					</IconBtn>

					<IconBtn 
						v-if="$can('update', viewData.data.rule.name)"
						:to="{ name: 'notification-notification_id-guarantor-edit-id', params: { notification_id: route.params.notification_id, id: item.id } }"
					>
						<VTooltip activator="parent" transition="scroll-x-transition" location="top">
							Modifier
						</VTooltip>
						<VIcon icon="tabler-edit" />
					</IconBtn>

					<IconBtn 
						v-if="$can('delete', viewData.data.rule.name)"
						:loading="deleteLoadings[item.id]"
						@click="guarantorIdToDelete = item.id; isDialogVisible = true"
					>
						<VTooltip activator="parent" transition="scroll-x-transition" location="top">
							Supprimer
						</VTooltip>
						<VIcon icon="tabler-trash" />
					</IconBtn>

					<VBtn 
						icon 
						variant="text" 
						size="small" 
						color="medium-emphasis"
					>
						<VIcon size="24" icon="tabler-dots-vertical" />
						<VMenu activator="parent">
							<VList>
								<input 
									ref="refInputEl" 
									type="file" 
									name="signed_notification" 
									hidden
									@input="uploadFile(item.id, $event)" 
								/>

								<div v-if="$can('download', viewData.data.rule.name)">
									<!-- Télécharger billet à ordre non-signé -->
									<VListItem
										@click="downloadFile(`/api/guarantor/promissory-note/download/${item.id}`, `Billet-à-ordre-Caution-${item.notification.verbal_trial.committee_id}.docx`)"
									>
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Billet à ordre non signé</VListItemTitle>
									</VListItem>

									<!-- Télécharger billet à ordre signé -->
									<VListItem 
										v-if="item.signed_promissory_note_path"
										@click="downloadFile(item.signed_promissory_note_path, `Billet-à-ordre-Caution-${item.signed_promissory_note_path.split('/').slice(-1)[0]}`)"
									>
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Billet à ordre signé</VListItemTitle>
									</VListItem>
								</div>

								<div v-if="$can('upload', viewData.data.rule.name)">
									<VDivider />
									
									<!-- Ajouter Billet à ordre -->
									<VListItem 
										v-if="canUploadGuarantorPromissoryNote(item)"
										@click="uploadState = 'signed_promissory_note'; refInputEl?.click()"
									>
										<template #prepend>
											<VIcon icon="tabler-cloud-upload" />
										</template>
										<VListItemTitle>Ajouter billet à ordre signé</VListItemTitle>
									</VListItem>
								</div>
							</VList>
						</VMenu>
					</VBtn>
				</template>

				<!-- Pagination -->
				<template #bottom>
					<VDivider />

					<div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
						<p class="text-sm text-medium-emphasis mb-0">
							{{ paginationMeta({ page, itemsPerPage }, totalGuarantor) }}
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
									<VIcon start icon="tabler-arrow-left" />
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
									<VIcon end icon="tabler-arrow-right" />
								</VBtn>
							</template>
						</VPagination>
					</div>
				</template>
			</VDataTableServer>
		</VCard>

		<!-- Dialog de suppression -->
		<VDialog 
			v-model="isDialogVisible" 
			class="v-dialog-sm"
		>
			<DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

			<VCard title="Suppression">
				<VCardText>
					Êtes-vous sûr de vouloir supprimer {{ viewData.data.actions.singular }} ?
				</VCardText>

				<VCardText class="d-flex justify-end gap-3 flex-wrap">
					<VBtn 
						color="secondary" 
						variant="tonal" 
						@click="isDialogVisible = false"
					>
						Annuler
					</VBtn>
					<VBtn 
						@click="apiDelete(guarantorIdToDelete); isDialogVisible = false"
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
