<script setup>
import { computed, reactive, watch } from 'vue'

// Actions groupées sur les lignes cochées d'une liste.
//
// Chaque action décrit :
//   - label, icon, color : le bouton ;
//   - eligible(item)     : si l'action s'applique à cette ligne (mêmes règles que le bouton de la ligne) ;
//   - run(item, comment) : l'appel pour une ligne ;
//   - comment            : libellé du motif obligatoire (rejet, renvoi...), absent sinon ;
//   - confirm            : false pour lancer sans confirmation (téléchargements) ;
//   - menu               : regroupe l'action dans un menu de ce nom (ex. « Télécharger »).
//
// Les lignes sont traitées une par une ; celles où l'action ne s'applique pas sont ignorées.
const props = defineProps({
  // Identifiants des lignes cochées (v-model de la table)
  modelValue: { type: Array, default: () => [] },

  // Lignes de la page courante
  items: { type: Array, default: () => [] },
  actions: { type: Array, default: () => [] },

  // Nom d'une ligne dans le récapitulatif
  itemTitle: { type: Function, default: item => item.label ?? item.full_name ?? item.name ?? `#${item.id}` },
})

const emit = defineEmits(['update:modelValue', 'done'])

const selectedItems = computed(() => props.items.filter(item => props.modelValue.includes(item.id)))
const eligibleItems = action => selectedItems.value.filter(item => action.eligible?.(item) ?? true)

// Une ligne qui disparaît de la page (rechargement, changement de page) est décochée
watch(() => props.items, items => {
  const ids = items.map(item => item.id)
  const kept = props.modelValue.filter(id => ids.includes(id))
  if (kept.length !== props.modelValue.length)
    emit('update:modelValue', kept)
})

const buttons = computed(() => props.actions.filter(action => !action.menu))

// Actions regroupées par menu : { Télécharger: [...] }
const menus = computed(() => props.actions.filter(action => action.menu).reduce((groups, action) => {
  (groups[action.menu] ??= []).push(action)

  return groups
}, {}))

const dialog = reactive({ visible: false, action: null, comment: '' })
const progress = reactive({ running: false, done: 0, total: 0 })

const open = action => {
  if (action.confirm === false)
    return execute(action)
  Object.assign(dialog, { visible: true, action, comment: '' })
}

const execute = async (action, comment = '') => {
  const targets = eligibleItems(action)
  const failures = []

  Object.assign(progress, { running: true, done: 0, total: targets.length })
  for (const item of targets) {
    try {
      await action.run(item, comment)
    } catch (error) {
      failures.push({ item, error })
    }
    progress.done++
  }
  progress.running = false
  dialog.visible = false

  const succeeded = targets.length - failures.length
  if (!failures.length) {
    showSnackbar('success', `${actionName(action)} : ${succeeded} ligne${succeeded > 1 ? 's' : ''} traitée${succeeded > 1 ? 's' : ''}`)
  } else {
    const first = failures[0]

    showSnackbar('error', `${actionName(action)} : ${failures.length} échec${failures.length > 1 ? 's' : ''} sur ${targets.length} (${props.itemTitle(first.item)} : ${errorMessage(first.error, 'erreur')})`)
  }

  // Seules les lignes en échec restent cochées
  emit('update:modelValue', failures.map(({ item }) => item.id))
  if (action.confirm !== false)
    emit('done')
}

const actionName = action => action.menu ? `${action.menu} ${action.label}` : action.label

const confirm = () => {
  const action = dialog.action
  if (action.comment && !dialog.comment.trim())
    return
  execute(action, dialog.comment.trim())
}
</script>

<template>
  <VExpandTransition>
    <div
      v-if="modelValue.length"
      class="bulk-actions d-flex align-center flex-wrap gap-2 px-5 py-3"
    >
      <span class="text-body-1 font-weight-medium me-2">
        {{ modelValue.length }} sélectionnée{{ modelValue.length > 1 ? 's' : '' }}
      </span>

      <VBtn
        v-for="action in buttons"
        :key="action.label"
        size="small"
        variant="tonal"
        :color="action.color"
        :prepend-icon="action.icon"
        :disabled="progress.running || !eligibleItems(action).length"
        @click="open(action)"
      >
        {{ action.label }} ({{ eligibleItems(action).length }})
      </VBtn>

      <VBtn
        v-for="(group, name) in menus"
        :key="name"
        size="small"
        variant="tonal"
        color="secondary"
        prepend-icon="tabler-download"
        append-icon="tabler-chevron-down"
        :disabled="progress.running || !group.some(action => eligibleItems(action).length)"
      >
        {{ name }}
        <VMenu activator="parent">
          <VList density="compact">
            <VListItem
              v-for="action in group"
              :key="action.label"
              :title="`${action.label.charAt(0).toUpperCase()}${action.label.slice(1)} (${eligibleItems(action).length})`"
              :prepend-icon="action.icon"
              :disabled="!eligibleItems(action).length"
              @click="open(action)"
            />
          </VList>
        </VMenu>
      </VBtn>

      <VSpacer />

      <VProgressLinear
        v-if="progress.running && !dialog.visible"
        :model-value="progress.total ? progress.done / progress.total * 100 : 0"
        color="primary"
        rounded
        class="bulk-actions__progress"
      />
      <VBtn
        size="small"
        variant="text"
        prepend-icon="tabler-x"
        :disabled="progress.running"
        @click="emit('update:modelValue', [])"
      >
        Tout décocher
      </VBtn>
    </div>
  </VExpandTransition>

  <VDialog
    v-model="dialog.visible"
    class="v-dialog-sm"
    :persistent="progress.running"
  >
    <DialogCloseBtn
      :disabled="progress.running"
      @click="dialog.visible = false"
    />

    <VCard v-if="dialog.action">
      <VCardItem>
        <template #prepend>
          <VAvatar
            :color="dialog.action.color"
            variant="tonal"
            rounded
          >
            <VIcon :icon="dialog.action.icon" />
          </VAvatar>
        </template>
        <VCardTitle>{{ dialog.action.label }}</VCardTitle>
        <VCardSubtitle>
          {{ eligibleItems(dialog.action).length }} ligne{{ eligibleItems(dialog.action).length > 1 ? 's' : '' }} concernée{{ eligibleItems(dialog.action).length > 1 ? 's' : '' }}
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <p
          v-if="eligibleItems(dialog.action).length < selectedItems.length"
          class="text-medium-emphasis"
        >
          {{ selectedItems.length - eligibleItems(dialog.action).length }} ligne(s) cochée(s) ignorée(s) : l'action ne s'y applique pas.
        </p>
        <VChip
          v-for="item in eligibleItems(dialog.action)"
          :key="item.id"
          size="small"
          class="me-1 mb-1"
        >
          {{ itemTitle(item) }}
        </VChip>

        <AppTextarea
          v-if="dialog.action.comment"
          v-model="dialog.comment"
          class="mt-4"
          :label="`${dialog.action.comment} *`"
          rows="3"
          autofocus
          :disabled="progress.running"
        />

        <VProgressLinear
          v-if="progress.running"
          :model-value="progress.total ? progress.done / progress.total * 100 : 0"
          color="primary"
          rounded
          class="mt-4"
        />
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          :disabled="progress.running"
          @click="dialog.visible = false"
        >
          Annuler
        </VBtn>
        <VBtn
          :color="dialog.action.color"
          :prepend-icon="dialog.action.icon"
          :loading="progress.running"
          :disabled="!!dialog.action.comment && !dialog.comment.trim()"
          @click="confirm"
        >
          {{ dialog.action.label }}
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.bulk-actions {
  background: rgba(var(--v-theme-primary), 0.06);
  border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.bulk-actions__progress {
  max-inline-size: 160px;
}
</style>
