<script setup>
import GuarantorDetail from '@/views/guarantor/GuarantorDetail.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'guarantor',
  },
})

const router = useRouter()
const route = useRoute('contract-contract_id-guarantor-id')

const { data: guarantor } = await useApi(`/guarantor/${route.params.id}`)

const listRoute = { name: 'contract-contract_id-guarantor', params: { contract_id: route.params.contract_id } }

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
    :edit-route="{ name: 'contract-contract_id-guarantor-edit-id', params: { contract_id: route.params.contract_id, id: guarantor.id } }"
  />
</template>
