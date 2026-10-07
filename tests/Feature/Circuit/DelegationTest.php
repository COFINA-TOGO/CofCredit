<?php

namespace Tests\Feature\Circuit;

use App\Jobs\SendEmail;
use App\Models\Activity;
use App\Models\Alert;
use App\Models\Delegation;
use App\Models\User;
use Illuminate\Support\Facades\Bus;
use Laravel\Sanctum\Sanctum;

class DelegationTest extends CircuitTestCase
{
	private function delegate(User $delegator, User $delegate, string $starts = "today", string $ends = "+5 days"): Delegation
	{
		return Delegation::create([
			"delegator_id" => $delegator->id,
			"delegate_id" => $delegate->id,
			"starts_at" => now()->modify($starts)->toDateString(),
			"ends_at" => now()->modify($ends)->toDateString(),
		]);
	}

	public function test_delegate_validates_for_the_absent_head_credit(): void
	{
		$head = $this->user("head_credit");
		$colleague = $this->user("credit_analyst");
		$pv = $this->verbalTrial(["status" => "waiting", "validation_level" => "head_credit"]);
		Sanctum::actingAs($colleague);

		// Sans délégation : refusé
		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "validated"])->assertForbidden();

		$this->delegate($head, $colleague);
		Sanctum::actingAs($colleague->fresh());
		$this->putJson("/api/verbal-trial/change-status/{$pv->id}", ["status" => "validated"])->assertOk();

		$activity = Activity::where("action", "validated")->first();
		$this->assertSame($colleague->id, $activity->user_id);
		$this->assertSame($head->id, $activity->on_behalf_of_id);
	}

	public function test_delegation_outside_its_period_grants_nothing(): void
	{
		$head = $this->user("head_credit");
		$colleague = $this->user("credit_analyst");
		$this->delegate($head, $colleague, "+2 days", "+5 days");

		$this->assertSame(["credit_analyst"], $colleague->actingProfiles());
		$this->assertFalse($colleague->hasProfile("head_credit"));
	}

	public function test_delegate_sees_the_absent_credit_admin_files(): void
	{
		$absent = $this->user("credit_admin");
		$delegate = $this->user("credit_admin");
		$this->verbalTrial(["credit_admin_id" => $absent->id]);
		$this->verbalTrial(["credit_admin_id" => $delegate->id]);
		$this->verbalTrial();

		Sanctum::actingAs($delegate);
		$this->getJson("/api/verbal-trial")->assertJsonPath("total", 1);

		$this->delegate($absent, $delegate);
		Sanctum::actingAs($delegate->fresh());
		$this->getJson("/api/verbal-trial")->assertJsonPath("total", 2);
	}

	public function test_delegate_receives_the_absent_user_alerts(): void
	{
		$head = $this->user("head_credit");
		$colleague = $this->user("credit_analyst");
		$this->delegate($head, $colleague);
		$pv = $this->verbalTrial(["status" => "waiting", "validation_level" => "credit_analyst"]);
		Sanctum::actingAs(User::find($pv->credit_admin_id));

		// L'admin crédit soumet le PV : les head crédit sont prévenus
		$pv->update(["status" => "rejected", "validation_level" => "credit_admin"]);
		(new \App\Http\Controllers\Controller)->notifyByEmail(User::where("profile", "head_credit")->get(), "PV à valider", "Bonjour,", ["Un PV attend."], "/pv");

		$this->assertSame(1, Alert::where("user_id", $head->id)->count());
		$this->assertStringContainsString("intérim de", Alert::where("user_id", $colleague->id)->value("title"));
		Bus::assertDispatched(SendEmail::class, fn($job) => (new \ReflectionProperty($job, "receiverEmail"))->getValue($job) == $colleague->email);
	}

	public function test_only_own_rights_can_be_delegated(): void
	{
		$me = $this->user("head_credit");
		$other = $this->user("head_credit");
		$colleague = $this->user("credit_analyst");
		Sanctum::actingAs($me);
		$dates = ["starts_at" => now()->toDateString(), "ends_at" => now()->addDays(3)->toDateString()];

		$this->postJson("/api/delegation", ["delegator_id" => $other->id, "delegate_id" => $colleague->id] + $dates)->assertForbidden();
		$this->postJson("/api/delegation", ["delegate_id" => $me->id] + $dates)->assertStatus(400);
		$this->postJson("/api/delegation", ["delegate_id" => $colleague->id] + $dates)->assertOk()->assertJsonPath("status", 201);

		$id = Delegation::first()->id;
		$this->deleteJson("/api/delegation/$id")->assertOk();
		$this->assertSame("ended", Delegation::find($id)->status);
		$this->assertFalse($colleague->fresh()->hasProfile("head_credit"));
	}

	public function test_session_exposes_delegated_rights(): void
	{
		$head = $this->user("head_credit");
		$colleague = $this->user("credit_analyst");
		$this->delegate($head, $colleague);
		Sanctum::actingAs($colleague);

		$data = $this->getJson("/api/auth/show")->assertOk()->json("data");
		$this->assertEqualsCanonicalizing(["credit_analyst", "head_credit"], $data["acting_profiles"]);
		$this->assertContains($head->id, $data["acting_ids"]);
	}
}
