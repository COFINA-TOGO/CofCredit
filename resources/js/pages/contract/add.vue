<!-- eslint-disable camelcase -->
<script setup>
import PledgeEdit from '@/views/contract/PledgeEdit.vue'
definePage({
  meta: {
    action: 'create',
    subject: 'contract',
  },
})
import { ref } from 'vue'

const route = useRoute('pv-add')
const router = useRouter()

const contractData = ref({
  verbal_trial_id: null,
  representative_birth_date: "1988-05-01",
  representative_birth_place: "Lomé",
  representative_nationality: "Togolaise",
  representative_home_address: "Zip 85",
  representative_phone_number: "+228 91 91 91 91",
  representative_type_of_identity_document: "passport",
  representative_number_of_identity_document: "2020-01-01",
  representative_date_of_issue_of_identity_document: "2025-01-01",
  risk_premium_percentage: 2,
  total_amount_of_interest: 152369,
  number_of_due_dates: 3,
  type: "company",
  has_pledges: "0",
  company_denomination: "agban",
  company_legal_status: "dd",
  company_head_office_address: "dd",
  company_rccm_number: "dd",
  company_phone_number: "dd",
  individual_business_denomination: "dd",
  individual_business_corporate_purpose: "dd",
  individual_business_head_office_address: "dd",
  individual_business_rccm_number: "dd",
  individual_business_phone_number: "dd",
  pledges: [
    {
      type: "vehicle",
      comment: "",
    }
  ]
})

const getResetPvError = () => {
  return {
    verbal_trial_id: "",
    representative_birth_date: "",
    representative_birth_place: "",
    representative_nationality: "",
    representative_home_address: "",
    representative_phone_number: "",
    representative_type_of_identity_document: "",
    representative_number_of_identity_document: "",
    representative_date_of_issue_of_identity_document: "",
    risk_premium_percentage: "",
    total_amount_of_interest: "",
    number_of_due_dates: "",
    type: "",
    has_pledges: "",
    company_denomination: "",
    company_legal_status: "",
    company_head_office_address: "",
    company_rccm_number: "",
    company_phone_number: "",
    individual_business_denomination: "",
    individual_business_corporate_purpose: "",
    individual_business_head_office_address: "",
    individual_business_rccm_number: "",
    individual_business_phone_number: "",
  }
}

const formError = ref(getResetPvError())


const {
  data: verbalTrialListData,
} = await useApi(createUrl('/verbal-trial', {
  query: {
    has_contract: 0,
    paginate: 0,
    has_mortgage: 0,
    status: 'v'
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
        verbal_trial_id: contractData.value.verbal_trial_id,
        representative_birth_date: contractData.value.representative_birth_date,
        representative_birth_place: contractData.value.representative_birth_place,
        representative_nationality: contractData.value.representative_nationality,
        representative_home_address: contractData.value.representative_home_address,
        representative_phone_number: contractData.value.representative_phone_number,
        representative_type_of_identity_document: contractData.value.representative_type_of_identity_document,
        representative_number_of_identity_document: contractData.value.representative_number_of_identity_document,
        representative_date_of_issue_of_identity_document: contractData.value.representative_date_of_issue_of_identity_document,
        risk_premium_percentage: contractData.value.risk_premium_percentage,
        total_amount_of_interest: contractData.value.total_amount_of_interest,
        number_of_due_dates: contractData.value.number_of_due_dates,
        type: contractData.value.type,
        has_pledges: contractData.value.has_pledges,
      }

      if (contractData.value.type == "company") {
        $data.company_denomination = contractData.value.company_denomination
        $data.company_legal_status = contractData.value.company_legal_status
        $data.company_head_office_address = contractData.value.company_head_office_address
        $data.company_rccm_number = contractData.value.company_rccm_number
        $data.company_phone_number = contractData.value.company_phone_number
      } else if (contractData.value.type == "individual_business") {
        $data.individual_business_denomination = contractData.value.individual_business_denomination
        $data.individual_business_corporate_purpose = contractData.value.individual_business_corporate_purpose
        $data.individual_business_head_office_address = contractData.value.individual_business_head_office_address
        $data.individual_business_rccm_number = contractData.value.individual_business_rccm_number
        $data.individual_business_phone_number = contractData.value.individual_business_phone_number
      }

      if (contractData.value.has_pledges == '1') {
        $data.pledges = contractData.value.pledges
      }

      const res = await $api('/contract', {
        method: 'POST',
        body: $data,
      })

      formError.value = getResetPvError()
      if (res.status == 201) {
        router.push("/contract")
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

const removePledgeItem = id => {
  contractData.value.pledges.splice(id, 1)
}

const addPledgeItem = () => {
  contractData.value.pledges.push({
    type: "vehicule",
    comment: "",
  })
}

if (route.query.id) {
  const id = parseInt(route.query.id);
  if (verbalTrialList.value.find(object => object.id == id)) {
    contractData.value.verbal_trial_id = id;
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Ajouter un nouveau contrat
        </h4>
        <span>Contrat pour un Procès verbal</span>
      </div>
    </div>
    <VForm ref="refForm" @submit.prevent="onSubmit">
      <VRow>
        <VCol md="12">
          <!-- 👉 Information sur le contrat -->
          <VCard class="mb-6" title="Information sur contrat">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6" lg="6">
                  <AppAutocomplete v-model="contractData.verbal_trial_id" :items="verbalTrialList"
                    :error-messages="formError.verbal_trial_id" label="Procès verbal"
                    placeholder="Ex: CFNTG-044-13-12-23-01212" :rules="[requiredValidator]" item-title="label"
                    item-value="id" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.total_amount_of_interest" type="number"
                    :error-messages="formError.total_amount_of_interest" label="Montant total des intérêts"
                    placeholder="Ex: 15 000 000" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.number_of_due_dates" type="number"
                    :error-messages="formError.number_of_due_dates" label="Nombre d'échéance" placeholder="Ex: 18"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppSelect v-model="contractData.type" :items="typeList" :error-messages="formError.type" label="Type"
                    placeholder="Ex: Particulier" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="10">
                  <VSlider v-model="contractData.risk_premium_percentage"
                    label="Prime de risque (en pourcentage) du demandeur"
                    :error-messages="formError.risk_premium_percentage" :thumb-size="15" thumb-label="always"
                    :rules="[requiredValidator]" step="0.1">
                    <template #append>
                      <VTextField v-model="contractData.risk_premium_percentage"
                        :error-messages="formError.risk_premium_percentage" type="number" style="width:80px"
                        density="compact" hide-details variant="outlined" suffix="%" />
                    </template>
                  </VSlider>
                </VCol>
                <VCol cols="2">
                  <VCheckbox v-model="contractData.has_pledges" :true-value="'1'" :false-value="'0'"
                    :label="hasPledgesLabel[contractData.has_pledges]" :error-messages="formError.has_pledges"
                    true-icon="tabler-check" false-icon="tabler-circle-x" color="success" />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <!-- 👉 Information sur les gages -->
          <VCard v-if="contractData.has_pledges == '1'" class=" mb-6" title="Informations sur les gages">
            <VCardText class="add-products-form">
              <div v-for="(pledge, index) in contractData.pledges" class="my-4 ma-sm-4">
                <PledgeEdit :id="index" :data="pledge" @remove-pledge="removePledgeItem" />
              </div>

              <div class="mt-4 ma-sm-4">
                <VBtn prepend-icon="tabler-plus" @click="addPledgeItem">
                  Ajouter
                </VBtn>
              </div>
            </VCardText>
          </VCard>
          <!-- 👉 Information sur le client -->
          <VCard class="mb-6" title="Information sur le client">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6" lg="4">
                  <AppDateTimePicker v-model="contractData.representative_birth_date"
                    :error-messages="formError.representative_birth_date" label="Date de naissance"
                    placeholder="Ex: 2000-12-12" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="contractData.representative_birth_place"
                    :error-messages="formError.representative_birth_place" label="Lieu de naissance"
                    placeholder="Ex: Lomé" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="contractData.representative_nationality"
                    :error-messages="formError.representative_nationality" label="Nationalité"
                    placeholder="Ex: Togolaise" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="contractData.representative_home_address"
                    :error-messages="formError.representative_home_address" label="Addresse du domicile"
                    placeholder="Ex: Adewi, Lomé" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppSelect v-model="contractData.representative_type_of_identity_document" :items="documentTypeList"
                    :error-messages="formError.representative_type_of_identity_document"
                    label="Type de la pièce d'identité" placeholder="Ex: Passeport" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="contractData.representative_number_of_identity_document"
                    :error-messages="formError.representative_number_of_identity_document"
                    label="Numéro de la pièce d'identité" placeholder="Ex: 251012345678" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppDateTimePicker v-model="contractData.representative_date_of_issue_of_identity_document"
                    :error-messages="formError.representative_date_of_issue_of_identity_document"
                    label="Date de délivrance de la pièce d'identité" placeholder="Ex: 2022-01-01"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.representative_phone_number"
                    :error-messages="formError.representative_phone_number" label="Numéro de téléphone"
                    placeholder="Ex: +228 96 96 96 96" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <!-- 👉 Information sur la société -->
          <VCard v-if="contractData.type == 'company'" class="mb-6" title="Information sur la société">
            <VCardText>
              <VRow cols="12">
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.company_denomination"
                    :error-messages="formError.company_denomination" label="Dénomination" placeholder="Ex: Adjovidjo"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.company_legal_status"
                    :error-messages="formError.company_legal_status" label="Forme juridique" placeholder="Ex: "
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.company_rccm_number"
                    :error-messages="formError.company_rccm_number" label="Numero RCCM" placeholder="Ex: RC-44E18"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.company_phone_number"
                    :error-messages="formError.company_phone_number" label="Telephone de la société"
                    placeholder="Ex: +228 96 96 96 96" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12">
                  <AppTextField v-model="contractData.company_head_office_address"
                    :error-messages="formError.company_head_office_address" label="Addresse du siège social"
                    placeholder="Ex: Lomé, Adewi" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <!-- 👉 Information sur l'entreprise individuelle -->
          <VCard v-if="contractData.type == 'individual_business'" class="mb-6"
            title="Information sur l'entreprise individuele">
            <VCardText>
              <VRow cols="12">
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.individual_business_denomination"
                    :error-messages="formError.individual_business_denomination" label="Dénomination"
                    placeholder="Ex: Agban" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.individual_business_head_office_address"
                    :error-messages="formError.individual_business_head_office_address" label="Addresse du siège social"
                    placeholder="Ex: Lomé, Adewi" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.individual_business_rccm_number"
                    :error-messages="formError.individual_business_rccm_number" label="Numero RCCM"
                    placeholder="Ex: RC-44E18" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="6">
                  <AppTextField v-model="contractData.individual_business_phone_number"
                    :error-messages="formError.individual_business_phone_number" label="Telephone de la société"
                    placeholder="Ex: +228 96 96 96 96" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12">
                  <AppTextField v-model="contractData.individual_business_corporate_purpose"
                    :error-messages="formError.individual_business_corporate_purpose" label="Objet social"
                    placeholder="Ex: " :rules="[requiredValidator]" />
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
