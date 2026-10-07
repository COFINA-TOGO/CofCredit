<!-- Alertes de l'utilisateur connecté (les mêmes messages que les e-mails), relevées chaque minute -->
<script setup>
const router = useRouter()
const alerts = ref([])
const unread = ref(0)
let timer = null

const fetchAlerts = async () => {
  const res = await $api('/alert').catch(() => null)
  if (res?.status == 200) {
    alerts.value = res.data.alerts
    unread.value = res.data.unread
  }
}

const open = async alert => {
  if (!alert.read_at) {
    alert.read_at = new Date().toISOString()
    unread.value = Math.max(0, unread.value - 1)
    $api(`/alert/read/${alert.id}`, { method: 'PUT' })
  }
  if (alert.link)
    router.push(alert.link)
}

const readAll = async () => {
  await $api('/alert/read-all', { method: 'PUT' })
  await fetchAlerts()
}

onMounted(() => {
  fetchAlerts()
  timer = setInterval(fetchAlerts, 60000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <IconBtn
    id="notification-btn"
    aria-label="Alertes"
  >
    <VBadge
      :model-value="unread > 0"
      color="error"
      :content="unread > 99 ? '99+' : unread"
      offset-x="2"
      offset-y="2"
    >
      <VIcon
        size="26"
        icon="tabler-bell"
      />
    </VBadge>

    <VMenu
      activator="parent"
      width="380px"
      location="bottom end"
      offset="14px"
      :close-on-content-click="false"
    >
      <VCard class="d-flex flex-column">
        <VCardItem class="py-3">
          <VCardTitle class="text-lg">
            Alertes
          </VCardTitle>
          <template #append>
            <VBtn
              v-if="unread"
              size="small"
              variant="text"
              @click="readAll"
            >
              Tout marquer comme lu
            </VBtn>
          </template>
        </VCardItem>

        <VDivider />

        <div class="alerts-list">
          <VList
            v-if="alerts.length"
            class="py-0"
          >
            <template
              v-for="(alert, index) in alerts"
              :key="alert.id"
            >
              <VDivider v-if="index > 0" />
              <VListItem
                lines="three"
                :class="{ 'alert-unread': !alert.read_at }"
                @click="open(alert)"
              >
                <template #prepend>
                  <VAvatar
                    size="36"
                    variant="tonal"
                    :color="alert.read_at ? 'secondary' : 'primary'"
                  >
                    <VIcon
                      size="20"
                      icon="tabler-bell-ringing"
                    />
                  </VAvatar>
                </template>
                <VListItemTitle class="font-weight-medium text-wrap">
                  {{ alert.title }}
                </VListItemTitle>
                <VListItemSubtitle>{{ alert.body }}</VListItemSubtitle>
                <span class="text-xs text-disabled">{{ alert.created_at_human }}</span>
              </VListItem>
            </template>
          </VList>

          <div
            v-else
            class="text-center text-medium-emphasis pa-6"
          >
            <VIcon
              icon="tabler-bell-off"
              size="32"
              class="mb-2"
            />
            <p class="mb-0">
              Aucune alerte
            </p>
          </div>
        </div>
      </VCard>
    </VMenu>
  </IconBtn>
</template>

<style scoped>
.alerts-list {
  max-block-size: 26rem;
  overflow-y: auto;
}

.alert-unread {
  background: rgba(var(--v-theme-primary), 0.05);
}
</style>
