<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\Contract;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ContractPolicy
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
		return $this->check(["read", "historical"], "contract", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, Contract $contract)
	{
		return $this->check(["read", "historical"], "contract", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "contract", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, Contract $contract)
	{
		return $this->check(["update"], "contract", $connectedUser) ? (($contract->status == "validated") ? Response::deny("vous n'etes plus autorisé à modifier ce contrat") : Response::allow()) : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function download(User $connectedUser, Contract $contract)
	{
		return $this->check(["download"], "contract", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function upload(User $connectedUser, Contract $contract)
	{
		return $this->check(["upload"], "contract", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	/**
	 * Validation de l'envoi : réservée à l'admin crédit qui a créé le contrat
	 */
	public function admin_validate(User $connectedUser, Contract $contract)
	{
		return ($connectedUser->profile === 'credit_admin' && $contract->creator_id == $connectedUser->id) ? Response::allow() : Response::deny("Seul l'admin crédit en charge du contrat peut l'envoyer en validation");
	}

	/**
	 * Validation/rejet final : réservé au head crédit
	 */
	public function head_validate(User $connectedUser, Contract $contract)
	{
		return $connectedUser->profile === 'head_credit' ? Response::allow() : Response::deny("Seul le head crédit peut effectuer la validation finale");
	}

	public function delete(User $connectedUser, Contract $contract)
	{
		return $this->check(["delete"], "contract", $connectedUser) ? (($contract->status == "validated") ? Response::deny("vous n'etes plus autorisé à supprimer ce contrat") : Response::allow()) : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	/**
	 * Télécharger les documents générés (contrat, billet à ordre, mention manuscrite...)
	 */
	public function downloadDocument(User $connectedUser, Contract $contract)
	{
		return $this->checkAny(["read", "historical", "download"], ["contract", "basic-contract", "notarized-contract"], $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
