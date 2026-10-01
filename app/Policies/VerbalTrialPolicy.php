<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\User;
use App\Models\VerbalTrial;
use Illuminate\Auth\Access\Response;

class VerbalTrialPolicy
{
	use PermissionCheckerTrait;
	public function before(User $connectedUser, string $ability)
	{
		if ($connectedUser->profile == "admin") {
			return Response::allow();
		}
		return null;
	}

	public function viewAny(User $connectedUser)
	{
		return $this->check(["read", "historical"], "pv", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->check(["read", "historical"], "pv", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		// Le PV est saisi par l'admin crédit ; le CAF saisit sa notification, vérifiée ensuite par l'analyste
		return $this->check(["create"], "pv", $connectedUser) || $this->check(["create"], "pv-notification", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, VerbalTrial $verbalTrial)
	{
		if ($this->check(["update"], "pv", $connectedUser)) {
			// L'admin crédit corrige le PV tant que le head crédit ne l'a pas validé
			$allowed = $verbalTrial->status != "validated";
		} else if ($this->check(["update"], "pv-notification", $connectedUser)) {
			// Le CAF corrige sa notification tant qu'elle n'est pas devenue un PV
			$allowed = $verbalTrial->status == "rejected" ? $verbalTrial->validation_level == "credit_analyst" : ($verbalTrial->status == "waiting" && $verbalTrial->validation_level == "credit_analyst");
		} else {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return $allowed ? Response::allow() : Response::deny("vous n'etes pas autorisé à modifier ce pv");
	}

	public function change_status(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->check(["change_status"], "pv", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function check_notification(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->check(["check"], "pv-notification", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	
	public function analyst_delete(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->check(["analyst_delete"], "pv", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function download(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->check(["download"], "pv", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function delete(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->check(["delete"], "pv", $connectedUser) || $this->check(["delete"], "pv-notification", $connectedUser) ? (($verbalTrial->status == "validated") ? Response::deny("vous n'etes plus autorisé à supprimer ce pv") : Response::allow()) : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	/**
	 * Télécharger les documents générés (contrat, billet à ordre, mention manuscrite...)
	 */
	public function downloadDocument(User $connectedUser, VerbalTrial $verbalTrial)
	{
		return $this->checkAny(["read", "historical", "download"], ["pv", "pv-notification"], $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
