<!-- Export Excel de la liste telle qu'elle est filtrée à l'écran (toutes les pages) -->
<script setup>
const props = defineProps({
  // Point d'entrée de la liste (/verbal-trial, /contract...)
  endpoint: { type: String, required: true },

  // Début du nom du fichier
  name: { type: String, required: true },
})

const loading = ref(false)

const exportList = async () => {
  loading.value = true
  try {
    await downloadListExport(props.endpoint, props.name)
    showSnackbar('success', 'Export en cours de téléchargement')
  } catch (error) {
    showSnackbar('error', errorMessage(error, 'Export impossible'))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VBtn
    variant="tonal"
    color="secondary"
    prepend-icon="tabler-file-spreadsheet"
    :loading="loading"
    @click="exportList"
  >
    Exporter
  </VBtn>
</template>
