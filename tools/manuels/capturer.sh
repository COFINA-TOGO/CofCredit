#!/usr/bin/env bash
# Régénère toutes les captures des manuels : comptes de démonstration, captures, suppression des comptes.
# Usage, depuis n'importe où : bash tools/manuels/capturer.sh [parallele] [profils] [scenarios]
#   - parallele : nombre de profils capturés en même temps (défaut 6) ;
#   - profils, scenarios : voir capture-roles.mjs.
set -u

MANUELS="$(cd "$(dirname "$0")" && pwd)"
RACINE="$(cd "$MANUELS/../.." && pwd)"

cd "$RACINE" || exit 1
# tinker rend toujours le code 1 en sortant : on vérifie la session écrite plutôt que son code de retour
rm -f tools/manuels/sessions/_exemples.json
php artisan tinker tools/manuels/comptes-demo.php < /dev/null
[ -f tools/manuels/sessions/_exemples.json ] || { echo "Création des comptes de démonstration impossible" >&2; exit 1; }

# Les comptes sont supprimés même si les captures échouent
trap 'cd "$RACINE" && php artisan tinker tools/manuels/supprimer-comptes-demo.php < /dev/null' EXIT

cd "$MANUELS" || exit 1
PARALLELE="${1:-6}" node capture-roles.mjs "" "${2:-}" "${3:-}" 2>&1 | tee capture.log
