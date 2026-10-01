<script setup>
import NotificationDetail from '@/views/notification/NotificationDetail.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'simple-notification',
  },
})

const router = useRouter()
const route = useRoute()

const { data: notification } = await useApi(createUrl(`/notification/${route.params.id}`, {
  query: {
    with_type_of_credit: 1,
    with_caf: 1,
    with_creator: 1,
    with_verbal_trial: 1,
    with_credit_analyst: 1,
    with_type_of_guarantees: 1,
  },
}))

if (notification.value.status == 200)
  notification.value = notification.value.data.notification
else
  router.push({ name: 'simple-notification' })
</script>

<template>
  <NotificationDetail
    v-if="notification"
    :notification="notification"
    route-prefix="simple-notification"
    title="Notification simplifiée"
  />
</template>
