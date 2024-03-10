<!-- eslint-disable vue/no-mutating-props -->
<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      type: "vehicule",
      comment: "",
    }),
  },
})

const emit = defineEmits([
  'removePledge',
])

const typeOfPledgeList = [
  { value: 'vehicle', name: 'Véhicule' },
  { value: 'stock', name: 'Stock' },
]

const localPledgeData = ref(props.data)

const removePledge = () => {
  emit('removePledge', props.id)
}
</script>

<template>
  <VCard flat border class="d-flex flex-row">
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol cols="12">
          <AppSelect v-model="localPledgeData.type" :items="typeOfPledgeList" item-title="name" item-value="value"
            label="Type de Gage" placeholder="Choisir le type de gage" :rules="[requiredValidator]" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AppTextarea v-model="localPledgeData.comment" rows="2" label="Commentaire"
            placeholder="Entrer un commentaire du gage" />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <IconBtn @click="removePledge">
        <VIcon size="20" icon="tabler-x" />
      </IconBtn>
    </div>
  </VCard>
</template>
