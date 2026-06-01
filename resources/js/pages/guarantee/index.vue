<!-- eslint-disable camelcase -->
<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import JsFileDownloader from 'js-file-downloader'

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
	const userToken = useCookie('userToken').value
	const currentDate = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')

	try {
		new JsFileDownloader({
			url: '/api/guarantee/export',
			headers: [
				{ name: 'Authorization', value: `Bearer ${userToken}` },
				{ name: 'Accept', value: `application/json` },
			],
			nameCallback: function (name) {
				return `garanties-${currentDate}.xlsx`
			},
		})
		showSnackbar('success', 'Export en cours...')
	} catch (error) {
		console.error('Erreur lors de l\'export:', error)
		showSnackbar('error', 'Erreur lors de l\'export des garanties')
	} finally {
		exportLoading.value = false
	}
}

// Watchers
watch([searchQuery, page], () => {
	fetchItemList([4])
})

// Lifecycle
onMounted(async () => {
	await fetchItemList([4])
})
</script>

<template>
	<div>
		<VCard class="mb-6">
			<VCardText>
				<div class="d-flex align-center gap-4 mb-4">
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
						placeholder="Rechercher une garantie"
					/>
				</div>

				<div class="d-flex gap-4">
					<VBtn
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
					<VDivider />

					<div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
						<p class="text-sm text-medium-emphasis mb-0">
							{{ paginationMeta({ page, itemsPerPage }, totalGuarantee) }}
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
