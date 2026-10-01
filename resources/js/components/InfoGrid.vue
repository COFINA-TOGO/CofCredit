<!-- Grille de champs en lecture : petit libellé en majuscules au-dessus de la valeur items : [{ label, value, cols?, chip?: { color }, wide?: boolean }] -->
<script setup>
defineProps({
  items: { type: Array, required: true },
})

const isEmpty = value => value === null || value === undefined || value === ''
</script>

<template>
  <VRow>
    <VCol
      v-for="item in items"
      :key="item.label"
      cols="12"
      :sm="item.wide ? 12 : 6"
      :md="item.wide ? 12 : (item.cols ?? 3)"
    >
      <div class="text-overline text-medium-emphasis lh-1 mb-1">
        {{ item.label }}
      </div>
      <VChip
        v-if="item.chip && !isEmpty(item.value)"
        :color="item.chip.color"
        label
        size="small"
      >
        {{ item.value }}
      </VChip>
      <div
        v-else
        class="text-body-1 text-high-emphasis text-pre-wrap text-break"
      >
        {{ isEmpty(item.value) ? '—' : item.value }}
      </div>
    </VCol>
  </VRow>
</template>
