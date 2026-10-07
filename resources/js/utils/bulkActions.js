// Briques des actions groupées sur les lignes cochées (voir components/BulkActions.vue).
// Chaque page compose ses actions avec les mêmes droits et les mêmes conditions que ses boutons de ligne.
import { $apiOrThrow } from './api'
import { downloadAuthenticatedFile } from './fileDownload'

/**
 * Nom du fichier téléchargé à partir du chemin stocké
 * @param	{string}	path	Le chemin du fichier
 * @param	{string}	prefix	Le préfixe du nom
 */
export const storedFileName = (path, prefix) => `${prefix}-${path.split('/').slice(-1)[0]}`

/**
 * Garde les actions permises (les autres valent false)
 */
export const bulkActionList = (...actions) => actions.filter(Boolean)

/**
 * Téléchargement d'un document par ligne ; file(item) rend { url, name } ou null si la ligne n'en a pas
 */
export const bulkDownload = (label, file) => ({
  label,
  menu: 'Télécharger',
  icon: 'tabler-download',
  color: 'secondary',
  confirm: false,
  eligible: item => !!file(item),
  run: async item => {
    const { url, name } = file(item)

    await downloadAuthenticatedFile(url, name)
  },
})

export const bulkDelete = (endpoint, eligible = () => true) => ({
  label: 'Supprimer',
  icon: 'tabler-trash',
  color: 'error',
  eligible,
  run: item => $apiOrThrow(`${endpoint}/${item.id}`, { method: 'DELETE' }),
})

/**
 * Appel PUT d'un changement d'état ; body(item, comment) rend le corps de la requête
 */
export const bulkPut = ({ label, icon, color, comment, eligible, url, body = () => undefined }) => ({
  label,
  icon,
  color,
  comment,
  eligible,
  run: (item, motif) => $apiOrThrow(url(item), { method: 'PUT', body: body(item, motif) }),
})

export const bulkValidate = options => bulkPut({ label: 'Valider', icon: 'tabler-check', color: 'success', ...options })

export const bulkReject = options => bulkPut({ label: 'Rejeter', icon: 'tabler-x', color: 'error', comment: 'Motif du rejet', ...options })
