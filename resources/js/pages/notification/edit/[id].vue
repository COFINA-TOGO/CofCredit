<!-- eslint-disable camelcase -->

<script setup>
definePage({
  meta: {
    action: 'update',
    subject: 'notification',
  },
})
import { ref } from 'vue'

const router = useRouter()
const route = useRoute("notification-edit-id")

const getResetFormError = () => {
  return {
    verbal_trial_id: "",
    representative_phone_number: "",
    representative_home_address: "",
    number_of_due_dates: "",
    risk_premium_percentage: "",
  }
}

const formError = ref(getResetFormError())

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


const {
  data: notificationData,
} = await useApi(createUrl(`/notification/${route.params.id}`, {
  query: {
    with_verbal_trial: 1,
  },
}))

//Ajout du procès verbal courant à la liste des pv
var notification = ref(notificationData.value.data.notification)
verbalTrialListData.value.data.push(JSON.parse(JSON.stringify(notification.value.verbal_trial)))

const refForm = ref()

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const $data = {
        verbal_trial_id: notification.value.verbal_trial_id,
        representative_phone_number: notification.value.representative_phone_number,
        representative_home_address: notification.value.representative_home_address,
        number_of_due_dates: notification.value.number_of_due_dates,
        risk_premium_percentage: notification.value.risk_premium_percentage,
      }

      const res = await $api(`/notification/${route.params.id}`, {
        method: 'PUT',
        body: $data,
      })

      formError.value = getResetFormError()
      if (res.status == 200) {
        router.push("/notification")
      } else if (res.status == 403) {
        isSnackbarScrollReverseVisible.value = true
        snackbarMessage.value = ""
        for (const key in res.errors) {
          res.errors[key].forEach(message => {
            snackbarMessage.value += message + "\n";
          })
        }
      } else {
        for (const key in res.errors) {
          res.errors[key].forEach(message => {
            formError.value[key] += message + "\n"
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

const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Modification de notification
        </h4>
        <span>Dashboard/Notifications/Modification</span>
      </div>
    </div>
    <VForm ref="refForm" @submit.prevent="onSubmit">
      <VRow>
        <VCol cols="11">
          <VBtn :to="{ name: 'notification' }">
            <VIcon icon="tabler-arrow-left" />
            Notifications
          </VBtn>
        </VCol>
        <VCol cols="1">
          <VBtn :to="{ name: 'notification-id', params: { id: route.params.id } }">
            Voir
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol md="12">

          <!-- 👉 Informations sur le notification -->
          <VCard class="mb-6" title="Information sur notification">
            <VCardText>
              <VRow>
                <VCol v-if="notification.status == 'rejected' && notification.status_observation">
                  <VAlert color="warning">
                    Motif du refus par {{ notification.creator.full_name }}: {{ notification.status_observation }}
                  </VAlert>
                </VCol>
                <VCol v-if="notification.head_credit_validation == 'rejected' && notification.head_credit_observation">
                  <VAlert color="warning">
                    Motif du refus par head crédit: {{ notification.head_credit_observation }}
                  </VAlert>
                </VCol>
              </VRow>

              <VRow>
                <VCol cols="12" md="6" lg="6">
                  <AppAutocomplete v-model="notification.verbal_trial_id" :items="verbalTrialList"
                    :error-messages="formError.verbal_trial_id" label="Procès verbal"
                    placeholder="Ex: CFNTG-044-13-12-23-01212" :rules="[requiredValidator]" item-title="label"
                    item-value="id" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="notification.representative_phone_number"
                    :error-messages="formError.representative_phone_number" label="Numéro de téléphone"
                    placeholder="Ex: +228 96 96 96 96" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="notification.representative_home_address"
                    :error-messages="formError.representative_home_address" label="Addresse" placeholder="Ex: Adewi"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField type="number" v-model="notification.number_of_due_dates"
                    :error-messages="formError.number_of_due_dates" label="Nombre d'échéance" placeholder="Ex: 4"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12">
                  <VSlider v-model="notification.risk_premium_percentage"
                    label="Prime de risque (en pourcentage) du demandeur"
                    :error-messages="formError.risk_premium_percentage" :thumb-size="15" thumb-label="always"
                    :rules="[requiredValidator]" step="0.1">
                    <template #append>
                      <VTextField v-model="notification.risk_premium_percentage"
                        :error-messages="formError.risk_premium_percentage" type="number" style="width:80px"
                        density="compact" hide-details variant="outlined" suffix="%" />
                    </template>
                  </VSlider>
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

    <VSnackbar v-model="isSnackbarScrollReverseVisible" transition="scroll-y-reverse-transition" location="bottom end"
      color="error">
      {{ snackbarMessage }}
    </VSnackbar>
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
