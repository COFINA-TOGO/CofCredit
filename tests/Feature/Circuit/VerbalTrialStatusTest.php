<?php

namespace Tests\Feature\Circuit;

use Laravel\Sanctum\Sanctum;

class VerbalTrialStatusTest extends CircuitTestCase
{
	public function test_head_credit_validates_a_waiting_pv(): void
	{
		$pv = $this->verbalTrial(["status" => "waiting", "validation_level" => "head_credit"]);
		Sanctum::actingAs($this->user("head_credit"));

		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "validated"])->assertOk();

		$this->assertSame("validated", $pv->fresh()->status);
	}

	public function test_validated_pv_without_contract_is_sent_back_to_credit_admin(): void
	{
		$pv = $this->verbalTrial(["status" => "validated", "validation_level" => "head_credit"]);
		Sanctum::actingAs($this->user("head_credit"));

		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "rejected", "comment" => "Montant à corriger"])->assertOk();

		$pv->refresh();
		$this->assertSame("rejected", $pv->status);
		$this->assertSame("credit_admin", $pv->validation_level);
	}

	public function test_validated_pv_with_contract_cannot_be_sent_back(): void
	{
		$pv = $this->verbalTrial(["status" => "validated", "validation_level" => "head_credit"]);
		$this->contract($pv);
		Sanctum::actingAs($this->user("head_credit"));

		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "rejected", "comment" => "Trop tard"])->assertStatus(400);

		$this->assertSame("validated", $pv->fresh()->status);
	}

	public function test_empty_filters_do_not_empty_the_list(): void
	{
		$this->verbalTrial(["status" => "validated"]);
		$this->verbalTrial(["status" => "waiting"]);
		Sanctum::actingAs($this->user("admin"));

		$this->getJson("/api/verbal-trial?status=&in_validation_level=&has_next=0")->assertOk()->assertJsonPath("total", 2);
		$this->getJson("/api/verbal-trial?status=v")->assertOk()->assertJsonPath("total", 1);
	}

	public function test_per_page_is_honoured_and_capped(): void
	{
		foreach (range(1, 3) as $i) {
			$this->verbalTrial();
		}
		Sanctum::actingAs($this->user("admin"));

		$this->getJson("/api/verbal-trial?per_page=2")->assertJsonPath("per_page", 2);
		$this->getJson("/api/verbal-trial?per_page=5000")->assertJsonPath("per_page", 100);
	}
}
