# Manuels d'utilisation : captures d'écran

Ces outils produisent, pour chaque profil (admin crédit, head crédit, CAF...),
les captures d'écran des pages qu'il peut ouvrir. Elles servent ensuite à
générer les manuels consultables depuis l'application.

## Prérequis

- Google Chrome dans `/usr/bin/google-chrome` (sinon `CHROME=/chemin/vers/chrome`) ;
- l'application servie localement avec le dernier build (`npm run build`), par
  défaut sur `https://credit.cofina.com` (sinon `CREDIT_URL=…`) ;
- `npm install` dans ce dossier (installe `puppeteer-core`).

## Lancer les captures

En une commande (comptes de démonstration, captures six profils à la fois, puis suppression des comptes) :

```sh
bash tools/manuels/capturer.sh            # ou : bash tools/manuels/capturer.sh 6 admin-credit,caf contrats
```

Ou étape par étape, depuis la racine du projet (`tinker` sort toujours avec le code 1 : ne pas l'enchaîner avec `&&`) :

```sh
# 1. Un compte de démonstration par profil, avec son jeton (sessions/<profil>.json)
php artisan tinker tools/manuels/comptes-demo.php < /dev/null

# 2. Les captures, deux profils à la fois (dans tools/manuels/captures/<profil>/)
cd tools/manuels && npm install && PARALLELE=2 node capture-roles.mjs; cd ../..

# 3. Suppression des comptes de démonstration et de leurs sessions
php artisan tinker tools/manuels/supprimer-comptes-demo.php < /dev/null
```

Options utiles :

- `node capture-roles.mjs "" admin-credit,caf` : seulement ces profils ;
- `node capture-roles.mjs "" "" contrats,cat` : seulement ces scénarios ;
- `CREDIT_URL=http://127.0.0.1:8000 node capture-roles.mjs` : autre adresse
  (par exemple `php artisan serve`).

Rien n'est jamais enregistré : les formulaires sont ouverts mais pas soumis.
Chaque dossier de profil contient un `journal.txt` qui liste les erreurs
JavaScript et les appels d'API en erreur rencontrés pendant les captures.

Les comptes de démonstration ne sont rattachés à aucun dossier : les listes
filtrées sur l'utilisateur connecté (PV d'un admin crédit, contrats d'un CAF...)
peuvent donc être vides, les fiches s'ouvrent sur les dossiers les plus récents.

## Générer les manuels

Une fois les captures faites, depuis la racine du projet :

```sh
node tools/manuels/generer-manuels.mjs            # tous les profils
node tools/manuels/generer-manuels.mjs md,caf     # seulement ces profils
```

Chaque manuel est écrit dans `resources/manuels/<profil>/` (`manuel.html` et
ses captures en webp dans `img/`, via ImageMagick `convert`). Le texte suit les
droits de chaque profil (`droits.php`) et le menu de l'application ; la mise
en forme vient de `gabarit/` et l'impression PDF de `resources/manuels/_impression/`.

Les manuels déclarés dans `config/manuels.php` s'affichent dans l'application,
menu **Aide › Manuel d'utilisation** : chaque compte voit celui de son profil,
l'administrateur les voit tous.
