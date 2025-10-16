/**
 * Composable pour gérer le téléchargement de fichiers de contrats
 */
import JsFileDownloader from 'js-file-downloader'

export function useContractDownload() {
  /**
   * Télécharge un fichier
   * @param {string} url - L'URL du fichier
   * @param {string} fileName - Le nom du fichier
   * @param {Function} onSuccess - Callback de succès
   * @param {Function} onError - Callback d'erreur
   */
  const downloadFile = async (url, fileName, onSuccess, onError) => {
    try {
      new JsFileDownloader({
        url,
        headers: [
          {
            name: 'Authorization',
            value: `Bearer ${useCookie('userToken').value}`,
          },
          { 
            name: 'Accept', 
            value: 'application/json',
          },
        ],
        nameCallback() {
          return fileName
        },
      })
      
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      if (onError) onError(error)
    }
  }

  /**
   * Télécharge le contrat non signé
   * @param {number} contractId - L'ID du contrat
   * @param {string} committeeId - L'ID du comité
   * @param {Function} onSuccess - Callback de succès
   * @param {Function} onError - Callback d'erreur
   */
  const downloadUnsignedContract = (contractId, committeeId, onSuccess, onError) => {
    return downloadFile(
      `/api/contract/download/${contractId}`,
      `Contrat-${committeeId}.docx`,
      onSuccess,
      onError
    )
  }

  /**
   * Télécharge le contrat signé
   * @param {string} path - Le chemin du fichier
   * @param {Function} onSuccess - Callback de succès
   * @param {Function} onError - Callback d'erreur
   */
  const downloadSignedContract = (path, onSuccess, onError) => {
    const fileName = `Contrat-${path.split('/').slice(-1)[0]}`
    return downloadFile(path, fileName, onSuccess, onError)
  }

  /**
   * Télécharge le billet à ordre non signé
   * @param {number} contractId - L'ID du contrat
   * @param {string} committeeId - L'ID du comité
   * @param {Function} onSuccess - Callback de succès
   * @param {Function} onError - Callback d'erreur
   */
  const downloadUnsignedPromissoryNote = (contractId, committeeId, onSuccess, onError) => {
    return downloadFile(
      `/api/contract/promissory-note/download/${contractId}`,
      `Billet-à-ordre-${committeeId}.docx`,
      onSuccess,
      onError
    )
  }

  /**
   * Télécharge le billet à ordre signé
   * @param {string} path - Le chemin du fichier
   * @param {Function} onSuccess - Callback de succès
   * @param {Function} onError - Callback d'erreur
   */
  const downloadSignedPromissoryNote = (path, onSuccess, onError) => {
    const fileName = `Billet-à-ordre-${path.split('/').slice(-1)[0]}`
    return downloadFile(path, fileName, onSuccess, onError)
  }

  /**
   * Télécharge la mention manuscrite
   * @param {number} contractId - L'ID du contrat
   * @param {string} committeeId - L'ID du comité
   * @param {Function} onSuccess - Callback de succès
   * @param {Function} onError - Callback d'erreur
   */
  const downloadHandwrittenMention = (contractId, committeeId, onSuccess, onError) => {
    return downloadFile(
      `/api/contract/handwritten-mention/download/${contractId}`,
      `Mention-manuscrite-${committeeId}.docx`,
      onSuccess,
      onError
    )
  }

  return {
    downloadFile,
    downloadUnsignedContract,
    downloadSignedContract,
    downloadUnsignedPromissoryNote,
    downloadSignedPromissoryNote,
    downloadHandwrittenMention,
  }
}

