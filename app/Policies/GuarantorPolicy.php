<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\Guarantor;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GuarantorPolicy
{
	use PermissionCheckerTrait;
	public function before(User $connectedUser, string $ability)
	{
		if ($connectedUser->profile == "admin" || $connectedUser->profile == "courier" || ($connectedUser->ability_rules[0]["subject"] == "all" && $connectedUser->ability_rules[0]["action"] == "manage")) {
			return Response::allow();
		}
		return null;
	}

	public function viewAny(User $connectedUser)
	{
		return $this->check(["read"], "guarantor", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, Guarantor $guarantor)
	{
		return $this->check(["read"], "guarantor", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "guarantor", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, Guarantor $guarantor)
	{
		return $this->check(["update"], "guarantor", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function upload(User $connectedUser, Guarantor $guarantor)
	{
		if (!$this->check(["upload"], "guarantor", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}

		// Appliquer les mêmes conditions que pour les contrats
		$parent = $guarantor->contract ?? $guarantor->notification;
		if ($parent) {
			// Si le contrat/notification est rejeté, on peut toujours uploader
			if ($parent->status === "rejected") {
				return Response::allow();
			}
			
			// Si le contrat/notification est en attente de validation head ou validé, on ne peut plus uploader
			if ($parent->status === "pending_head_validation" || $parent->status === "validated") {
				return Response::deny("L'upload n'est plus autorisé car le contrat est en cours de validation ou validé");
			}
		}

		return Response::allow();
	}
	public function download(User $connectedUser, Guarantor $guarantor)
	{
		return $this->check(["download"], "guarantor", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function delete(User $connectedUser, Guarantor $guarantor)
	{
		return $this->check(["delete"], "guarantor", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
