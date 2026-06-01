/**
 * Composable pour gérer les actions sur les contrats
 */
import { ref } from 'vue'
import { $api } from '@/utils/api'

export function useContractActions() {
  const isSnackbarVisible = ref(false)
  const snackbarMessage = ref('')
  const snackbarColor = ref('success')
  
  const deleteLoadings = ref({})

  /**
   * Supprime un contrat
   * @param {number} id - L'ID du contrat
   * @param {Object} viewData - Les données de configuration de la vue
   * @returns {Promise<boolean>} - Succès de la suppression
   */
  const deleteContract = async (id, viewData) => {
    deleteLoadings.value[id] = true
    
    try {
      const response = await $api(`${viewData.data.api.end_point}/${id}`, {
        method: 'DELETE',
      })
      
      if (response.status === 200) {
        showSnackbar('success', `${viewData.data.title.singular} supprimé avec succès`)
        return true
      } else {
        const errorMessage = formatErrorMessages(response.errors)
        showSnackbar('error', errorMessage)
        return false
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      showSnackbar('error', 'Erreur lors de la suppression')
      return false
    } finally {
      deleteLoadings.value[id] = false
    }
  }

  /**
   * Change le statut d'un contrat
   * @param {number} id - L'ID du contrat
   * @param {string} status - Le nouveau statut
   * @param {string} comment - Le commentaire associé
   * @returns {Promise<boolean>}
   */
  const changeStatus = async (id, status, comment = '') => {
    try {
      const response = await $api(`contract/change-status/${id}`, {
        method: 'PUT',
        body: { status, comment },
      })
      
      if (response.status === 200) {
        const statusText = status === 'validated' ? 'validé' : 'rejeté'
        showSnackbar('success', `Contrat ${statusText} avec succès`)
        return true
      } else {
        showSnackbar('error', 'Erreur lors du changement de statut')
        return false
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error)
      showSnackbar('error', 'Erreur lors du changement de statut')
      return false
    }
  }

  /**
   * Validation par l'admin crédit
   * @param {number} id - L'ID du contrat
   * @param {string} comment - Le commentaire
   * @returns {Promise<boolean>}
   */
  const adminValidate = async (id, comment = '') => {
    try {
      const response = await $api(`contract/admin-validate/${id}`, {
        method: 'PUT',
        body: { comment },
      })
      
      if (response.status === 200) {
        showSnackbar(
          'success',
          'Envoi validé avec succès. Le Head Crédit va maintenant procéder à la validation finale.'
        )
        return true
      } else {
        showSnackbar('error', 'Erreur lors de la validation')
        return false
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error)
      showSnackbar('error', 'Erreur lors de la validation')
      return false
    }
  }

  /**
   * Validation/rejet par le head crédit
   * @param {number} id - L'ID du contrat
   * @param {'validate'|'reject'} action - L'action à effectuer
   * @param {string} comment - Le commentaire
   * @returns {Promise<boolean>}
   */
  const headValidate = async (id, action, comment = '') => {
    try {
      const response = await $api(`contract/head-validate/${id}`, {
        method: 'PUT',
        body: { action, comment },
      })
      
      if (response.status === 200) {
        const actionText = action === 'validate' ? 'validé' : 'rejeté'
        showSnackbar('success', `Contrat ${actionText} avec succès`)
        return true
      } else {
        showSnackbar('error', 'Erreur lors de la validation')
        return false
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error)
      showSnackbar('error', 'Erreur lors de la validation')
      return false
    }
  }

  /**
   * Upload d'un fichier (contrat signé ou billet à ordre)
   * @param {number} id - L'ID du contrat
   * @param {Event} event - L'événement de sélection de fichier
   * @param {string} uploadType - Le type d'upload ('signed_contract' ou 'signed_promissory_note')
   * @returns {Promise<boolean>}
   */
  const uploadFile = async (id, event, uploadType) => {
    const { files } = event.target
    
    if (!files || files.length !== 1) {
      showSnackbar('warning', 'Veuillez sélectionner un seul fichier')
      return false
    }

    try {
      const base64Image = await fileToBase64(files[0])
      
      const response = await fetch(`/api/contract/upload/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('userToken').value}`,
        },
        body: JSON.stringify({
          [uploadType]: base64Image,
        }),
      })

      if (response.ok) {
        showSnackbar('success', 'Document envoyé avec succès')
        return true
      } else {
        showSnackbar('error', "Échec de l'envoi du document")
        return false
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du document:", error)
      showSnackbar('error', "Erreur lors de l'envoi du document")
      return false
    }
  }

  /**
   * Convertit un fichier en base64
   * @param {File} file - Le fichier à convertir
   * @returns {Promise<string>}
   */
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  /**
   * Affiche un snackbar
   * @param {string} color - La couleur du snackbar
   * @param {string} message - Le message à afficher
   */
  const showSnackbar = (color, message) => {
    snackbarColor.value = color
    snackbarMessage.value = message
    isSnackbarVisible.value = true
  }

  /**
   * Formate les messages d'erreur
   * @param {Object} errors - Les erreurs de l'API
   * @returns {string}
   */
  const formatErrorMessages = (errors) => {
    if (!errors) return 'Une erreur est survenue'
    
    return Object.values(errors)
      .flat()
      .join('<br>')
  }

  return {
    // State
    isSnackbarVisible,
    snackbarMessage,
    snackbarColor,
    deleteLoadings,
    
    // Actions
    deleteContract,
    changeStatus,
    adminValidate,
    headValidate,
    uploadFile,
    showSnackbar,
  }
}

