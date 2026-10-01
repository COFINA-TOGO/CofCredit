<!-- Fiche d'un CAT (conditions avant tirage) d'un contrat ou d'une notification -->
<script setup>
const props = defineProps({
  cat: { type: Object, required: true },
  editRoute: { type: String, required: true },
  backRoute: { type: Object, default: () => ({ name: 'cat' }) },
})

const parent = computed(() => props.cat.contract ?? props.cat.notification)
const verbalTrial = computed(() => parent.value?.verbal_trial ?? {})
const validation = computed(() => catValidationStatus[props.cat.validation_status] ?? catValidationStatus.waiting)
const unblock = computed(() => catUnblockStatus[props.cat.unblock_status] ?? catUnblockStatus.waiting)

const kpis = computed(() => [
  { label: 'Montant du crédit', value: formatAmount(verbalTrial.value.amount), icon: 'tabler-cash', color: 'primary' },
  { label: 'Garanties', value: formatAmount(props.cat.guarantees_total_amount), icon: 'tabler-shield-check', color: 'success' },
  { label: 'Dépôt de garantie', value: `${props.cat.security_deposit_percentage} %`, icon: 'tabler-percentage', color: 'info' },
  { label: 'Première échéance', value: formatDate(props.cat.first_deadline), icon: 'tabler-calendar-event', color: 'warning' },
  { label: 'Dernière échéance', value: formatDate(props.cat.last_deadline), icon: 'tabler-calendar-check', color: 'secondary' },
])

const items = computed(() => [
  { label: 'N° comité', value: verbalTrial.value.committee_id },
  { label: 'N° de prêt', value: props.cat.credit_number },
  { label: 'Client', value: verbalTrial.value.entity_name },
  { label: 'Secteur', value: props.cat.sector },
  { label: 'Source du remboursement', value: reimbursementSourceLabels[props.cat.source_of_reimbursement] },
  { label: 'Encours à solder', value: props.cat.outstanding_number_ready_to_settle },
  { label: 'Autres frais', value: formatAmount(props.cat.other_expenses) },
  { label: 'TEG', value: `${props.cat.teg} %` },
  { label: 'Instructions du département risque et crédit', value: props.cat.instructions_from_the_risk_and_credit_department, wide: true },
])
</script>

<template>
  <section>
    <AppPageHeader
      :title="`CAT ${verbalTrial.committee_id ?? ''}`"
      :subtitle="verbalTrial.entity_name"
      :back="backRoute"
    >
      <template #actions>
        <VChip
          :color="validation.color"
          label
        >
          {{ validation.text }}
        </VChip>
        <VChip
          v-if="cat.validation_status === 'validated'"
          :color="unblock.color"
          label
        >
          {{ unblock.text }}
        </VChip>
        <VBtn
          v-if="$can('update', 'cat') || $can('update', 'basic-cat')"
          prepend-icon="tabler-edit"
          :to="{ name: editRoute, params: { id: cat.id } }"
          :disabled="cat.validation_status === 'validated'"
        >
          Modifier
        </VBtn>
      </template>
    </AppPageHeader>

    <VAlert
      v-if="cat.validation_status === 'rejected' && cat.validation_comment"
      type="error"
      variant="tonal"
      class="mb-6"
      title="Motif du rejet de la validation"
      :text="cat.validation_comment"
    />
    <VAlert
      v-if="cat.unblock_status === 'rejected' && cat.unblock_comment"
      type="error"
      variant="tonal"
      class="mb-6"
      title="Motif du rejet du déblocage"
      :text="cat.unblock_comment"
    />

    <KpiStrip :items="kpis" />

    <VCard title="Conditions avant tirage">
      <VCardText>
        <InfoGrid :items="items" />
      </VCardText>
    </VCard>
  </section>
</template>
