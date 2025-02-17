<!-- eslint-disable camelcase -->
<script setup>
import GuaranteeEdit from "@/views/pv/GuaranteeEdit.vue";
definePage({
	meta: {
		action: "check",
		subject: "pv-notification",
	},
});
const router = useRouter();
const route = useRoute("pv-notification-check-id");
let nextRoute = { name: "pv-notification-without-pv" };


const isActionDialogVisible = ref(false);
const actionTitle = ref("");
const actionText = ref("");
const actionButtonText = ref("");
const actionFunction = ref();
const actionComment = ref("");
const commentPresence = ref(false);
const actionStatus = ref("reject");

const civilityItemList = [
	{ value: "Mr", title: "Mr" },
	{ value: "Mme", title: "Mme" },
	{ value: "Mlle", title: "Mlle" },
];

const periodicityItemList = [
	{ value: "mensual", title: "Mensuelle" },
	{ value: "quarterly", title: "Trimestrielle" },
	{ value: "semi-annual", title: "Semestrielle" },
	{ value: "annual", title: "Annuelle" },
	{ value: "in-fine", title: "A la fin" },
];

const { data: typeOfCreditListData } = await useApi(
	createUrl("/type-of-credit", {
		query: {
			paginate: 0,
		},
	})
);

const typeOfCreditList = computed(() => typeOfCreditListData.value.data);

const { data: cafListData } = await useApi(
	createUrl("/user", {
		query: {
			paginate: 0,
			profile: "caf",
		},
	})
);

const cafList = computed(() => cafListData.value.data);

const { data: creditAdminListData } = await useApi(
	createUrl("/user", {
		query: {
			paginate: 0,
			profile: "credit_admin",
		},
	})
);

const creditAdminList = computed(() => creditAdminListData.value.data);

const { data: creditAnalystListData } = await useApi(
	createUrl("/user", {
		query: {
			paginate: 0,
			profile: "credit_analyst",
		},
	})
);

const creditAnalystList = computed(() => creditAnalystListData.value.data);

const getEmptyError = () => {
	return {
		committee_id: "",
		committee_date: "",
		caf_id: "",
		civility: "",
		applicant_first_name: "",
		applicant_last_name: "",
		account_number: "",
		activity: "",
		purpose_of_financing: "",
		type_of_credit_id: "",
		amount: "",
		duration: "",
		periodicity: "",
		administrative_fees_percentage: "",
		taf: "",
		tax_fee_interest_rate: "",
		credit_admin_id: "",
		credit_analyst_id: "",
		reserve: "",
		entity_name: "",
		release_type: "",
		risk_premium_percentage: "",
		has_line_review_bonus: "",
		number_deferred: "",
		has_insurance: "",
		representative_phone_number: "",
	};
};

const verbalTrialError = ref(getEmptyError());

const { data: verbalTrialData } = await useApi(
	createUrl(`/verbal-trial/${route.params.id}`, {
		query: {
			with_caf: 1,
			with_type_of_credit: 1,
			with_guarantees: 1,
		},
	})
);

var verbalTrial = ref(verbalTrialData.value.data.verbalTrial);

const refForm = ref();

const apiCheck = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api(`/verbal-trial/check/${route.params.id}`, {
				method: "PUT",
				body: {
					committee_id: verbalTrial.value.committee_id,
					committee_date: verbalTrial.value.committee_date,
					caf_id: verbalTrial.value.caf_id,
					civility: verbalTrial.value.civility,
					applicant_first_name: verbalTrial.value.applicant_first_name,
					applicant_last_name: verbalTrial.value.applicant_last_name,
					account_number: verbalTrial.value.account_number,
					activity: verbalTrial.value.activity,
					purpose_of_financing: verbalTrial.value.purpose_of_financing,
					type_of_credit_id: verbalTrial.value.type_of_credit_id,
					amount: verbalTrial.value.amount,
					duration: verbalTrial.value.duration,
					periodicity: verbalTrial.value.periodicity,
					insurance_premium: verbalTrial.value.insurance_premium,
					administrative_fees_percentage:
						verbalTrial.value.administrative_fees_percentage,
					taf: verbalTrial.value.taf,
					tax_fee_interest_rate: verbalTrial.value.tax_fee_interest_rate,
					guarantees: verbalTrial.value.guarantees,
					credit_admin_id: verbalTrial.value.credit_admin_id,
					credit_analyst_id: verbalTrial.value.credit_analyst_id,
					reserve: verbalTrial.value.reserve,
					entity_name: verbalTrial.value.entity_name,
					release_type: verbalTrial.value.release_type,
					risk_premium_percentage: verbalTrial.value.risk_premium_percentage,
					has_line_review_bonus: verbalTrial.value.has_line_review_bonus,
					number_deferred: verbalTrial.value.number_deferred,
					has_insurance: verbalTrial.value.has_insurance,
					action: actionStatus.value,
					comment: actionComment.value,
					representative_phone_number: verbalTrial.value.representative_phone_number,
				},
			});

			verbalTrialError.value = getEmptyError();
			if (res.status == 200) {
				if(actionStatus.value == "validate"){
					nextRoute = { name: 'pv' }
				}
				router.push(nextRoute);
			} else if (res.status == 403) {
				isSnackbarScrollReverseVisible.value = true;
				snackbarMessage.value = "";
				for (const key in res.errors) {
					res.errors[key].forEach((message) => {
						snackbarMessage.value += message + "\n";
					});
				}
			} else {
				for (const key in res.errors) {
					res.errors[key].forEach((message) => {
						verbalTrialError.value[key] += message + "\n";
					});
				}
			}

			actionComment.value = "";
			nextTick(() => {
				// refForm.value?.reset()
				// refForm.value?.resetValidation()
			});
		}
	});
};

const removeGuaranteeItem = (id) => {
	verbalTrial.value.guarantees.splice(id, 1);
};

const addGuaranteeItem = () => {
	verbalTrial.value.guarantees.push({
		type_of_guarantee_id: 1,
		expiration_date: "",
		value: "",
		comment: "",
	});
};

verbalTrial.value.guarantees.forEach((guarantee) => {
	if (guarantee.type_of_guarantee_id == 9) {
		nextRoute = "/pv/without-notification";
	}
});

const isSnackbarScrollReverseVisible = ref(false);
const snackbarMessage = ref("");
if (
	verbalTrial.value.applicant_first_name +
	" " +
	verbalTrial.value.applicant_last_name ==
	verbalTrial.value.entity_name
) {
	verbalTrial.value.entity_name = "";
}

</script>

<template>
	<VRow>
		<VCol cols="12" md="12">
			<VForm ref="refForm" @submit.prevent="apiCheck">
				<VRow>
					<VCol cols="11">
						<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
							Notifications
						</VBtn>
					</VCol>
					<VCol cols="1" class="text-right">
						<VBtn append-icon="tabler-eye"
							:to="{ name: 'pv-notification-id', params: { id: route.params.id } }">
							Voir
						</VBtn>
					</VCol>
				</VRow>
				<VRow>
					<VCol md="12">
						<!-- 👉 verbalTrial Information -->
						<VCard class="mb-6" title="Validation de la notification du caf">
							<VCardText>
								<VRow>
									<VCol>
										<VAlert v-if="
											verbalTrial.status == 'rejected' &&
											verbalTrial.comment
										" color="warning">
											Motif du refus : {{ verbalTrial.comment }}
										</VAlert>
									</VCol>
								</VRow>
								<VRow>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.committee_id" :error-messages="verbalTrialError.committee_id
											" label="Numéro du comitée" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.entity_name"
											:error-messages="verbalTrialError.entity_name" label="Nom de l'entitié" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.representative_phone_number"
											:error-messages="verbalTrialError.representative_phone_number"
											label="Numéro de téléphone" placeholder="Ex: +228 96 96 96 96"
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppDateTimePicker v-model="verbalTrial.committee_date" :error-messages="verbalTrialError.committee_date
											" label="Date du comitée" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppAutocomplete v-model="verbalTrial.credit_admin_id" :items="creditAdminList"
											:error-messages="verbalTrialError.credit_admin_id
												" label="Administrateur Crédit" placeholder="" item-title="full_name" item-value="id"
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppAutocomplete v-model="verbalTrial.credit_analyst_id"
											:items="creditAnalystList" :error-messages="verbalTrialError.credit_analyst_id
												" label="Analyste Crédit" placeholder="" item-title="full_name" item-value="id"
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppSelect v-model="verbalTrial.civility" :items="civilityItemList"
											:error-messages="verbalTrialError.civility" label="Civilité" placeholder=""
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.applicant_first_name" :error-messages="verbalTrialError.applicant_first_name
											" label="Prénom du demandeur" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.applicant_last_name" :error-messages="verbalTrialError.applicant_last_name
											" label="Nom du demandeur" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.account_number" :error-messages="verbalTrialError.account_number
											" label="Numéro de compte" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.activity"
											:error-messages="verbalTrialError.activity" label="Activé" placeholder=""
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="4">
										<AppTextField v-model="verbalTrial.purpose_of_financing" :error-messages="verbalTrialError.purpose_of_financing
											" label="Objet du financement" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="3">
										<AppAutocomplete v-model="verbalTrial.type_of_credit_id"
											:items="typeOfCreditList" :error-messages="verbalTrialError.type_of_credit_id
												" label="Type de credit" placeholder="" item-title="name" item-value="id" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="3">
										<AppTextField v-model="verbalTrial.amount" type="number"
											:error-messages="verbalTrialError.amount" label="Montant" placeholder=""
											:rules="[requiredValidator]" />
									</VCol>

									<VCol cols="12" md="6" lg="3">
										<AppSelect v-model="verbalTrial.has_line_review_bonus" :items="[
											{ value: 0, title: 'Sans la prime' },
											{ value: 1, title: 'Avec la prime' },
										]" :error-messages="verbalTrialError.has_line_review_bonus
												" label="Prime de révision de ligne" :rules="[requiredValidator]" />
									</VCol>

									<VCol cols="12" md="6" lg="3">
										<AppSelect v-model="verbalTrial.has_insurance" :items="[
											{ value: 0, title: 'Sans l\'assurance' },
											{ value: 1, title: 'Avec l\'assurance' },
										]" :error-messages="verbalTrialError.has_insurance
												" label="Assurance" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="3">
										<AppTextField v-model="verbalTrial.duration" type="number"
											:error-messages="verbalTrialError.duration" label="Durée du crédit en mois"
											placeholder="" min="0" append-inner-icon="tabler-calendar"
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="3">
										<AppTextField v-model="verbalTrial.number_deferred" type="number"
											:error-messages="verbalTrialError.number_deferred
												" label="Nombre de différé en mois" placeholder="" min="0" append-inner-icon="tabler-calendar"
											:rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="3">
										<AppSelect v-model="verbalTrial.periodicity" :items="periodicityItemList"
											:error-messages="verbalTrialError.periodicity" label="Periodicité"
											placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12" md="6" lg="3">
										<AppSelect v-model="verbalTrial.release_type" :items="[
											{
												value: 'non-progressive',
												title: 'Non Progressif',
											},
											{
												value: 'progressive',
												title: 'Progressif',
											},
										]" :error-messages="verbalTrialError.release_type
												" label="Type de deblocage" placeholder="" :rules="[requiredValidator]" />
									</VCol>
									<VCol cols="12">
										<VSlider v-model="verbalTrial.taf" label="TAF(%)"
											:error-messages="verbalTrialError.taf" :thumb-size="15" thumb-label="always"
											:rules="[requiredValidator]" step="0.01">
											<template #append readonly>
												<VTextField v-model="verbalTrial.taf"
													:error-messages="verbalTrialError.taf" type="number"
													style="width: 120px" density="compact" hide-details
													variant="outlined" suffix="%" />
											</template>
										</VSlider>
									</VCol>
									<VCol cols="12">
										<VSlider v-model="verbalTrial.administrative_fees_percentage
											" label="Frais de dossier(%)" :error-messages="verbalTrialError.administrative_fees_percentage
												" :thumb-size="15" thumb-label="always" :rules="[requiredValidator]" step="0.01">
											<template #append>
												<VTextField v-model="verbalTrial.administrative_fees_percentage
													" :error-messages="verbalTrialError.administrative_fees_percentage
														" type="number" style="width: 120px" density="compact" hide-details variant="outlined" suffix="%" />
											</template>
										</VSlider>
									</VCol>
									<VCol cols="12">
										<VSlider v-model="verbalTrial.tax_fee_interest_rate"
											label="Taux d'intérêt HT(%)" :error-messages="verbalTrialError.tax_fee_interest_rate
												" :thumb-size="15" thumb-label="always" :rules="[requiredValidator]" step="0.01">
											<template #append>
												<VTextField v-model="verbalTrial.tax_fee_interest_rate
													" :error-messages="verbalTrialError.tax_fee_interest_rate
														" type="number" style="width: 120px" density="compact" hide-details variant="outlined" suffix="%" />
											</template>
										</VSlider>
									</VCol>
									<VCol cols="12">
										<VSlider v-model="verbalTrial.risk_premium_percentage"
											label="Prime de risque (en pourcentage) du demandeur" :error-messages="verbalTrialError.risk_premium_percentage
												" :thumb-size="15" thumb-label="always" step="0.01">
											<template #append>
												<VTextField v-model="verbalTrial.risk_premium_percentage
													" :error-messages="verbalTrialError.risk_premium_percentage
														" type="number" style="width: 120px" density="compact" hide-details variant="outlined" suffix="%" />
											</template>
										</VSlider>
									</VCol>
									<VCol cols="12">
										<AppTextarea v-model="verbalTrial.reserve" rows="5" label="Reserve"
											placeholder="" />
									</VCol>
								</VRow>
							</VCardText>
						</VCard>
						<VCard class="mb-6" title="Information des cautions">
							<VCardText class="add-products-form">
								<div v-for="(guarantee, index) in verbalTrial.guarantees" class="my-4 ma-sm-4">
									<GuaranteeEdit :id="index" :data="guarantee"
										@remove-guarantee="removeGuaranteeItem" />
								</div>

								<div class="mt-4 ma-sm-4">
									<VBtn prepend-icon="tabler-plus" @click="addGuaranteeItem">
										Ajouter
									</VBtn>
								</div>
							</VCardText>
						</VCard>
					</VCol>
					<VCol cols="12">
						<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
							<div class="d-flex flex-column justify-center">
								<VBtn class="me-3" color="error"
									@click="(actionStatus = 'reject'), (actionTitle = 'Rejeter la notification'), (actionText = 'Voulez vous vraiment supprimer ce pv?'), (actionFunction = apiCheck); actionButtonText = 'Rejeter'; commentPresence = true; isActionDialogVisible = true;">
									Rejeter
									<VIcon end icon="tabler-checkbox" />
								</VBtn>
							</div>
							<div class="d-flex gap-4 align-center flex-wrap">
								<VBtn type="reset" variant="tonal" color="primary">
									<VIcon start icon="tabler-circle-minus" />
									Effacer
								</VBtn>
								<VBtn class="me-3" color="success"
									@click="(actionStatus = 'validate'), (actionTitle = 'Valider la notification'), (actionText = 'Voulez vous vraiment valider ce pv?'), (actionFunction = apiCheck); actionButtonText = 'Valider'; commentPresence = false; isActionDialogVisible = true;">
									Valider
									<VIcon end icon="tabler-checkbox" />
								</VBtn>
							</div>
						</div>
					</VCol>
				</VRow>
			</VForm>
		</VCol>
	</VRow>

	<VSnackbar v-model="isSnackbarScrollReverseVisible" transition="scroll-y-reverse-transition" location="bottom end"
		color="error">
		{{ snackbarMessage }}
	</VSnackbar>

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
					actionFunction();
				isActionDialogVisible = false;
				">
					{{ actionButtonText }}
				</VBtn>
			</VCardText>
		</VCard>
	</VDialog>
</template>
