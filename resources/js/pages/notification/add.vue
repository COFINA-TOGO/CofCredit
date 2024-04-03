<!-- eslint-disable camelcase -->
<script setup>
definePage({
  meta: {
    action: 'create',
    subject: 'notification',
  },
})
import { ref } from 'vue'

const route = useRoute('pv-add')
const router = useRouter()

const notificationData = ref({
  verbal_trial_id: null,
  representative_phone_number: "+228 91 91 91 91",
})

const getResetPvError = () => {
  return {
    verbal_trial_id: "",
    representative_phone_number: "",
  }
}

const pvError = ref(getResetPvError())


const {
  data: verbalTrialListData,
} = await useApi(createUrl('/verbal-trial', {
  query: {
    has_notification: 0,
    paginate: 0,
    has_mortgage: 1,
    status: 'v',
  },
}))

const verbalTrialList = computed(() => verbalTrialListData.value.data)

const typeList = [
  { value: "company", title: 'Société' },
  { value: "individual_business", title: 'Entreprise Individuel' },
  { value: "particular", title: 'Particulier' },
]

const hasPledgesLabel = {
  '1': 'Avec gage',
  '0': 'Sans gage',
}

const documentTypeList = [
  { value: "cni", title: 'Carte d\'identité nationale' },
  { value: "passport", title: 'Passeport' },
  { value: "residence_certificate", title: 'Certificat de résidence' },
  { value: "driving_licence", title: 'Permis de conduire' },
]

const refForm = ref()

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const $data = {
        verbal_trial_id: notificationData.value.verbal_trial_id,
        representative_phone_number: notificationData.value.representative_phone_number,
      }

      const res = await $api('/notification', {
        method: 'POST',
        body: $data,
      })

      pvError.value = getResetPvError()
      if (res.status == 201) {
        router.push("/notification")
      } else {
        for (const key in res.errors) {
          res.errors[key].forEach(message => {
            pvError.value[key] += message + "\n"
          })
        }
      }
      nextTick(() => {
        // refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

if (route.query.id) {
  const id = parseInt(route.query.id);
  if (verbalTrialList.value.find(object => object.id == id)) {
    notificationData.value.verbal_trial_id = id;
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Ajouter une nouvelle notification
        </h4>
        <span>Notification pour un Procès verbal</span>
      </div>
    </div>
    <VForm ref="refForm" @submit.prevent="onSubmit">
      <VRow>
        <VCol md="12">
          <VCard class="mb-6" title="Information sur notification">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6" lg="6">
                  <AppAutocomplete v-model="notificationData.verbal_trial_id" :items="verbalTrialList"
                    :error-messages="pvError.verbal_trial_id" label="Procès verbal"
                    placeholder="Ex: CFNTG-044-13-12-23-01212" :rules="[requiredValidator]" item-title="label"
                    item-value="id" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="notificationData.representative_phone_number"
                    :error-messages="pvError.representative_phone_number" label="Numéro de téléphone"
                    placeholder="Ex: +228 96 96 96 96" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12">
          <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
            <div class="d-flex flex-column justify-center" />
            <div class="d-flex gap-4 align-center flex-wrap">
              <VBtn type="reset" variant="tonal" color="primary">
                <VIcon start icon="tabler-circle-minus" />
                Effacer
              </VBtn>
              <VBtn type="submit" class="me-3">
                Enregistrer
                <VIcon end icon="tabler-checkbox" />
              </VBtn>
            </div>
          </div>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
.drop-zone {
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 6px;
}
</style>

<style lang="scss">
.inventory-card {

  .v-radio-group,
  .v-checkbox {
    .v-selection-control {
      align-items: start !important;

      .v-selection-control__wrapper {
        margin-block-start: -0.375rem !important;
      }
    }

    .v-label.custom-input {
      border: none !important;
    }
  }

  .v-tabs.v-tabs-pill {
    .v-slide-group-item--active.v-tab--selected.text-primary {
      h6 {
        color: #fff !important
      }
    }
  }

}

.ProseMirror {
  p {
    margin-block-end: 0;
  }

  padding: 0.5rem;
  outline: none;

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
}
</style>
