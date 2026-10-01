<!-- Fiche d'une caution personnelle -->
<script setup>
const props = defineProps({
  guarantor: { type: Object, required: true },
  listRoute: { type: Object, required: true },
  editRoute: { type: Object, required: true },
})

const g = computed(() => props.guarantor)

const items = computed(() => [
  { label: 'Nom complet', value: g.value.full_name ?? `${g.value.first_name ?? ''} ${g.value.last_name ?? ''}`.trim() },
  { label: 'Fonction', value: g.value.function },
  { label: 'Téléphone', value: g.value.phone_number },
  { label: 'Nationalité', value: g.value.nationality },
  { label: 'Date de naissance', value: formatDate(g.value.birth_date) },
  { label: 'Lieu de naissance', value: g.value.birth_place },
  { label: 'Adresse du domicile', value: g.value.home_address, cols: 6 },
  { label: 'Pièce d\'identité', value: identityDocumentLabels[g.value.type_of_identity_document] },
  { label: 'N° de la pièce', value: g.value.number_of_identity_document },
  { label: 'Date de délivrance', value: formatDate(g.value.date_of_issue_of_identity_document) },
])

const documents = computed(() => [
  { label: 'Contrat de caution signé', path: g.value.signed_contract_path, prefix: 'Contrat-Caution' },
  { label: 'Billet à ordre signé', path: g.value.signed_promissory_note_path, prefix: 'Billet-a-ordre-Caution' },
])

const download = async document => {
  try {
    await downloadAuthenticatedFile(document.path, `${document.prefix}-${document.path.split('/').pop()}`)
  }
  catch (error) {
    showSnackbar('error', errorMessage(error, 'Erreur lors du téléchargement'))
  }
}
</script>

<template>
  <section>
    <AppPageHeader
      :title="`Caution ${g.full_name ?? ''}`"
      subtitle="Caution personnelle et solidaire"
      :back="listRoute"
    >
      <template #actions>
        <VBtn
          v-if="$can('update', 'guarantor')"
          prepend-icon="tabler-edit"
          :to="editRoute"
        >
          Modifier
        </VBtn>
      </template>
    </AppPageHeader>

    <VCard
      title="Identité"
      class="mb-6"
    >
      <VCardText>
        <InfoGrid :items="items" />
      </VCardText>
    </VCard>

    <VCard title="Documents signés">
      <VList>
        <VListItem
          v-for="document in documents"
          :key="document.label"
          :prepend-icon="document.path ? 'tabler-file-check' : 'tabler-file-x'"
          :base-color="document.path ? 'success' : 'error'"
        >
          <VListItemTitle class="text-high-emphasis">
            {{ document.label }}
          </VListItemTitle>
          <VListItemSubtitle>{{ document.path ? 'Chargé' : 'Manquant' }}</VListItemSubtitle>
          <template
            v-if="document.path && $can('download', 'guarantor')"
            #append
          >
            <VBtn
              size="small"
              variant="tonal"
              prepend-icon="tabler-download"
              @click="download(document)"
            >
              Télécharger
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCard>
  </section>
</template>
