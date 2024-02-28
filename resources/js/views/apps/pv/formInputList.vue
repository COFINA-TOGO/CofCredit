<script>
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
</script>

<template>
  <VCard class="mb-6" title="PV Information">
    <VCardText>
      <VRow>
        <VCol cols="12" md="6" lg="4">
          <AppTextField v-model="pv.committee_id" :error-messages="pvError.committee_id" label="Numéro du comitée"
            placeholder="Ex: CFNTG-044-13-12-23-01212" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12" md="6" lg="4">
          <AppDateTimePicker v-model="pv.committee_date" :error-messages="pvError.committee_date" label="Date du comitée"
            placeholder="Ex: 2024-12-12" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12" md="6" lg="4">
          <AppAutocomplete :items="cafList" v-model="pv.caf_id" :error-messages="pvError.caf_id" label="Chargé d'affaire"
            placeholder="Ex: DJANTE Komla" item-title="full_name" item-value="id" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12" md="6" lg="4">
          <AppSelect :items="civilityItemList" v-model="pv.civility" :error-messages="pvError.civility" label="Civilité"
            placeholder="Ex: Mr" :rules="[requiredValidator]" />
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
          <AppTextField v-model="pv.account_number" :error-messages="pvError.account_number" label="Numéro de compte"
            placeholder="Ex: 251012345678" :rules="[requiredValidator]" />
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
            :error-messages="pvError.type_of_credit_id" label="Type de credit" placeholder="Ex: Avance sur salaire"
            item-title="name" item-value="id" :rules="[requiredValidator]" />
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
        <VCol cols="12" md="6" lg="4">
          <AppTextField type="number" v-model="pv.insurance_premium" :error-messages="pvError.insurance_premium"
            label="Prime d'assurance" placeholder="Ex: 25000" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12">
          <VSlider label="TAF(%)" v-model="pv.taf" :error-messages="pvError.taf" :thumb-size="15" thumb-label="always"
            :rules="[requiredValidator]" step="0.1">
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
</template>
