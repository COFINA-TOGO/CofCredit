<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: "read",
		subject: "user",
	},
});
const router = useRouter();
const route = useRoute("user-id");

const { data: user } = await useApi(
	createUrl(`/user/${route.params.id}`, {
		query: {},
	})
);

if (user.value.status == 200) {
	user.value = user.value.data.user;
} else {
	router.push("/user");
}

const tableData = [
	{ title: "Nom", value: user.value.full_name },
	{ title: "utisateur", value: user.value.name },
	{ title: "Email", value: user.value.email },
	{ title: "Profile", value: user.value.profile_fr },
	{
		title: "Activation",
		value: { true: "Actif", false: "Inactif" }[user.value.activated],
	},
	{
		title: "Changement de mot de passe",
		value: { true: "Obligatoire", false: "Facultatif" }[
			user.value.password_change_required
		],
	},
];
</script>

<template>
	<section v-if="user">
		<VRow>
			<VCol cols="12">
				<VCard>
					<VCardText
						class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg"
					>
						<VCol cols="10">
							<VBtn :to="{ name: 'user' }">
								<VIcon icon="tabler-arrow-left" />
								users
							</VBtn>
						</VCol>
						<VCol cols="2" class="text-right">
							<VBtn
								append-icon="tabler-edit"
								:to="{ name: 'user-edit-id', params: { id: user.id } }"
								:disabled="user.validation_status == 'validated'"
							>
								Modifier
							</VBtn>
						</VCol>
						<VCol cols="12">
							<h2 class="text-center">Utilisateur {{ user.name }}</h2>
						</VCol>
						<VCol cols="12">
							<h2>Informations:</h2>
						</VCol>
						<VCol cols="12">
							<VTable class="text-no-wrap">
								<tbody>
									<tr v-for="item in tableData" :key="item.key">
										<td colspan="5">
											{{ item.title }}
										</td>
										<td colspan="1">
											{{ item.value }}
										</td>
									</tr>
								</tbody>
							</VTable>
						</VCol>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
	</section>
</template>

<style lang="scss">
.invoice-preview-table {
	--v-table-row-height: 44px !important;
}

@media print {
	.v-theme--dark {
		--v-theme-surface: 255, 255, 255;
		--v-theme-on-surface: 94, 86, 105;
	}

	body {
		background: none !important;
	}

	@page {
		margin: 0;
		size: auto;
	}

	.layout-page-content,
	.v-row,
	.v-col-md-9 {
		padding: 0;
		margin: 0;
	}

	.product-buy-now {
		display: none;
	}

	.v-navigation-drawer,
	.layout-vertical-nav,
	.app-customizer-toggler,
	.layout-footer,
	.layout-navbar,
	.layout-navbar-and-nav-container {
		display: none;
	}

	.v-card {
		box-shadow: none !important;

		.print-row {
			flex-direction: row !important;
		}
	}

	.layout-content-wrapper {
		padding-inline-start: 0 !important;
	}

	.v-table__wrapper {
		overflow: hidden !important;
	}
}
</style>
