<!-- eslint-disable camelcase -->
<script setup>
import { ref } from 'vue'

const router = useRouter()

const pvData = ref({
  "committee_id": "CFNTG-044-13-12-23-01212",
  "committee_date": "2024-02-02",
  "caf_id": "7",
  "civility": "Mr",
  "applicant_first_name": "Cesar",
  "applicant_last_name": "Endure",
  "account_number": "251012345678",
  "activity": "Homme d'affaire",
  "purpose_of_financing": "Achat de nouveau locaux",
  "type_of_credit_id": "1",
  "amount": "15000000",
  "duration": "18",
  "periodicity": "mensual",
  "due_amount": "150000",
  "insurance_premium": "15000",
  "administrative_fees_percentage": 2.5,
  "taf": 10,
  "tax_fee_interest_rate": 17,
})

const getResetPvError = () => {
  return {
    "committee_id": "",
    "committee_date": "",
    "caf_id": "",
    "civility": "",
    "applicant_first_name": "",
    "applicant_last_name": "",
    "account_number": "",
    "activity": "",
    "purpose_of_financing": "",
    "type_of_credit_id": "",
    "amount": "",
    "duration": "",
    "periodicity": "",
    "due_amount": "",
    "insurance_premium": "",
    "administrative_fees_percentage": "",
    "taf": "",
    "tax_fee_interest_rate": "",
  }
}

const pvError = ref(getResetPvError())


const civilityItemList = [
  { value: "Mr", title: 'Mr' },
  { value: "Mme", title: 'Mme' },
  { value: "Mlle", title: 'Mlle' },
]

const periodicityItemList = [
  { value: "mensual", title: 'Mensuelle' },
  { value: "quarterly", title: 'Trimestrielle' },
  { value: "semi-annual", title: 'Semestrielle' },
  { value: "annual", title: 'Annuelle' },
  { value: "in-fine", title: 'A la fin' },
]

const {
  data: typeOfCreditListData,
  execute: fetchTypeOfCreditList,
} = await useApi(createUrl('/type-of-credit', {
  query: {
    "paginate": 0,
  },
}))

const typeOfCreditList = computed(() => typeOfCreditListData.value.data)

const {
  data: cafListData,
  execute: fetchCafList,
} = await useApi(createUrl('/user', {
  query: {
    "paginate": 0,
    "profile": "caf",
  },
}))

const cafList = computed(() => cafListData.value.data)

const refForm = ref()

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const res = await $api('/verbal-trial', {
        method: 'POST',
        body: {
          committee_id: pvData.value.committee_id,
          committee_date: pvData.value.committee_date,
          caf_id: pvData.value.caf_id,
          civility: pvData.value.civility,
          applicant_first_name: pvData.value.applicant_first_name,
          applicant_last_name: pvData.value.applicant_last_name,
          account_number: pvData.value.account_number,
          activity: pvData.value.activity,
          purpose_of_financing: pvData.value.purpose_of_financing,
          type_of_credit_id: pvData.value.type_of_credit_id,
          amount: pvData.value.amount,
          duration: pvData.value.duration,
          periodicity: pvData.value.periodicity,
          due_amount: pvData.value.due_amount,
          insurance_premium: pvData.value.insurance_premium,
          administrative_fees_percentage: pvData.value.administrative_fees_percentage,
          taf: pvData.value.taf,
          tax_fee_interest_rate: pvData.value.tax_fee_interest_rate,
        },
      })

      pvError.value = getResetPvError()
      if (res.status == 201) {
        router.push("/pv")
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
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Ajouter un nouveau PV
        </h4>
        <span>Procès verbal pour un nouveau crédit</span>
      </div>
    </div>
    <VForm
      ref="refForm"
      @submit.prevent="onSubmit"
    >
      <VRow>
        <VCol md="12">
          <!-- 👉 PV Information -->
          <VCard
            class="mb-6"
            title="Information du pv"
          >
            <VCardText>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.committee_id"
                    :error-messages="pvError.committee_id"
                    label="Numéro du comitée"
                    placeholder="Ex: CFNTG-044-13-12-23-01212"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppDateTimePicker
                    v-model="pvData.committee_date"
                    :error-messages="pvError.committee_date"
                    label="Date du comitée"
                    placeholder="Ex: 2024-12-12"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppAutocomplete
                    v-model="pvData.caf_id"
                    :items="cafList"
                    :error-messages="pvError.caf_id"
                    label="Chargé d'affaire"
                    placeholder="Ex: DJANTE Komla"
                    item-title="full_name"
                    item-value="id"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppSelect
                    v-model="pvData.civility"
                    :items="civilityItemList"
                    :error-messages="pvError.civility"
                    label="Civilité"
                    placeholder="Ex: Mr"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.applicant_first_name"
                    :error-messages="pvError.applicant_first_name"
                    label="Prénom du demandeur"
                    placeholder="Ex: Cesar"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.applicant_last_name"
                    :error-messages="pvError.applicant_last_name"
                    label="Nom du demandeur"
                    placeholder="Ex: Endure"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.account_number"
                    :error-messages="pvError.account_number"
                    label="Numéro de compte"
                    placeholder="Ex: 251012345678"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.activity"
                    :error-messages="pvError.activity"
                    label="Activé"
                    placeholder="Ex: Homme d'affaire"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.purpose_of_financing"
                    :error-messages="pvError.purpose_of_financing"
                    label="Objet du financement"
                    placeholder="Ex: Achat nouveau locaux"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppAutocomplete
                    v-model="pvData.type_of_credit_id"
                    :items="typeOfCreditList"
                    :error-messages="pvError.type_of_credit_id"
                    label="Type de credit"
                    placeholder="Ex: Avance sur salaire"
                    item-title="name"
                    item-value="id"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.amount"
                    type="number"
                    :error-messages="pvError.amount"
                    label="Montant"
                    placeholder="Ex: 15 000 000"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.duration"
                    type="number"
                    :error-messages="pvError.duration"
                    label="Durée du crédit en mois"
                    placeholder="Ex: 18"
                    append-inner-icon="tabler-calendar"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppSelect
                    v-model="pvData.periodicity"
                    :items="periodicityItemList"
                    :error-messages="pvError.periodicity"
                    label="Periodicité"
                    placeholder="Ex: Mensuelle"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.due_amount"
                    type="number"
                    :error-messages="pvError.due_amount"
                    label="Montant d'une échéance"
                    placeholder="Ex: 150 000"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <AppTextField
                    v-model="pvData.insurance_premium"
                    type="number"
                    :error-messages="pvError.insurance_premium"
                    label="Prime d'assurance"
                    placeholder="Ex: 25000"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol cols="12">
                  <VSlider
                    v-model="pvData.taf"
                    label="TAF(%)"
                    :error-messages="pvError.taf"
                    :thumb-size="15"
                    thumb-label="always"
                    :rules="[requiredValidator]"
                    step="0.1"
                  >
                    <template #append>
                      <VTextField
                        v-model="pvData.taf"
                        :error-messages="pvError.taf"
                        type="number"
                        style="width:80px"
                        density="compact"
                        hide-details
                        variant="outlined"
                        suffix="%"
                      />
                    </template>
                  </VSlider>
                </VCol>
                <VCol cols="12">
                  <VSlider
                    v-model="pvData.administrative_fees_percentage"
                    label="Frais de dossier(%)"
                    :error-messages="pvError.administrative_fees_percentage"
                    :thumb-size="15"
                    thumb-label="always"
                    :rules="[requiredValidator]"
                    step="0.1"
                  >
                    <template #append>
                      <VTextField
                        v-model="pvData.administrative_fees_percentage"
                        :error-messages="pvError.administrative_fees_percentage"
                        type="number"
                        style="width:80px"
                        density="compact"
                        hide-details
                        variant="outlined"
                        suffix="%"
                      />
                    </template>
                  </VSlider>
                </VCol>
                <VCol cols="12">
                  <VSlider
                    v-model="pvData.tax_fee_interest_rate"
                    label="Taux d'intérêt HT(%)"
                    :error-messages="pvError.tax_fee_interest_rate"
                    :thumb-size="15"
                    thumb-label="always"
                    :rules="[requiredValidator]"
                    step="0.1"
                  >
                    <template #append>
                      <VTextField
                        v-model="pvData.tax_fee_interest_rate"
                        :error-messages="pvError.tax_fee_interest_rate"
                        type="number"
                        style="width:80px"
                        density="compact"
                        hide-details
                        variant="outlined"
                        suffix="%"
                      />
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
              <VBtn
                type="reset"
                variant="tonal"
                color="primary"
              >
                Effacer
              </VBtn>
              <VBtn
                type="submit"
                class="me-3"
              >
                Enregistrer
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
