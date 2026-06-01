/**
 * Tests unitaires pour useContractObservations
 * Framework: Vitest + Vue Test Utils
 * 
 * Pour exécuter les tests:
 * npm run test
 */

import { describe, it, expect } from 'vitest'
import { useContractObservations } from '../useContractObservations'

describe('useContractObservations', () => {
  const {
    STATUS_COLORS,
    STATUS_TEXTS,
    getStatusText,
    getStatusColor,
    decorateObservation,
    decorateObservations,
    sortObservationsByPriority,
    hasHighPriority,
  } = useContractObservations()

  describe('Status helpers', () => {
    it('should return correct status text', () => {
      expect(getStatusText('validated')).toBe('Dossier validé')
      expect(getStatusText('waiting')).toBe("En attente d'upload")
      expect(getStatusText('rejected')).toBe('Dossier rejeté')
    })

    it('should return correct status color', () => {
      expect(getStatusColor('validated')).toBe('success')
      expect(getStatusColor('rejected')).toBe('error')
      expect(getStatusColor('waiting')).toBe('warning')
    })

    it('should return default color for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('default')
    })
  })

  describe('decorateObservation', () => {
    it('should decorate "contrat signé manquant" observation', () => {
      const result = decorateObservation('Contrat signé manquant')
      
      expect(result.color).toBe('error')
      expect(result.priority).toBe('high')
      expect(result.actionable).toBe(true)
      expect(result.category).toBe('document')
      expect(result.actionType).toBe('upload_contract')
    })

    it('should decorate "billet à ordre" observation', () => {
      const result = decorateObservation('Billet à ordre signé manquant')
      
      expect(result.color).toBe('error')
      expect(result.priority).toBe('high')
      expect(result.actionType).toBe('upload_promissory_note')
    })

    it('should decorate "cautions" observation', () => {
      const result = decorateObservation('Dossier des cautions incomplet')
      
      expect(result.color).toBe('warning')
      expect(result.priority).toBe('medium')
      expect(result.category).toBe('guarantor')
      expect(result.actionType).toBe('manage_guarantors')
    })

    it('should decorate "CAT" observation', () => {
      const result = decorateObservation('CAT manquant')
      
      expect(result.color).toBe('warning')
      expect(result.priority).toBe('medium')
      expect(result.category).toBe('cat')
      expect(result.actionType).toBe('create_cat')
    })

    it('should handle generic observation', () => {
      const result = decorateObservation('Autre observation')
      
      expect(result.color).toBe('info')
      expect(result.priority).toBe('low')
      expect(result.actionable).toBe(false)
    })

    it('should be case insensitive', () => {
      const result1 = decorateObservation('CONTRAT SIGNÉ MANQUANT')
      const result2 = decorateObservation('contrat signé manquant')
      
      expect(result1.category).toBe(result2.category)
      expect(result1.priority).toBe(result2.priority)
    })
  })

  describe('decorateObservations', () => {
    it('should decorate multiple observations', () => {
      const observations = [
        'Contrat signé manquant',
        'Billet à ordre signé manquant',
        'CAT manquant',
      ]
      
      const result = decorateObservations(observations)
      
      expect(result).toHaveLength(3)
      expect(result[0].actionType).toBe('upload_contract')
      expect(result[1].actionType).toBe('upload_promissory_note')
      expect(result[2].actionType).toBe('create_cat')
    })

    it('should handle empty array', () => {
      const result = decorateObservations([])
      expect(result).toHaveLength(0)
    })
  })

  describe('sortObservationsByPriority', () => {
    it('should sort observations by priority (high > medium > low)', () => {
      const observations = [
        { text: 'Low', priority: 'low' },
        { text: 'High', priority: 'high' },
        { text: 'Medium', priority: 'medium' },
      ]
      
      const sorted = sortObservationsByPriority(observations)
      
      expect(sorted[0].priority).toBe('high')
      expect(sorted[1].priority).toBe('medium')
      expect(sorted[2].priority).toBe('low')
    })

    it('should not mutate original array', () => {
      const observations = [
        { text: 'Low', priority: 'low' },
        { text: 'High', priority: 'high' },
      ]
      
      const original = [...observations]
      sortObservationsByPriority(observations)
      
      expect(observations).toEqual(original)
    })
  })

  describe('hasHighPriority', () => {
    it('should return true if high priority exists', () => {
      const observations = [
        { priority: 'low' },
        { priority: 'high' },
        { priority: 'medium' },
      ]
      
      expect(hasHighPriority(observations)).toBe(true)
    })

    it('should return false if no high priority', () => {
      const observations = [
        { priority: 'low' },
        { priority: 'medium' },
      ]
      
      expect(hasHighPriority(observations)).toBe(false)
    })

    it('should handle empty array', () => {
      expect(hasHighPriority([])).toBe(false)
    })
  })

  describe('Integration tests', () => {
    it('should handle complete workflow', () => {
      const observations = [
        'Autre information',
        'Contrat signé manquant',
        'Dossier des cautions incomplet',
      ]
      
      const decorated = decorateObservations(observations)
      const sorted = sortObservationsByPriority(decorated)
      const urgent = hasHighPriority(sorted)
      
      expect(sorted[0].priority).toBe('high') // Contrat signé
      expect(sorted[1].priority).toBe('medium') // Cautions
      expect(sorted[2].priority).toBe('low') // Info
      expect(urgent).toBe(true)
    })
  })
})

