<script setup>
import navItems from '@/navigation/vertical'

definePage({
  meta: {
    action: 'manage',
    subject: 'settings-user',
  },
})

const ability = useAbility()
const userData = useCookie('userData')

const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const { data: dashboard, execute: refresh, isFetching } = await useApi('/dashboard')
const items = computed(() => dashboard.value?.data?.items ?? [])
const pendingItems = computed(() => items.value.filter(item => item.count > 0))

// Raccourcis : les entrées « Créer / Ajouter / Nouveau » du menu accessibles à l'utilisateur
const shortcuts = computed(() => {
  const result = []

  const walk = (entries, parents) => {
    for (const entry of entries) {
      if (entry.heading)
        continue
      if (entry.children)
        walk(entry.children, [...parents, entry.title])
      else if (entry.to && ['Créer', 'Ajouter', 'Nouveau'].includes(entry.title) && ability.can(entry.action, entry.subject))
        result.push({ title: parents.filter(title => title !== 'Basique').join(' · '), to: entry.to })
    }
  }

  walk(navItems, [])

  return result
})
</script>

<template>
  <div>
    <VCard class="mb-6">
      <VCardText class="d-flex flex-wrap align-center gap-4">
        <div class="flex-grow-1">
          <div class="text-overline text-medium-emphasis">
            {{ today }}
          </div>
          <h4 class="text-h4">
            Bonjour {{ userData?.fullName }}
          </h4>
          <div class="text-body-1 text-medium-emphasis">
            {{ userData?.role_fr }}
          </div>
        </div>
        <VBtn
          variant="tonal"
          prepend-icon="tabler-refresh"
          :loading="isFetching"
          @click="refresh"
        >
          Actualiser
        </VBtn>
      </VCardText>
    </VCard>

    <VRow>
      <VCol
        cols="12"
        :md="shortcuts.length ? 8 : 12"
      >
        <VCard
          title="À traiter"
          subtitle="Les dossiers qui attendent votre action"
        >
          <VCardText v-if="pendingItems.length">
            <VRow>
              <VCol
                v-for="item in pendingItems"
                :key="item.label"
                cols="12"
                sm="6"
              >
                <VCard
                  variant="outlined"
                  :to="item.to"
                  class="h-100"
                >
                  <VCardText class="d-flex align-center gap-4">
                    <VAvatar
                      :color="item.color"
                      variant="tonal"
                      rounded
                      size="44"
                    >
                      <VIcon
                        :icon="item.icon"
                        size="26"
                      />
                    </VAvatar>
                    <div class="flex-grow-1">
                      <div
                        class="text-h4"
                        :class="`text-${item.color}`"
                      >
                        {{ item.count }}
                      </div>
                      <div class="text-body-1">
                        {{ item.label }}
                      </div>
                    </div>
                    <VIcon
                      icon="tabler-chevron-right"
                      class="text-disabled"
                    />
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCardText>
          <VCardText
            v-else
            class="text-center py-10"
          >
            <VIcon
              icon="tabler-mood-smile"
              size="40"
              class="text-disabled mb-2"
            />
            <div class="text-body-1">
              Rien n'attend votre action.
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        v-if="shortcuts.length"
        cols="12"
        md="4"
      >
        <VCard title="Raccourcis">
          <VList>
            <VListItem
              v-for="shortcut in shortcuts"
              :key="shortcut.title"
              :to="shortcut.to"
              prepend-icon="tabler-plus"
            >
              <VListItemTitle>Créer · {{ shortcut.title }}</VListItemTitle>
            </VListItem>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
