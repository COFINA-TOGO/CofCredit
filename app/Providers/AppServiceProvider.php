<?php

namespace App\Providers;

use App\Models\CAT;
use App\Models\Contract;
use App\Models\Notification;
use App\Models\VerbalTrial;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Noms stables des dossiers dans l'historique (activities.subject_type)
        Relation::morphMap([
            'verbal-trial' => VerbalTrial::class,
            'contract' => Contract::class,
            'notification' => Notification::class,
            'cat' => CAT::class,
        ]);
    }
}
