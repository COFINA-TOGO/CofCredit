# Architecture du Module Contrat

## 📐 Vue d'ensemble

Le module contrat suit une architecture en couches avec séparation des responsabilités.

```
┌─────────────────────────────────────────────────┐
│                    Vue (UI)                      │
│              pages/contract/index.vue            │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────┐
│  Components  │          │  Composables │
│   (UI Layer) │          │ (Logic Layer)│
└──────────────┘          └──────────────┘
        │                         │
        │                         ▼
        │                  ┌─────────────┐
        │                  │  API Layer  │
        │                  │  ($api)     │
        │                  └─────────────┘
        │                         │
        └────────────┬────────────┘
                     ▼
              ┌─────────────┐
              │   Backend   │
              │   (Laravel) │
              └─────────────┘
```

## 🏗 Structure détaillée

### 1. Page principale (Orchestration)

```
pages/contract/index.vue
│
├── Configuration de la page (definePage)
├── Imports des composables
├── Imports des composants
├── État local (refs, reactive)
├── Méthodes d'orchestration
└── Template avec composants
```

**Responsabilités :**
- Orchestrer les composables
- Gérer l'état global de la page
- Coordonner les composants enfants
- Gérer les dialogs et modals

### 2. Composables (Logique métier)

```
composables/
│
├── useContractActions.js
│   ├── deleteContract()
│   ├── changeStatus()
│   ├── adminValidate()
│   ├── headValidate()
│   ├── uploadFile()
│   └── showSnackbar()
│
├── useContractObservations.js
│   ├── decorateObservations()
│   ├── sortObservationsByPriority()
│   ├── hasHighPriority()
│   ├── getStatusText()
│   └── getStatusColor()
│
├── useContractList.js
│   ├── fetchItemList()
│   ├── initializeFilters()
│   ├── updateOptions()
│   └── Computed: contractList, totalContracts, lastPage
│
└── useContractDownload.js
    ├── downloadUnsignedContract()
    ├── downloadSignedContract()
    ├── downloadUnsignedPromissoryNote()
    ├── downloadSignedPromissoryNote()
    └── downloadHandwrittenMention()
```

**Responsabilités :**
- Encapsuler la logique métier
- Gérer les appels API
- Transformer les données
- Gérer l'état réactif

### 3. Composants UI (Présentation)

```
components/contract/
│
├── ObservationCard.vue
│   ├── Props: observation, contractId
│   ├── Events: uploadContract, uploadPromissoryNote
│   └── Affichage: carte d'observation avec actions
│
├── ObservationsList.vue
│   ├── Props: observations, contractId
│   ├── Events: uploadContract, uploadPromissoryNote
│   └── Affichage: liste organisée + badge résumé
│
├── ContractStatusCard.vue
│   ├── Props: status, statusObservation
│   └── Affichage: statut avec tooltip
│
├── ContractActionsMenu.vue
│   ├── Props: contract, canRead, canDownload, canUpload
│   ├── Events: download*, upload*
│   └── Affichage: menu contextuel
│
└── ValidationActions.vue
    ├── Props: contract, userRole, userId
    ├── Events: adminValidate, headValidate, headReject
    └── Affichage: boutons de validation
```

**Responsabilités :**
- Affichage uniquement
- Émettre des events
- Recevoir des props
- Styles scopés

## 🔄 Flux de données

### Flux principal

```
User Action
    │
    ▼
Component Event
    │
    ▼
Page Handler
    │
    ▼
Composable Function
    │
    ▼
API Call
    │
    ▼
Backend Response
    │
    ▼
Data Transformation
    │
    ▼
Reactive Update
    │
    ▼
UI Re-render
```

### Exemple : Upload de contrat

```
1. User clicks "Upload" button
   │
   ▼
2. ObservationCard emits @uploadContract
   │
   ▼
3. ObservationsList forwards event
   │
   ▼
4. index.vue calls triggerContractUpload()
   │
   ▼
5. File input is triggered
   │
   ▼
6. User selects file
   │
   ▼
7. handleUploadFile() is called
   │
   ▼
8. useContractActions.uploadFile() is called
   │
   ▼
9. File is converted to base64
   │
   ▼
10. API call to /api/contract/upload/{id}
    │
    ▼
11. Response is handled
    │
    ▼
12. Snackbar is shown
    │
    ▼
13. List is refreshed
    │
    ▼
14. UI is updated
```

## 🎯 Patterns utilisés

### 1. Composition API Pattern

```javascript
// Composable
export function useContractActions() {
  const state = ref(...)
  const action = async () => { ... }
  return { state, action }
}

// Usage
const { state, action } = useContractActions()
```

### 2. Props Down, Events Up

```vue
<!-- Parent -->
<Component
  :data="parentData"
  @event="handleEvent"
/>

<!-- Child -->
<script setup>
const props = defineProps({ data: Object })
const emit = defineEmits(['event'])
emit('event', payload)
</script>
```

### 3. Provide/Inject (si nécessaire)

```javascript
// Parent
provide('key', value)

// Child (n'importe où dans l'arbre)
const value = inject('key')
```

### 4. Async/Await Pattern

```javascript
const fetchData = async () => {
  try {
    const response = await api.get(...)
    return response.data
  } catch (error) {
    console.error(error)
    return fallback
  } finally {
    cleanup()
  }
}
```

## 📦 Dépendances

### Externes
- `vue` - Framework Vue 3
- `vue-router` - Routing
- `vuetify` - UI Framework
- `@vueuse/core` - Utilities Vue
- `js-file-downloader` - Téléchargements

### Internes
- `@/utils/api` - Client API ($api)
- `@/composables/createUrl` - Construction d'URL
- `@api-utils/paginationMeta` - Meta pagination

## 🔐 Gestion des permissions

```
User Authentication
    │
    ▼
Cookie: userToken, userData, userAbilityRules
    │
    ▼
$can(action, subject) directive
    │
    ▼
Conditional Rendering
    │
    ▼
v-if="$can('read', 'contract')"
```

### Permissions utilisées

- `read:contract` - Voir les contrats
- `create:basic-contract` - Créer un contrat
- `upload:basic-contract` - Uploader des documents
- `download:basic-contract` - Télécharger des documents
- `read:guarantor` - Voir les cautions
- `read:pv` - Voir les PV

## 🎨 Gestion du style

### Architecture CSS

```
<style lang="scss" scoped>
  // 1. Variables locales
  $primary-color: ...;
  
  // 2. Animations
  @keyframes ...
  
  // 3. Classes principales
  .component-class { ... }
  
  // 4. Responsive
  @media (max-width: 768px) { ... }
</style>
```

### Scopage

- Tous les styles sont **scoped** par défaut
- Utilisation de classes BEM si nécessaire
- Variables Vuetify pour la cohérence

## 🧪 Testabilité

### Composables (Unit Tests)

```javascript
import { useContractActions } from '@/composables/useContractActions'

describe('useContractActions', () => {
  it('should delete contract', async () => {
    const { deleteContract } = useContractActions()
    const result = await deleteContract(1, viewData)
    expect(result).toBe(true)
  })
})
```

### Composants (Component Tests)

```javascript
import { mount } from '@vue/test-utils'
import ObservationCard from '@/components/contract/ObservationCard.vue'

describe('ObservationCard', () => {
  it('should render observation', () => {
    const wrapper = mount(ObservationCard, {
      props: { observation: {...}, contractId: 1 }
    })
    expect(wrapper.text()).toContain('...')
  })
})
```

### E2E Tests

```javascript
describe('Contract workflow', () => {
  it('should complete validation workflow', () => {
    cy.visit('/contract')
    cy.get('[data-test="upload-button"]').click()
    // ...
  })
})
```

## 🔄 État et réactivité

### État local (ref, reactive)

```javascript
// Valeurs primitives
const count = ref(0)

// Objets
const state = reactive({
  data: [],
  loading: false
})
```

### État computed

```javascript
// Dérivé de l'état
const filteredList = computed(() => {
  return list.value.filter(...)
})
```

### Watchers

```javascript
// Watch simple
watch(source, (newVal, oldVal) => { ... })

// Watch multiple
watch([source1, source2], ([new1, new2]) => { ... })

// WatchEffect (auto-track)
watchEffect(() => {
  // Automatically tracks dependencies
})
```

## 📈 Performance

### Optimisations appliquées

1. **Computed au lieu de methods**
   ```javascript
   // ❌ Bad
   methods: { filtered() { return ... } }
   
   // ✅ Good
   const filtered = computed(() => ...)
   ```

2. **Constants pour valeurs fixes**
   ```javascript
   // ✅ Good
   const TYPE_LIST = { ... }
   ```

3. **Debounce sur recherche**
   ```javascript
   const debouncedSearch = useDebounceFn(search, 300)
   ```

4. **Lazy loading**
   ```javascript
   const Component = defineAsyncComponent(() =>
     import('./Component.vue')
   )
   ```

## 🚀 Évolutivité

### Ajouter un nouveau composable

1. Créer `composables/useNewFeature.js`
2. Exporter les fonctions
3. Ajouter à `composables/index.js`
4. Utiliser dans les pages/composants

### Ajouter un nouveau composant

1. Créer `components/contract/NewComponent.vue`
2. Définir props et events
3. Ajouter à `components/contract/index.js`
4. Utiliser dans les pages

### Ajouter une nouvelle fonctionnalité

1. Identifier la couche (composable/component)
2. Créer les fichiers nécessaires
3. Tester unitairement
4. Intégrer dans la page
5. Documenter

## 📚 Ressources

- [Vue 3 Docs](https://vuejs.org/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify 3](https://vuetifyjs.com/)
- [VueUse](https://vueuse.org/)

---

**Cette architecture est évolutive, maintenable et suit les meilleures pratiques Vue 3.**

