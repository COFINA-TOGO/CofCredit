<script setup>
definePage({
  meta: {
    action: 'read',
    subject: 'user',
  },
})

const router = useRouter()
const route = useRoute('user-id')

const { data: user } = await useApi(`/user/${route.params.id}`)

if (user.value.status == 200)
  user.value = user.value.data.user
else
  router.push({ name: 'user' })

const items = computed(() => [
  { label: 'Nom complet', value: user.value.full_name },
  { label: 'Identifiant', value: user.value.name },
  { label: 'Email', value: user.value.email },
  { label: 'Profil', value: user.value.profile_fr },
  { label: 'Compte', value: user.value.activated ? 'Activé' : 'Désactivé', chip: { color: user.value.activated ? 'success' : 'error' } },
  { label: 'Changement de mot de passe', value: user.value.password_change_required ? 'Obligatoire à la prochaine connexion' : 'Non requis' },
  { label: 'Créé le', value: user.value.created_at_fr },
  { label: 'Modifié le', value: user.value.updated_at_fr },
])
</script>

<template>
  <section v-if="user">
    <AppPageHeader
      :title="user.full_name"
      :subtitle="user.profile_fr"
      :back="{ name: 'user' }"
    >
      <template #actions>
        <VBtn
          v-if="$can('update', 'user')"
          prepend-icon="tabler-edit"
          :to="{ name: 'user-edit-id', params: { id: user.id } }"
        >
          Modifier
        </VBtn>
      </template>
    </AppPageHeader>

    <VCard title="Compte">
      <VCardText>
        <InfoGrid :items="items" />
      </VCardText>
    </VCard>
  </section>
</template>
