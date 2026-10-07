/**
 * Mémorise, dans ce navigateur, les réglages d'une liste : nombre de lignes par page et filtres.
 * La recherche texte n'est pas gardée, pour ne pas retrouver une liste vide sans comprendre pourquoi.
 * La clé est le nom de la page : chaque liste a ses propres réglages.
 *
 * @param {object} state
 * @param {import('vue').Ref<number>} state.itemsPerPage Nombre de lignes par page
 * @param {Array} [state.filterDataArray] Filtres de la page ({ filter: { key, value } })
 * @param {Object<string, import('vue').Ref>} [state.refs] Autres filtres, par nom
 */
export const useListPreferences = ({ itemsPerPage, filterDataArray = [], refs = {} }) => {
  const storageKey = `cofcredit:list:${String(useRoute().name)}`

  const snapshot = () => ({
    itemsPerPage: itemsPerPage?.value,
    filters: Object.fromEntries(filterDataArray.map(filterData => [filterData.filter.key, filterData.filter.value])),
    refs: Object.fromEntries(Object.entries(refs).map(([name, ref]) => [name, ref.value])),
  })

  // Le stockage peut être indisponible (navigation privée, données bloquées) : la page marche sans
  let saved = null
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
  } catch {
    saved = null
  }

  if (saved) {
    if (itemsPerPage && Number(saved.itemsPerPage) > 0)
      itemsPerPage.value = Number(saved.itemsPerPage)
    filterDataArray.forEach(filterData => {
      if (saved.filters && filterData.filter.key in saved.filters)
        filterData.filter.value = saved.filters[filterData.filter.key]
    })
    Object.entries(refs).forEach(([name, ref]) => {
      if (saved.refs && name in saved.refs)
        ref.value = saved.refs[name]
    })
  }

  watch(snapshot, value => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {
      // Réglages non mémorisés : sans conséquence
    }
  }, { deep: true })
}
