<?php

namespace App\Policies;

use App\Models\TypeOfApplicant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TypeOfApplicantPolicy
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
        return Response::allow();
    }

    public function view(User $connectedUser, TypeOfApplicant $typeOfApplicant)
    {
        return Response::allow();
        // if (in_array($connectedUser->profile, ["operation", "control"])) {
        // } else if ($connectedUser->profile == "cash_register" && $connectedUser->id == $user->id) {
        //     return Response::allow();
        // } else if ($connectedUser->profile == "agency_head" && $user->agency->head->id == $connectedUser->id) {
        //     return Response::allow();
        // }

        // return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function create(User $connectedUser)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function update(User $connectedUser, TypeOfApplicant $typeOfApplicant)
    {
        return $this->create($connectedUser);
    }

    public function delete(User $connectedUser, TypeOfApplicant $typeOfApplicant)
    {
        return $this->create($connectedUser);
    }
}
