/**
 * Composable pour gérer la liste des contrats
 */
import { ref, computed, watch, watchEffect } from 'vue'

export function useContractList(viewData, filterDataArray) {
  const searchQuery = ref(null)
  const itemsPerPage = ref(8)
  const page = ref(1)
  const loadings = ref([])
  
  // Nouvelle structure pour les données des contrats
  const itemListData = ref({ 
    data: [], 
    total: 0, 
    last_page: 1,
  })

  // Configuration des queries dynamiques basées sur les filtres
  const more_query = ref({})

  /**
   * Récupère la liste des contrats
   * @param {number[]} id_list - Liste des IDs de loading à activer
   */
  const fetchItemList = async (id_list = []) => {
    // Activer les états de chargement
    id_list.forEach(id => {
      loadings.value[id] = true
    })

    try {
      const { data } = await useApi(createUrl(viewData.data.api.end_point, {
        query: {
          search: searchQuery.value,
          page: page.value,
          ...viewData.data.api.query,
          ...more_query.value,
        },
      }))

      itemListData.value = data.value
    } catch (error) {
      console.error('Erreur lors de la récupération des contrats:', error)
      itemListData.value = { data: [], total: 0, last_page: 1 }
    } finally {
      // Désactiver les états de chargement
      id_list.forEach(id => {
        loadings.value[id] = false
      })
    }
  }

  /**
   * Initialise les filtres dynamiques
   */
  const initializeFilters = async () => {
    for (let index = 0; index < filterDataArray.length; index++) {
      const filterData = filterDataArray[index]
      
      if (filterData.base.data_source === 'api') {
        const { data, execute } = await useApi(createUrl(`/${filterData.base.api_endpoint}`, {
          query: filterData.base.query,
        }))

        filterData.api.data = data
        filterData.api.execute = execute
        filterData.api.datac = filterData.api.data.data
      }
      
      more_query.value[filterData.filter.key] = filterData.filter.value
    }
  }

  /**
   * Met à jour les options de pagination
   * @param {Object} options - Options de la table
   */
  const updateOptions = (options) => {
    page.value = options.page
  }

  // Computed properties
  const contractList = computed(() => itemListData.value.data)
  const totalContracts = computed(() => itemListData.value.total)
  const lastPage = computed(() => itemListData.value.last_page)

  // Watchers pour la recherche et la pagination
  watch([searchQuery, page], async () => {
    await fetchItemList([4])
  })

  // Watcher pour les filtres dynamiques
  watchEffect(async () => {
    filterDataArray.forEach(filterData => {
      more_query.value[filterData.filter.key] = filterData.filter.value
    })
    await fetchItemList([4])
  })

  return {
    // State
    searchQuery,
    itemsPerPage,
    page,
    loadings,
    itemListData,
    more_query,
    
    // Computed
    contractList,
    totalContracts,
    lastPage,
    
    // Methods
    fetchItemList,
    initializeFilters,
    updateOptions,
  }
}

