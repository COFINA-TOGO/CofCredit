<script setup>
import { paginationMeta } from '@api-utils/paginationMeta'

/**
 * Pied de pagination commun des listes : choix du nombre de lignes par page,
 * « x à y sur z » et boutons Précédent / Suivant.
 *
 * Le nombre de pages vient de l'API (last_page) ou, à défaut, du total.
 */
const props = defineProps({
  page: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  totalItems: { type: Number, default: 0 },
  lastPage: { type: Number, default: null },
})

const emit = defineEmits(['update:page', 'update:itemsPerPage'])

// Choix proposés ; la taille par défaut de la page s'y ajoute si elle n'y est pas
const CHOICES = [10, 25, 50, 100]
const perPageChoices = computed(() => [...new Set([...CHOICES, props.itemsPerPage])].sort((a, b) => a - b))

// Changer la taille repart de la première page
const changePerPage = value => {
  emit('update:itemsPerPage', value)
  if (props.page !== 1)
    emit('update:page', 1)
}

const pageCount = computed(() => Math.max(1, props.lastPage ?? Math.ceil((props.totalItems || 0) / props.itemsPerPage)))
</script>

<template>
  <VDivider />

  <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
    <div class="d-flex align-center gap-3 flex-wrap">
      <div class="d-flex align-center gap-2">
        <span class="text-sm text-medium-emphasis">Lignes par page</span>
        <VSelect
          :model-value="itemsPerPage"
          :items="perPageChoices"
          density="compact"
          hide-details
          class="per-page"
          @update:model-value="changePerPage"
        />
      </div>
      <p class="text-sm text-medium-emphasis mb-0">
        {{ paginationMeta({ page, itemsPerPage }, totalItems || 0) }}
      </p>
    </div>

    <VPagination
      :model-value="page"
      :length="pageCount"
      :total-visible="$vuetify.display.xs ? 1 : Math.min(pageCount, 5)"
      @update:model-value="emit('update:page', $event)"
    >
      <template #prev="slotProps">
        <VBtn
          variant="tonal"
          color="default"
          v-bind="slotProps"
          :icon="false"
        >
          <VIcon
            start
            icon="tabler-arrow-left"
          />
          Précédent
        </VBtn>
      </template>

      <template #next="slotProps">
        <VBtn
          variant="tonal"
          color="default"
          v-bind="slotProps"
          :icon="false"
        >
          Suivant
          <VIcon
            end
            icon="tabler-arrow-right"
          />
        </VBtn>
      </template>
    </VPagination>
  </div>
</template>

<style scoped>
.per-page {
  max-inline-size: 90px;
  min-inline-size: 80px;
}
</style>
