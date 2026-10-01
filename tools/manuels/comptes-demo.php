<?php
// Crée un compte de démonstration par profil et sa session pour les captures.
// Rejouable : un compte existant est réutilisé, ses anciens jetons supprimés.
// Usage : php artisan tinker tools/manuels/comptes-demo.php < /dev/null
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

// slug du manuel => profil applicatif
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

$dossier = __DIR__ . '/sessions';
@mkdir($dossier);

foreach ($profils as $slug => $profil) {
    $email = "demo.$slug@credit.test";
    $user = User::where('email', $email)->first() ?? new User;
    $nom = 'Démo ' . (new User(['profile' => $profil]))->profile_fr;
    $user->forceFill([
        'name' => Str::slug($nom),
        'full_name' => $nom,
        'email' => $email,
        'profile' => $profil,
        'password' => Hash::make(Str::random(40)),
        'activated' => 1,
        'password_change_required' => 0,
        'email_verified_at' => now(),
    ])->save();

    $user->tokens()->delete();
    $token = $user->createToken('capture-manuel')->plainTextToken;
    $user = User::find($user->id);

    file_put_contents("$dossier/$slug.json", json_encode([
        'slug' => $slug,
        'profile' => $profil,
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'fullName' => $user->full_name,
            'username' => $user->name,
            'avatar' => '/images/avatars/avatar-1.png',
            'signatory' => '/images/avatars/avatar-14.png',
            'email' => $user->email,
            'role' => $user->profile,
            'role_fr' => $user->profile_fr,
        ],
        'rules' => $user->ability_rules,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo "✓ $slug ($nom)\n";
}

// Identifiants d'exemple pour les fiches (les plus récents de chaque type)
$exemples = [
    'contrat' => App\Models\Contract::whereHas('guarantors')->latest('id')->value('id'),
    'pv' => App\Models\VerbalTrial::whereHas('contract')->latest('id')->value('id'),
    'pv_notification' => App\Models\VerbalTrial::where('validation_level', 'credit_analyst')->latest('id')->value('id'),
    'notification' => App\Models\Notification::latest('id')->value('id'),
    'cat' => App\Models\CAT::whereNotNull('contract_id')->latest('id')->value('id'),
    'cat_notification' => App\Models\CAT::whereNotNull('notification_id')->latest('id')->value('id'),
    'report' => App\Models\DeadlinePostponed::latest('id')->value('id'),
    'utilisateur' => User::where('email', 'not like', 'demo.%@credit.test')->latest('id')->value('id'),
];
$exemples['caution'] = App\Models\Guarantor::where('contract_id', $exemples['contrat'])->value('id');
file_put_contents("$dossier/_exemples.json", json_encode($exemples, JSON_PRETTY_PRINT));
echo "✓ exemples : " . json_encode($exemples) . "\n";
