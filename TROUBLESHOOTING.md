# 🔧 Dépannage - Module Contrat

## ❌ Erreur: `ReferenceError: useSkins is not defined`

### Cause
Cette erreur survient après la refactorisation et indique que le serveur de développement n'a pas encore rechargé les nouveaux fichiers.

### Solution rapide

```bash
# 1. Arrêter le serveur (Ctrl+C dans le terminal)

# 2. Nettoyer le cache Vite
rm -rf node_modules/.vite

# 3. Redémarrer le serveur
pnpm dev
# ou
npm run dev
```

### Si le problème persiste

```bash
# Solution complète : Rebuild complet
pnpm install
pnpm dev
```

## ❌ Autres erreurs communes

### Erreur: `Cannot find module '@/composables/useContractActions'`

**Solution:**
```bash
# Redémarrer le serveur
pnpm dev
```

### Erreur: `Module not found: Error: Can't resolve '@/components/contract/...'`

**Solution:**
```bash
# Vérifier que les fichiers existent
ls -la resources/js/components/contract/
ls -la resources/js/composables/

# Redémarrer le serveur
pnpm dev
```

### Erreur ESLint

**Solution:**
```bash
# Vérifier les erreurs
npx eslint resources/js/pages/contract/index.vue

# Auto-fix
npx eslint resources/js/pages/contract/index.vue --fix
```

### Composants ne s'affichent pas

**Vérifications:**
1. ✅ Le serveur est bien redémarré
2. ✅ Pas d'erreur dans la console navigateur (F12)
3. ✅ Les imports sont corrects
4. ✅ Les fichiers existent bien

**Solution:**
```bash
# Hard refresh du navigateur
Ctrl + Shift + R (ou Cmd + Shift + R sur Mac)
```

### Fonctionnalité ne marche pas

**Vérifications:**
1. ✅ Token d'authentification valide
2. ✅ Permissions utilisateur correctes
3. ✅ Pas d'erreur 401/403 dans Network (F12)

**Solution:**
```bash
# Se reconnecter
# Vider le cache navigateur
# Redémarrer le serveur
```

## 🚀 Checklist de dépannage rapide

```bash
# 1. Tuer le serveur
Ctrl + C

# 2. Nettoyer
rm -rf node_modules/.vite

# 3. Redémarrer
pnpm dev

# 4. Hard refresh navigateur
Ctrl + Shift + R

# 5. Vérifier console navigateur (F12)
# Regarder les erreurs rouges
```

## 📝 Logs utiles

### Vérifier que les fichiers sont bien créés
```bash
# Composables
ls -la resources/js/composables/useContract*.js

# Composants
ls -la resources/js/components/contract/*.vue

# Page principale
ls -la resources/js/pages/contract/index.vue
```

### Output attendu
```
✅ useContractActions.js
✅ useContractObservations.js
✅ useContractList.js
✅ useContractDownload.js
✅ ObservationCard.vue
✅ ObservationsList.vue
✅ ContractStatusCard.vue
✅ ContractActionsMenu.vue
✅ ValidationActions.vue
✅ index.vue (refactorisé)
```

## 🆘 Support

Si le problème persiste après ces étapes :

1. **Vérifier la documentation** : `resources/js/pages/contract/README.md`
2. **Consulter le guide** : `MIGRATION_GUIDE.md`
3. **Lire les logs** : Console navigateur + terminal serveur
4. **Restaurer l'ancien fichier** (si nécessaire) :
   ```bash
   git checkout resources/js/pages/contract/index.vue
   ```

## ✅ Validation que tout fonctionne

```bash
# 1. Serveur démarre sans erreur
pnpm dev
# ✅ "ready in XX ms"

# 2. Page charge sans erreur
# Ouvrir http://localhost:3000/contract
# ✅ Liste des contrats s'affiche

# 3. Console propre
# F12 > Console
# ✅ Pas d'erreur rouge

# 4. ESLint propre
npx eslint resources/js/pages/contract/index.vue
# ✅ 0 error, 0 warning
```

---

**La plupart des erreurs se résolvent avec un simple redémarrage du serveur !** 🚀

