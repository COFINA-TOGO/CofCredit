<!--
  Historique d'un dossier : décisions sur le PV, le contrat, la notification et le CAT qui en découlent,
  avec leur auteur (et l'intérim éventuel), leur date et leur motif.
-->
<script setup>
const props = defineProps({
  // verbal-trial, contract, notification ou cat
  subject: { type: String, required: true },
  id: { type: [Number, String], required: true },
})

const ACTIONS = {
  created: { label: 'Création', icon: 'tabler-plus', color: 'secondary' },
  submitted: { label: 'Envoyé en validation', icon: 'tabler-send', color: 'info' },
  resubmitted: { label: 'Corrigé et renvoyé en validation', icon: 'tabler-refresh', color: 'info' },
  checked: { label: 'Vérifié par l\'analyste', icon: 'tabler-checklist', color: 'info' },
  sent: { label: 'Dossier envoyé', icon: 'tabler-send', color: 'info' },
  validated: { label: 'Validé', icon: 'tabler-check', color: 'success' },
  rejected: { label: 'Rejeté', icon: 'tabler-x', color: 'error' },
  sent_back: { label: 'Renvoyé à l\'admin crédit', icon: 'tabler-arrow-back-up', color: 'warning' },
  unblocked: { label: 'Débloqué', icon: 'tabler-lock-open', color: 'success' },
  unblock_rejected: { label: 'Déblocage refusé', icon: 'tabler-lock', color: 'error' },
  document_uploaded: { label: 'Document signé chargé', icon: 'tabler-file-upload', color: 'primary' },
  status_changed: { label: 'Changement d\'état', icon: 'tabler-arrows-exchange', color: 'secondary' },
  deleted: { label: 'Suppression', icon: 'tabler-trash', color: 'error' },
}

const SUBJECTS = {
  'verbal-trial': 'PV',
  'contract': 'Contrat',
  'notification': 'Notification',
  'cat': 'CAT',
}

const activities = ref([])
const loading = ref(true)

const fetchActivities = async () => {
  loading.value = true

  const res = await $api(createUrl('/activity', { query: { subject: props.subject, id: props.id } }).value).catch(() => null)

  activities.value = res?.status == 200 ? res.data.activities : []
  loading.value = false
}

watch(() => [props.subject, props.id], fetchActivities, { immediate: true })

const action = activity => ACTIONS[activity.action] ?? { label: activity.action, icon: 'tabler-point', color: 'secondary' }
</script>

<template>
  <VCard
    title="Historique du dossier"
    subtitle="Décisions sur le PV, le contrat, la notification et le CAT"
    class="mt-6"
  >
    <VCardText>
      <VProgressLinear
        v-if="loading"
        indeterminate
        color="primary"
      />
      <p
        v-else-if="!activities.length"
        class="text-medium-emphasis mb-0"
      >
        Aucune décision enregistrée pour l'instant.
      </p>
      <VTimeline
        v-else
        side="end"
        align="start"
        line-inset="8"
        truncate-line="both"
        density="compact"
      >
        <VTimelineItem
          v-for="activity in activities"
          :key="activity.id"
          :dot-color="action(activity).color"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-1">
            <div class="d-flex align-center gap-2">
              <VIcon
                :icon="action(activity).icon"
                :color="action(activity).color"
                size="18"
              />
              <span class="font-weight-medium">{{ action(activity).label }}</span>
              <VChip
                size="x-small"
                label
              >
                {{ SUBJECTS[activity.subject_type] ?? activity.subject_type }}
              </VChip>
            </div>
            <span class="text-sm text-disabled">{{ activity.created_at_fr }}</span>
          </div>
          <p class="text-sm text-medium-emphasis mb-1">
            par {{ activity.user?.full_name ?? 'le système' }}
            <span v-if="activity.user">({{ activity.user.profile_fr }})</span>
            <span v-if="activity.on_behalf_of"> · en intérim de {{ activity.on_behalf_of.full_name }}</span>
          </p>
          <blockquote
            v-if="activity.comment"
            class="dossier-timeline__comment text-body-2"
          >
            {{ activity.comment }}
          </blockquote>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

<style scoped>
.dossier-timeline__comment {
  border-inline-start: 3px solid rgba(var(--v-theme-on-surface), 0.12);
  padding-inline-start: 0.75rem;
  white-space: pre-wrap;
}
</style>
