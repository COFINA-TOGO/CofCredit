/**
 * Vrai pour l'administrateur : il n'est jamais bloqué par l'état d'un dossier
 * (boutons de modification, validation à n'importe quel niveau)
 * @returns {boolean}
 */
export const isAdmin = () => useCookie('userData').value?.role === 'admin'

/**
 * Vrai si l'utilisateur exerce ce profil, en propre ou en intérim (délégation du jour)
 * @param {string} role Le profil (head_credit, credit_admin...)
 * @returns {boolean}
 */
export const hasRole = role => {
  const userData = useCookie('userData').value

  return (userData?.acting_profiles ?? [userData?.role]).includes(role)
}

/**
 * Identifiants dont l'utilisateur répond : le sien et ceux des collègues qu'il remplace
 * @returns {number[]}
 */
export const actingIds = () => {
  const userData = useCookie('userData').value

  return userData?.acting_ids ?? [userData?.id]
}
