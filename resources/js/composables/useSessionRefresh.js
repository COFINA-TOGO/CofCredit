import { useAbility } from '@casl/vue'

/**
 * Données de session d'un utilisateur, telles que l'application les garde en cookie.
 * Les profils exercés et les droits incluent les intérims (délégations) du jour.
 */
export const sessionUserData = user => ({
  id: user.id,
  fullName: user.full_name,
  username: user.name,
  avatar: '/images/avatars/avatar-1.png',
  signatory: user.signatory_path ? user.signatory_path : '/images/avatars/avatar-14.png',
  email: user.email,
  role: user.profile,
  role_fr: user.profile_fr,
  acting_profiles: user.acting_profiles ?? [user.profile],
  acting_ids: user.acting_ids ?? [user.id],
  delegators: user.delegators ?? [],
})

/**
 * Relit la session toutes les cinq minutes : une délégation qui commence ou s'arrête
 * prend effet sans avoir à se reconnecter.
 */
export const useSessionRefresh = () => {
  const ability = useAbility()
  let timer = null

  const refresh = async () => {
    const res = await $api('/auth/show').catch(() => null)
    if (res?.status != 200)
      return
    useCookie('userAbilityRules').value = res.data.ability_rules
    ability.update(res.data.ability_rules)
    useCookie('userData').value = sessionUserData(res.data)
  }

  onMounted(() => {
    refresh()
    timer = setInterval(refresh, 5 * 60000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  return { refresh }
}
