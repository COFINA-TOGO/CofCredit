<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable camelcase -->

<script setup>
definePage({
  meta: {
    action: "read",
    subject: "contract",
  },
})

import { VDataTableServer } from "vuetify/labs/VDataTable"
import { paginationMeta } from "@api-utils/paginationMeta"
import JsFileDownloader from "js-file-downloader"
import { $api } from "@/utils/api"
import { useRouter } from "vue-router"
import { reactive } from 'vue'

const router = useRouter()
const refInputEl = ref()
const uploadState = ref("signed_contract")
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref("")
const actionText = ref("")
const actionButtonText = ref("")
const actionFunction = ref()
const actionComment = ref("")
const commentPresence = ref(false)
const actionStatus = ref("waiting")
const loadings = ref([])
const deleteLoadings = ref({})
const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarColor = ref("success")
const searchQuery = ref(null)
const itemsPerPage = ref(8)
const page = ref(1)
const userData = useCookie('userData')

const headers = [
  {
    title: "Numéro comitée",
    key: "verbal_trial.committee_id",
  },
  {
    title: "Admin Crédit",
    key: "creator.full_name",
  },
  {
    title: "Nom client",
    key: "verbal_trial.entity_name",
  },
  {
    title: "Type de contrat",
    key: "type",
  },
  {
    title: "Montant",
    key: "verbal_trial.amount",
  },
  {
    title: "Observations",
    key: "observations",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    align: 'end',
  },
]

// Configuration de la vue avec structure générique
const viewData = reactive({
  filter: {
    title: "Filtres",
  },
  data: {
    title: {
      singular: 'Contrat',
      plural: 'Contrats',
    },
    actions: {
      singular: 'le contrat',
      plural: 'les contrats',
    },
    rule: {
      name: 'basic-contract',
    },
    link: {
      base: 'contract',
    },
    api: {
      end_point: 'contract',
      data: null,
      query: {
        with_type_of_credit: 1,
        with_company: 1,
        with_individual_business: 1,
        with_creator: 1,
        has_cat: 0,
      },
    },
  },
})

// Configuration des filtres dynamiques
const filterDataArray = reactive([
  {
    view: {
      cols: {
        col: 12,
        sm: 4,
      },
      name: {
        item_title: 'title',
        item_value: 'value',
      },
    },
    base: {
      name: 'Type de contrat',
      data_source: 'array',
      api_endpoint: 'contract',
      query: { paginate: 'false' },
    },
    filter: {
      key: 'type',
      value: null,
    },
    api: {
      datac: [
        { value: 'company', title: 'Société' },
        { value: 'particular', title: 'Particulier' },
        { value: 'individual_business', title: 'Entreprise Individuel' },
      ],
    },
  },
])

const typeList = {
  company: "Société",
  individual_business: "Entreprise Individuel",
  particular: "Particulier",
}

const more_query = {}

for (let index = 0; index < filterDataArray.length; index++) {
  if (filterDataArray[index]['base']['data_source'] === "api") {
    const { data, execute } = await useApi(createUrl(`/${filterDataArray[index]['base']['api_endpoint']}`, {
      query: filterDataArray[index]['base']['query'],
    }))

    filterDataArray[index].api.data = data
    filterDataArray[index].api.execute = execute
    filterDataArray[index].api.datac = filterDataArray[index].api.data.data
    more_query[filterDataArray[index]['filter']['key']] = filterDataArray[index]['filter']['value']
  }
}

const updateOptions = options => {
  page.value = options.page
}

// Nouvelle structure pour les données des contrats
const itemListData = ref({ data: [], total: 0, last_page: 1 })

const fetchItemList = async (id_list = []) => {
  id_list.forEach(id => {
    loadings.value[id] = true
  })
  try {
    const { data } = await useApi(createUrl(viewData.data.api.end_point, {
      query: {
        search: searchQuery.value,
        page: page.value,
        ...viewData.data.api.query,
        ...more_query,
      },
    }))

    itemListData.value = data.value
  } finally {
    id_list.forEach(id => {
      loadings.value[id] = false
    })
  }
}

const contractList = computed(() => itemListData.value.data)
const totalPv = computed(() => itemListData.value.total)
const lastPage = computed(() => itemListData.value.last_page)


const uploadFile = async (id, event) => {
  const { files } = event.target
  if (files && files.length === 1) {
    const reader = new FileReader()

    reader.onload = async () => {
      const base64Image = reader.result
      try {
        const response = await fetch(`/api/contract/upload/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("userToken").value}`,
          },
          body: JSON.stringify({
            [uploadState.value]: base64Image,
          }),
        })

        if (response.ok) {
          isSnackbarScrollReverseVisible.value = true
          snackbarColor.value = "success"
          snackbarMessage.value = "Document envoyé avec succès"
          await fetchItemList()
        } else {
          isSnackbarScrollReverseVisible.value = true
          snackbarColor.value = "error"
          snackbarMessage.value = "Échec de l'envoi du document"
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du document:", error)
        isSnackbarScrollReverseVisible.value = true
        snackbarColor.value = "error"
        snackbarMessage.value = "Erreur lors de l'envoi du document"
      }
    }
    reader.readAsDataURL(files[0])
  } else {
    isSnackbarScrollReverseVisible.value = true
    snackbarColor.value = "warning"
    snackbarMessage.value = "Veuillez sélectionner un seul fichier"
  }
}

const apiDelete = async id => {
  deleteLoadings.value[id] = true
  try {
    const response = await $api(`${viewData.data.api.end_point}/${id}`, {
      method: 'DELETE',
    })
    
    if (response.status == 200) {
      isSnackbarScrollReverseVisible.value = true
      snackbarColor.value = "success"
      snackbarMessage.value = `${viewData.data.title.singular} supprimé avec succès`
    } else {
      snackbarColor.value = "error"
      isSnackbarScrollReverseVisible.value = true
      snackbarMessage.value = ""
      for (const key in response.errors) {
        response.errors[key].forEach(message => {
          snackbarMessage.value += "" + message + "<br>"
        })
      }
    }
  } catch (error) {
    snackbarColor.value = "error"
    isSnackbarScrollReverseVisible.value = true
    snackbarMessage.value = "Erreur lors de la suppression"
  } finally {
    deleteLoadings.value[id] = false
    await fetchItemList()
  }
}

const apiChangeStatus = async id => {
  try {
    const response = await $api(`contract/change-status/${id}`, {
      method: "PUT",
      body: { status: actionStatus.value, comment: actionComment.value },
    })
    
    if (response.status == 200) {
      isSnackbarScrollReverseVisible.value = true
      snackbarColor.value = "success"
      snackbarMessage.value = `${viewData.data.title.singular} ${actionStatus.value === 'validated' ? 'validé' : 'rejeté'} avec succès`
    } else {
      snackbarColor.value = "error"
      isSnackbarScrollReverseVisible.value = true
      snackbarMessage.value = "Erreur lors du changement de statut"
    }
  } catch (error) {
    snackbarColor.value = "error"
    isSnackbarScrollReverseVisible.value = true
    snackbarMessage.value = "Erreur lors du changement de statut"
  } finally {
    actionComment.value = ""
    await fetchItemList()
  }
}

const apiAdminValidate = async id => {
  try {
    const response = await $api(`contract/admin-validate/${id}`, {
      method: "PUT",
      body: { comment: actionComment.value },
    })
    
    if (response.status == 200) {
      isSnackbarScrollReverseVisible.value = true
      snackbarColor.value = "success"
      snackbarMessage.value = "Envoi validé avec succès. Le Head Crédit va maintenant procéder à la validation finale."
    } else {
      snackbarColor.value = "error"
      isSnackbarScrollReverseVisible.value = true
      snackbarMessage.value = "Erreur lors de la validation"
    }
  } catch (error) {
    snackbarColor.value = "error"
    isSnackbarScrollReverseVisible.value = true
    snackbarMessage.value = "Erreur lors de la validation"
  } finally {
    actionComment.value = ""
    await fetchItemList()
  }
}

const apiHeadValidate = async (id, action) => {
  try {
    const response = await $api(`contract/head-validate/${id}`, {
      method: "PUT",
      body: { action: action, comment: actionComment.value },
    })
    
    if (response.status == 200) {
      isSnackbarScrollReverseVisible.value = true
      snackbarColor.value = "success"
      snackbarMessage.value = `Contrat ${action === 'validate' ? 'validé' : 'rejeté'} avec succès`
    } else {
      snackbarColor.value = "error"
      isSnackbarScrollReverseVisible.value = true
      snackbarMessage.value = "Erreur lors de la validation"
    }
  } catch (error) {
    snackbarColor.value = "error"
    isSnackbarScrollReverseVisible.value = true
    snackbarMessage.value = "Erreur lors de la validation"
  } finally {
    actionComment.value = ""
    await fetchItemList()
  }
}

// Gestion améliorée du téléchargement de fichiers
const downloadFile = async (url, fileName) => {
  try {
    new JsFileDownloader({
      url,
      headers: [
        {
          name: "Authorization",
          value: `Bearer ${useCookie("userToken").value}`,
        },
        { name: "Accept", value: "application/json" },
      ],
      nameCallback() {
        return fileName
      },
    })
    isSnackbarScrollReverseVisible.value = true
    snackbarColor.value = "success"
    snackbarMessage.value = "Téléchargement en cours..."
    await fetchItemList()
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error)
    isSnackbarScrollReverseVisible.value = true
    snackbarColor.value = "error"
    snackbarMessage.value = "Erreur lors du téléchargement"
  }
}

// Définition des couleurs des statuts
const statusColors = {
  validated: "success",
  rejected: "error",
  waiting: "warning",
  pending_admin_validation: "info",
  pending_head_validation: "primary",
}

// Fonction pour récupérer le texte du statut
const getStatusText = status => {
  switch (status) {
  case "validated":
    return "Dossier validé"
  case "waiting":
    return "En attente d'upload"
  case "pending_admin_validation":
    return "En attente de validation admin"
  case "pending_head_validation":
    return "En attente de validation head"
  case "rejected":
    return "Dossier rejeté"
  default:
    return ""
  }
}

const decorateObservations = observations => {
  return observations.map(text => {
    const normalized = text.toLowerCase()

    // Contrat signé manquant
    if (normalized.includes("contrat signé manquant")) {
      return {
        text,
        color: "error",
        icon: "tabler-file-x",
        title: "Contrat signé manquant",
        priority: "high",
        actionable: true,
        actionText: "Uploader le contrat",
        category: "document",
      }
    }

    // Billet à ordre manquant
    if (normalized.includes("billet à ordre signé manquant")) {
      return {
        text,
        color: "error",
        icon: "tabler-file-x",
        title: "Billet à ordre manquant",
        priority: "high",
        actionable: true,
        actionText: "Uploader le billet",
        category: "document",
      }
    }

    // Dossier des cautions incomplet
    if (normalized.includes("dossier des cautions incomplet")) {
      return {
        text,
        color: "warning",
        icon: "tabler-users-minus",
        title: "Cautions incomplètes",
        priority: "medium",
        actionable: true,
        actionText: "Gérer les cautions",
        category: "Garanties",
      }
    }

    // CAT manquant
    if (normalized.includes("cat")) {
      return {
        text,
        color: "warning",
        icon: "tabler-file-plus",
        title: "CAT à créer",
        priority: "medium",
        actionable: true,
        actionText: "Créer le CAT",
        category: "cat",
      }
    }

    // Validation en attente
    if (normalized.includes("validation") && normalized.includes("attente")) {
      return {
        text,
        color: "info",
        icon: "tabler-clock-pause",
        title: "En attente de validation",
        priority: "low",
        actionable: false,
        category: "status",
      }
    }

    // Statuts spécifiques du nouveau workflow
    if (normalized.includes("admin") && normalized.includes("validation")) {
      return {
        text,
        color: "info",
        icon: "tabler-user-check",
        title: "Validation admin requise",
        priority: "medium",
        actionable: true,
        actionText: "Valider l'envoi",
        category: "validation",
      }
    }

    if (normalized.includes("head") && normalized.includes("validation")) {
      return {
        text,
        color: "primary",
        icon: "tabler-crown",
        title: "Validation head requise",
        priority: "high",
        actionable: true,
        actionText: "Valider/Rejeter",
        category: "validation",
      }
    }

    // Autres observations génériques
    if (normalized.includes("manquant") || normalized.includes("absence")) {
      return {
        text,
        color: "error",
        icon: "tabler-alert-circle",
        title: "Document manquant",
        priority: "high",
        actionable: true,
        actionText: "Compléter le dossier",
        category: "document",
      }
    }

    return {
      text,
      color: "info",
      icon: "tabler-info-circle",
      title: "Information",
      priority: "low",
      actionable: false,
      category: "info",
    }
  })
}

// Lifecycle hooks et watchers
onMounted(() => {
  fetchItemList([4])
})

watch([searchQuery, page], async () => {
  await fetchItemList([4])
})

watchEffect(async () => {
  filterDataArray.forEach(filterData => {
    more_query[filterData.filter.key] = filterData.filter.value
  })
  await fetchItemList([4])
})
</script>

<template>
  <div>
    <!-- 👉 widgets -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCardText>
            <h2>
              Liste des {{ viewData.data.title.plural }}
            </h2>
          </VCardText>
        </VRow>
      </VCardText>
    </VCard>

    <VCard 
      :title="viewData.filter.title" 
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <VCol 
            v-for="filterData in filterDataArray" 
            :key="filterData.filter.key"
            :cols="filterData.view.cols.col"
            :sm="filterData.view.cols.sm ?? 6"
          >
            <AppAutocomplete 
              v-model="filterData.filter.value" 
              :placeholder="filterData.base.name"
              :item-title="filterData.view.name.item_title ?? 'name'"
              :item-value="filterData.view.name.item_value ?? 'id'" 
              :items="filterData.api.datac" 
              clearable
              clear-icon="tabler-x" 
            />
          </VCol>
        </VRow>

        <VDivider class="my-4" />
      </VCardText>
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="flex-grow-1">
          <AppTextField 
            v-model="searchQuery" 
            placeholder="Rechercher" 
          />
        </div>

        <div class="d-flex gap-4">
          <VBtn
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-download"
          >
            Export
          </VBtn>

          <VBtn 
            v-if="$can('create', viewData.data.rule.name)" 
            color="primary" 
            prepend-icon="tabler-plus"
            :to="{ name: `${viewData.data.link.base}-add` }"
          >
            Nouveau
          </VBtn>
          <VBtn 
            :loading="loadings[3]" 
            :disabled="loadings[3]" 
            prepend-icon="tabler-refresh"
            @click="fetchItemList([3, 4]);"
          >
            Recharger
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="tabler-refresh" />
              </span>
            </template>
          </VBtn>
        </div>
      </div>

      <VDivider class="mt-4" />

      <!-- 👉 Datatable  -->
      <VDataTableServer 
        v-model:items-per-page="itemsPerPage" 
        v-model:page="page"
        :loading="loadings[4]" 
        :headers="headers" 
        :items="contractList" 
        :items-length="totalPv" 
        class="text-no-wrap"
        loading-text="En cours de chargement"
        @update:options="updateOptions"
      >
        <template #item.type="{ item }">
          {{ typeList[item.type] }}
        </template>

        <template #item.verbal_trial.amount="{ item }">
          {{
            String(item.verbal_trial.amount).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              " "
            )
          }}
          F CFA
        </template>

        <template #item.observations="{ item }">
          <div
            v-if="item.observations.length > 0"
            class="observations-container"
          >
            <!-- Badge de résumé des observations -->
            <div class="d-flex align-center gap-2 mb-3">
              <VChip
                size="small"
                variant="tonal"
                color="error"
                prepend-icon="tabler-alert-triangle"
              >
                {{ item.observations.length }} observation{{
                  item.observations.length > 1 ? "s" : ""
                }}
              </VChip>

              <!-- Indicateur de priorité -->
              <VChip
                v-if="
                  decorateObservations(item.observations).some(
                    (obs) => obs.priority === 'high'
                  )
                "
                size="x-small"
                variant="flat"
                color="error"
                class="text-xs font-weight-bold"
              >
                URGENT
              </VChip>
            </div>

            <!-- Liste des observations groupées par catégorie -->
            <div class="d-flex flex-column gap-2">
              <VCard
                v-for="(observation, index) in decorateObservations(
                  item.observations
                ).sort((a, b) => {
                  const priorityOrder = { high: 3, medium: 2, low: 1 };
                  return (
                    priorityOrder[b.priority] -
                    priorityOrder[a.priority]
                  );
                })"
                :key="index"
                variant="tonal"
                :color="observation.color"
                class="observation-card"
                elevation="0"
              >
                <VCardText class="pa-3">
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center gap-3">
                      <!-- Icône avec indicateur de priorité -->
                      <div class="position-relative">
                        <VAvatar
                          :color="observation.color"
                          variant="tonal"
                          size="32"
                        >
                          <VIcon
                            :icon="observation.icon"
                            size="18"
                          />
                        </VAvatar>
                        <VBadge
                          v-if="observation.priority === 'high'"
                          dot
                          color="error"
                          class="priority-badge"
                        />
                      </div>

                      <!-- Contenu de l'observation -->
                      <div class="flex-grow-1">
                        <div class="d-flex align-center gap-2 mb-1">
                          <span class="text-subtitle-2 font-weight-medium">
                            {{ observation.title }}
                          </span>
                          <VChip
                            size="x-small"
                            variant="outlined"
                            :color="observation.color"
                            class="text-xs"
                          >
                            {{ observation.category }}
                          </VChip>
                        </div>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          {{ observation.text }}
                        </p>
                      </div>
                    </div>

                    <!-- Actions rapides -->
                    <div
                      v-if="observation.actionable"
                      class="d-flex align-center gap-1"
                    >
                      <!-- Action spécifique selon le type d'observation -->
                      <VBtn
                        v-if="
                          observation.category === 'document' &&
                            observation.text.includes(
                              'contrat signé'
                            )
                        "
                        size="small"
                        variant="tonal"
                        :color="observation.color"
                        prepend-icon="tabler-upload"
                        @click="
                          uploadState = 'signed_contract';
                          refInputEl?.click();
                        "
                      >
                        Upload
                      </VBtn>

                      <VBtn
                        v-else-if="
                          observation.category === 'document' &&
                            observation.text.includes(
                              'billet à ordre'
                            )
                        "
                        size="small"
                        variant="tonal"
                        :color="observation.color"
                        prepend-icon="tabler-upload"
                        @click="
                          uploadState =
                            'signed_promissory_note';
                          refInputEl?.click();
                        "
                      >
                        Upload
                      </VBtn>

                      <VBtn
                        v-else-if="
                          observation.category === 'guarantor'
                        "
                        size="small"
                        variant="tonal"
                        :color="observation.color"
                        prepend-icon="tabler-users"
                        :to="{
                          name:
                            'contract-contract_id-guarantor',
                          params: { contract_id: item.id },
                        }"
                      >
                        Cautions
                      </VBtn>

                      <VBtn
                        v-else-if="observation.category === 'cat'"
                        size="small"
                        variant="tonal"
                        :color="observation.color"
                        prepend-icon="tabler-file-plus"
                        :to="{
                          name: 'cat-add',
                          query: { id: item.id },
                        }"
                      >
                        Créer CAT
                      </VBtn>

                    </div>
                  </div>
                </VCardText>
              </VCard>
            </div>
          </div>

          <!-- Statut quand pas d'observations -->
          <div
            v-else
            class="status-container"
          >
            <VCard
              variant="tonal"
              color="success"
              class="pa-3"
              elevation="0"
            >
              <div class="d-flex align-center gap-3">
                <VAvatar
                  color="success"
                  variant="tonal"
                  size="32"
                >
                  <VIcon
                    icon="tabler-check"
                    size="18"
                  />
                </VAvatar>
                <div>
                  <div class="text-subtitle-2 font-weight-medium text-success">
                    Dossier complet
                  </div>
                  <VChip
                    size="small"
                    variant="flat"
                    :color="statusColors[item.status]"
                    class="mt-1"
                  >
                    <VTooltip
                      v-if="item.status_observation"
                      activator="parent"
                      transition="scroll-x-transition"
                      location="start"
                    >
                      Raison: {{ item.status_observation }}
                    </VTooltip>
                    {{ getStatusText(item.status) }}
                  </VChip>
                </div>
              </div>
            </VCard>
          </div>
        </template>

        <template #item.actions="{ item }">
          <div class="text-right">
            <div class="d-flex align-center gap-2">
              <IconBtn 
                v-if="$can('read', viewData.data.rule.name)"
                :to="{ name: `${viewData.data.link.base}-id`, params: { id: item.id } }"
              >
                <VTooltip 
                  activator="parent" 
                  transition="scroll-x-transition" 
                  location="top"
                >
                  Details
                </VTooltip>
                <VIcon icon="tabler-eye" />
              </IconBtn>

              <!-- Bouton de validation Admin Crédit au même niveau -->
              <template
                v-if="
                  item.status === 'pending_admin_validation' &&
                    userData.role === 'credit_admin' &&
                    item.creator_id === userData.id
                "
              >
                <VBtn
                  size="small"
                  color="primary"
                  variant="tonal"
                  @click="
                    selectedItemId = item.id;
                    actionTitle = 'Valider l\'envoi';
                    actionText = 'Êtes-vous sûr de vouloir valider l\'envoi de ce contrat ? Le Head Crédit pourra ensuite procéder à la validation finale.';
                    actionButtonText = 'Valider l\'envoi';
                    actionFunction = apiAdminValidate;
                    commentPresence = true;
                    isActionDialogVisible = true;
                  "
                >
                  <VIcon icon="tabler-send" />
                  <VTooltip 
                    activator="parent" 
                    transition="scroll-x-transition" 
                    location="top"
                  >
                    Valider l'envoi
                  </VTooltip>
                </VBtn>
              </template>

              <!-- Boutons de validation Head Crédit au même niveau -->
              <template
                v-if="
                  item.status === 'pending_head_validation' &&
                    userData.role === 'head_credit'
                "
              >
                <VBtn
                  size="small"
                  color="success"
                  variant="tonal"
                  @click="
                    selectedItemId = item.id;
                    actionTitle = 'Valider le contrat';
                    actionText = 'Êtes-vous sûr de vouloir valider ce contrat ?';
                    actionButtonText = 'Valider';
                    actionFunction = (id) => apiHeadValidate(id, 'validate');
                    commentPresence = true;
                    isActionDialogVisible = true;
                  "
                >
                  <VIcon icon="tabler-check" />
                  <VTooltip 
                    activator="parent" 
                    transition="scroll-x-transition" 
                    location="top"
                  >
                    Valider le contrat
                  </VTooltip>
                </VBtn>
                
                <VBtn
                  size="small"
                  color="error"
                  variant="tonal"
                  @click="
                    selectedItemId = item.id;
                    actionTitle = 'Rejeter le contrat';
                    actionText = 'Êtes-vous sûr de vouloir rejeter ce contrat ? L\'admin crédit devra re-uploader les documents.';
                    actionButtonText = 'Rejeter';
                    actionFunction = (id) => apiHeadValidate(id, 'reject');
                    commentPresence = true;
                    isActionDialogVisible = true;
                  "
                >
                  <VIcon icon="tabler-x" />
                  <VTooltip 
                    activator="parent" 
                    transition="scroll-x-transition" 
                    location="top"
                  >
                    Rejeter le contrat
                  </VTooltip>
                </VBtn>
              </template>
              <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
              >
                <VIcon
                  size="24"
                  icon="tabler-dots-vertical"
                />
                <VMenu activator="parent">
                  <VList>
                    <input
                      ref="refInputEl"
                      type="file"
                      name="signed_contract"
                      hidden
                      @input="uploadFile(item.id, $event)"
                    >

                    <VBadge
                      v-if="$can('read', 'guarantor')"
                      inline
                      :content="item.guarantors_count"
                    >
                      <VListItem
                        :to="{
                          name:
                            'contract-contract_id-guarantor',
                          params: { contract_id: item.id },
                        }"
                      >
                        <template #prepend>
                          <VIcon icon="tabler-users" />
                        </template>

                        <VListItemTitle>
                          Voir les Cautions
                        </VListItemTitle>
                      </VListItem>
                    </VBadge>
                    <VListItem
                      v-if="$can('read', 'pv')"
                      :to="{
                        name: 'pv-id',
                        params: { id: item.verbal_trial.id },
                      }"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-eye" />
                      </template>

                      <VListItemTitle>Voir le Pv</VListItemTitle>
                    </VListItem>

                    <div v-if="$can('download', 'basic-contract')">
                      <VDivider />
                      <!-- Télécharger contrat non-signé -->
                      <VListItem
                        @click="
                          downloadFile(
                            `/api/contract/download/${item.id}`,
                            `Contrat-${item.verbal_trial.committee_id}.docx`
                          )
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-download" />
                        </template>
                        <VListItemTitle>
                          Télécharger Contrat
                          non-signé
                        </VListItemTitle>
                      </VListItem>
                      <!-- Télécharger contrat signé -->
                      <VListItem
                        v-if="item.signed_contract_path"
                        @click="
                          downloadFile(
                            item.signed_contract_path,
                            `Contrat-${
                              item.signed_contract_path
                                .split('/')
                                .slice(-1)[0]
                            }`
                          )
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-download" />
                        </template>
                        <VListItemTitle>
                          Télécharger Contrat
                          signé
                        </VListItemTitle>
                      </VListItem>
                      <!-- Télécharger billet à ordre non-signé -->
                      <VListItem
                        @click="
                          downloadFile(
                            `/api/contract/promissory-note/download/${item.id}`,
                            `Billet-à-ordre-${item.verbal_trial.committee_id}.docx`
                          )
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-download" />
                        </template>
                        <VListItemTitle>
                          Télécharger Billet à ordre non
                          signé
                        </VListItemTitle>
                      </VListItem>
                      <!-- Télécharger billet à ordre signé -->
                      <VListItem
                        v-if="item.signed_promissory_note_path"
                        @click="
                          downloadFile(
                            item.signed_promissory_note_path,
                            `Billet-à-ordre-${
                              item.signed_promissory_note_path
                                .split('/')
                                .slice(-1)[0]
                            }`
                          )
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-download" />
                        </template>
                        <VListItemTitle>
                          Télécharger Billet à ordre
                          signé
                        </VListItemTitle>
                      </VListItem>
                      <!-- Télécharger mention manuscrite -->
                      <VListItem
                        @click="
                          downloadFile(
                            `/api/contract/handwritten-mention/download/${item.id}`,
                            `Mention-manuscrite-${item.verbal_trial.committee_id}.docx`
                          )
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-download" />
                        </template>
                        <VListItemTitle>
                          Télécharger Mention
                          manuscrite
                        </VListItemTitle>
                      </VListItem>
                    </div>
                    <div
                      v-if="
                        $can('upload', 'basic-contract') &&
                          (item.signed_contract_path == null ||
                            item.signed_promissory_note_path ==
                            null ||
                            item.status == 'rejected' ||
                            (item.status != 'pending_head_validation' && item.status != 'validated'))
                      "
                    >
                      <VDivider />
                      <!-- Ajouter Contrat signé -->
                      <VListItem
                        v-if="
                          item.signed_contract_path == null ||
                            item.status == 'rejected' ||
                            (item.status != 'pending_head_validation' && item.status != 'validated')
                        "
                        @click="
                          uploadState = 'signed_contract';
                          refInputEl?.click();
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-cloud-upload" />
                        </template>
                        <VListItemTitle color="error">
                          Ajouter contrat signé
                        </VListItemTitle>
                      </VListItem>
                      <!-- Ajouter Billet à ordre -->
                      <VListItem
                        v-if="
                          item.signed_promissory_note_path ==
                            null || item.status == 'rejected' ||
                            (item.status != 'pending_head_validation' && item.status != 'validated')
                        "
                        @click="
                          uploadState =
                            'signed_promissory_note';
                          refInputEl?.click();
                        "
                      >
                        <template #prepend>
                          <VIcon icon="tabler-cloud-upload" />
                        </template>
                        <VListItemTitle>
                          Ajouter billet à ordre
                          signé
                        </VListItemTitle>
                      </VListItem>
                    </div>


                  </VList>
                </VMenu>
                <!-- </span> -->
              </VBtn>
            </div>
          </div>
        </template>

        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalPv) }}
            </p>

            <VPagination 
              v-model="page" 
              :length="lastPage"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(lastPage, 5)"
            >
              <template #prev="slotProps">
                <VBtn 
                  variant="tonal" 
                  color="default" 
                  v-bind="slotProps" 
                  :icon="false"
                >
                  <VIcon 
                    start 
                    icon="tabler-arrow-left" 
                  />
                  Précedent
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn 
                  variant="tonal" 
                  color="default" 
                  v-bind="slotProps" 
                  :icon="false"
                >
                  Suivant
                  <VIcon 
                    end 
                    icon="tabler-arrow-right" 
                  />
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>

    <VDialog
      v-model="isActionDialogVisible"
      class="v-dialog-sm"
    >
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isActionDialogVisible = !isActionDialogVisible" />

      <!-- Dialog De suppression -->
      <VCard :title="actionTitle">
        <VCardText>
          {{ actionText }}

          <AppTextarea
            v-if="commentPresence"
            v-model="actionComment"
            class="mt-3"
            label="Commentaire"
            placeholder="Ex: RAS"
          />
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="isActionDialogVisible = false"
          >
            Retour
          </VBtn>
          <VBtn @click="actionFunction(selectedItemId); isActionDialogVisible = false">
            {{ actionButtonText }}
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
    
    <VSnackbar 
      v-model="isSnackbarScrollReverseVisible" 
      transition="scale-transition" 
      location="top end"
      :color="snackbarColor"
    >
      <div v-html="snackbarMessage" />
    </VSnackbar>
  </div>
</template>

<style lang="scss" scoped>
.custom-loader {
	display: flex;
	animation: loader 1s infinite;
}

@keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

// Styles pour les observations
.observations-container {
	min-width: 350px;
	max-width: 500px;
}

.observation-card {
	border-left: 3px solid currentColor;
	transition: all 0.2s ease-in-out;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
}

.priority-badge {
	position: absolute;
	top: -2px;
	right: -2px;
	z-index: 1;
}

.status-container {
	min-width: 250px;
}

// Animation d'apparition pour les observations
.observations-container {
	animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

// Responsive design pour les observations
@media (max-width: 768px) {
	.observations-container {
		min-width: 280px;
		max-width: 320px;
	}

	.observation-card .d-flex.align-center.justify-space-between {
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}
}

// Amélioration des couleurs pour une meilleure lisibilité
.text-xs {
	font-size: 0.75rem !important;
	line-height: 1rem !important;
}

// Style pour les boutons d'action
.observation-card .v-btn {
	transition: all 0.2s ease-in-out;

	&:hover {
		transform: scale(1.05);
	}
}
</style>
