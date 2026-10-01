<!-- Fiche d'une notification (hypothécaire ou simplifiée) -->
<script setup>
const props = defineProps({
  notification: { type: Object, required: true },

  // Préfixe des routes : 'notification' ou 'simple-notification'
  routePrefix: { type: String, required: true },
  title: { type: String, required: true },
})

const n = computed(() => props.notification)
const pv = computed(() => n.value.verbal_trial ?? {})

const headValidation = computed(() => ({
  waiting: { text: 'En attente du Head Crédit', color: 'warning' },
  validated: { text: 'Validée par le Head Crédit', color: 'success' },
  rejected: { text: 'Rejetée par le Head Crédit', color: 'error' },
}[n.value.head_credit_validation] ?? { text: n.value.head_credit_validation, color: 'secondary' }))

// Liste d'origine : en attente du Head, sans document signé, ou historique
const backRoute = computed(() => {
  if (n.value.head_credit_validation !== 'validated')
    return { name: props.routePrefix }
  if (n.value.status === 'validated')
    return { name: `${props.routePrefix}-historical` }

  return { name: props.routePrefix === 'notification' ? 'notification-without-signed-contract' : 'simple-notification-without-signed-notification' }
})

const kpis = computed(() => [
  { label: 'Montant', value: formatAmount(pv.value.amount), icon: 'tabler-cash', color: 'primary' },
  { label: 'Durée', value: `${pv.value.duration} mois`, icon: 'tabler-calendar-time', color: 'info' },
  { label: 'Périodicité', value: periodicityLabels[pv.value.periodicity], icon: 'tabler-repeat', color: 'secondary' },
  { label: 'Nombre d\'échéances', value: n.value.number_of_due_dates, icon: 'tabler-list-numbers', color: 'secondary' },
  { label: 'Montant d\'une échéance', value: formatAmount(n.value.due_amount), icon: 'tabler-calendar-dollar', color: 'warning' },
])

const dossierItems = computed(() => [
  { label: 'Emprunteur', value: pv.value.entity_name },
  { label: 'Demandeur', value: pv.value.applicant_full_name },
  { label: 'N° de compte', value: pv.value.account_number },
  { label: 'Type de notification', value: { company: 'Société', individual_business: 'Entreprise individuelle', particular: 'Particulier' }[n.value.type] },
  { label: 'Type de concours sollicité', value: pv.value.type_of_credit?.name },
  { label: 'CAF', value: pv.value.caf?.full_name },
  { label: 'Analyste crédit', value: pv.value.credit_analyst?.full_name },
  { label: 'Créée par', value: n.value.creator?.full_name },
  { label: 'Activité', value: pv.value.activity, cols: 6 },
  { label: 'Objet du financement', value: pv.value.purpose_of_financing, cols: 6 },
])

const clientItems = computed(() => [
  { label: 'Téléphone', value: n.value.representative_phone_number },
  { label: 'Adresse', value: n.value.representative_home_address, cols: 9 },
  { label: 'Pièce d\'identité', value: identityDocumentLabels[n.value.representative_type_of_identity_document] },
  { label: 'N° de la pièce', value: n.value.representative_number_of_identity_document },
  { label: 'Date de délivrance', value: formatDate(n.value.representative_date_of_issue_of_identity_document) },
])

const conditionItems = computed(() => [
  { label: 'Taux d\'intérêt HT', value: `${pv.value.tax_fee_interest_rate} %` },
  { label: 'TAF', value: `${pv.value.taf} %` },
  { label: 'Frais de dossier', value: formatAmount(pv.value.amount * pv.value.administrative_fees_percentage / 100) },
  { label: 'Prime de risque', value: `${pv.value.risk_premium_percentage} %` },
  { label: 'Intérêts totaux', value: formatAmount(n.value.total_amount_of_interest) },
  { label: 'Prime d\'assurance', value: pv.value.has_insurance ? 'Selon la grille de l\'assureur' : 'Non' },
  { label: 'Prime de révision de ligne', value: pv.value.has_line_review_bonus ? '1 % du capital restant dû après 12 mois' : 'Non' },
])
</script>

<template>
  <section>
    <AppPageHeader
      :title="`${title} ${pv.committee_id}`"
      :subtitle="pv.entity_name"
      :back="backRoute"
    >
      <template #actions>
        <VChip
          :color="headValidation.color"
          label
        >
          {{ headValidation.text }}
        </VChip>
        <VBtn
          variant="tonal"
          prepend-icon="tabler-users"
          :to="{ name: `${routePrefix}-notification_id-guarantor`, params: { notification_id: n.id } }"
        >
          Cautions ({{ n.guarantors_count }})
        </VBtn>
        <VBtn
          v-if="$can('update', routePrefix)"
          prepend-icon="tabler-edit"
          :to="{ name: `${routePrefix}-edit-id`, params: { id: n.id } }"
          :disabled="n.status === 'validated'"
        >
          Modifier
        </VBtn>
      </template>
    </AppPageHeader>

    <VAlert
      v-if="n.head_credit_validation === 'rejected' && n.head_credit_observation"
      type="error"
      variant="tonal"
      class="mb-6"
      title="Motif du rejet par le Head Crédit"
      :text="n.head_credit_observation"
    />
    <VAlert
      v-if="n.status === 'rejected' && n.status_observation"
      type="error"
      variant="tonal"
      class="mb-6"
      title="Motif du rejet des documents"
      :text="n.status_observation"
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

    <VCard title="Garanties à recueillir">
      <VList>
        <VListItem
          v-for="(item, index) in pv.guarantees"
          :key="index"
          prepend-icon="tabler-shield-check"
        >
          <VListItemTitle class="font-weight-medium">
            {{ item.type_of_guarantee?.name }}
          </VListItemTitle>
          <div class="text-body-2 text-medium-emphasis text-pre-wrap">
            {{ item.comment }}
          </div>
        </VListItem>
      </VList>
    </VCard>
  </section>
</template>
