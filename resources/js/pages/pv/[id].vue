<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import InvoiceAddPaymentDrawer from '@/views/apps/invoice/InvoiceAddPaymentDrawer.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'

const router = useRouter()
const route = useRoute("pv-id")
const { data: invoiceData } = await useApi(`/apps/invoice/5036`)

const frenchMensuality = {
  "mensual": "Mensuelle",
  "quarterly": "Trimestrielle",
  "semi-annual": "Semestrielle",
  "annual": "Annuel",
  "in-fine": "À la fin"
}

const { data: pv } = await useApi(`/verbal-trial/${Number(route.params.id)}?with_caf=1&with_type_of_credit=1&with_type_of_guarantees=1`)

if (pv.value.status == 200) {
  pv.value = pv.value.data.verbalTrial
} else {
  router.push("/pv")
}
</script>

<template>
  <section v-if="invoiceData">
    <VRow>
      <VCol cols="12">
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2 class="text-center">COMITE : Dossier #{{ pv.committee_id }} </h2>
            </VCol>
            <VCol cols="6">
              <p style="font-size: 20px">CAF</p>
              <p style="font-size: 20px">Emprunteur</p>
              <p style="font-size: 20px">N° de compte</p>
              <p style="font-size: 20px">Activité</p>
              <p style="font-size: 20px">Objet du financement</p>
              <p style="font-size: 20px">Type de concours solicité</p>
              <br>
              <p style="font-size: 20px">Date de validation: {{ pv.created_at }}</p>
            </VCol>
            <VCol cols="6">
              <p style="font-size: 20px">: {{ pv.caf.full_name }}</p>
              <p style="font-size: 20px">: <strong> {{ pv.applicant_last_name + " " + pv.applicant_first_name
              }}</strong></p>
              <p style="font-size: 20px">: {{ pv.account_number }}</p>
              <p style="font-size: 20px">: {{ pv.activity }}</p>
              <p style="font-size: 20px">: {{ pv.purpose_of_financing }}</p>
              <p style="font-size: 20px">: {{ pv.type_of_credit.name }}</p>
            </VCol>
          </VCardText>

          <VDivider />
          <!-- 👉 SECTION Caracteristic -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2>CARACTERISTIQUES</h2>
            </VCol>
            <VCol cols="6">
              <p class="ml-6">
              <ul>
                <li style="font-size: 20px">Montant</li>
                <li style="font-size: 20px">Durée</li>
                <li style="font-size: 20px">Périodicité</li>
                <li style="font-size: 20px">Taux d'intérêt HT</li>
                <li style="font-size: 20px">TAF</li>
                <li style="font-size: 20px">Echéance TTC</li>
                <li style="font-size: 20px">Frais de dossier ({{ pv.administrative_fees_percentage }}%)</li>
                <li style="font-size: 20px">Prime d'assurance</li>
                <li v-if="pv.duration > 11" style="font-size: 20px">Prime de révision de ligne</li>
              </ul>
              </p>
            </VCol>
            <VCol cols="4">
              <div style="font-size: 20px">: {{ String(pv.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA</div>
              <div style="font-size: 20px">: {{ pv.duration }} mois</div>
              <div style="font-size: 20px">: {{ frenchMensuality[pv.periodicity] }}</div>
              <div style="font-size: 20px">: {{ pv.tax_fee_interest_rate }}%</div>
              <div style="font-size: 20px">: {{ pv.taf }}%</div>
              <div style="font-size: 20px">: {{ pv.due_amount }} F CFA</div>
              <div style="font-size: 20px">: {{ String((pv.amount * pv.administrative_fees_percentage) /
                100).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F CFA</div>
              <div style="font-size: 20px">: {{ String(pv.insurance_premium).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} F
                CFA
              </div>
              <div v-if="pv.duration > 11" style="font-size: 20px">: 1% du capital restant dû après 13 mois</div>
            </VCol>
          </VCardText>

          <!-- 👉 Table -->
          <VDivider />
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
            <VCol cols="12">
              <h2>GARANTIES A RECUEILLIR</h2>
            </VCol>
            <VCol cols="12">
              <p class="ml-6">
              <ul>
                <li style="font-size: 20px" v-for="(item, index) in pv.guarantees" :key="index">
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
