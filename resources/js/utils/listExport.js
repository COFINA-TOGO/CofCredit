// Export Excel des listes : l'export reprend la dernière requête de la liste (mêmes filtres, même recherche),
// sans la pagination, ou seulement les lignes cochées.
import { downloadAuthenticatedFile } from './fileDownload'

const lastListUrls = {}

/**
 * Mémorise l'adresse d'une requête de liste (appelé pour chaque requête GET de l'API)
 * @param {string} url L'adresse appelée (/api/verbal-trial?page=2&status=v...)
 */
export const rememberListUrl = url => {
  const parsed = new URL(url, window.location.origin)
  if (parsed.searchParams.has('page'))
    lastListUrls[parsed.pathname.replace(/^\/api/, '')] = parsed
}

/**
 * Télécharge l'export Excel d'une liste
 * @param {string} endpoint Le point d'entrée de la liste (/verbal-trial)
 * @param {string} name Le début du nom du fichier
 * @param {number[]} ids Les lignes cochées ; toutes les lignes filtrées si vide
 */
export const downloadListExport = (endpoint, name, ids = []) => {
  const url = new URL(lastListUrls[endpoint] ?? `/api${endpoint}`, window.location.origin)

  url.pathname = `/api${endpoint}`
  url.searchParams.delete('page')
  url.searchParams.delete('per_page')
  url.searchParams.set('export', '1')
  ids.forEach(id => url.searchParams.append('ids[]', id))

  return downloadAuthenticatedFile(`${url.pathname}${url.search}`, `${name}-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
