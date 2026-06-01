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
  <VCard
    variant="tonal"
    :color="observation.color"
    class="observation-card"
    elevation="0"
  >
    <VCardText class="pa-3">
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center gap-3 flex-grow-1">
          <!-- Icône avec indicateur de priorité -->
          <div class="position-relative">
            <VAvatar
              :color="observation.color"
              variant="tonal"
              size="32"
            >
              <VIcon
                :icon="observation.icon"
                size="18"
              />
            </VAvatar>
            <VBadge
              v-if="observation.priority === 'high'"
              dot
              color="error"
              class="priority-badge"
            />
          </div>

          <!-- Contenu de l'observation -->
          <div class="flex-grow-1">
            <div class="d-flex align-center gap-2 mb-1">
              <span class="text-subtitle-2 font-weight-medium">
                {{ observation.title }}
              </span>
              <VChip
                size="x-small"
                variant="outlined"
                :color="observation.color"
                class="text-xs"
              >
                {{ observation.category }}
              </VChip>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ observation.text }}
            </p>
          </div>
        </div>

        <!-- Actions rapides -->
        <div
          v-if="observation.actionable"
          class="d-flex align-center gap-1 ml-2"
        >
          <!-- Action upload contrat -->
          <VBtn
            v-if="observation.actionType === 'upload_contract'"
            size="small"
            variant="tonal"
            :color="observation.color"
            prepend-icon="tabler-upload"
            @click="handleAction"
          >
            Upload
          </VBtn>

          <!-- Action upload billet à ordre -->
          <VBtn
            v-else-if="observation.actionType === 'upload_promissory_note'"
            size="small"
            variant="tonal"
            :color="observation.color"
            prepend-icon="tabler-upload"
            @click="handleAction"
          >
            Upload
          </VBtn>

          <!-- Action gérer les cautions -->
          <VBtn
            v-else-if="observation.category === 'guarantor'"
            size="small"
            variant="tonal"
            :color="observation.color"
            prepend-icon="tabler-users"
            :to="{
              name: 'contract-contract_id-guarantor',
              params: { contract_id: contractId },
            }"
          >
            Cautions
          </VBtn>

          <!-- Action créer CAT -->
          <VBtn
            v-else-if="observation.category === 'cat'"
            size="small"
            variant="tonal"
            :color="observation.color"
            prepend-icon="tabler-file-plus"
            :to="{
              name: 'cat-add',
              query: { id: contractId },
            }"
          >
            Créer CAT
          </VBtn>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.observation-card {
  border-left: 3px solid currentColor;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.priority-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 1;
}

.text-xs {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

.v-btn {
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>

