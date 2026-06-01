/**
 * Composable pour décorer et gérer les observations des contrats
 */
export function useContractObservations() {
  /**
   * Configuration des couleurs de statut
   */
  const STATUS_COLORS = {
    validated: 'success',
    rejected: 'error',
    waiting: 'warning',
    pending_admin_validation: 'info',
    pending_head_validation: 'primary',
  }

  /**
   * Configuration des textes de statut
   */
  const STATUS_TEXTS = {
    validated: 'Dossier validé',
    waiting: "En attente d'upload",
    pending_admin_validation: 'En attente de validation admin',
    pending_head_validation: 'En attente de validation head',
    rejected: 'Dossier rejeté',
  }

  /**
   * Récupère le texte d'un statut
   * @param {string} status - Le statut
   * @returns {string}
   */
  const getStatusText = (status) => {
    return STATUS_TEXTS[status] || ''
  }

  /**
   * Récupère la couleur d'un statut
   * @param {string} status - Le statut
   * @returns {string}
   */
  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || 'default'
  }

  /**
   * Décore une observation avec des métadonnées visuelles
   * @param {string} text - Le texte de l'observation
   * @returns {Object}
   */
  const decorateObservation = (text) => {
    const normalized = text.toLowerCase()

    // Contrat signé manquant
    if (normalized.includes('contrat signé manquant')) {
      return {
        text,
        color: 'error',
        icon: 'tabler-file-x',
        title: 'Contrat signé manquant',
        priority: 'high',
        actionable: true,
        actionText: 'Uploader le contrat',
        category: 'document',
        actionType: 'upload_contract',
      }
    }

    // Billet à ordre manquant
    if (normalized.includes('billet à ordre signé manquant')) {
      return {
        text,
        color: 'error',
        icon: 'tabler-file-x',
        title: 'Billet à ordre manquant',
        priority: 'high',
        actionable: true,
        actionText: 'Uploader le billet',
        category: 'document',
        actionType: 'upload_promissory_note',
      }
    }

    // Dossier des cautions incomplet
    if (normalized.includes('dossier des cautions incomplet')) {
      return {
        text,
        color: 'warning',
        icon: 'tabler-users-minus',
        title: 'Cautions incomplètes',
        priority: 'medium',
        actionable: true,
        actionText: 'Gérer les cautions',
        category: 'guarantor',
        actionType: 'manage_guarantors',
      }
    }

    // CAT manquant
    if (normalized.includes('cat')) {
      return {
        text,
        color: 'warning',
        icon: 'tabler-file-plus',
        title: 'CAT à créer',
        priority: 'medium',
        actionable: true,
        actionText: 'Créer le CAT',
        category: 'cat',
        actionType: 'create_cat',
      }
    }

    // Validation admin en attente
    if (normalized.includes('admin') && normalized.includes('validation')) {
      return {
        text,
        color: 'info',
        icon: 'tabler-user-check',
        title: 'Validation admin requise',
        priority: 'medium',
        actionable: true,
        actionText: "Valider l'envoi",
        category: 'validation',
        actionType: 'admin_validate',
      }
    }

    // Validation head en attente
    if (normalized.includes('head') && normalized.includes('validation')) {
      return {
        text,
        color: 'primary',
        icon: 'tabler-crown',
        title: 'Validation head requise',
        priority: 'high',
        actionable: true,
        actionText: 'Valider/Rejeter',
        category: 'validation',
        actionType: 'head_validate',
      }
    }

    // Validation en attente (générique)
    if (normalized.includes('validation') && normalized.includes('attente')) {
      return {
        text,
        color: 'info',
        icon: 'tabler-clock-pause',
        title: 'En attente de validation',
        priority: 'low',
        actionable: false,
        category: 'status',
      }
    }

    // Documents manquants (générique)
    if (normalized.includes('manquant') || normalized.includes('absence')) {
      return {
        text,
        color: 'error',
        icon: 'tabler-alert-circle',
        title: 'Document manquant',
        priority: 'high',
        actionable: true,
        actionText: 'Compléter le dossier',
        category: 'document',
      }
    }

    // Information générique
    return {
      text,
      color: 'info',
      icon: 'tabler-info-circle',
      title: 'Information',
      priority: 'low',
      actionable: false,
      category: 'info',
    }
  }

  /**
   * Décore un tableau d'observations
   * @param {string[]} observations - Les observations à décorer
   * @returns {Object[]}
   */
  const decorateObservations = (observations) => {
    return observations.map(decorateObservation)
  }

  /**
   * Trie les observations par priorité
   * @param {Object[]} observations - Les observations décorées
   * @returns {Object[]}
   */
  const sortObservationsByPriority = (observations) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    
    return [...observations].sort((a, b) => {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  /**
   * Vérifie si les observations contiennent une priorité haute
   * @param {Object[]} observations - Les observations décorées
   * @returns {boolean}
   */
  const hasHighPriority = (observations) => {
    return observations.some((obs) => obs.priority === 'high')
  }

  return {
    STATUS_COLORS,
    STATUS_TEXTS,
    getStatusText,
    getStatusColor,
    decorateObservation,
    decorateObservations,
    sortObservationsByPriority,
    hasHighPriority,
  }
}

