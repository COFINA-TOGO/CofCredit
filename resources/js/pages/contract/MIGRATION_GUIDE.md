# Guide de Migration - Module Contrat

## 🔄 Vue d'ensemble

Ce guide explique comment migrer du code existant vers la nouvelle architecture modulaire.

## 📋 Checklist de migration

- [ ] Remplacer l'ancien fichier `index.vue` par le nouveau
- [ ] Vérifier que tous les composables sont importés
- [ ] Tester toutes les fonctionnalités
- [ ] Vérifier les permissions utilisateur
- [ ] Tester le workflow de validation complet

## 🔀 Changements d'API

### Aucun changement d'API backend
✅ Tous les endpoints API restent identiques  
✅ Les réponses API restent au même format  
✅ Les permissions restent les mêmes

## 🛠 Mise à jour du code

### Étape 1 : Backup de l'ancien code

```bash
# Sauvegardez l'ancien fichier (optionnel)
cp resources/js/pages/contract/index.vue resources/js/pages/contract/index.vue.backup
```

### Étape 2 : Les fichiers sont déjà créés

Tous les nouveaux fichiers ont été créés automatiquement :

```
✅ resources/js/pages/contract/index.vue (refactorisé)
✅ resources/js/components/contract/*.vue (nouveaux composants)
✅ resources/js/composables/*.js (nouveaux composables)
```

### Étape 3 : Redémarrage du serveur de développement

```bash
# Si vous utilisez Vite
npm run dev

# Ou avec pnpm
pnpm dev
```

## 🧪 Tests à effectuer

### Tests fonctionnels

1. **Liste des contrats**
   - [ ] Affichage de la liste
   - [ ] Pagination
   - [ ] Recherche
   - [ ] Filtres par type

2. **Observations**
   - [ ] Affichage des observations
   - [ ] Tri par priorité
   - [ ] Badge URGENT
   - [ ] Actions rapides (upload, cautions, CAT)

3. **Actions**
   - [ ] Voir détails
   - [ ] Voir cautions
   - [ ] Voir PV
   - [ ] Télécharger documents
   - [ ] Uploader documents

4. **Validation (Admin Crédit)**
   - [ ] Upload contrat signé
   - [ ] Upload billet à ordre
   - [ ] Validation envoi
   - [ ] Commentaire requis

5. **Validation (Head Crédit)**
   - [ ] Valider contrat
   - [ ] Rejeter contrat
   - [ ] Commentaire requis

6. **Notifications**
   - [ ] Snackbar de succès
   - [ ] Snackbar d'erreur
   - [ ] Messages clairs

### Tests de permissions

Testez avec différents rôles :

- [ ] Admin Crédit (créateur du contrat)
- [ ] Admin Crédit (non-créateur)
- [ ] Head Crédit
- [ ] Autres rôles

### Tests de workflow

Testez le cycle complet :

1. [ ] Créer un contrat
2. [ ] Uploader documents signés
3. [ ] Valider en tant qu'admin
4. [ ] Valider en tant qu'head
5. [ ] Vérifier statut final

## 🔍 Points d'attention

### Comportements identiques

✅ **Filtres** : Fonctionnent exactement pareil  
✅ **Recherche** : Même comportement  
✅ **Pagination** : Inchangée  
✅ **Upload** : Même processus  
✅ **Download** : Identique  
✅ **Validation** : Même workflow

### Améliorations visuelles

🎨 **Observations** : Mieux organisées, plus claires  
🎨 **Actions** : Plus intuitives  
🎨 **Feedback** : Plus rapide et visible  
🎨 **Animations** : Plus fluides

## 🐛 Résolution de problèmes

### Erreur : "Cannot find module"

**Solution :**
```bash
# Redémarrez le serveur de développement
npm run dev
```

### Erreur : Les composables ne sont pas définis

**Vérifiez :**
1. Les imports dans `index.vue`
2. Les chemins des composables
3. La syntaxe d'export/import

### Erreur : Les composants ne s'affichent pas

**Vérifiez :**
1. Les imports des composants
2. Les props passées
3. La console pour les erreurs

### Upload ne fonctionne pas

**Vérifiez :**
1. Le token d'authentification
2. Les permissions utilisateur
3. La taille du fichier
4. Le format du fichier

### Les observations ne s'affichent pas

**Vérifiez :**
1. La structure de données des observations
2. Le décorateur d'observations
3. Les conditions d'affichage

## 📊 Validation de la migration

### Checklist finale

- [ ] Aucune erreur ESLint
- [ ] Aucune erreur en console
- [ ] Tous les tests fonctionnels passent
- [ ] Les permissions fonctionnent
- [ ] Le workflow complet fonctionne
- [ ] Les utilisateurs peuvent utiliser le module
- [ ] Les performances sont bonnes
- [ ] L'UX est améliorée

### Rollback si nécessaire

Si vous devez revenir en arrière :

```bash
# Restaurer l'ancien fichier
cp resources/js/pages/contract/index.vue.backup resources/js/pages/contract/index.vue

# Supprimer les nouveaux fichiers
rm -rf resources/js/components/contract
rm resources/js/composables/useContract*.js
```

## 🎉 Migration réussie !

Une fois tous les tests validés :

1. Supprimez le backup : `rm resources/js/pages/contract/index.vue.backup`
2. Commitez les changements
3. Informez l'équipe des améliorations
4. Profitez du code refactorisé ! 🚀

## 📞 Support

En cas de problème :

1. Consultez la documentation : `README.md`
2. Vérifiez les erreurs de lint
3. Consultez la console navigateur
4. Revoyez le guide d'améliorations : `IMPROVEMENTS.md`

---

**Note :** Cette migration est **rétrocompatible** et ne nécessite aucun changement backend.

