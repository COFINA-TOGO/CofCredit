<script setup>

const router = useRouter()
const route = useRoute("pv-edit-id")

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
} = await useApi(createUrl('/type-of-credit', {
  query: {
    "paginate": 0
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

const getEmptyError = () => {
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

const pvError = ref(getEmptyError())

const {
  data: pvData,
} = await useApi(createUrl(`/verbal-trial/${route.params.id}`, {
  query: {
    with_caf: 1,
    with_type_of_credit: 1,
  },
}))
var pv = ref(pvData.value.data.verbalTrial)

const refForm = ref()
const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const res = await $api(`/verbal-trial/${route.params.id}`, {
        method: 'PUT',
        body: {
          committee_id: pv.value.committee_id,
          committee_date: pv.value.committee_date,
          caf_id: pv.value.caf_id,
          civility: pv.value.civility,
          applicant_first_name: pv.value.applicant_first_name,
          applicant_last_name: pv.value.applicant_last_name,
          account_number: pv.value.account_number,
          activity: pv.value.activity,
          purpose_of_financing: pv.value.purpose_of_financing,
          type_of_credit_id: pv.value.type_of_credit_id,
          amount: pv.value.amount,
          duration: pv.value.duration,
          periodicity: pv.value.periodicity,
          due_amount: pv.value.due_amount,
          insurance_premium: pv.value.insurance_premium,
          administrative_fees_percentage: pv.value.administrative_fees_percentage,
          taf: pv.value.taf,
          tax_fee_interest_rate: pv.value.tax_fee_interest_rate,
        },
      })
      pvError.value = getEmptyError();
      if (res.status == 200) {
        router.push(`/pv/${route.params.id}`)
      } else {
        for (const key in res.errors) {
          res.errors[key].forEach(message => {
            pvError.value[key] += message + "\n"
          })
        }
      }
      nextTick(() => {
        // refForm.value?.reset()
        // refForm.value?.resetValidation()
      })
    }
  })
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="12">
      <VForm ref="refForm" @submit.prevent="onSubmit">
        <VRow>
          <VCol md="12">
            <!-- 👉 PV Information -->
            <VCard class="mb-6" title="Modification du pv de comité">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField v-model="pv.committee_id" :error-messages="pvError.committee_id"
                      label="Numéro du comitée" placeholder="Ex: CFNTG-044-13-12-23-01212" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppDateTimePicker v-model="pv.committee_date" :error-messages="pvError.committee_date"
                      label="Date du comitée" placeholder="Ex: 2024-12-12" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppAutocomplete :items="cafList" v-model="pv.caf_id" :error-messages="pvError.caf_id"
                      label="Chargé d'affaire" placeholder="Ex: DJANTE Komla" item-title="full_name" item-value="id"
                      :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppSelect :items="civilityItemList" v-model="pv.civility" :error-messages="pvError.civility"
                      label="Civilité" placeholder="Ex: Mr" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField v-model="pv.applicant_first_name" :error-messages="pvError.applicant_first_name"
                      label="Prénom du demandeur" placeholder="Ex: Cesar" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField v-model="pv.applicant_last_name" :error-messages="pvError.applicant_last_name"
                      label="Nom du demandeur" placeholder="Ex: Endure" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField v-model="pv.account_number" :error-messages="pvError.account_number"
                      label="Numéro de compte" placeholder="Ex: 251012345678" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField v-model="pv.activity" :error-messages="pvError.activity" label="Activé"
                      placeholder="Ex: Homme d'affaire" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField v-model="pv.purpose_of_financing" :error-messages="pvError.purpose_of_financing"
                      label="Objet du financement" placeholder="Ex: Achat nouveau locaux" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppAutocomplete :items="typeOfCreditList" v-model="pv.type_of_credit_id"
                      :error-messages="pvError.type_of_credit_id" label="Type de credit"
                      placeholder="Ex: Avance sur salaire" item-title="name" item-value="id"
                      :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField type="number" v-model="pv.amount" :error-messages="pvError.amount" label="Montant"
                      placeholder="Ex: 15 000 000" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField type="number" v-model="pv.duration" :error-messages="pvError.duration"
                      label="Durée du crédit en mois" placeholder="Ex: 18" append-inner-icon="tabler-calendar"
                      :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppSelect :items="periodicityItemList" v-model="pv.periodicity" :error-messages="pvError.periodicity"
                      label="Periodicité" placeholder="Ex: Mensuelle" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="6" lg="4">
                    <AppTextField type="number" v-model="pv.due_amount" :error-messages="pvError.due_amount"
                      label="Montant d'une échéance" placeholder="Ex: 150 000" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12" md="12" lg="4">
                    <AppTextField type="number" v-model="pv.insurance_premium" :error-messages="pvError.insurance_premium"
                      label="Prime d'assurance" placeholder="Ex: 25000" :rules="[requiredValidator]" />
                  </VCol>
                  <VCol cols="12">
                    <VSlider label="TAF(%)" v-model="pv.taf" :error-messages="pvError.taf" :thumb-size="15"
                      thumb-label="always" :rules="[requiredValidator]" step="0.1">
                      <template v-slot:append>
                        <v-text-field v-model="pv.taf" :error-messages="pvError.taf" type="number" style="width:80px"
                          density="compact" hide-details variant="outlined" suffix="%" />
                      </template>
                    </VSlider>
                  </VCol>
                  <VCol cols="12">
                    <VSlider label="Frais de dossier(%)" v-model="pv.administrative_fees_percentage"
                      :error-messages="pvError.administrative_fees_percentage" :thumb-size="15" thumb-label="always"
                      :rules="[requiredValidator]" step="0.1">
                      <template v-slot:append>
                        <v-text-field v-model="pv.administrative_fees_percentage"
                          :error-messages="pvError.administrative_fees_percentage" type="number" style="width:80px"
                          density="compact" hide-details variant="outlined" suffix="%" />
                      </template>
                    </VSlider>
                  </VCol>
                  <VCol cols="12">
                    <VSlider label="Taux d'intérêt HT(%)" v-model="pv.tax_fee_interest_rate"
                      :error-messages="pvError.tax_fee_interest_rate" :thumb-size="15" thumb-label="always"
                      :rules="[requiredValidator]" step="0.1">
                      <template v-slot:append>
                        <v-text-field v-model="pv.tax_fee_interest_rate" :error-messages="pvError.tax_fee_interest_rate"
                          type="number" style="width:80px" density="compact" hide-details variant="outlined" suffix="%" />
                      </template>
                    </VSlider>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
              <div class="d-flex flex-column justify-center">
                <VBtn to="../">
                  Retour
                </VBtn>
              </div>
              <div class="d-flex gap-4 align-center flex-wrap">
                <VBtn type="reset" variant="tonal" color="primary">
                  Effacer
                </VBtn>
                <VBtn type="submit" class="me-3">
                  Enregistrer
                </VBtn>
              </div>
            </div>
          </VCol>
        </VRow>
      </VForm>
    </VCol>
  </VRow>
</template>
