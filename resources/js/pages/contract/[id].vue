<!-- eslint-disable camelcase -->
<script setup>
const router = useRouter()
const route = useRoute("contract-id")

const frenchMensuality = {
  "mensual": "Mensuelle",
  "quarterly": "Trimestrielle",
  "semi-annual": "Semestrielle",
  "annual": "Annuel",
  "in-fine": "À la fin",
}

const {
  data: contract,
} = await useApi(createUrl(`/contract/${route.params.id}`, {
  query: {
    with_type_of_credit: 1,
    with_caf: 1,
    with_type_of_guarantees: 1,
  },
}))

if (contract.value.status == 200) {
  contract.value = contract.value.data.contract
} else {
  router.push("/contract")
}
</script>

<template>
  <section v-if="contract">
    <VRow>
      <VCol cols="12">
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2 class="text-center">
                COMITE : Dossier #{{ contract.verbal_trial.committee_id }}
              </h2>
            </VCol>
            <VCol cols="6">
              <p style="font-size: 20px">
                CAF
              </p>
              <p style="font-size: 20px">
                Emprunteur
              </p>
              <p style="font-size: 20px">
                N° de compte
              </p>
              <p style="font-size: 20px">
                Activité
              </p>
              <p style="font-size: 20px">
                Objet du financement
              </p>
              <p style="font-size: 20px">
                Type de concours solicité
              </p>
              <br>
              <p style="font-size: 20px">
                Date de validation: {{ contract.verbal_trial.created_at }}
              </p>
            </VCol>
            <VCol cols="6">
              <p style="font-size: 20px">
                : {{ contract.verbal_trial.caf.full_name }}
              </p>
              <p style="font-size: 20px">
                : <strong> {{ contract.verbal_trial.applicant_last_name + " " +
                  contract.verbal_trial.applicant_first_name
                }}</strong>
              </p>
              <p style="font-size: 20px">
                : {{ contract.verbal_trial.account_number }}
              </p>
              <p style="font-size: 20px">
                : {{ contract.verbal_trial.activity }}
              </p>
              <p style="font-size: 20px">
                : {{ contract.verbal_trial.purpose_of_financing }}
              </p>
              <p style="font-size: 20px">
                : {{ contract.verbal_trial.type_of_credit.name }}
              </p>
            </VCol>
          </VCardText>

          <VDivider />
          <!-- 👉 SECTION Caracteristic -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2>CARACTERISTIQUES</h2>
            </VCol>
            <VCol cols="6">
              <p>
                <ul>
                  <p style="font-size: 20px">
                    ==>Montant :
                  </p>
                  <p style="font-size: 20px">
                    ==>Durée :
                  </p>
                  <p style="font-size: 20px">
                    ==>Périodicité :
                  </p>
                  <p style="font-size: 20px">
                    ==>Taux d'intérêt HT :
                  </p>
                  <p style="font-size: 20px">
                    ==>TAF :
                  </p>
                  <p style="font-size: 20px">
                    ==>Echéance TTC :
                  </p>
                  <p style="font-size: 20px">
                    ==>Frais de dossier ({{ contract.verbal_trial.administrative_fees_percentage
                    }}%) :
                  </p>
                  <p style="font-size: 20px">
                    ==>Prime d'assurance :
                  </p>
                  <p
                    v-if="contract.verbal_trial.duration > 11"
                    style="font-size: 20px"
                  >
                    ==>Prime de révision de ligne :
                  </p>
                </ul>
              </p>
            </VCol>
            <VCol cols="4">
              <p style="font-size: 20px">
                {{ String(contract.verbal_trial.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }} F CFA
              </p>
              <p style="font-size: 20px">
                {{ contract.verbal_trial.duration }} mois
              </p>
              <p style="font-size: 20px">
                {{ frenchMensuality[contract.verbal_trial.periodicity] }}
              </p>
              <p style="font-size: 20px">
                {{ contract.verbal_trial.tax_fee_interest_rate }}%
              </p>
              <p style="font-size: 20px">
                {{ contract.verbal_trial.taf }}%
              </p>
              <p style="font-size: 20px">
                {{ String(contract.verbal_trial.due_amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }} F CFA
              </p>
              <p style="font-size: 20px">
                {{ String((contract.verbal_trial.amount *
                  contract.verbal_trial.administrative_fees_percentage) /
                  100).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA
              </p>
              <p style="font-size: 20px">
                : {{
                  String(contract.verbal_trial.insurance_premium).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }} F
                CFA
              </p>
              <p
                v-if="contract.verbal_trial.duration > 11"
                style="font-size: 20px"
              >
                1% du capital restant dû après 13
                mois
              </p>
            </VCol>
          </VCardText>

          <!-- 👉 Table -->
          <VDivider />
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2>GARANTIES A RECUEILLIR</h2>
            </VCol>
            <VCol cols="12">
              <p>
                <ul>
                  <li
                    v-for="(item, index) in contract.verbal_trial.guarantees"
                    :key="index"
                    style="font-size: 20px"
                  >
                    {{ item.type_of_guarantee.name }} de {{ String(item.value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F
                    CFA : {{ item.comment }}
                  </li>
                </ul>
              </p>
            </VCol>
          </VCardText>

          <VDivider />
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
.invoice-preview-table {
  --v-table-row-height: 44px !important;
}

@media print {
  .v-theme--dark {
    --v-theme-surface: 255, 255, 255;
    --v-theme-on-surface: 94, 86, 105;
  }

  body {
    background: none !important;
  }

  @page {
    margin: 0;
    size: auto;
  }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .product-buy-now {
    display: none;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .v-card {
    box-shadow: none !important;

    .print-row {
      flex-direction: row !important;
    }
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }

  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>
