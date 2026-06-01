# Guide de contribution - Module Contrat

## 🎯 Objectif

Ce guide aide les développeurs à contribuer au module contrat en respectant l'architecture et les standards établis.

## 📋 Avant de commencer

### Prérequis

- ✅ Comprendre Vue 3 Composition API
- ✅ Lire `README.md` et `ARCHITECTURE.md`
- ✅ Avoir un environnement de développement configuré
- ✅ Connaître les conventions du projet

### Standards du code

1. **Vue 3 Composition API** obligatoire
2. **ESLint** : 0 erreur toléré
3. **JSDoc** : Toutes les fonctions documentées
4. **Tests** : Coverage minimum 80%
5. **Performance** : Computed > methods

## 🏗 Structure à respecter

### Règles d'organisation

```
✅ Composables → Logique métier uniquement
✅ Components → UI/Présentation uniquement
✅ Pages → Orchestration uniquement
❌ Ne pas mélanger les responsabilités
```

### Nommage

#### Fichiers
```
✅ useFeatureName.js (composable)
✅ ComponentName.vue (component)
✅ page-name.vue (page)
❌ feature.js
❌ component.vue
```

#### Variables
```javascript
✅ const isLoading = ref(false)        // Boolean
✅ const contractList = ref([])        // Array
✅ const selectedItem = ref(null)      // Object
✅ const STATUS_COLORS = { ... }       // Constant
❌ const data = ref(...)
❌ const x = ref(...)
```

#### Fonctions
```javascript
✅ const handleSubmit = () => { ... }     // Event handler
✅ const fetchContracts = async () => { ... }  // API call
✅ const formatAmount = (amount) => { ... }     // Pure function
❌ const submit = () => { ... }
❌ const get = () => { ... }
```

## 🔧 Créer un nouveau composable

### Template

```javascript
/**
 * Composable pour [DESCRIPTION]
 * @module composables/useFeatureName
 */

/**
 * [Description de la fonction principale]
 * @returns {Object}
 */
export function useFeatureName() {
  // 1. État réactif
  const state = ref(initialValue)
  
  // 2. Computed properties
  const computedValue = computed(() => {
    return derivedValue
  })
  
  // 3. Méthodes
  /**
   * [Description de la méthode]
   * @param {Type} param - Description
   * @returns {Promise<Type>}
   */
  const methodName = async (param) => {
    try {
      // Logique
      return result
    } catch (error) {
      console.error('Error:', error)
      return fallback
    }
  }
  
  // 4. Return API
  return {
    // State
    state,
    
    // Computed
    computedValue,
    
    // Methods
    methodName,
  }
}
```

### Checklist

- [ ] JSDoc complet
- [ ] Gestion d'erreurs avec try-catch
- [ ] Return explicite
- [ ] Nommage clair
- [ ] Tests unitaires
- [ ] Ajouté à `composables/index.js`

### Exemple

```javascript
/**
 * Composable pour la gestion des notifications
 */
export function useNotifications() {
  const notifications = ref([])
  
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })
  
  /**
   * Marque une notification comme lue
   * @param {number} id - ID de la notification
   */
  const markAsRead = async (id) => {
    try {
      await $api(`notifications/${id}/read`, { method: 'PUT' })
      const notif = notifications.value.find(n => n.id === id)
      if (notif) notif.read = true
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }
  
  return {
    notifications,
    unreadCount,
    markAsRead,
  }
}
```

## 🎨 Créer un nouveau composant

### Template

```vue
<!-- Description du composant -->
<script setup>
/**
 * Props
 */
const props = defineProps({
  propName: {
    type: String,
    required: true,
    default: '',
    validator: (value) => true,
  },
})

/**
 * Events
 */
const emit = defineEmits(['eventName'])

/**
 * State local si nécessaire
 */
const localState = ref(null)

/**
 * Computed
 */
const computedValue = computed(() => {
  return props.propName.toUpperCase()
})

/**
 * Methods
 */
const handleAction = () => {
  emit('eventName', payload)
}
</script>

<template>
  <div class="component-name">
    <!-- Template here -->
  </div>
</template>

<style lang="scss" scoped>
.component-name {
  // Styles here
}
</style>
```

### Checklist

- [ ] Props typées et documentées
- [ ] Events définis avec defineEmits
- [ ] Styles scopés
- [ ] Accessibilité (ARIA, semantic HTML)
- [ ] Responsive
- [ ] Tests de composant
- [ ] Ajouté à `components/contract/index.js`

### Exemple

```vue
<!-- Badge de notification avec compteur -->
<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: true,
    validator: (value) => value >= 0,
  },
  color: {
    type: String,
    default: 'primary',
  },
})

const displayCount = computed(() => {
  return props.count > 99 ? '99+' : props.count
})

const emit = defineEmits(['click'])
</script>

<template>
  <VBadge
    :content="displayCount"
    :color="color"
    @click="emit('click')"
  >
    <slot />
  </VBadge>
</template>
```

## ✅ Checklist avant commit

### Code

- [ ] ESLint : 0 erreur
- [ ] JSDoc : Toutes fonctions documentées
- [ ] Console.log : Supprimés (sauf error)
- [ ] Debugger : Supprimés
- [ ] TODO : Documentés ou traités

### Tests

- [ ] Tests unitaires passent
- [ ] Tests de composant passent
- [ ] Coverage >= 80%
- [ ] Pas de tests skip/only

### Performance

- [ ] Computed au lieu de methods
- [ ] Pas de calculs dans template
- [ ] Watchers optimisés
- [ ] Pas de memory leaks

### Accessibilité

- [ ] HTML sémantique
- [ ] ARIA labels si nécessaire
- [ ] Contraste des couleurs
- [ ] Navigation au clavier

## 🧪 Tests

### Tests unitaires (Composables)

```javascript
import { describe, it, expect, vi } from 'vitest'
import { useFeatureName } from '../useFeatureName'

describe('useFeatureName', () => {
  it('should do something', () => {
    const { method } = useFeatureName()
    const result = method(input)
    expect(result).toBe(expected)
  })
  
  it('should handle errors', async () => {
    const { method } = useFeatureName()
    vi.mock('$api', () => ({ get: vi.fn().mockRejectedValue('error') }))
    const result = await method()
    expect(result).toBe(fallback)
  })
})
```

### Tests de composant

```javascript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ComponentName from '../ComponentName.vue'

describe('ComponentName', () => {
  it('should render correctly', () => {
    const wrapper = mount(ComponentName, {
      props: { propName: 'value' }
    })
    expect(wrapper.text()).toContain('value')
  })
  
  it('should emit event on click', async () => {
    const wrapper = mount(ComponentName)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('eventName')).toBeTruthy()
  })
})
```

### Commande

```bash
# Tous les tests
npm run test

# Mode watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 📝 Documentation

### JSDoc obligatoire

```javascript
/**
 * Description de la fonction
 * 
 * @param {Type} paramName - Description du paramètre
 * @param {Object} options - Options
 * @param {string} options.key - Description
 * @returns {Promise<Type>} Description du retour
 * @throws {Error} Quand erreur X survient
 * 
 * @example
 * const result = await functionName(param)
 * console.log(result) // { ... }
 */
```

### Commentaires

```javascript
// ✅ Bon commentaire : Explique le "pourquoi"
// On utilise setTimeout pour éviter la collision avec l'animation
setTimeout(callback, 300)

// ❌ Mauvais commentaire : Répète le code
// Incrémente le compteur
counter++
```

## 🔄 Workflow Git

### Branches

```bash
# Feature
git checkout -b feature/nom-fonctionnalite

# Bugfix
git checkout -b fix/nom-bug

# Refactor
git checkout -b refactor/nom-refactor
```

### Commits

Format : `type(scope): message`

**Types :**
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `refactor` : Refactoring
- `docs` : Documentation
- `style` : Formatage
- `test` : Tests
- `chore` : Maintenance

**Exemples :**
```bash
git commit -m "feat(contract): add export to Excel"
git commit -m "fix(observations): correct priority sorting"
git commit -m "docs(readme): update API examples"
git commit -m "test(composables): add useContractActions tests"
```

### Pull Request

1. Créer la PR avec description claire
2. Lier les issues/tickets
3. Demander une review
4. Corriger les commentaires
5. Squash et merge

**Template PR :**
```markdown
## Description
[Description des changements]

## Type de changement
- [ ] Nouvelle fonctionnalité
- [ ] Correction de bug
- [ ] Refactoring
- [ ] Documentation

## Checklist
- [ ] Tests passent
- [ ] Documentation à jour
- [ ] Pas d'erreur ESLint
- [ ] Reviewed

## Screenshots
[Si applicable]
```

## 🐛 Debugging

### Console.log stratégique

```javascript
// ❌ Éviter
console.log(data)

// ✅ Mieux
console.log('Contract data:', { id, status, observations })

// ✅ Avec groupe
console.group('Contract Validation')
console.log('Before:', oldStatus)
console.log('After:', newStatus)
console.groupEnd()
```

### Vue DevTools

1. Installer Vue DevTools
2. Inspecter les composants
3. Vérifier les props/state
4. Tracer les events

### Network debugging

```javascript
// Log API calls
const { data } = await useApi(url, {
  onRequest: ({ options }) => {
    console.log('API Request:', options)
  },
  onResponse: ({ response }) => {
    console.log('API Response:', response)
  }
})
```

## 🚀 Performance

### Do's

```javascript
// ✅ Computed pour données dérivées
const filteredList = computed(() => list.value.filter(...))

// ✅ Constants hors composants
const STATUS_COLORS = { ... }

// ✅ Debounce recherche
const debouncedSearch = useDebounceFn(search, 300)

// ✅ Lazy loading
const Component = defineAsyncComponent(() => import('./Component.vue'))
```

### Don'ts

```javascript
// ❌ Calculs dans template
<div>{{ list.filter(...).map(...) }}</div>

// ❌ Variables dans boucles
for (let i = 0; i < array.length; i++) // length recalculé

// ❌ Watch sans cleanup
watch(source, () => {
  const interval = setInterval(...) // Memory leak !
})
```

## 📚 Ressources

### Documentation
- [Vue 3](https://vuejs.org/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify 3](https://vuetifyjs.com/)
- [Vitest](https://vitest.dev/)

### Outils
- ESLint
- Vue DevTools
- Vite
- Vitest

### Standards du projet
- `README.md` - Documentation
- `ARCHITECTURE.md` - Architecture
- `IMPROVEMENTS.md` - Améliorations

## 💡 Bonnes pratiques

### 1. Composables

- ✅ Un composable = Une responsabilité
- ✅ Nommage en `useXxx`
- ✅ Return API claire
- ✅ Gestion d'erreurs

### 2. Composants

- ✅ Props down, Events up
- ✅ Styles scopés
- ✅ Accessibilité
- ✅ Réutilisabilité

### 3. Performance

- ✅ Computed > methods
- ✅ Constants pour valeurs fixes
- ✅ Lazy loading si gros composant
- ✅ Debounce pour inputs

### 4. Tests

- ✅ Tests unitaires pour composables
- ✅ Tests de composant pour UI
- ✅ Coverage >= 80%
- ✅ Tests lisibles

### 5. Documentation

- ✅ JSDoc partout
- ✅ README à jour
- ✅ Exemples clairs
- ✅ Changelog maintenu

## ❓ FAQ

### Q: Où mettre la logique métier ?
**R:** Dans les composables (`composables/useXxx.js`)

### Q: Comment gérer l'état partagé ?
**R:** Composable avec `createSharedComposable` ou Pinia

### Q: Comment tester un composable ?
**R:** Tests unitaires avec Vitest (voir exemples)

### Q: Computed ou method ?
**R:** Computed si résultat dérivé de données réactives

### Q: Comment déboguer un composant ?
**R:** Vue DevTools + console.log stratégique

## 🎉 Prêt à contribuer !

1. Fork le projet
2. Créer une branche
3. Coder avec les standards
4. Tester
5. Documenter
6. Pull Request

**Merci de contribuer au projet ! 🚀**

---

**Questions ?** Consultez `README.md` ou demandez à l'équipe.

