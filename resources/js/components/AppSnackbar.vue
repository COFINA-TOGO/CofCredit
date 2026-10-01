<script setup>
import { snackbarState } from '@/utils/snackbar'
</script>

<template>
  <VSnackbar
    v-model="snackbarState.visible"
    transition="scale-transition"
    location="top end"
    :color="snackbarState.color"
  >
    <div class="text-pre-wrap">
      {{ snackbarState.message }}
    </div>
  </VSnackbar>
</template>
