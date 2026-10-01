<!-- Fiche d'un PV de comité (ou d'une notification de CAF) : en-tête, chiffres clés, dossier, conditions et garanties -->
<script setup>
const props = defineProps({
  verbalTrial: { type: Object, required: true },
  title: { type: String, required: true },
  backRoute: { type: Object, required: true },
})

const pv = computed(() => props.verbalTrial)
const status = computed(() => verbalTrialStatus[pv.value.status] ?? { text: pv.value.status, color: 'secondary' })
const canEdit = computed(() => pv.value.status === 'rejected' || (pv.value.status === 'waiting' && pv.value.validation_level === 'credit_admin'))

const kpis = computed(() => [
  { label: 'Montant', value: formatAmount(pv.value.amount), icon: 'tabler-cash', color: 'primary' },
  { label: 'Durée', value: `${pv.value.duration} mois`, icon: 'tabler-calendar-time', color: 'info' },
  { label: 'Périodicité', value: periodicityLabels[pv.value.periodicity], icon: 'tabler-repeat', color: 'secondary' },
  { label: 'Différé', value: `${pv.value.number_deferred} mois`, icon: 'tabler-clock-pause', color: 'secondary' },
  { label: 'Date du comité', value: formatDate(pv.value.committee_date), icon: 'tabler-calendar-event', color: 'warning' },
])

const dossierItems = computed(() => [
  { label: 'Emprunteur', value: pv.value.entity_name },
  { label: 'Demandeur', value: `${pv.value.civility ?? ''} ${pv.value.applicant_full_name ?? ''}`.trim() },
  { label: 'N° de compte', value: pv.value.account_number },
  { label: 'Téléphone', value: pv.value.representative_phone_number },
  { label: 'Type de concours sollicité', value: pv.value.type_of_credit?.name },
  { label: 'CAF', value: pv.value.caf?.full_name },
  { label: 'Analyste crédit', value: pv.value.credit_analyst?.full_name },
  { label: 'Admin crédit', value: pv.value.credit_admin?.full_name },
  { label: 'Activité', value: pv.value.activity, cols: 6 },
  { label: 'Objet du financement', value: pv.value.purpose_of_financing, cols: 6 },
])

const conditionItems = computed(() => [
  { label: 'Taux d\'intérêt HT', value: `${pv.value.tax_fee_interest_rate} %` },
  { label: 'TAF', value: `${pv.value.taf} %` },
  { label: `Frais de dossier (${pv.value.administrative_fees_percentage} %)`, value: formatAmount(pv.value.amount * pv.value.administrative_fees_percentage / 100) },
  { label: 'Prime de risque', value: `${pv.value.risk_premium_percentage} %` },
  { label: 'Type de déblocage', value: releaseTypeLabels[pv.value.release_type] },
  { label: 'Prime de révision de ligne', value: pv.value.has_line_review_bonus ? '1 % du capital restant dû après 12 mois' : 'Non' },
  { label: 'Prime d\'assurance', value: pv.value.has_insurance ? 'Selon la grille de l\'assureur' : 'Non' },
  { label: 'Réserve', value: pv.value.reserve, wide: true },
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
          :color="status.color"
          label
        >
          {{ status.text }}
          <template v-if="pv.status === 'waiting' && validationLevelLabels[pv.validation_level]">
            · niveau {{ validationLevelLabels[pv.validation_level] }}
          </template>
        </VChip>
        <VBtn
          v-if="$can('update', 'pv') && canEdit"
          prepend-icon="tabler-edit"
          :to="{ name: 'pv-edit-id', params: { id: pv.id } }"
        >
          Modifier
        </VBtn>
      </template>
    </AppPageHeader>

    <VAlert
      v-if="pv.status === 'rejected' && pv.comment"
      type="error"
      variant="tonal"
      class="mb-6"
      title="Motif du rejet"
      :text="pv.comment"
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
        <VListItem v-if="!pv.guarantees?.length">
          <VListItemTitle class="text-medium-emphasis">
            Aucune garantie
          </VListItemTitle>
        </VListItem>
      </VList>
    </VCard>
  </section>
</template>
