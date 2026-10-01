/**
 * Formats et libellés communs aux écrans
 */

/**
 * Montant en francs CFA : 10 000 000 F CFA
 * @param {number|string} amount - Le montant
 * @returns {string}
 */
export const formatAmount = amount => {
  if (amount === null || amount === undefined || amount === '')
    return ''

  return `${Number(amount).toLocaleString('fr-FR', { maximumFractionDigits: 2 }).replace(/\u202F/g, ' ')} F CFA`
}

/**
 * Date au format français : 05/09/2026
 * @param {string} value - La date (ISO ou AAAA-MM-JJ)
 * @returns {string}
 */
export const formatDate = value => {
  if (!value)
    return ''
  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('fr-FR')
}

export const periodicityLabels = {
  'mensual': 'Mensuelle',
  'quarterly': 'Trimestrielle',
  'semi-annual': 'Semestrielle',
  'annual': 'Annuelle',
  'in-fine': 'À la fin',
}

export const releaseTypeLabels = {
  'non-progressive': 'Non progressif',
  'progressive': 'Progressif',
}

export const identityDocumentLabels = {
  cni: 'Carte d\'identité nationale',
  passport: 'Passeport',
  residence_certificate: 'Certificat de résidence',
  driving_licence: 'Permis de conduire',
  consular_card: 'Carte consulaire',
  ECOWAS_identity_card: 'Carte d\'identité de la CEDEAO',
  residence_permit: 'Carte de séjour',
  anid_card: 'Carte ANID',
}

export const pledgeTypeLabels = {
  vehicle: 'Véhicule',
  stock: 'Stock',
}

export const reimbursementSourceLabels = {
  revenue_from_the_activity: 'Recettes de l\'activité',
  final_payer_settlement: 'Règlement du payeur final',
  resale_of_goods: 'Revente des marchandises',
}

// Statuts : { libellé, couleur }
export const verbalTrialStatus = {
  waiting: { text: 'En attente', color: 'warning' },
  validated: { text: 'Validé', color: 'success' },
  rejected: { text: 'Rejeté', color: 'error' },
}

export const validationLevelLabels = {
  credit_analyst: 'Analyste Crédit',
  credit_admin: 'Admin Crédit',
  head_credit: 'Head Crédit',
  md: 'MD',
}

export const contractStatus = {
  waiting: { text: 'En attente des documents signés', color: 'warning' },
  pending_admin_validation: { text: 'En attente de validation admin', color: 'info' },
  pending_head_validation: { text: 'En attente de validation head', color: 'primary' },
  validated: { text: 'Validé', color: 'success' },
  rejected: { text: 'Rejeté', color: 'error' },
}

export const catValidationStatus = {
  waiting: { text: 'Validation en attente', color: 'warning' },
  validated: { text: 'Validé', color: 'success' },
  rejected: { text: 'Validation rejetée', color: 'error' },
}

export const catUnblockStatus = {
  waiting: { text: 'Déblocage en attente', color: 'warning' },
  validated: { text: 'Débloqué', color: 'success' },
  rejected: { text: 'Déblocage rejeté', color: 'error' },
}
