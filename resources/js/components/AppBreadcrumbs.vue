<script setup>
import { breadcrumbsFor } from '@/utils/breadcrumbs'

const route = useRoute()
const items = computed(() => breadcrumbsFor(route))
</script>

<template>
  <div
    v-if="items.length > 1"
    class="app-breadcrumbs d-flex flex-wrap align-center gap-1 mb-4 text-body-2"
  >
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <VIcon
        v-if="index > 0"
        icon="tabler-chevron-right"
        size="14"
        class="text-disabled"
      />
      <RouterLink
        v-if="item.to && index < items.length - 1"
        :to="item.to"
        class="text-medium-emphasis"
      >
        {{ item.title }}
      </RouterLink>
      <span
        v-else
        :class="index === items.length - 1 ? 'text-high-emphasis font-weight-medium' : 'text-medium-emphasis'"
      >
        {{ item.title }}
      </span>
    </template>
  </div>
</template>
