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
    class="observations-container py-2"
  >
    <VChip
      v-if="hasUrgent"
      size="x-small"
      variant="flat"
      color="error"
      class="mb-1 font-weight-bold"
    >
      URGENT
    </VChip>
    <ObservationCard
      v-for="(observation, index) in decoratedObservations"
      :key="index"
      :observation="observation"
      :contract-id="contractId"
      @upload-contract="emit('uploadContract')"
      @upload-promissory-note="emit('uploadPromissoryNote')"
    />
  </div>
</template>

<style lang="scss" scoped>
.observations-container {
  min-inline-size: 260px;
  max-inline-size: 380px;
}
</style>
