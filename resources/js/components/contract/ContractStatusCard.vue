<!-- Composant pour afficher le statut d'un contrat -->
<script setup>
import { useContractObservations } from '@/composables/useContractObservations'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  statusObservation: {
    type: String,
    default: null,
  },
})

const { getStatusText, getStatusColor } = useContractObservations()
</script>

<template>
  <div class="status-container">
    <VCard
      variant="tonal"
      color="success"
      class="pa-3"
      elevation="0"
    >
      <div class="d-flex align-center gap-3">
        <VAvatar
          color="success"
          variant="tonal"
          size="32"
        >
          <VIcon
            icon="tabler-check"
            size="18"
          />
        </VAvatar>
        <div>
          <div class="text-subtitle-2 font-weight-medium text-success">
            Dossier complet
          </div>
          <VChip
            size="small"
            variant="flat"
            :color="getStatusColor(status)"
            class="mt-1"
          >
            <VTooltip
              v-if="statusObservation"
              activator="parent"
              transition="scroll-x-transition"
              location="start"
            >
              Raison: {{ statusObservation }}
            </VTooltip>
            {{ getStatusText(status) }}
          </VChip>
        </div>
      </div>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.status-container {
  min-width: 250px;
}
</style>

