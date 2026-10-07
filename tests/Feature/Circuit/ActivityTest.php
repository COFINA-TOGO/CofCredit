<?php

namespace Tests\Feature\Circuit;

use App\Models\Activity;
use Laravel\Sanctum\Sanctum;

class ActivityTest extends CircuitTestCase
{
	public function test_decisions_are_kept_with_their_reason(): void
	{
		$pv = $this->verbalTrial(["status" => "waiting", "validation_level" => "head_credit"]);
		$head = $this->user("head_credit");
		Sanctum::actingAs($head);

		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "rejected", "comment" => "Garanties insuffisantes"])->assertOk();
		$pv->refresh()->update(["status" => "waiting", "validation_level" => "head_credit"]);
		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "validated"])->assertOk();
		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "rejected", "comment" => "Taux à revoir"])->assertOk();

		$actions = Activity::where("subject_id", $pv->id)->where("subject_type", "verbal-trial")->orderBy("id")->get();
		$this->assertSame(["created", "rejected", "resubmitted", "validated", "sent_back"], $actions->pluck("action")->all());
		// Le premier motif n'est plus écrasé par le second
		$this->assertSame("Garanties insuffisantes", $actions[1]->comment);
		$this->assertSame("Taux à revoir", $actions[4]->comment);
		$this->assertSame($head->id, $actions[4]->user_id);
	}

	public function test_dossier_history_gathers_pv_and_contract(): void
	{
		$pv = $this->verbalTrial(["status" => "validated", "validation_level" => "head_credit"]);
		$contract = $this->contract($pv);
		$contract->update(["signed_contract_path" => "contracts/signed.pdf"]);
		Sanctum::actingAs($this->user("admin"));

		$response = $this->getJson("/api/activity?subject=contract&id={$contract->id}")->assertOk();

		$subjects = collect($response->json("data.activities"))->map(fn($activity) => $activity["subject_type"] . ":" . $activity["action"]);
		$this->assertContains("verbal-trial:created", $subjects);
		$this->assertContains("contract:created", $subjects);
		$this->assertContains("contract:document_uploaded", $subjects);
	}

	public function test_history_follows_the_dossier_permissions(): void
	{
		$pv = $this->verbalTrial();

		Sanctum::actingAs($this->user("caf"));
		$this->getJson("/api/activity?subject=verbal-trial&id={$pv->id}")->assertOk();
		$this->getJson("/api/activity?subject=unknown&id=1")->assertNotFound();

		// Le courrier ne voit pas les PV, ni donc leur historique
		Sanctum::actingAs($this->user("courier"));
		$this->getJson("/api/activity?subject=verbal-trial&id={$pv->id}")->assertForbidden();
	}
}
