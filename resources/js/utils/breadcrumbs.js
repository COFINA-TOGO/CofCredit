import navItems from '@/navigation/vertical'

const routeNameOf = to => (typeof to === 'string' ? to : to?.name)

// Listes absentes du menu (sections commentées) : chemin affiché explicitement
const extraTrails = {
  'pv-notification-without-pv': ['Notifications CAF', 'Sans PV'],

  // Préfixe des fiches et formulaires de notification CAF (pv-notification-id, -edit-id, -check-id)
  'pv-notification': ['Notifications CAF', 'Sans PV'],
  'pv-notification-historical': ['Notifications CAF', 'Historique'],
  'pv-notification-add': ['Notifications CAF', 'Créer'],
  'pv-without-notification': ['Contrat', 'Hypothécaire', 'PV sans notification'],
  'simple-notification': ['Notification simplifiée', 'Sans validation Head'],
  'simple-notification-without-signed-notification': ['Notification simplifiée', 'Sans notification signée'],
  'simple-notification-historical': ['Notification simplifiée', 'Historique'],
  'simple-notification-add': ['Notification simplifiée', 'Créer'],
  'cat-simple-notification': ['CAT', 'Notification simplifiée'],
  'cat-simple-notification-add': ['CAT', 'Notification simplifiée', 'Créer'],
}

// Route vers laquelle pointe le dernier élément quand le préfixe n'est pas lui-même une route
const extraLinks = { 'pv-notification': 'pv-notification-without-pv' }

const extraTrail = name => extraTrails[name]?.map((title, index, titles) => ({
  title,
  to: index === titles.length - 1 ? { name: extraLinks[name] ?? name } : undefined,
}))

/**
 * Chemin de titres menant à une route dans le menu (ex : ['Contrat', 'Basique', 'Sans CAT'])
 * @param {string} name - Le nom de la route
 * @returns {Array|null}
 */
const findTrail = (name, items = navItems, parents = []) => {
  for (const item of items) {
    if (item.heading)
      continue
    const trail = [...parents, { title: item.title, to: item.to }]
    if (routeNameOf(item.to) === name)
      return trail
    if (item.children) {
      const found = findTrail(name, item.children, trail)
      if (found)
        return found
    }
  }

  return null
}

// Libellé de la page selon la fin du nom de route, pour les pages absentes du menu
const suffixLabels = [
  [/-edit-id$/, 'Modification'],
  [/-add$/, 'Création'],
  [/-check-id$/, 'Vérification'],
  [/-guarantor(-.*)?$/, 'Cautions'],
  [/-id$/, 'Détail'],
]

/**
 * Fil d'Ariane d'une route : son chemin dans le menu, ou celui de la liste parente suivi du type de page
 * @param {object} route - La route courante
 * @returns {Array<{title: string, to?: object}>}
 */
export const breadcrumbsFor = route => {
  const name = String(route.name ?? '')
  const direct = findTrail(name) ?? extraTrail(name)
  if (direct)
    return direct

  const parts = name.split('-')
  for (let i = parts.length - 1; i > 0; i--) {
    const parentName = parts.slice(0, i).join('-')
    const parentTrail = findTrail(parentName) ?? extraTrail(parentName)
    const label = suffixLabels.find(([pattern]) => pattern.test(name))?.[1]

    // Seules les pages de détail, création, modification... héritent du chemin de leur liste
    if (parentTrail && label)
      return [...parentTrail, { title: label }]
  }

  return []
}
