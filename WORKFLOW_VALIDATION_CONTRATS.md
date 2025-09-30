# Nouveau Workflow de Validation des Contrats

## Vue d'ensemble

Ce document décrit le nouveau système de validation des fichiers uploadés pour les contrats, implémenté pour améliorer le contrôle qualité et la traçabilité.

## Workflow de Validation

### Étape 1: Upload par l'Admin Crédit
- L'**Admin Crédit** uploade les fichiers (contrat signé + billet à ordre signé)
- Statut du contrat: `waiting` → `pending_admin_validation` (quand tous les fichiers sont uploadés)
- L'Admin Crédit reçoit une notification pour valider l'envoi

### Étape 2: Validation de l'Envoi par l'Admin Crédit
- L'**Admin Crédit** valide que tous les documents sont corrects et complets
- Action: Bouton "Valider l'envoi" dans l'interface
- Statut du contrat: `pending_admin_validation` → `pending_head_validation`
- Les **Head Crédit** reçoivent une notification pour la validation finale

### Étape 3: Validation/Rejet Final par le Head Crédit
- Le **Head Crédit** examine le dossier et peut :
  - **Valider** : Statut → `validated` (l'Admin Crédit peut créer le CAT)
  - **Rejeter** : Statut → `rejected` (retour à l'Admin Crédit pour correction)

### Étape 4: En cas de Rejet
- L'**Admin Crédit** reçoit une notification avec le motif du rejet
- Il peut re-uploader les documents corrigés
- Le cycle recommence depuis l'étape 1

## Nouveaux Statuts

| Statut | Description |
|--------|-------------|
| `waiting` | En attente d'upload des fichiers |
| `pending_admin_validation` | Tous les fichiers uploadés, en attente de validation admin |
| `pending_head_validation` | Admin a validé, en attente de validation head |
| `validated` | Validé par le Head Crédit |
| `rejected` | Rejeté par le Head Crédit |

## Nouvelles Colonnes de Base de Données

- `admin_validated_at` : Timestamp de validation admin
- `admin_validator_id` : ID de l'admin qui a validé
- `head_validated_at` : Timestamp de validation head
- `head_validator_id` : ID du head qui a validé/rejeté
- `admin_validation_comment` : Commentaire de l'admin
- `head_validation_comment` : Commentaire du head (motif de rejet)

## Nouvelles Routes API

- `PUT /api/contract/admin-validate/{id}` : Validation par l'admin crédit
- `PUT /api/contract/head-validate/{id}` : Validation/rejet par le head crédit

## Permissions

### Admin Crédit
- Peut uploader des fichiers sur ses propres contrats
- Peut valider l'envoi de ses propres contrats
- Reçoit les notifications de rejet

### Head Crédit
- Peut valider ou rejeter tous les contrats en attente
- Reçoit les notifications quand un admin valide un envoi

## Interface Utilisateur

### Nouvelles Actions dans le Menu Contextuel
- **Admin Crédit** : "Valider l'envoi" (quand statut = `pending_admin_validation`)
- **Head Crédit** : "Valider le contrat" et "Rejeter le contrat" (quand statut = `pending_head_validation`)

### Observations Améliorées
- Affichage du statut actuel avec des couleurs distinctives
- Messages contextuels selon l'étape du workflow
- Affichage des motifs de rejet

## Notifications Email

### Pour l'Admin Crédit
1. Quand tous les fichiers sont uploadés → "Validation requise"
2. Quand le Head valide → "Contrat validé - Créer le CAT"
3. Quand le Head rejette → "Contrat rejeté - Motif inclus"

### Pour le Head Crédit
1. Quand l'admin valide l'envoi → "Validation requise pour le contrat"

## Avantages du Nouveau Système

1. **Contrôle Qualité** : Double validation (admin + head)
2. **Traçabilité** : Historique complet des validations
3. **Responsabilisation** : Chaque admin valide ses propres uploads
4. **Feedback** : Motifs de rejet clairs pour amélioration
5. **Workflow Clair** : Étapes bien définies et visibles

## Migration des Données Existantes

Les contrats existants conservent leur statut actuel. Le nouveau workflow s'applique aux nouveaux uploads et aux contrats rejetés qui sont re-uploadés.
