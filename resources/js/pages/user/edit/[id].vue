<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: "update",
		subject: "user",
	},
});
const router = useRouter();
const route = useRoute("user-edit-id");
let nextRoute = "/user";

const getEmptyError = () => {
	return {
		full_name: "",
		email: "",
		password: "",
		profile: "",
		activated: "",
		password_change_required: "",
	};
};

const userError = ref(getEmptyError());

const { data: userData } = await useApi(
	createUrl(`/user/${route.params.id}`, {
		query: {},
	})
);
const user = ref(userData.value.data.user);

const refForm = ref();

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api(`/user/${route.params.id}`, {
				method: "PUT",
				body: {
					full_name: user.value.full_name,
					email: user.value.email,
					password: user.value.password,
					profile: user.value.profile,
					activated: user.value.activated,
					password_change_required: user.value.password_change_required,
				},
			});

			userError.value = getEmptyError();
			if (res.status == 200) {
				router.push(nextRoute);
			} else {
				if (res.errors.full_name) {
					userError.value["full_name"] = res.errors.full_name[0];
					res.errors.full_name = null;
				}
				if (res.errors.email) {
					userError.value["email"] = res.errors.email[0];
					res.errors.email = null;
				}
				if (res.errors.password) {
					userError.value["password"] = res.errors.password[0];
					res.errors.password = null;
				}
				if (res.errors.profile) {
					userError.value["profile"] = res.errors.profile[0];
					res.errors.profile = null;
				}
				if (res.errors.activated) {
					userError.value["activated"] = res.errors.activated[0];
					res.errors.activated = null;
				}
				if (res.errors.password_change_required) {
					userError.value["password_change_required"] =
						res.errors.password_change_required[0];
					res.errors.password_change_required = null;
				}
				snackbarMessage.value = "";
				let show = false;
				for (const key in res.errors) {
					if (res.errors[key] != null) {
						snackbarCollor.value = "error";
						res.errors[key].forEach((message) => {
							show = true;
							snackbarMessage.value += key + ": " + message + "<br>";
						});
					}
				}
				isSnackbarScrollReverseVisible.value = show;
			}
			nextTick(() => {
				// refForm.value?.reset()
				// refForm.value?.resetValidation()
			});
		}
	});
};

const { data: agencyListData } = await useApi(
	createUrl(`/agency`, {
		query: {
			paginate: "false",
		},
	})
);

const isSnackbarScrollReverseVisible = ref(false);
const snackbarMessage = ref("");
const snackbarCollor = ref("success");
const agencyList = computed(() => agencyListData.value.data);
const isPasswordVisible = ref(false);
</script>

<template>
	<VRow>
		<VCol cols="12" md="12">
			<VForm ref="refForm" @submit.prevent="onSubmit">
				<VRow>
					<VCol cols="11">
						<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
							Utilisateurs
						</VBtn>
					</VCol>
					<VCol cols="1" class="text-right">
						<VBtn
							append-icon="tabler-eye"
							:to="{
								full_name: 'user-id',
								params: { id: route.params.id },
							}"
						>
							Voir
						</VBtn>
					</VCol>
				</VRow>
				<VRow>
					<VCol md="12">
						<!-- 👉 creditCard Information -->
						<VCard class="mb-6" title="Modification du user de comité">
							<VCardText>
								<VRow>
									<VCol cols="12" md="12" lg="6">
										<AppTextField
											v-model="user.full_name"
											:error-messages="userError.full_name"
											label="Nom"
										/>
									</VCol>

									<VCol cols="12" md="12" lg="6">
										<AppSelect
											v-model="user.profile"
											:items="[
												{ name: 'Administrateur', id: 'admin' },
												{
													name: 'Analyste Crédit',
													id: 'credit_analyst',
												},
												{
													name: 'Admin Crédit',
													id: 'credit_admin',
												},
												{
													name: 'Head Crédit',
													id: 'head_credit',
												},
												{
													name: 'Opération',
													id: 'operation',
												},
												{
													name: 'Juriste',
													id: 'legal',
												},
												{
													name: 'DEX',
													id: 'dex',
												},
												{
													name: 'Chargé d\'affaire',
													id: 'caf',
												},
												{
													name: 'Chef ',
													id: 'ca',
												},
												{
													name: 'MD',
													id: 'md',
												},
												{
													name: 'Courrier',
													id: 'courier',
												},
											]"
											:error-messages="userError.profile"
											label="Profile"
											item-title="name"
											item-value="id"
											required
										/>
									</VCol>
									<VCol cols="12" md="12" lg="6">
										<AppSelect
											v-model="user.activated"
											:items="[
												{ name: 'Activé', id: true },
												{ name: 'Désactivé', id: false },
											]"
											:error-messages="userError.activated"
											label="Activation"
											item-title="name"
											item-value="id"
											required
										/>
									</VCol>
									<VCol cols="12" md="12" lg="6">
										<AppSelect
											v-model="user.password_change_required"
											:items="[
												{ name: 'Obligatoire', id: true },
												{ name: 'Facultatif', id: false },
											]"
											:error-messages="
												userError.password_change_required
											"
											label="Changement de mot de passe"
											item-title="name"
											item-value="id"
											required
										/>
									</VCol>
									<VCol cols="12" md="12" lg="12">
										<AppTextField
											v-model="user.email"
											:error-messages="userError.email"
											type="email"
											label="Email"
										/>
									</VCol>

									<VCol cols="12" md="12" lg="12">
										<AppTextField
											v-model="user.password"
											label="Password"
											placeholder="············"
											:type="
												isPasswordVisible ? 'text' : 'password'
											"
											:error-messages="userError.password"
											:append-inner-icon="
												isPasswordVisible
													? 'tabler-eye-off'
													: 'tabler-eye'
											"
											@click:append-inner="
												isPasswordVisible = !isPasswordVisible
											"
											class="mb-8"
										/>
									</VCol>
								</VRow>
							</VCardText>
						</VCard>
					</VCol>
					<VCol cols="12">
						<div
							class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"
						>
							<div class="d-flex flex-column justify-center" />
							<div class="d-flex gap-4 align-center flex-wrap">
								<VBtn type="reset" variant="tonal" color="primary">
									<VIcon start icon="tabler-circle-minus" />
									Effacer
								</VBtn>
								<VBtn type="submit" class="me-3">
									Enregistrer
									<VIcon end icon="tabler-checkbox" />
								</VBtn>
							</div>
						</div>
					</VCol>
				</VRow>
			</VForm>
		</VCol>
	</VRow>

	<VSnackbar
		v-model="isSnackbarScrollReverseVisible"
		transition="scale-transition"
		location="top end"
		:color="snackbarCollor"
	>
		{{ snackbarMessage }}
	</VSnackbar>
</template>
