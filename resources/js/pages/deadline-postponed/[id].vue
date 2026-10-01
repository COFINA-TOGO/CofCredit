<script setup>
definePage({
  meta: {
    action: 'read',
    subject: 'deadline-postponed',
  },
})

const router = useRouter()
const route = useRoute('deadline-postponed-id')

const { data: deadline } = await useApi(`/deadline-postponed/${route.params.id}?with_caf=true`)

if (deadline.value.status == 200)
  deadline.value = deadline.value.data.deadlinePostponed
else
  router.push({ name: 'deadline-postponed' })

const items = computed(() => [
  { label: 'N° du crédit', value: deadline.value.credit_number },
  { label: 'Bénéficiaire', value: deadline.value.beneficiary_label },
  { label: 'Représentant', value: `${deadline.value.representative_civility ?? ''} ${deadline.value.representative_first_name ?? ''} ${deadline.value.representative_last_name ?? ''}`.trim() },
  { label: 'Montant du crédit', value: formatAmount(deadline.value.loan_amount) },
  { label: 'N° de l\'échéance', value: deadline.value.deadline_number },
  { label: 'Ancienne date', value: formatDate(deadline.value.old_date) },
  { label: 'Nouvelle date', value: formatDate(deadline.value.new_date) },
  { label: 'Rallonge', value: deadline.value.extension },
  { label: 'Initié par', value: deadline.value.caf?.full_name },
  { label: 'Créé le', value: deadline.value.created_at_fr },
])

const documents = computed(() => [
  { label: 'Document de la demande', path: deadline.value.request_path, prefix: 'Demande' },
  { label: 'Mémo', path: deadline.value.memo_path, prefix: 'Memo' },
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
  <section v-if="deadline">
    <AppPageHeader
      :title="`Report d'échéance ${deadline.credit_number}`"
      :subtitle="deadline.beneficiary_label"
      :back="{ name: 'deadline-postponed' }"
    >
      <template #actions>
        <VChip
          v-if="deadline.status_fr"
          :color="deadline.status_fr.color"
          label
        >
          {{ deadline.status_fr.value }}
        </VChip>
      </template>
    </AppPageHeader>

    <VCard
      title="Demande"
      class="mb-6"
    >
      <VCardText>
        <InfoGrid :items="items" />
      </VCardText>
    </VCard>

    <VCard title="Pièces jointes">
      <VList>
        <VListItem
          v-for="document in documents"
          :key="document.label"
          :prepend-icon="document.path ? 'tabler-file-check' : 'tabler-file-x'"
        >
          <VListItemTitle>{{ document.label }}</VListItemTitle>
          <VListItemSubtitle>{{ document.path ? 'Chargé' : 'Manquant' }}</VListItemSubtitle>
          <template
            v-if="document.path"
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
