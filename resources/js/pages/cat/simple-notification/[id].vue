<script setup>
import CatDetail from '@/views/cat/CatDetail.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'cat',
  },
})

const router = useRouter()
const route = useRoute('cat-id')

const { data: cat } = await useApi(createUrl(`/cat/${route.params.id}`, {
  query: {
    with_verbal_trial: 1,
  },
}))

if (cat.value.status == 200)
  cat.value = cat.value.data.c_a_t
else
  router.push({ name: 'cat-simple-notification' })
</script>

<template>
  <CatDetail
    v-if="cat"
    :cat="cat"
    edit-route="cat-simple-notification-edit-id"
    :back-route="{ name: 'cat-simple-notification' }"
  />
</template>
