<!-- eslint-disable camelcase -->

<script setup>
definePage({
	meta: {
		action: "read-historical",
		subject: "pv-notification",
	},
});
import { VDataTableServer } from "vuetify/labs/VDataTable";
import { paginationMeta } from "@api-utils/paginationMeta";
import AppAutocomplete from "@/@core/components/app-form-elements/AppAutocomplete.vue";
import JsFileDownloader from "js-file-downloader";
import { $api } from "@/utils/api";
import { useCookie } from "@/@core/composable/useCookie";

const router = useRouter();
const connectedUser = useCookie("userData").value;

const type_of_credit_id = ref();
const status = ref();
const searchQuery = ref("");
const loadings = ref([]);
const itemsPerPage = ref(8);
const page = ref(1);
const selectedItemId = ref(0);
const isActionDialogVisible = ref(false);
const actionTitle = ref("");
const actionText = ref("");
const actionButtonText = ref("");
const actionFunction = ref();
const actionComment = ref("");
const commentPresence = ref(false);
const actionStatus = ref("waiting");
const headers = [
	{
		title: "Numéro comitée",
		key: "committee_id",
	},
	{
		title: "client",
		key: "entity_name",
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
		title: "Statut",
		key: "status",
	},
	{
		title: "Actions",
		key: "actions",
		sortable: false,
	},
];
const { data: pvData, execute: fetchPv } = await useApi(
	createUrl("/verbal-trial", {
		query: {
			search: searchQuery,
			type_of_credit_id: type_of_credit_id,
			in_validation_level: "ahm",
			page: page,
			with_caf: 1,
			with_type_of_credit: 1,
		},
	})
);

const { data: type_of_credit_list_data } = await useApi(
	createUrl("/type-of-credit", {
		query: {
			paginate: 0,
		},
	})
);

const load = (i) => {
	loadings.value[i] = true;
	setTimeout(() => {
		loadings.value[i] = false;
	}, 1000);
};

const updateOptions = (options) => {
	page.value = options.page;
};

const downloadFile = async (url, fileName) => {
	const userToken = useCookie("userToken").value;

	try {
		new JsFileDownloader({
			url: url,
			headers: [
				{ name: "Authorization", value: `Bearer ${userToken}` },
				{ name: "Accept", value: `application/json` },
			],
			nameCallback: function (name) {
				return fileName;
			},
		});
	} catch (error) {
		console.error("Erreur lors du téléchargement:", error);
	}
};

const apiDelete = async (id) => {
	await $api(`verbal-trial/${id}`, { method: "DELETE" });
	actionComment.value = "";
	fetchPv();
};

const apiChangeStatus = async (id) => {
	await $api(`verbal-trial/change-status/${id}`, {
		method: "PUT",
		body: { status: actionStatus.value, comment: actionComment.value },
	});
	actionComment.value = "";
	fetchPv();
};

const pvList = computed(() => pvData.value.data);
const totalPv = computed(() => pvData.value.total);
const lastPage = computed(() => pvData.value.last_page);
const type_of_credit_list = computed(() => type_of_credit_list_data.value.data);
// Math.min(Math.ceil(totalPv / itemsPerPage), 5)
</script>

<template>
	<div>
		<!-- 👉 widgets -->
		<VCard class="mb-6">
			<VCardText>
				<VRow>
					<VCardText>
						<h2>Liste des notifications de caf sans PV</h2>
					</VCardText>
				</VRow>
			</VCardText>
		</VCard>

		<!-- 👉 pvs -->
		<VCard title="Filtres" class="mb-6">
			<VCardText>
				<VRow>
					<VCol cols="12" sm="4">
						<AppAutocomplete v-model="type_of_credit_id" placeholder="Type de crédit" item-title="full_name"
							item-value="id" :items="type_of_credit_list" clearable clear-icon="tabler-x" />
					</VCol>
				</VRow>
			</VCardText>

			<VDivider class="my-4" />

			<div class="d-flex flex-wrap gap-4 mx-5">
				<div class="d-flex align-center">
					<!-- 👉 Search  -->
					<AppTextField v-model="searchQuery" placeholder="Rechercher un pv" density="compact"
						style="inline-size: 200px" class="me-3" />
				</div>

				<VSpacer />
				<div class="d-flex gap-4 flex-wrap align-center">
					<!-- 👉 Export button -->
					<VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
						Export
					</VBtn>

					<VBtn v-if="$can('create', 'pv-notification')" color="primary" prepend-icon="tabler-plus"
						:to="{ name: 'pv-notification-add' }">
						Ajouter
					</VBtn>
					<VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh" @click="
						fetchPv();
					load(3);
					">
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
			<VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers"
				:items="pvList" :items-length="totalPv" class="text-no-wrap" @update:options="updateOptions">
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
							<IconBtn v-if="$can('read', 'pv-notification') || $can('historical', 'pv-notification')"
								:to="{ name: 'pv-notification-id', params: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Details
								</VTooltip>
								<VIcon icon=" tabler-eye" />
							</IconBtn>
							<IconBtn v-if="$can('download', 'pv-notification') && item.status == 'validated'" @click="
								downloadFile(
									`/api/verbal-trial/notification/download/${item.id}`,
									`notification-${item.committee_id} .pdf`
								)
								">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Télécharger
								</VTooltip>
								<VIcon icon="tabler-download" v-tooltip="'Ceci est une icône'" />
							</IconBtn>
						</div>
					</div>
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

		<VDialog v-model="isActionDialogVisible" class="v-dialog-sm">
			<!-- Dialog close btn -->
			<DialogCloseBtn @click="isActionDialogVisible = !isActionDialogVisible" />

			<!-- Dialog De suppression -->
			<VCard :title="actionTitle">
				<VCardText>
					{{ actionText }}

					<AppTextarea v-if="commentPresence" class="mt-3" v-model="actionComment" label="Commentaire"
						placeholder="Ex: RAS" />
				</VCardText>

				<VCardText class="d-flex justify-end gap-3 flex-wrap">
					<VBtn color="secondary" variant="tonal" @click="isActionDialogVisible = false">
						Annuler
					</VBtn>
					<VBtn @click="
						actionFunction(selectedItemId);
					isActionDialogVisible = false;
					">
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
