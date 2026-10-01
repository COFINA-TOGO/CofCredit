<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\CAT;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CATPolicy
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
		return $this->check(["read"], "cat", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, Cat $cat)
	{
		return $this->check(["read"], "cat", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "cat", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, Cat $cat)
	{
		return $this->check(["update"], "cat", $connectedUser) ? ($cat->validation_status == "validated") ? Response::deny("vous n'etes plus autorisé à modifier ce cat") : Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function download(User $connectedUser, Cat $cat)
	{
		return $this->check(["download"], "cat", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function validate(User $connectedUser, Cat $cat)
	{
		if (!$this->check(["validate"], "cat", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return ($cat->validation_status == "waiting") ? Response::allow() : Response::deny("Ce CAT n'est pas en attente de validation");
	}
	public function unblock(User $connectedUser, Cat $cat)
	{
		if (!$this->check(["unblock"], "cat", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return ($cat->validation_status == "validated" && $cat->unblock_status == "waiting") ? Response::allow() : Response::deny("Ce CAT doit être validé et en attente de déblocage");
	}
	public function reject_validation(User $connectedUser, Cat $cat)
	{
		if (!$this->check(["reject_validation"], "cat", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return ($cat->validation_status == "waiting") ? Response::allow() : Response::deny("Ce CAT n'est pas en attente de validation");
	}
	public function reject_unblock(User $connectedUser, Cat $cat)
	{
		if (!$this->check(["reject_unblock"], "cat", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return ($cat->validation_status == "validated" && $cat->unblock_status == "waiting") ? Response::allow() : Response::deny("Ce CAT doit être validé et en attente de déblocage");
	}
	public function delete(User $connectedUser, Cat $cat)
	{
		return $this->check(["delete"], "cat", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	/**
	 * Télécharger les documents générés (contrat, billet à ordre, mention manuscrite...)
	 */
	public function downloadDocument(User $connectedUser, Cat $cat)
	{
		return $this->checkAny(["read", "historical", "download"], ["cat", "basic-cat", "cat-simple-notification"], $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
