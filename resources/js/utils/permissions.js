/**
 * Vrai pour l'administrateur : il n'est jamais bloqué par l'état d'un dossier
 * (boutons de modification, validation à n'importe quel niveau)
 * @returns {boolean}
 */
export const isAdmin = () => useCookie('userData').value?.role === 'admin'
