<!-- Composant pour afficher la liste des observations d'un contrat -->
<script setup>
import { computed } from 'vue'
import { useContractObservations } from '@/composables/useContractObservations'
import ObservationCard from './ObservationCard.vue'

const props = defineProps({
  observations: {
    type: Array,
    required: true,
  },
  contractId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['uploadContract', 'uploadPromissoryNote'])

const { decorateObservations, sortObservationsByPriority, hasHighPriority } = useContractObservations()

const decoratedObservations = computed(() => {
  return sortObservationsByPriority(decorateObservations(props.observations))
})

const hasUrgent = computed(() => {
  return hasHighPriority(decoratedObservations.value)
})
</script>

<template>
  <div
    v-if="observations.length > 0"
    class="observations-container"
  >
    <!-- Badge de résumé des observations -->
    <div class="d-flex align-center gap-2 mb-3">
      <VChip
        size="small"
        variant="tonal"
        color="error"
        prepend-icon="tabler-alert-triangle"
      >
        {{ observations.length }} observation{{ observations.length > 1 ? 's' : '' }}
      </VChip>

      <!-- Indicateur de priorité -->
      <VChip
        v-if="hasUrgent"
        size="x-small"
        variant="flat"
        color="error"
        class="text-xs font-weight-bold"
      >
        URGENT
      </VChip>
    </div>

    <!-- Liste des observations -->
    <div class="d-flex flex-column gap-2">
      <ObservationCard
        v-for="(observation, index) in decoratedObservations"
        :key="index"
        :observation="observation"
        :contract-id="contractId"
        @upload-contract="emit('uploadContract')"
        @upload-promissory-note="emit('uploadPromissoryNote')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.observations-container {
  min-width: 350px;
  max-width: 500px;
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-xs {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

// Responsive design
@media (max-width: 768px) {
  .observations-container {
    min-width: 280px;
    max-width: 320px;
  }
}
</style>

