<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      type_of_guarantee_id: 1,
      expiration_date: "",
      value: "",
      comment: "",
    }),
  },
})

const emit = defineEmits([
  'removeGuarantee',
])

const {
  data: type_of_guarantee_list_api,
} = await useApi(createUrl('/type-of-guarantee', {
  query: {
    paginate: 0,
  },
}))

const typeOfGuaranteeList = computed(() => type_of_guarantee_list_api.value.data)


const localGuaranteeData = ref(props.data)

const removeGuarantee = () => {
  emit('removeGuarantee', props.id)
}
</script>

<template>
  <VCard flat border class="d-flex flex-row">
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol cols="12" md="6" lg="4">
          <AppSelect v-model="localGuaranteeData.type_of_guarantee_id" :items="typeOfGuaranteeList" item-title="name"
            item-value="id" label="Type de cautionie" placeholder="Choisir le type de cautionie" class="mb-3"
            :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12" md="6" lg="4">
          <AppDateTimePicker v-model="localGuaranteeData.expiration_date" label="Date d'expiration"
            placeholder="Selectionner la date d'expiration" class="mb-3" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12" lg="4">
          <AppTextField type="number" v-model="localGuaranteeData.value" label="Valeur"
            placeholder="Entrer la valeur de la garantie" class="mb-3" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AppTextarea v-model="localGuaranteeData.comment" rows="2" label="Commentaire"
            placeholder="Entrer un commentaire sur la garantie" />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <IconBtn @click="removeGuarantee">
        <VIcon size="20" icon="tabler-x" />
      </IconBtn>
    </div>
  </VCard>
</template>
