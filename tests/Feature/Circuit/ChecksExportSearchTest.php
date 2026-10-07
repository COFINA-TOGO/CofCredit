<?php

namespace Tests\Feature\Circuit;

use App\Models\Alert;
use App\Models\Guarantor;
use App\Models\Notification;
use Laravel\Sanctum\Sanctum;

class ChecksExportSearchTest extends CircuitTestCase
{
	public function test_contract_cannot_be_sent_with_missing_guarantor_documents(): void
	{
		$pv = $this->verbalTrial(["status" => "validated"]);
		$contract = $this->contract($pv, [
			"status" => "pending_admin_validation",
			"signed_contract_path" => "contracts/c.pdf",
			"signed_promissory_note_path" => "contracts/b.pdf",
		]);
		$guarantor = Guarantor::factory()->create(["contract_id" => $contract->id, "signed_contract_path" => null, "signed_promissory_note_path" => null]);
		Sanctum::actingAs($pv->credit_admin);

		$response = $this->putJson("/api/contract/admin-validate/{$contract->id}", ["comment" => ""])->assertStatus(400);
		$this->assertStringContainsString("Caution", json_encode($response->json(), JSON_UNESCAPED_UNICODE));

		$guarantor->update(["signed_contract_path" => "g/c.pdf", "signed_promissory_note_path" => "g/b.pdf"]);
		$this->putJson("/api/contract/admin-validate/{$contract->id}", ["comment" => ""])->assertOk();
		$this->assertSame("pending_head_validation", $contract->fresh()->status);
	}

	public function test_notification_is_validated_only_once_sent_and_complete(): void
	{
		$pv = $this->verbalTrial(["status" => "validated"]);
		$notification = Notification::factory()->create(["verbal_trial_id" => $pv->id, "is_simple" => 1, "head_credit_validation" => "validated", "sent" => 0, "status" => "waiting"]);
		Sanctum::actingAs($this->user("admin"));

		$this->putJson("/api/notification/change-status/{$notification->id}", ["status" => "validated"])->assertStatus(400);
		$notification->update(["sent" => 1]);
		$this->putJson("/api/notification/change-status/{$notification->id}", ["status" => "validated"])->assertOk();
	}

	public function test_export_keeps_filters_and_selection(): void
	{
		$validated = $this->verbalTrial(["status" => "validated"]);
		$this->verbalTrial(["status" => "waiting"]);
		Sanctum::actingAs($this->user("admin"));

		$this->get("/api/verbal-trial?export=1&status=v")->assertOk()->assertDownload();
		$this->get("/api/verbal-trial?export=1&ids[]={$validated->id}")->assertOk()->assertDownload();
		$this->get("/api/user?export=1")->assertOk()->assertDownload();
	}

	public function test_search_finds_the_dossier_within_the_user_scope(): void
	{
		$mine = $this->user("credit_admin");
		$pv = $this->verbalTrial(["credit_admin_id" => $mine->id, "entity_name" => "ETS SOLEIL LEVANT"]);
		$this->verbalTrial(["entity_name" => "ETS SOLEIL COUCHANT"]);

		Sanctum::actingAs($mine);
		$results = $this->getJson("/api/search?q=soleil")->assertOk()->json("data.results");
		$this->assertCount(1, array_filter($results, fn($result) => $result["type"] == "pv"));
		$this->assertSame($pv->id, collect($results)->firstWhere("type", "pv")["to"]["params"]["id"]);

		Sanctum::actingAs($this->user("admin"));
		$this->assertCount(2, array_filter($this->getJson("/api/search?q=soleil")->json("data.results"), fn($result) => $result["type"] == "pv"));
		$this->assertSame([], $this->getJson("/api/search?q=s")->json("data.results"));
	}

	public function test_alerts_follow_the_emails_and_can_be_read(): void
	{
		$head = $this->user("head_credit");
		$pv = $this->verbalTrial(["status" => "waiting", "validation_level" => "head_credit"]);
		Sanctum::actingAs($head);
		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "validated"])->assertOk();

		// L'admin crédit est prévenu par e-mail et dans l'application
		$admin = $pv->credit_admin;
		Sanctum::actingAs($admin);
		$this->getJson("/api/alert")->assertOk()->assertJsonPath("data.unread", 1);
		$id = Alert::where("user_id", $admin->id)->value("id");
		$this->putJson("/api/alert/read/$id")->assertOk();
		$this->getJson("/api/alert")->assertJsonPath("data.unread", 0);

		// Chacun ne voit que ses alertes
		Sanctum::actingAs($head);
		$this->getJson("/api/alert")->assertJsonPath("data.alerts", []);
	}
}
