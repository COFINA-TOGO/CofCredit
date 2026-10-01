<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CAT;
use App\Models\Contract;
use App\Models\Notification;
use App\Models\User;
use App\Models\VerbalTrial;
use Illuminate\Http\Request;

/**
 * @group Tableau de bord
 *
 * EndPoint de la page d'accueil
 */
class DashboardController extends Controller
{
	/**
	 * Le travail en attente de l'utilisateur connecté
	 *
	 * Chaque élément indique un nombre de dossiers et la page où les traiter.
	 *
	 * @response 200
	 */
	public function index(Request $request)
	{
		$user = $request->user();
		$items = [];
		foreach ($this->itemsFor($user) as [$label, $query, $route, $icon, $color]) {
			$items[] = [
				"label" => $label,
				"count" => $query->count(),
				"to" => ["name" => $route],
				"icon" => $icon,
				"color" => $color,
			];
		}
		return $this->responseOk(["items" => $items]);
	}

	/**
	 * Les compteurs propres à chaque profil : [libellé, requête, route, icône, couleur]
	 * @param	User	$user	L'utilisateur connecté
	 * @return	array
	 */
	private function itemsFor(User $user)
	{
		$pvWaitingAt = fn(string $level) => VerbalTrial::where("status", "waiting")->where("validation_level", $level);
		$contractsCreatedBy = fn() => Contract::where("creator_id", $user->id);

		$creditAdmin = [
			["PV rejetés à corriger", VerbalTrial::where("status", "rejected")->where("credit_admin_id", $user->id), "pv", "tabler-file-alert", "error"],
			["PV validés sans contrat ni notification", VerbalTrial::where("status", "validated")->where("credit_admin_id", $user->id)->whereDoesntHave("contract")->whereDoesntHave("notification"), "pv", "tabler-file-plus", "primary"],
			["Contrats signés à envoyer en validation", $contractsCreatedBy()->where("status", "pending_admin_validation"), "contract", "tabler-send", "warning"],
			["Contrats rejetés par le Head Crédit", $contractsCreatedBy()->where("status", "rejected"), "contract", "tabler-file-x", "error"],
			["Contrats validés sans CAT", $contractsCreatedBy()->where("status", "validated")->whereDoesntHave("c_a_t"), "cat-add", "tabler-cash-banknote", "primary"],
			["CAT rejetés", CAT::where("validation_status", "rejected")->whereHas("contract", fn($query) => $query->where("creator_id", $user->id)), "cat", "tabler-cash-banknote-off", "error"],
		];
		$headCredit = [
			["PV en attente de votre validation", $pvWaitingAt("head_credit"), "pv", "tabler-file-description", "warning"],
			["Contrats en attente de validation finale", Contract::where("status", "pending_head_validation"), "contract", "tabler-writing-sign", "warning"],
			["CAT en attente de validation", CAT::where("validation_status", "waiting"), "cat", "tabler-cash-banknote", "warning"],
			["Notifications en attente de validation", Notification::where("head_credit_validation", "waiting"), "notification", "tabler-home-ribbon", "warning"],
		];

		return match ($user->profile) {
			"credit_admin" => $creditAdmin,
			"head_credit" => $headCredit,
			"operation" => [
				["CAT à débloquer", CAT::where("validation_status", "validated")->where("unblock_status", "waiting"), "cat", "tabler-lock-open", "warning"],
			],
			"caf" => [
				["Contrats en attente de signature du client", Contract::whereIn("status", ["waiting", "rejected"])->whereHas("verbal_trial", fn($query) => $query->where("caf_id", $user->id)), "contract", "tabler-writing-sign", "warning"],
			],
			"credit_analyst" => [
				["Notifications à vérifier", $pvWaitingAt("credit_analyst")->where("credit_analyst_id", $user->id), "pv-notification-without-pv", "tabler-file-search", "warning"],
			],
			"legal" => [
				["Notifications sans contrat notarié", Notification::where("head_credit_validation", "validated")->whereNull("signed_contract_path"), "notification-without-signed-contract", "tabler-home-ribbon", "warning"],
			],
			"admin" => [
				["PV en attente de validation", VerbalTrial::where("status", "waiting"), "pv", "tabler-file-description", "warning"],
				["Contrats signés à envoyer en validation", Contract::where("status", "pending_admin_validation"), "contract", "tabler-send", "warning"],
				...array_slice($headCredit, 1),
				["CAT à débloquer", CAT::where("validation_status", "validated")->where("unblock_status", "waiting"), "cat", "tabler-lock-open", "warning"],
			],
			default => [],
		};
	}
}
