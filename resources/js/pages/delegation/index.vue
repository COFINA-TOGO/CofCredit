<!--
  Délégations pendant les absences : chacun confie ses droits et ses dossiers à un collègue
  pour une période ; l'administrateur gère celles de tous.
-->
<script setup>
definePage({
  meta: {
    action: 'manage',
    subject: 'settings-user',
  },
})

const STATUS = {
  upcoming: { label: 'À venir', color: 'info' },
  active: { label: 'En cours', color: 'success' },
  ended: { label: 'Terminée', color: 'secondary' },
}

const userData = useCookie('userData')
const page = ref(1)
const itemsPerPage = ref(10)
const status = ref(null)
const loading = ref(false)
const delegations = ref({ data: [], total: 0, last_page: 1 })
const candidates = ref([])

const headers = [
  { title: 'Délégant', key: 'delegator', sortable: false },
  { title: 'Délégataire', key: 'delegate', sortable: false },
  { title: 'Période', key: 'period', sortable: false },
  { title: 'Motif', key: 'reason', sortable: false },
  { title: 'État', key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchDelegations = async () => {
  loading.value = true
  try {
    const res = await $api(createUrl('/delegation', { query: { page: page.value, per_page: itemsPerPage.value, status: status.value } }).value)

    delegations.value = res.status == 200 ? res : { data: [], total: 0, last_page: 1 }
  } finally {
    loading.value = false
  }
}

watch([page, itemsPerPage, status], fetchDelegations)

onMounted(async () => {
  fetchDelegations()

  const res = await $api('/delegation/candidates')
  if (res.status == 200)
    candidates.value = res.data.users.map(user => ({ ...user, title: `${user.full_name} · ${user.profile_fr}` }))
})

// Création
const today = new Date().toISOString().slice(0, 10)
const emptyForm = () => ({ delegator_id: userData.value.id, delegate_id: null, starts_at: today, ends_at: null, reason: '' })
const dialog = reactive({ visible: false, saving: false, form: emptyForm(), errors: {} })

const openCreate = () => Object.assign(dialog, { visible: true, saving: false, form: emptyForm(), errors: {} })

const delegatesFor = computed(() => candidates.value.filter(user => user.id !== dialog.form.delegator_id))

const save = async () => {
  dialog.saving = true
  dialog.errors = {}
  try {
    const res = await $api('/delegation', { method: 'POST', body: dialog.form })
    if (res.status == 201) {
      dialog.visible = false
      showSnackbar('success', 'Délégation enregistrée ; le délégataire est prévenu')
      await fetchDelegations()
    } else {
      dialog.errors = Object.fromEntries(Object.entries(res.errors ?? {}).map(([key, value]) => [key, [].concat(value)[0]]))
      showSnackbar('error', Object.values(dialog.errors)[0] ?? 'Enregistrement impossible')
    }
  } finally {
    dialog.saving = false
  }
}

// Arrêt
const stopping = ref(null)

const stop = async () => {
  const delegation = stopping.value
  const res = await $api(`/delegation/${delegation.id}`, { method: 'DELETE' })

  stopping.value = null
  if (res.status == 200) {
    showSnackbar('success', delegation.status == 'upcoming' ? 'Délégation annulée' : 'Délégation arrêtée')
    await fetchDelegations()
  } else {
    showSnackbar('error', Object.values(res.errors ?? {})[0]?.[0] ?? 'Action impossible')
  }
}

const canStop = delegation => delegation.status != 'ended' && (isAdmin() || delegation.delegator_id == userData.value.id)
</script>

<template>
  <div>
    <AppPageHeader
      title="Délégations"
      subtitle="Confier ses validations et ses dossiers à un collègue pendant une absence"
    >
      <template #actions>
        <VBtn
          prepend-icon="tabler-plus"
          @click="openCreate"
        >
          Nouvelle délégation
        </VBtn>
      </template>
    </AppPageHeader>

    <VAlert
      v-if="userData?.delegators?.length"
      type="info"
      variant="tonal"
      class="mb-6"
      icon="tabler-user-share"
    >
      Vous assurez aujourd'hui l'intérim de
      <strong>{{ userData.delegators.map(delegator => `${delegator.full_name} (${delegator.profile_fr})`).join(', ') }}</strong> :
      vous avez ses droits, ses dossiers et ses alertes.
    </VAlert>

    <VCard>
      <VCardText class="d-flex flex-wrap gap-4 align-center">
        <p class="text-medium-emphasis mb-0 flex-grow-1">
          Pendant la période, le délégataire exerce les droits du délégant, voit ses dossiers et reçoit ses e-mails et alertes.
          Ses décisions sont signées « en intérim » dans l'historique des dossiers.
        </p>
        <AppSelect
          v-model="status"
          :items="Object.entries(STATUS).map(([value, { label }]) => ({ value, title: label }))"
          placeholder="Toutes"
          clearable
          clear-icon="tabler-x"
          style="max-inline-size: 200px;"
        />
      </VCardText>

      <VDivider />

      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="delegations.data"
        :items-length="delegations.total"
        :loading="loading"
        loading-text="En cours de chargement"
        no-data-text="Aucune délégation"
      >
        <template #item.delegator="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium">{{ item.delegator?.full_name }}</span>
            <span class="text-sm text-medium-emphasis">{{ item.delegator?.profile_fr }}</span>
          </div>
        </template>
        <template #item.delegate="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium">{{ item.delegate?.full_name }}</span>
            <span class="text-sm text-medium-emphasis">{{ item.delegate?.profile_fr }}</span>
          </div>
        </template>
        <template #item.period="{ item }">
          du {{ item.starts_at_fr }} au {{ item.ends_at_fr }}
        </template>
        <template #item.reason="{ item }">
          {{ item.reason || '—' }}
        </template>
        <template #item.status="{ item }">
          <VChip
            label
            size="small"
            :color="STATUS[item.status].color"
          >
            {{ STATUS[item.status].label }}
          </VChip>
        </template>
        <template #item.actions="{ item }">
          <IconBtn
            v-if="canStop(item)"
            :aria-label="item.status == 'upcoming' ? 'Annuler' : 'Arrêter'"
            @click="stopping = item"
          >
            <VTooltip
              activator="parent"
              location="top"
            >
              {{ item.status == 'upcoming' ? 'Annuler' : 'Arrêter maintenant' }}
            </VTooltip>
            <VIcon
              icon="tabler-player-stop"
              color="error"
            />
          </IconBtn>
        </template>

        <template #bottom>
          <TablePagination
            v-model:page="page"
            v-model:items-per-page="itemsPerPage"
            :total-items="delegations.total"
            :last-page="delegations.last_page"
          />
        </template>
      </VDataTableServer>
    </VCard>

    <!-- Nouvelle délégation -->
    <VDialog
      v-model="dialog.visible"
      max-width="560"
      :persistent="dialog.saving"
    >
      <DialogCloseBtn @click="dialog.visible = false" />
      <VCard title="Nouvelle délégation">
        <VCardText>
          <VRow>
            <VCol
              v-if="isAdmin()"
              cols="12"
            >
              <AppAutocomplete
                v-model="dialog.form.delegator_id"
                :items="candidates"
                item-value="id"
                label="Délégant (la personne absente)"
                :error-messages="dialog.errors.delegator_id"
              />
            </VCol>
            <VCol cols="12">
              <AppAutocomplete
                v-model="dialog.form.delegate_id"
                :items="delegatesFor"
                item-value="id"
                label="Délégataire (l'intérimaire)"
                placeholder="Choisir un collègue"
                :error-messages="dialog.errors.delegate_id"
              />
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <AppDateTimePicker
                v-model="dialog.form.starts_at"
                label="Du"
                :error-messages="dialog.errors.starts_at"
              />
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <AppDateTimePicker
                v-model="dialog.form.ends_at"
                label="Au (inclus)"
                :config="{ minDate: dialog.form.starts_at }"
                :error-messages="dialog.errors.ends_at"
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="dialog.form.reason"
                label="Motif (facultatif)"
                placeholder="Ex : congés annuels"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="d-flex justify-end gap-3">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="dialog.saving"
            @click="dialog.visible = false"
          >
            Annuler
          </VBtn>
          <VBtn
            :loading="dialog.saving"
            :disabled="!dialog.form.delegate_id || !dialog.form.starts_at || !dialog.form.ends_at"
            prepend-icon="tabler-user-share"
            @click="save"
          >
            Déléguer
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Arrêt -->
    <VDialog
      :model-value="!!stopping"
      class="v-dialog-sm"
      @update:model-value="stopping = null"
    >
      <VCard
        v-if="stopping"
        :title="stopping.status == 'upcoming' ? 'Annuler la délégation' : 'Arrêter la délégation'"
      >
        <VCardText>
          {{ stopping.delegate?.full_name }} n'aura plus les droits de {{ stopping.delegator?.full_name }}.
          <span v-if="stopping.status == 'active'">La délégation restera visible, terminée à la date d'hier.</span>
        </VCardText>
        <VCardText class="d-flex justify-end gap-3">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="stopping = null"
          >
            Retour
          </VBtn>
          <VBtn
            color="error"
            @click="stop"
          >
            {{ stopping.status == 'upcoming' ? 'Annuler la délégation' : 'Arrêter' }}
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
