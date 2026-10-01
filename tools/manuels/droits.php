<?php
// Écrit sessions/_droits.json : pour chaque profil, son libellé et ses droits.
// Appelé par generer-manuels.mjs (php artisan tinker tools/manuels/droits.php).
use App\Models\User;

$profils = [
    'administrateur' => 'admin',
    'analyste-credit' => 'credit_analyst',
    'admin-credit' => 'credit_admin',
    'head-credit' => 'head_credit',
    'operations' => 'operation',
    'juridique' => 'legal',
    'dex' => 'dex',
    'caf' => 'caf',
    'chef-agence' => 'ca',
    'md' => 'md',
    'courrier' => 'courier',
];

$droits = [];
foreach ($profils as $slug => $profil) {
    $user = new User(['profile' => $profil]);
    $droits[$slug] = ['slug' => $slug, 'profile' => $profil, 'role' => $user->profile_fr, 'rules' => $user->ability_rules];
}
if (!is_dir(__DIR__ . '/sessions')) mkdir(__DIR__ . '/sessions');
file_put_contents(__DIR__ . '/sessions/_droits.json', json_encode($droits, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo count($droits) . " profils\n";
