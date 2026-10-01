<script setup>
import VerbalTrialDetail from '@/views/pv/VerbalTrialDetail.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'pv',
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
  router.push({ name: 'pv' })

const backRoute = verbalTrial.value.contract ? { name: 'pv-historical' } : { name: 'pv' }
</script>

<template>
  <VerbalTrialDetail
    v-if="verbalTrial"
    :verbal-trial="verbalTrial"
    title="Procès verbal"
    :back-route="backRoute"
  />
</template>
