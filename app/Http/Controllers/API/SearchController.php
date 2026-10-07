<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CAT;
use App\Models\Contract;
use App\Models\Notification;
use App\Models\User;
use App\Models\VerbalTrial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

/**
 * Recherche globale (barre du haut) : numéro de comité, client, numéro de compte, nom d'utilisateur.
 * Chacun ne trouve que ce que ses listes lui montrent déjà.
 */
class SearchController extends Controller
{
	const LIMIT = 6;

	public function index(Request $request)
	{
		$search = trim((string) $request->q);
		if (mb_strlen($search) < 2) {
			return $this->responseOk(["results" => []]);
		}
		$user = $request->user();
		$results = [];

		// Le dossier se retrouve par son PV : numéro de comité, client, numéro de compte, nom du demandeur
		$fullName = DB::getDriverName() == "mysql" ? "CONCAT(applicant_first_name, ' ', applicant_last_name)" : "applicant_first_name || ' ' || applicant_last_name";
		$matchesPv = function ($query) use ($search, $fullName) {
			$query->where(function ($query) use ($search, $fullName) {
				$query->where("committee_id", "LIKE", "%$search%")
					->orWhere("entity_name", "LIKE", "%$search%")
					->orWhere("account_number", "LIKE", "%$search%")
					->orWhere(DB::raw($fullName), "LIKE", "%$search%");
			});
		};
		$cafScope = function ($query) use ($user) {
			if ($user->hasProfile("caf")) {
				$user->restrictToActingFiles($query, ["caf" => "caf_id"]);
			}
		};

		if (Gate::allows("viewAny", VerbalTrial::class)) {
			$query = VerbalTrial::query()->tap($matchesPv);
			$user->restrictToActingFiles($query, ["credit_admin" => "credit_admin_id", "credit_analyst" => "credit_analyst_id", "caf" => "caf_id"]);
			foreach ($query->latest("updated_at")->limit(self::LIMIT)->get() as $pv) {
				$results[] = $this->result("pv", "PV", $pv->committee_id, "$pv->entity_name · $pv->amount_fr", ["name" => "pv-id", "params" => ["id" => $pv->id]]);
			}
		}

		if (Gate::allows("viewAny", Contract::class)) {
			$query = Contract::with("verbal_trial")->whereHas("verbal_trial", fn($query) => $query->tap($matchesPv)->tap($cafScope));
			foreach ($query->latest("updated_at")->limit(self::LIMIT)->get() as $contract) {
				$results[] = $this->result("contract", "Contrat", $contract->verbal_trial->committee_id, $contract->verbal_trial->entity_name, ["name" => "contract-id", "params" => ["id" => $contract->id]]);
			}
		}

		if (Gate::allows("viewAny", Notification::class)) {
			$query = Notification::with("verbal_trial")->whereHas("verbal_trial", fn($query) => $query->tap($matchesPv)->tap($cafScope));
			foreach ($query->latest("updated_at")->limit(self::LIMIT)->get() as $notification) {
				$simple = (bool) $notification->is_simple;
				$results[] = $this->result("notification", $simple ? "Notification simplifiée" : "Notification", $notification->verbal_trial->committee_id, $notification->verbal_trial->entity_name, ["name" => $simple ? "simple-notification-id" : "notification-id", "params" => ["id" => $notification->id]]);
			}
		}

		if (Gate::allows("viewAny", CAT::class)) {
			$query = CAT::with(["contract.verbal_trial", "notification.verbal_trial"])->where(function ($query) use ($matchesPv, $cafScope) {
				$query->whereHas("contract.verbal_trial", fn($query) => $query->tap($matchesPv)->tap($cafScope))
					->orWhereHas("notification.verbal_trial", fn($query) => $query->tap($matchesPv)->tap($cafScope));
			});
			foreach ($query->latest("updated_at")->limit(self::LIMIT)->get() as $cat) {
				$pv = $cat->contract?->verbal_trial ?? $cat->notification?->verbal_trial;
				$results[] = $this->result("cat", "CAT", $pv?->committee_id ?? "CAT $cat->id", $pv?->entity_name, ["name" => $cat->contract_id ? "cat-id" : "cat-notification-id", "params" => ["id" => $cat->id]]);
			}
		}

		if (Gate::allows("viewAny", User::class)) {
			$query = User::where(fn($query) => $query->where("full_name", "LIKE", "%$search%")->orWhere("email", "LIKE", "%$search%"));
			foreach ($query->orderBy("full_name")->limit(self::LIMIT)->get() as $found) {
				$results[] = $this->result("user", "Utilisateur", $found->full_name, "$found->profile_fr · $found->email", ["name" => "user-id", "params" => ["id" => $found->id]]);
			}
		}

		return $this->responseOk(["results" => $results]);
	}

	private function result(string $type, string $typeLabel, string $title, ?string $subtitle, array $to): array
	{
		return ["type" => $type, "type_label" => $typeLabel, "title" => $title, "subtitle" => $subtitle, "to" => $to];
	}
}
