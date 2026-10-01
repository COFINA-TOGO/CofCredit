<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Le PV n'est plus validé que par le head crédit : les PV qui attendaient
 * l'admin crédit ou le MD passent en attente de sa validation.
 */
return new class extends Migration
{
	public function up(): void
	{
		DB::table('verbals_trials')
			->where('status', 'waiting')
			->whereIn('validation_level', ['credit_admin', 'md'])
			->update(['validation_level' => 'head_credit']);
	}

	public function down(): void
	{
		// Les niveaux d'origine ne sont pas conservés
	}
};
