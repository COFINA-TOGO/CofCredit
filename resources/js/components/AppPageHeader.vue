<!-- En-tête de page : retour, titre, sous-titre et actions principales à droite -->
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },

  // Route de retour (objet ou chemin) ; true pour revenir à la page précédente
  back: { type: [Object, String, Boolean], default: null },
})

const router = useRouter()

const goBack = () => {
  if (props.back === true)
    router.back()
  else
    router.push(props.back)
}
</script>

<template>
  <VCard class="mb-6">
    <VCardText class="d-flex flex-wrap align-center gap-4">
      <IconBtn
        v-if="back"
        color="primary"
        @click="goBack"
      >
        <VIcon icon="tabler-arrow-left" />
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Retour
        </VTooltip>
      </IconBtn>
      <div class="flex-grow-1">
        <h4 class="text-h4">
          {{ title }}
        </h4>
        <div
          v-if="subtitle || $slots.subtitle"
          class="text-body-1 text-medium-emphasis mt-1"
        >
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </div>
      </div>
      <div
        v-if="$slots.actions"
        class="d-flex flex-wrap align-center gap-3"
      >
        <slot name="actions" />
      </div>
    </VCardText>
  </VCard>
</template>
