<script setup>
import GuarantorDetail from '@/views/guarantor/GuarantorDetail.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'guarantor',
  },
})

const router = useRouter()
const route = useRoute('notification-notification_id-guarantor-id')

const { data: guarantor } = await useApi(`/guarantor/${route.params.id}`)

const listRoute = { name: 'notification-notification_id-guarantor', params: { notification_id: route.params.notification_id } }

if (guarantor.value.status == 200)
  guarantor.value = guarantor.value.data.guarantor
else
  router.push(listRoute)
</script>

<template>
  <GuarantorDetail
    v-if="guarantor"
    :guarantor="guarantor"
    :list-route="listRoute"
    :edit-route="{ name: 'notification-notification_id-guarantor-edit-id', params: { notification_id: route.params.notification_id, id: guarantor.id } }"
  />
</template>
