<!-- Composant pour les actions de validation d'un contrat -->
<script setup>
const props = defineProps({
  contract: {
    type: Object,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['adminValidate', 'headValidate', 'headReject'])

const router = useRouter()

/**
 * Vérifie si l'admin peut valider
 */
const canAdminValidate = computed(() => {
  return (
    props.contract.status === 'pending_admin_validation' &&
    hasRole('credit_admin') &&
    actingIds().includes(props.contract.creator_id)
  )
})

/**
 * Vérifie si le head peut valider/rejeter
 */
const canHeadValidate = computed(() => {
  return (
    props.contract.status === 'pending_head_validation' &&
    hasRole('head_credit')
  )
})

/**
 * Vérifie si l'admin peut créer un CAT
 */
const canCreateCAT = computed(() => {
  return (
    props.contract.status === 'validated' &&
    hasRole('credit_admin') &&
    !props.contract.c_a_t
  )
})

/**
 * Redirige vers la page de création de CAT
 */
const createCAT = () => {
  router.push({ 
    name: 'cat-add',
    query: { contract_id: props.contract.id },
  })
}
</script>

<template>
  <!-- Validation Admin Crédit -->
  <VBtn
    v-if="canAdminValidate"
    size="small"
    color="primary"
    variant="tonal"
    @click="emit('adminValidate', contract.id)"
  >
    <VIcon icon="tabler-send" />
    <VTooltip 
      activator="parent" 
      transition="scroll-x-transition" 
      location="top"
    >
      Envoyer en validation
    </VTooltip>
  </VBtn>

  <!-- Validation Head Crédit -->
  <template v-if="canHeadValidate">
    <VBtn
      size="small"
      color="success"
      variant="tonal"
      @click="emit('headValidate', contract.id)"
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
      @click="emit('headReject', contract.id)"
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

  <!-- Créer le CAT (Admin Crédit seulement, contrat validé sans CAT) -->
  <VBtn
    v-if="canCreateCAT"
    size="small"
    color="info"
    variant="tonal"
    @click="createCAT"
  >
    <VIcon icon="tabler-file-plus" />
    <VTooltip 
      activator="parent" 
      transition="scroll-x-transition" 
      location="top"
    >
      Créer le CAT
    </VTooltip>
  </VBtn>
</template>

