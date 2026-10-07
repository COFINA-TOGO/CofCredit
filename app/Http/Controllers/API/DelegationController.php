<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Delegation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Délégations pendant les absences. Chacun gère les siennes ; l'administrateur gère celles de tous.
 */
class DelegationController extends Controller
{
	/**
	 * Les délégations données ou reçues (toutes pour l'administrateur)
	 *
	 * @queryParam  status  string  upcoming, active ou ended  No-example
	 */
	public function index(Request $request)
	{
		$user = $request->user();
		$query = Delegation::with(["delegator", "delegate"]);
		if ($user->profile != "admin") {
			$query->where(fn($query) => $query->where("delegator_id", $user->id)->orWhere("delegate_id", $user->id));
		}
		$today = Carbon::today()->toDateString();
		match ($request->status) {
			"upcoming" => $query->whereDate("starts_at", ">", $today),
			"active" => $query->active(),
			"ended" => $query->whereDate("ends_at", "<", $today),
			default => null,
		};

		return $this->responseOkPaginate($query->orderByDesc("starts_at")->orderByDesc("id")->paginate($this->perPage($request))->toArray());
	}

	/**
	 * Comptes actifs à qui déléguer (accessible à tous : choisir son intérimaire ne demande pas le droit de gérer les utilisateurs)
	 */
	public function candidates(Request $request)
	{
		$users = User::where("activated", 1)->where("profile", "!=", "admin")->orderBy("full_name")->get()
			->map(fn($user) => ["id" => $user->id, "full_name" => $user->full_name, "profile" => $user->profile, "profile_fr" => $user->profile_fr]);

		return $this->responseOk(["users" => $users]);
	}

	/**
	 * Créer une délégation
	 *
	 * @bodyParam  delegator_id  int     Le délégant (soi-même par défaut ; un autre compte : administrateur seulement)  Example: 4
	 * @bodyParam  delegate_id   int     required  Le délégataire                                                       Example: 7
	 * @bodyParam  starts_at     date    required  Premier jour                                                         Example: 2026-10-12
	 * @bodyParam  ends_at       date    required  Dernier jour                                                         Example: 2026-10-23
	 * @bodyParam  reason        string  Le motif                                                                       Example: Congés
	 */
	public function store(Request $request)
	{
		$user = $request->user();
		$requestData = $request->only(["delegator_id", "delegate_id", "starts_at", "ends_at", "reason"]);
		$requestData["delegator_id"] ??= $user->id;
		if ($requestData["delegator_id"] != $user->id && $user->profile != "admin") {
			return $this->responseError(["auth" => ["Vous ne pouvez déléguer que vos propres droits"]], 403);
		}
		$validator = Validator::make($requestData, [
			"delegator_id" => "required|exists:users,id",
			"delegate_id" => "required|exists:users,id|different:delegator_id",
			"starts_at" => "required|date",
			"ends_at" => "required|date|after_or_equal:starts_at",
			"reason" => "nullable|string|max:255",
		], [
			"delegate_id.different" => "On ne peut pas se déléguer à soi-même",
			"ends_at.after_or_equal" => "La fin doit suivre le début",
		]);
		if ($validator->fails()) {
			return $this->responseError($validator->errors(), 400);
		}
		$delegator = User::find($requestData["delegator_id"]);
		$delegate = User::find($requestData["delegate_id"]);
		if ($delegator->profile == "admin") {
			return $this->responseError(["delegator_id" => ["Les droits d'administrateur ne se délèguent pas"]], 400);
		}
		if (!$delegate->activated) {
			return $this->responseError(["delegate_id" => ["Le compte du délégataire est désactivé"]], 400);
		}
		if (Carbon::parse($requestData["ends_at"])->lt(Carbon::today())) {
			return $this->responseError(["ends_at" => ["La délégation est déjà terminée"]], 400);
		}

		$delegation = Delegation::create($requestData + ["creator_id" => $user->id]);
		$this->notifyByEmail(
			$delegate,
			"Délégation de " . $delegator->full_name,
			"Bonjour " . $delegate->full_name . ",",
			["{$delegator->full_name} ({$delegator->profile_fr}) vous délègue ses droits et ses dossiers du {$delegation->starts_at_fr} au {$delegation->ends_at_fr}" . ($delegation->reason ? " (motif : {$delegation->reason})." : ".")],
			"/delegation",
			"Voir mes délégations"
		);
		$delegation->load(["delegator", "delegate"]);

		return $this->responseOk(["delegation" => $delegation], status: 201);
	}

	/**
	 * Arrêter une délégation : une délégation à venir est supprimée, une délégation en cours prend fin hier
	 * (elle reste visible dans l'historique)
	 */
	public function destroy(Request $request, int $id)
	{
		$user = $request->user();
		$delegation = Delegation::find($id);
		if (!$delegation) {
			return $this->responseError(["id" => ["La délégation n'existe pas"]], 404);
		}
		if ($user->profile != "admin" && $delegation->delegator_id != $user->id) {
			return $this->responseError(["auth" => ["Seul le délégant ou l'administrateur peut arrêter cette délégation"]], 403);
		}
		match ($delegation->status) {
			"upcoming" => $delegation->delete(),
			"active" => $delegation->update(["ends_at" => Carbon::yesterday()->max($delegation->starts_at->copy()->subDay())]),
			default => null,
		};

		return $this->responseOk(messages: ["delegation" => "Délégation arrêtée"]);
	}
}
