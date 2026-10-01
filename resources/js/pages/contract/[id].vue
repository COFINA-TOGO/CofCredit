<!-- eslint-disable camelcase -->

<script setup>
definePage({
  meta: {
    action: 'read',
    subject: 'basic-contract',
  },
})

const router = useRouter()
const route = useRoute("contract-id")

const {
  data: contract,
} = await useApi(createUrl(`/contract/${route.params.id}`, {
  query: {
    with_type_of_credit: 1,
    with_caf: 1,
    with_type_of_guarantees: 1,
    with_pledges: 1,
    with_verbal_trial_credit_admin: 1,
    with_verbal_trial_credit_analyst: 1,
    with_c_a_t: 1,
  },
}))

if (contract.value.status == 200) {
  contract.value = contract.value.data.contract
} else {
  router.push({ name: 'contract' })
}

// Déterminer la route de retour selon la présence du CAT
const backRoute = contract.value.c_a_t
  ? { name: 'contract-historical' }
  : { name: 'contract' }

const verbalTrial = contract.value.verbal_trial
const status = contractStatus[contract.value.status] ?? { text: contract.value.status, color: 'secondary' }

// Motif du dernier rejet (validation finale ou ancien circuit)
const rejectionReason = contract.value.status === 'rejected'
  ? (contract.value.head_validation_comment || contract.value.status_observation)
  : null

const kpis = [
  { label: 'Montant', value: formatAmount(verbalTrial.amount), icon: 'tabler-cash', color: 'primary' },
  { label: 'Durée', value: `${verbalTrial.duration} mois`, icon: 'tabler-calendar-time', color: 'info' },
  { label: 'Montant d\'une échéance', value: formatAmount(contract.value.due_amount), icon: 'tabler-calendar-dollar', color: 'warning' },
  { label: 'Périodicité', value: periodicityLabels[verbalTrial.periodicity], icon: 'tabler-repeat', color: 'secondary' },
  { label: 'Différé', value: `${verbalTrial.number_deferred} mois`, icon: 'tabler-clock-pause', color: 'secondary' },
]

const dossierItems = [
  { label: 'Emprunteur', value: verbalTrial.entity_name },
  { label: 'N° de compte', value: verbalTrial.account_number },
  { label: 'Type de contrat', value: contract.value.type_fr },
  { label: 'Type de concours sollicité', value: verbalTrial.type_of_credit?.name },
  { label: 'CAF', value: verbalTrial.caf?.full_name },
  { label: 'Analyste crédit', value: verbalTrial.credit_analyst?.full_name },
  { label: 'Admin crédit', value: verbalTrial.credit_admin?.full_name },
  { label: 'Activité', value: verbalTrial.activity },
  { label: 'Objet du financement', value: verbalTrial.purpose_of_financing, wide: true },
]

const clientItems = [
  { label: 'Date de naissance', value: contract.value.representative_birth_date_fr },
  { label: 'Lieu de naissance', value: contract.value.representative_birth_place },
  { label: 'Nationalité', value: contract.value.representative_nationality },
  { label: 'Téléphone', value: contract.value.representative_phone_number },
  { label: 'Adresse du domicile', value: contract.value.representative_home_address, cols: 6 },
  { label: 'Pièce d\'identité', value: identityDocumentLabels[contract.value.representative_type_of_identity_document] },
  { label: 'N° de la pièce', value: contract.value.representative_number_of_identity_document },
  { label: 'Date de délivrance', value: formatDate(contract.value.representative_date_of_issue_of_identity_document) },
]

const conditionItems = [
  { label: 'Taux d\'intérêt HT', value: `${verbalTrial.tax_fee_interest_rate} %` },
  { label: 'TAF', value: `${verbalTrial.taf} %` },
  { label: `Frais de dossier (${verbalTrial.administrative_fees_percentage} %)`, value: formatAmount(verbalTrial.amount * verbalTrial.administrative_fees_percentage / 100) },
  { label: 'Prime de risque', value: `${verbalTrial.risk_premium_percentage} %` },
  { label: 'Type de déblocage', value: releaseTypeLabels[verbalTrial.release_type] },
  { label: 'Intérêts totaux', value: formatAmount(contract.value.total_amount_of_interest) },
  { label: 'Nombre d\'échéances', value: contract.value.number_of_due_dates },
  { label: 'Réserve de l\'analyste', value: verbalTrial.reserve, wide: true },
]
</script>

<template>
  <section v-if="contract">
    <AppPageHeader
      :title="`Contrat ${verbalTrial.committee_id}`"
      :subtitle="`${verbalTrial.entity_name} · ${contract.type_fr}`"
      :back="backRoute"
    >
      <template #actions>
        <VChip
          :color="status.color"
          label
        >
          {{ status.text }}
        </VChip>
        <VBtn
          variant="tonal"
          prepend-icon="tabler-users"
          :to="{ name: 'contract-contract_id-guarantor', params: { contract_id: contract.id } }"
        >
          Cautions ({{ contract.guarantors_count }})
        </VBtn>
        <VBtn
          v-if="$can('update', 'contract')"
          prepend-icon="tabler-edit"
          :to="{ name: 'contract-edit-id', params: { id: route.params.id } }"
          :disabled="contract.status == 'validated'"
        >
          Modifier
        </VBtn>
      </template>
    </AppPageHeader>

    <VAlert
      v-if="rejectionReason"
      type="error"
      variant="tonal"
      class="mb-6"
      title="Motif du rejet"
      :text="rejectionReason"
    />

    <KpiStrip :items="kpis" />

    <VCard
      title="Dossier"
      class="mb-6"
    >
      <VCardText>
        <InfoGrid :items="dossierItems" />
      </VCardText>
    </VCard>

    <VCard
      title="Client"
      subtitle="Informations du représentant figurant sur le contrat"
      class="mb-6"
    >
      <VCardText>
        <InfoGrid :items="clientItems" />
      </VCardText>
    </VCard>

    <VCard
      title="Conditions du crédit"
      class="mb-6"
    >
      <VCardText>
        <InfoGrid :items="conditionItems" />
      </VCardText>
    </VCard>

    <VRow>
      <VCol
        cols="12"
        :md="contract.has_pledges == '1' ? 6 : 12"
      >
        <VCard
          title="Garanties à recueillir"
          class="h-100"
        >
          <VList>
            <VListItem
              v-for="(item, index) in verbalTrial.guarantees"
              :key="index"
              prepend-icon="tabler-shield-check"
            >
              <VListItemTitle class="font-weight-medium">
                {{ item.type_of_guarantee.name }}
              </VListItemTitle>
              <div class="text-body-2 text-medium-emphasis text-pre-wrap">
                {{ item.comment }}
              </div>
            </VListItem>
            <VListItem v-if="!verbalTrial.guarantees.length">
              <VListItemTitle class="text-medium-emphasis">
                Aucune garantie
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCard>
      </VCol>
      <VCol
        v-if="contract.has_pledges == '1'"
        cols="12"
        md="6"
      >
        <VCard
          title="Gages"
          class="h-100"
        >
          <VList>
            <VListItem
              v-for="(item, index) in contract.pledges"
              :key="index"
              prepend-icon="tabler-car"
            >
              <VListItemTitle class="font-weight-medium">
                {{ pledgeTypeLabels[item.type] }}
              </VListItemTitle>
              <div class="text-body-2 text-medium-emphasis text-pre-wrap">
                {{ item.comment }}
              </div>
            </VListItem>
          </VList>
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
