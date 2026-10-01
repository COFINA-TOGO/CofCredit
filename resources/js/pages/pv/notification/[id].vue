<script setup>
import VerbalTrialDetail from '@/views/pv/VerbalTrialDetail.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'pv-notification',
  },
})

const router = useRouter()
const route = useRoute('pv-id')

const { data: verbalTrial } = await useApi(
  createUrl(`/verbal-trial/${Number(route.params.id)}`, {
    query: {
      with_caf: 1,
      with_credit_admin: 1,
      with_credit_analyst: 1,
      with_type_of_credit: 1,
      with_type_of_guarantees: 1,
    },
  }),
)

if (verbalTrial.value.status == 200)
  verbalTrial.value = verbalTrial.value.data.verbalTrial
else
  router.push({ name: 'pv-notification-without-pv' })

const backRoute = verbalTrial.value.validation_level == 'credit_analyst' ? { name: 'pv-notification-without-pv' } : { name: 'pv-notification-historical' }
</script>

<template>
  <VerbalTrialDetail
    v-if="verbalTrial"
    :verbal-trial="verbalTrial"
    title="Notification de CAF"
    :back-route="backRoute"
  />
</template>
