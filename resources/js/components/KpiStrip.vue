<!-- Bande de chiffres clés : items = [{ label, value, icon, color }] -->
<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <VRow>
        <VCol
          v-for="item in items"
          :key="item.label"
          cols="6"
          md
        >
          <div class="d-flex align-center gap-3">
            <VAvatar
              :color="item.color ?? 'primary'"
              variant="tonal"
              rounded
              size="40"
            >
              <VIcon
                :icon="item.icon"
                size="24"
              />
            </VAvatar>
            <div>
              <div class="text-caption text-medium-emphasis">
                {{ item.label }}
              </div>
              <div class="text-body-1 font-weight-medium text-high-emphasis">
                {{ item.value }}
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
