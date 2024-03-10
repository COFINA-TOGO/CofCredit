<script setup>
definePage({
  meta: {
    action: 'read',
    subject: 'pv',
  },
})
const router = useRouter()
const route = useRoute("vertalTrial-id")

const frenchMensuality = {
  "mensual": "Mensuelle",
  "quarterly": "Trimestrielle",
  "semi-annual": "Semestrielle",
  "annual": "Annuel",
  "in-fine": "À la fin",
}

const { data: vertalTrial } = await useApi(`/verbal-trial/${Number(route.params.id)}?with_caf=1&with_type_of_credit=1&with_type_of_guarantees=1`)

if (vertalTrial.value.status == 200) {
  vertalTrial.value = vertalTrial.value.data.verbalTrial
} else {
  router.push("/vertalTrial")
}

const tableData = [
  { "title": "Montant", "value": String(vertalTrial.value.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + "F CFA" },
  { "title": "Durée", "value": vertalTrial.value.duration + " mois" },
  { "title": "Périodicité", "value": frenchMensuality[vertalTrial.value.periodicity] },
  { "title": "Taux d'intérêt HT", "value": vertalTrial.value.tax_fee_interest_rate + "%" },
  { "title": "TAF", "value": vertalTrial.value.taf + "%" },
  { "title": "Echéance TTC", "value": String(vertalTrial.value.due_amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + "F CFA" },
  { "title": "Frais de dossier", "value": String((vertalTrial.value.amount * vertalTrial.value.administrative_fees_percentage) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + "F CFA" },
  { "title": "Prime d'assurance", "value": String(vertalTrial.value.insurance_premium).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + "F CFA" },
]

if (vertalTrial.duration > 13) {
  tableData.push({ "title": "Prime de révision de ligne", "value": "1% du capital restant dû après 13 mois" })
}
</script>

<template>
  <section v-if="vertalTrial">
    <VRow>
      <VCol cols="12">
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="11">
              <VBtn to="/pv">
                <VIcon icon="tabler-arrow-left" />
                Pvs
              </VBtn>
            </VCol>
            <VCol cols="1">
              <VBtn :to="{ name: 'pv-edit-id', params: { id: vertalTrial.id } }">
                Modifier
              </VBtn>
            </VCol>
            <VCol cols="12">
              <h2 class="text-center">
                Procès Verbal N°{{ vertalTrial.committee_id }}
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
                Date de validation: {{ vertalTrial.created_at }}
              </p>
            </VCol>
            <VCol cols="6">
              <p style="font-size: 20px">
                : {{ vertalTrial.caf.full_name }}
              </p>
              <p style="font-size: 20px">
                : <strong> {{ vertalTrial.applicant_last_name + " " + vertalTrial.applicant_first_name
                }}</strong>
              </p>
              <p style="font-size: 20px">
                : {{ vertalTrial.account_number }}
              </p>
              <p style="font-size: 20px">
                : {{ vertalTrial.activity }}
              </p>
              <p style="font-size: 20px">
                : {{ vertalTrial.purpose_of_financing }}
              </p>
              <p style="font-size: 20px">
                : {{ vertalTrial.type_of_credit.name }}
              </p>
            </VCol>
          </VCardText>

          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2>CARACTERISTIQUES</h2>
            </VCol>
            <VCol cols="12">
              <VTable class="text-no-wrap">
                <tbody>
                  <tr v-for="item in tableData" :key="item.key">
                    <td colspan="5">
                      {{ item.title }}
                    </td>
                    <td colspan="1">
                      {{ item.value }}
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VCardText>

          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2>GARANTIES A RECUEILLIR</h2>
            </VCol>
            <VCol cols="12">
              <p>
              <ul>
                <li v-for="(item, index) in vertalTrial.guarantees" :key="index" style="font-size: 20px">
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
