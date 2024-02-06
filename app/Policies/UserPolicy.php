<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function before(User $user, string $ability)
    {
        if ($user->profile == "admin") {
            return Response::allow();
        }
        return null;
    }
    public function viewAny(User $user)
    {
        return Response::allow();
    }

    public function view(User $connectedUser, User $user)
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

    public function create(User $user)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function update(User $connectedUser, User $user)
    {
        return $this->create($connectedUser);
    }

    public function updatePassword(User $connectedUser, User $user)
    {
        if ($connectedUser->id == $user->id) {
            return Response::allow();
        }
        return $this->create($connectedUser);
    }
    public function delete(User $connectedUser, User $user)
    {
        return $this->create($connectedUser);
    }
}
