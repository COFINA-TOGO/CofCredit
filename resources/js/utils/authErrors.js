/**
 * Gestion commune des erreurs d'authentification renvoyées par l'API
 * @param {number} httpStatus - Le statut HTTP de la réponse
 * @param {object|null} body - Le corps JSON de la réponse
 */
export const handleAuthErrors = (httpStatus, body) => {
  if (httpStatus === 401) {
    useCookie('userToken').value = null
    useCookie('userData').value = null
    useCookie('userAbilityRules').value = null
    useAbility().update([])
    window.location.href = '/login'

    return
  }

  if (body?.status !== 403)
    return

  const subCode = body.errors?.sub_code?.[0]

  // 001 : compte désactivé
  if (subCode === '001') {
    useCookie('userToken').value = null
    useCookie('userData').value = null
    useCookie('userAbilityRules').value = null
    window.location.href = '/not-authorized'
  }

  // 002 : changement de mot de passe obligatoire
  else if (subCode === '002' && window.location.pathname !== '/settings/user/security') {
    window.location.href = '/settings/user/security'
  }
}
