<!-- eslint-disable camelcase -->

<script setup>
definePage({
	meta: {
		action: "read-historical",
		subject: "basic-contract",
	},
});
import { VDataTableServer } from "vuetify/labs/VDataTable";
import { paginationMeta } from "@api-utils/paginationMeta";
import JsFileDownloader from "js-file-downloader";
import { $api } from "@/utils/api";

// Refs et états
const isDialogVisible = ref(false);
const contractIdToDelete = ref(0);
const searchQuery = ref("");
const loadings = ref([]);
const deleteLoadings = ref({});
const itemsPerPage = ref(8);
const page = ref(1);

// Snackbar
const isSnackbarVisible = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

// Headers de la table
const headers = [
	{
		title: "Numéro comitée",
		key: "verbal_trial.committee_id",
	},
	{
		title: "Admin Crédit",
		key: "creator.full_name",
	},
	{
		title: "Nom client",
		key: "verbal_trial.applicant_full_name",
	},
	{
		title: "Type de contrat",
		key: "type",
	},
	{
		title: "Montant",
		key: "verbal_trial.amount",
	},
	{
		title: "Actions",
		key: "actions",
		sortable: false,
	},
];

// Constants
const TYPE_LIST = {
	company: "Société",
	individual_business: "Entreprise Individuel",
	particular: "Particulier",
};

// Configuration des filtres
const filterDataArray = reactive([
	{
		view: {
			cols: {
				col: 12,
				sm: 12,
			},
			name: {
				item_title: "title",
				item_value: "value",
			},
		},
		base: {
			name: "Type de contrat",
			data_source: "array",
		},
		filter: {
			key: "type",
			value: null,
		},
		api: {
			datac: [
				{ value: "company", title: "Société" },
				{ value: "particular", title: "Particulier" },
				{ value: "individual_business", title: "Entreprise Individuel" },
			],
		},
	},
]);

// Fonction de récupération des données
const fetchItemList = async (id_list = []) => {
	// Activer les états de chargement
	id_list.forEach((id) => {
		loadings.value[id] = true;
	});

	try {
		const { data } = await useApi(
			createUrl("/contract", {
				query: {
					search: searchQuery.value,
					type: filterDataArray[0].filter.value,
					page: page.value,
					with_type_of_credit: 1,
					with_company: 1,
					with_individual_business: 1,
					with_creator: 1,
					has_upload_completed: 1,
					has_cat: 1,
					status: "v",
				},
			})
		);

		contractData.value = data.value;
	} catch (error) {
		console.error("Erreur lors de la récupération des contrats:", error);
		contractData.value = { data: [], total: 0, last_page: 1 };
	} finally {
		// Désactiver les états de chargement
		id_list.forEach((id) => {
			loadings.value[id] = false;
		});
	}
};

// Données contrats
const contractData = ref({ data: [], total: 0, last_page: 1 });

// Méthodes

const updateOptions = (options) => {
	page.value = options.page;
};

const showSnackbar = (color, message) => {
	snackbarColor.value = color;
	snackbarMessage.value = message;
	isSnackbarVisible.value = true;
};

const downloadFile = async (url, fileName) => {
	try {
		new JsFileDownloader({
			url: url,
			headers: [
				{
					name: "Authorization",
					value: `Bearer ${useCookie("userToken").value}`,
				},
				{ name: "Accept", value: `application/json` },
			],
			nameCallback: function (name) {
				return fileName;
			},
		});
		showSnackbar("success", "Téléchargement en cours...");
		await fetchItemList();
	} catch (error) {
		console.error("Erreur lors du téléchargement:", error);
		showSnackbar("error", "Erreur lors du téléchargement");
	}
};

const apiDelete = async (id) => {
	deleteLoadings.value[id] = true;
	try {
		await $api(`contract/${id}`, { method: "DELETE" });
		showSnackbar("success", "Contrat supprimé avec succès");
		await fetchItemList();
	} catch (error) {
		console.error("Erreur lors de la suppression:", error);
		showSnackbar("error", "Erreur lors de la suppression");
	} finally {
		deleteLoadings.value[id] = false;
	}
};

// Computed
const contractList = computed(() => contractData.value?.data || []);
const totalPv = computed(() => contractData.value?.total || 0);
const lastPage = computed(() => contractData.value?.last_page || 1);

// Watchers
watch(
	() => [filterDataArray[0].filter.value, searchQuery.value, page.value],
	() => {
		fetchItemList([4]);
	}
);

// Lifecycle
onMounted(async () => {
	await fetchItemList([4]);
});
</script>

<template>
	<div>
		<VCard class="mb-6">
			<VCardText>
				<VRow>
					<VCardText>
						<h2>Liste des contrats en attente de CAT</h2>
					</VCardText>
				</VRow>
			</VCardText>
		</VCard>

		<VCard title="Filtres" class="mb-6">
			<VCardText>
				<VRow>
					<VCol v-for="filterData in filterDataArray" :key="filterData.filter.key"
						:cols="filterData.view.cols.col" :sm="filterData.view.cols.sm ?? 6">
						<AppAutocomplete v-model="filterData.filter.value" :placeholder="filterData.base.name"
							:item-title="filterData.view.name.item_title ?? 'name'"
							:item-value="filterData.view.name.item_value ?? 'id'" :items="filterData.api.datac"
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
					placeholder="Rechercher un contrat" 
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
					v-if="$can('create', 'basic-contract')" 
					color="primary" 
					prepend-icon="tabler-plus"
					:to="{ name: 'contract-add' }"
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
			:headers="headers" :items="contractList" :items-length="totalPv" class="text-no-wrap"
			loading-text="En cours de chargement" @update:options="updateOptions">
			<template #item.type="{ item }">
				{{ TYPE_LIST[item.type] }}
			</template>

				<template #item.verbal_trial.amount="{ item }">
					{{
						String(item.verbal_trial.amount).replace(
							/\B(?=(\d{3})+(?!\d))/g,
							" "
						)
					}}
					F CFA
				</template>

				<template #item.actions="{ item }">
					<IconBtn :to="{ name: 'contract-id', params: { id: item.id } }">
						<VTooltip activator="parent" transition="scroll-x-transition" location="top">Details</VTooltip>
						<VIcon icon="tabler-eye" />
					</IconBtn>
					<VBtn icon variant="text" size="small" color="medium-emphasis">
						<VIcon size="24" icon="tabler-dots-vertical" />
						<VMenu activator="parent">
							<VList>
								<VBadge v-if="$can('read', 'guarantor')" inline :content="item.guarantors_count">
									<VListItem :to="{
										name: 'contract-contract_id-guarantor',
										params: { contract_id: item.id },
									}">
										<template #prepend>
											<VIcon icon="tabler-users" />
										</template>

										<VListItemTitle>
											Voir les Cautions
										</VListItemTitle>
									</VListItem>
								</VBadge>
								<VListItem v-if="$can('read', 'pv')" :to="{
									name: 'pv-id',
									params: { id: item.verbal_trial.id },
								}">
									<template #prepend>
										<VIcon icon="tabler-eye" />
									</template>

									<VListItemTitle>Voir le Pv</VListItemTitle>
								</VListItem>

								<div v-if="$can('download', 'basic-contract')">
									<VDivider />
									<!-- Télécharger contrat non-signé -->
									<VListItem @click="
										downloadFile(
											`/api/contract/download/${item.id}`,
											`Contrat-${item.verbal_trial.committee_id}.docx`
										)
										">
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Contrat non-signé</VListItemTitle>
									</VListItem>
									<!-- Télécharger contrat signé -->
									<VListItem v-if="item.signed_contract_path" @click="
										downloadFile(
											item.signed_contract_path,
											`Contrat-${item.signed_contract_path
												.split('/')
												.slice(-1)[0]
											}`
										)
										">
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Contrat signé</VListItemTitle>
									</VListItem>
									<!-- Télécharger billet à ordre non-signé -->
									<VListItem @click="
										downloadFile(
											`/api/contract/promissory-note/download/${item.id}`,
											`Billet-à-ordre-${item.verbal_trial.committee_id}.docx`
										)
										">
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Billet à ordre non
											signé</VListItemTitle>
									</VListItem>
									<!-- Télécharger billet à ordre signé -->
									<VListItem v-if="item.signed_promissory_note_path" @click="
										downloadFile(
											item.signed_promissory_note_path,
											`Billet-à-ordre-${item.signed_promissory_note_path
												.split('/')
												.slice(-1)[0]
											}`
										)
										">
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
										<VListItemTitle>Télécharger Billet à ordre
											signé</VListItemTitle>
									</VListItem>

									<!-- Télécharger mention manuscrite -->
									<VListItem @click="
										downloadFile(
											`/api/contract/handwritten-mention/download/${item.id}`,
											`Mention-manuscrite-${item.verbal_trial.committee_id}.docx`
										)
										">
										<template #prepend>
											<VIcon icon="tabler-download" />
										</template>
									<VListItemTitle>Télécharger Mention
										manuscrite</VListItemTitle>
									</VListItem>
								</div>

								<div v-if="$can('delete', 'basic-contract')">
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

						<VPagination v-model="page" :length="lastPage" :total-visible="$vuetify.display.xs ? 1 : Math.min(lastPage, 5)
							">
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

		<VDialog v-model="isDialogVisible" class="v-dialog-sm">
			<!-- Dialog close btn -->
			<DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

			<!-- Dialog Content -->
			<VCard title="Suppression">
				<VCardText> Etes vous sûr de vouloir supprimer ce contrat? </VCardText>

				<VCardText class="d-flex justify-end gap-3 flex-wrap">
					<VBtn color="secondary" variant="tonal" @click="isDialogVisible = false">
						Annuler
					</VBtn>
					<VBtn @click="
						apiDelete(contractIdToDelete);
					isDialogVisible = false;
					">
						Supprimer
					</VBtn>
				</VCardText>
			</VCard>
		</VDialog>

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
