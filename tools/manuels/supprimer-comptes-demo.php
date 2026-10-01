<?php
// Supprime les comptes de démonstration créés par comptes-demo.php, leurs jetons, puis les fichiers de session.
// Usage : php artisan tinker tools/manuels/supprimer-comptes-demo.php < /dev/null
use App\Models\User;
use Illuminate\Support\Facades\DB;

$ids = User::where('email', 'like', 'demo.%@credit.test')->pluck('id');
DB::transaction(function () use ($ids) {
    DB::table('personal_access_tokens')->where('tokenable_type', User::class)->whereIn('tokenable_id', $ids)->delete();
    User::whereIn('id', $ids)->delete();
});
array_map('unlink', glob(__DIR__ . '/sessions/*.json') ?: []);
echo count($ids), " comptes de démonstration supprimés\n";
