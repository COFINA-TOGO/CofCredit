<?php

namespace App\Policies;

use App\Models\CAT;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CATPolicy
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

    public function view(User $connectedUser, CAT $cat)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function create(User $connectedUser)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function update(User $connectedUser, CAT $cat)
    {
        return $this->create($connectedUser);
    }

    public function delete(User $connectedUser, CAT $cat)
    {
        return $this->create($connectedUser);
    }
}
