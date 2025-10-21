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
 * Vérifie si l'upload du contrat est autorisé
 * L'upload est autorisé si le contrat n'est pas validé par l'admin (pending_head_validation ou validated)
 */
const canUploadContract = computed(() => {
  if (!props.canUpload) return false
  
  const { status, signed_contract_path } = props.contract
  
  // Si le fichier n'existe pas, on peut toujours uploader (sauf si validé)
  if (signed_contract_path == null && status !== 'pending_head_validation' && status !== 'validated') {
    return true
  }
  
  // Si le contrat est rejeté, on peut uploader à nouveau
  if (status === 'rejected') {
    return true
  }
  
  // Si le contrat n'est pas encore validé par l'admin, on peut uploader indéfiniment
  if (status !== 'pending_head_validation' && status !== 'validated') {
    return true
  }
  
  return false
})

/**
 * Vérifie si l'upload du billet à ordre est autorisé
 * L'upload est autorisé si le contrat n'est pas validé par l'admin (pending_head_validation ou validated)
 */
const canUploadPromissoryNote = computed(() => {
  if (!props.canUpload) return false
  
  const { status, signed_promissory_note_path } = props.contract
  
  // Si le fichier n'existe pas, on peut toujours uploader (sauf si validé)
  if (signed_promissory_note_path == null && status !== 'pending_head_validation' && status !== 'validated') {
    return true
  }
  
  // Si le contrat est rejeté, on peut uploader à nouveau
  if (status === 'rejected') {
    return true
  }
  
  // Si le contrat n'est pas encore validé par l'admin, on peut uploader indéfiniment
  if (status !== 'pending_head_validation' && status !== 'validated') {
    return true
  }
  
  return false
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
      <template v-if="canUpload && (canUploadContract || canUploadPromissoryNote)">
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

