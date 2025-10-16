<!-- Composant pour le menu d'actions d'un contrat -->
<script setup>
const props = defineProps({
  contract: {
    type: Object,
    required: true,
  },
  canRead: {
    type: Boolean,
    default: false,
  },
  canDownload: {
    type: Boolean,
    default: false,
  },
  canUpload: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'downloadUnsignedContract',
  'downloadSignedContract',
  'downloadUnsignedPromissoryNote',
  'downloadSignedPromissoryNote',
  'downloadHandwrittenMention',
  'uploadContract',
  'uploadPromissoryNote',
])

/**
 * Vérifie si l'upload est autorisé pour ce contrat
 */
const canUploadDocuments = computed(() => {
  if (!props.canUpload) return false
  
  const { status, signed_contract_path, signed_promissory_note_path } = props.contract
  
  return (
    signed_contract_path == null ||
    signed_promissory_note_path == null ||
    status === 'rejected' ||
    (status !== 'pending_head_validation' && status !== 'validated')
  )
})

/**
 * Vérifie si l'upload du contrat est autorisé
 */
const canUploadContract = computed(() => {
  if (!canUploadDocuments.value) return false
  
  const { status, signed_contract_path } = props.contract
  
  return (
    signed_contract_path == null ||
    status === 'rejected' ||
    (status !== 'pending_head_validation' && status !== 'validated')
  )
})

/**
 * Vérifie si l'upload du billet à ordre est autorisé
 */
const canUploadPromissoryNote = computed(() => {
  if (!canUploadDocuments.value) return false
  
  const { status, signed_promissory_note_path } = props.contract
  
  return (
    signed_promissory_note_path == null ||
    status === 'rejected' ||
    (status !== 'pending_head_validation' && status !== 'validated')
  )
})
</script>

<template>
  <VMenu activator="parent">
    <VList>
      <!-- Voir les cautions -->
      <VBadge
        v-if="canRead"
        inline
        :content="contract.guarantors_count"
      >
        <VListItem
          :to="{
            name: 'contract-contract_id-guarantor',
            params: { contract_id: contract.id },
          }"
        >
          <template #prepend>
            <VIcon icon="tabler-users" />
          </template>
          <VListItemTitle>Voir les Cautions</VListItemTitle>
        </VListItem>
      </VBadge>

      <!-- Voir le PV -->
      <VListItem
        v-if="canRead && contract.verbal_trial"
        :to="{
          name: 'pv-id',
          params: { id: contract.verbal_trial.id },
        }"
      >
        <template #prepend>
          <VIcon icon="tabler-eye" />
        </template>
        <VListItemTitle>Voir le Pv</VListItemTitle>
      </VListItem>

      <!-- Section téléchargements -->
      <template v-if="canDownload">
        <VDivider />
        
        <!-- Télécharger contrat non-signé -->
        <VListItem @click="emit('downloadUnsignedContract', contract)">
          <template #prepend>
            <VIcon icon="tabler-download" />
          </template>
          <VListItemTitle>Télécharger Contrat non-signé</VListItemTitle>
        </VListItem>

        <!-- Télécharger contrat signé -->
        <VListItem
          v-if="contract.signed_contract_path"
          @click="emit('downloadSignedContract', contract)"
        >
          <template #prepend>
            <VIcon icon="tabler-download" />
          </template>
          <VListItemTitle>Télécharger Contrat signé</VListItemTitle>
        </VListItem>

        <!-- Télécharger billet à ordre non-signé -->
        <VListItem @click="emit('downloadUnsignedPromissoryNote', contract)">
          <template #prepend>
            <VIcon icon="tabler-download" />
          </template>
          <VListItemTitle>Télécharger Billet à ordre non signé</VListItemTitle>
        </VListItem>

        <!-- Télécharger billet à ordre signé -->
        <VListItem
          v-if="contract.signed_promissory_note_path"
          @click="emit('downloadSignedPromissoryNote', contract)"
        >
          <template #prepend>
            <VIcon icon="tabler-download" />
          </template>
          <VListItemTitle>Télécharger Billet à ordre signé</VListItemTitle>
        </VListItem>

        <!-- Télécharger mention manuscrite -->
        <VListItem @click="emit('downloadHandwrittenMention', contract)">
          <template #prepend>
            <VIcon icon="tabler-download" />
          </template>
          <VListItemTitle>Télécharger Mention manuscrite</VListItemTitle>
        </VListItem>
      </template>

      <!-- Section uploads -->
      <template v-if="canUploadDocuments">
        <VDivider />

        <!-- Ajouter contrat signé -->
        <VListItem
          v-if="canUploadContract"
          @click="emit('uploadContract')"
        >
          <template #prepend>
            <VIcon icon="tabler-cloud-upload" />
          </template>
          <VListItemTitle>Ajouter contrat signé</VListItemTitle>
        </VListItem>

        <!-- Ajouter billet à ordre -->
        <VListItem
          v-if="canUploadPromissoryNote"
          @click="emit('uploadPromissoryNote')"
        >
          <template #prepend>
            <VIcon icon="tabler-cloud-upload" />
          </template>
          <VListItemTitle>Ajouter billet à ordre signé</VListItemTitle>
        </VListItem>
      </template>
    </VList>
  </VMenu>
</template>

