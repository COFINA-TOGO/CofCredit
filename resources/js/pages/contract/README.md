# Module Contrat - Documentation

## 📋 Vue d'ensemble

Ce module gère l'affichage, la validation et les actions sur les contrats dans l'application CofCredit. Il suit une architecture modulaire basée sur Vue 3 Composition API.

## 🏗 Architecture

### Structure des fichiers

```
resources/js/
├── pages/contract/
│   ├── index.vue                    # Page principale de liste des contrats
│   └── README.md                    # Cette documentation
├── components/contract/
│   ├── ObservationCard.vue          # Carte d'observation individuelle
│   ├── ObservationsList.vue         # Liste des observations
│   ├── ContractStatusCard.vue       # Affichage du statut
│   ├── ContractActionsMenu.vue      # Menu d'actions (télécharger, uploader)
│   └── ValidationActions.vue        # Boutons de validation
└── composables/
    ├── useContractActions.js        # Logique des actions (CRUD, validation)
    ├── useContractObservations.js   # Décoration des observations
    ├── useContractList.js           # Gestion de la liste et pagination
    └── useContractDownload.js       # Gestion des téléchargements
```

## 🔧 Composables

### useContractActions

Gère toutes les actions sur les contrats.

**Exports:**
- `deleteContract(id, viewData)` - Supprime un contrat
- `changeStatus(id, status, comment)` - Change le statut d'un contrat
- `adminValidate(id, comment)` - Validation par l'admin crédit
- `headValidate(id, action, comment)` - Validation/rejet par le head crédit
- `uploadFile(id, event, uploadType)` - Upload de documents
- `showSnackbar(color, message)` - Affiche un message de notification

**State:**
- `isSnackbarVisible` - Visibilité du snackbar
- `snackbarMessage` - Message du snackbar
- `snackbarColor` - Couleur du snackbar
- `deleteLoadings` - États de chargement des suppressions

### useContractObservations

Décore les observations avec des métadonnées visuelles.

**Exports:**
- `decorateObservations(observations)` - Décore un tableau d'observations
- `sortObservationsByPriority(observations)` - Trie par priorité
- `hasHighPriority(observations)` - Vérifie si une priorité haute existe
- `getStatusText(status)` - Récupère le texte d'un statut
- `getStatusColor(status)` - Récupère la couleur d'un statut

**Constants:**
- `STATUS_COLORS` - Mapping des couleurs de statut
- `STATUS_TEXTS` - Mapping des textes de statut

### useContractList

Gère la liste des contrats, filtres et pagination.

**Exports:**
- `fetchItemList(id_list)` - Récupère la liste des contrats
- `initializeFilters()` - Initialise les filtres dynamiques
- `updateOptions(options)` - Met à jour les options de pagination

**State:**
- `searchQuery` - Recherche
- `itemsPerPage` - Nombre d'éléments par page
- `page` - Page actuelle
- `loadings` - États de chargement
- `contractList` - Liste des contrats (computed)
- `totalContracts` - Total des contrats (computed)
- `lastPage` - Dernière page (computed)

### useContractDownload

Gère les téléchargements de documents.

**Exports:**
- `downloadUnsignedContract(contractId, committeeId, onSuccess, onError)`
- `downloadSignedContract(path, onSuccess, onError)`
- `downloadUnsignedPromissoryNote(contractId, committeeId, onSuccess, onError)`
- `downloadSignedPromissoryNote(path, onSuccess, onError)`
- `downloadHandwrittenMention(contractId, committeeId, onSuccess, onError)`

## 🎨 Composants

### ObservationCard

Affiche une carte d'observation avec actions contextuelles.

**Props:**
- `observation` (Object, required) - L'observation décorée
- `contractId` (Number, required) - ID du contrat

**Events:**
- `@uploadContract` - Upload du contrat signé
- `@uploadPromissoryNote` - Upload du billet à ordre

### ObservationsList

Liste organisée des observations d'un contrat.

**Props:**
- `observations` (Array, required) - Tableau d'observations
- `contractId` (Number, required) - ID du contrat

**Events:**
- `@uploadContract` - Upload du contrat signé
- `@uploadPromissoryNote` - Upload du billet à ordre

### ContractStatusCard

Affiche le statut d'un contrat complet.

**Props:**
- `status` (String, required) - Statut du contrat
- `statusObservation` (String, optional) - Observation du statut

### ContractActionsMenu

Menu d'actions contextuel pour un contrat.

**Props:**
- `contract` (Object, required) - Le contrat
- `canRead` (Boolean) - Permission de lecture
- `canDownload` (Boolean) - Permission de téléchargement
- `canUpload` (Boolean) - Permission d'upload

**Events:**
- `@downloadUnsignedContract`
- `@downloadSignedContract`
- `@downloadUnsignedPromissoryNote`
- `@downloadSignedPromissoryNote`
- `@downloadHandwrittenMention`
- `@uploadContract`
- `@uploadPromissoryNote`

### ValidationActions

Boutons de validation contextuelle selon le rôle.

**Props:**
- `contract` (Object, required) - Le contrat
- `userRole` (String, required) - Rôle de l'utilisateur
- `userId` (Number, required) - ID de l'utilisateur

**Events:**
- `@adminValidate` - Validation admin
- `@headValidate` - Validation head
- `@headReject` - Rejet head

## 🔄 Workflow de validation

1. **État initial**: `waiting` - En attente d'upload des documents
2. **Upload documents**: Admin crédit uploade les documents signés
3. **Validation admin**: `pending_admin_validation` - Admin valide l'envoi
4. **Validation head**: `pending_head_validation` - Head crédit valide ou rejette
5. **État final**: `validated` ou `rejected`

## 📊 Types d'observations

| Type | Priorité | Couleur | Icône | Action |
|------|----------|---------|-------|--------|
| Contrat signé manquant | High | Error | file-x | Upload contrat |
| Billet à ordre manquant | High | Error | file-x | Upload billet |
| Cautions incomplètes | Medium | Warning | users-minus | Gérer cautions |
| CAT à créer | Medium | Warning | file-plus | Créer CAT |
| Validation admin | Medium | Info | user-check | Valider envoi |
| Validation head | High | Primary | crown | Valider/Rejeter |
| Document manquant | High | Error | alert-circle | Compléter |
| Information | Low | Info | info-circle | - |

## 🚀 Améliorations apportées

### Performance
- ✅ Composables réutilisables pour la logique métier
- ✅ Computed properties pour les données dérivées
- ✅ Séparation des responsabilités (SoC)
- ✅ Lazy loading des composants

### Maintenabilité
- ✅ Code modulaire et organisé
- ✅ Documentation JSDoc complète
- ✅ Nommage cohérent et explicite
- ✅ Constantes pour les valeurs magiques

### UX/UI
- ✅ Composants réutilisables
- ✅ Feedback utilisateur amélioré
- ✅ Animations fluides
- ✅ Gestion d'erreurs robuste
- ✅ Responsive design

### Qualité du code
- ✅ Gestion d'erreurs centralisée
- ✅ Validation des données
- ✅ Code DRY (Don't Repeat Yourself)
- ✅ Accessibilité améliorée

## 🔧 Configuration

### viewData

Configuration de la vue et de l'API :

```javascript
const viewData = reactive({
  filter: {
    title: 'Filtres',
  },
  data: {
    title: { singular: 'Contrat', plural: 'Contrats' },
    actions: { singular: 'le contrat', plural: 'les contrats' },
    rule: { name: 'basic-contract' },
    link: { base: 'contract' },
    api: {
      end_point: 'contract',
      query: {
        with_type_of_credit: 1,
        with_company: 1,
        with_individual_business: 1,
        with_creator: 1,
        has_cat: 0,
      },
    },
  },
})
```

### Filtres disponibles

- Type de contrat (Société, Particulier, Entreprise Individuelle)

## 📝 Utilisation

```vue
<script setup>
import { useContractActions } from '@/composables/useContractActions'

const { adminValidate, showSnackbar } = useContractActions()

const handleValidate = async (contractId, comment) => {
  const success = await adminValidate(contractId, comment)
  if (success) {
    // Rafraîchir la liste
  }
}
</script>
```

## 🐛 Débogage

### Activer les logs
Les composables loguent automatiquement les erreurs dans la console.

### États de chargement
Utilisez `loadings` pour tracer l'état des requêtes :
- `loadings[3]` - Bouton recharger
- `loadings[4]` - Table principale

## 🔐 Permissions

- `read:contract` - Voir les contrats
- `create:basic-contract` - Créer un contrat
- `upload:basic-contract` - Uploader des documents
- `download:basic-contract` - Télécharger des documents
- `read:guarantor` - Voir les cautions

## 📚 Ressources

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify 3 Data Tables](https://vuetifyjs.com/en/components/data-tables/)
- [VueUse](https://vueuse.org/)

