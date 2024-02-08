<?php

namespace App\Policies;

use App\Models\TypeOfCredit;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TypeOfCreditPolicy
{
    public function before(User $connectedUser, string $ability)
    {
        if ($connectedUser->profile == "admin") {
            return Response::allow();
        }
        return null;
    }
    public function viewAny(User $connectedUser)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function view(User $connectedUser, TypeOfCredit $typeOfCredit)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function create(User $connectedUser)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function update(User $connectedUser, TypeOfCredit $typeOfCredit)
    {
        return $this->create($connectedUser);
    }

    public function delete(User $connectedUser, TypeOfCredit $typeOfCredit)
    {
        return $this->create($connectedUser);
    }
}
