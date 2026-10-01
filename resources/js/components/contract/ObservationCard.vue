<!-- Composant pour afficher une carte d'observation -->
<script setup>
const props = defineProps({
  observation: {
    type: Object,
    required: true,
  },
  contractId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['uploadContract', 'uploadPromissoryNote'])

/**
 * Gère l'action de l'observation
 */
const handleAction = () => {
  switch (props.observation.actionType) {
  case 'upload_contract':
    emit('uploadContract')
    break
  case 'upload_promissory_note':
    emit('uploadPromissoryNote')
    break
  default:
    break
  }
}
</script>

<template>
  <div
    class="observation-row d-flex align-center gap-2"
    :class="`text-${observation.color}`"
  >
    <VIcon
      :icon="observation.icon"
      size="18"
    />
    <span class="text-body-2 text-high-emphasis flex-grow-1">
      {{ observation.title }}
      <VTooltip
        v-if="observation.text && observation.text !== observation.title"
        activator="parent"
        location="top"
        max-width="320"
      >
        {{ observation.text }}
      </VTooltip>
    </span>

    <!-- Action rapide -->
    <template v-if="observation.actionable || ['guarantor', 'cat'].includes(observation.category)">
      <VBtn
        v-if="['upload_contract', 'upload_promissory_note'].includes(observation.actionType)"
        size="x-small"
        variant="tonal"
        :color="observation.color"
        prepend-icon="tabler-upload"
        @click="handleAction"
      >
        Charger
      </VBtn>
      <VBtn
        v-else-if="observation.category === 'guarantor'"
        size="x-small"
        variant="tonal"
        :color="observation.color"
        prepend-icon="tabler-users"
        :to="{ name: 'contract-contract_id-guarantor', params: { contract_id: contractId } }"
      >
        Cautions
      </VBtn>
      <VBtn
        v-else-if="observation.category === 'cat'"
        size="x-small"
        variant="tonal"
        :color="observation.color"
        prepend-icon="tabler-file-plus"
        :to="{ name: 'cat-add', query: { id: contractId } }"
      >
        Créer CAT
      </VBtn>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.observation-row {
  min-block-size: 28px;
}
</style>
