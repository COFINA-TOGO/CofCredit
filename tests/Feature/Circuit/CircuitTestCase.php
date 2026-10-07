<?php

namespace Tests\Feature\Circuit;

use App\Models\Contract;
use App\Models\TypeOfApplicant;
use App\Models\TypeOfCredit;
use App\Models\User;
use App\Models\VerbalTrial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * Base des tests du circuit de crédit, sur SQLite en mémoire.
 * Les e-mails sont interceptés (Bus::fake) : aucun envoi réel.
 */
abstract class CircuitTestCase extends TestCase
{
	use RefreshDatabase;

	protected function setUp(): void
	{
		parent::setUp();
		// SQLite ne sait pas modifier les enum des anciennes migrations : leurs contraintes sont ignorées
		DB::statement('PRAGMA ignore_check_constraints = 1');
		Bus::fake();
	}

	protected function user(string $profile, array $attributes = []): User
	{
		return User::factory()->create(["profile" => $profile, "activated" => 1, "password_change_required" => 0] + $attributes);
	}

	protected function typeOfCredit(): TypeOfCredit
	{
		$applicant = TypeOfApplicant::firstOrCreate(["name" => "Particulier"]);

		return TypeOfCredit::firstOrCreate(["name" => "CREDIT BFR", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $applicant->id]);
	}

	/**
	 * Un PV et ses acteurs (CAF, analyste, admin crédit)
	 */
	protected function verbalTrial(array $attributes = []): VerbalTrial
	{
		$caf = $attributes["caf_id"] ?? $this->user("caf")->id;
		$analyst = $attributes["credit_analyst_id"] ?? $this->user("credit_analyst")->id;
		$admin = $attributes["credit_admin_id"] ?? $this->user("credit_admin")->id;

		return VerbalTrial::factory()->create([
			"type_of_credit_id" => $this->typeOfCredit()->id,
			"caf_id" => $caf,
			"credit_analyst_id" => $analyst,
			"credit_admin_id" => $admin,
			"creator_id" => $admin,
		] + $attributes);
	}

	protected function contract(VerbalTrial $verbalTrial, array $attributes = []): Contract
	{
		return Contract::factory()->create(["verbal_trial_id" => $verbalTrial->id, "creator_id" => $verbalTrial->credit_admin_id] + $attributes);
	}
}
