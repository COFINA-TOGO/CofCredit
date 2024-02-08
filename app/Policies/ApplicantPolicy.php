<?php

namespace App\Policies;

use App\Models\Applicant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ApplicantPolicy
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

    public function view(User $connectedUser, Applicant $applicant)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function create(User $connectedUser)
    {
        return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function update(User $connectedUser, Applicant $applicant)
    {
        return $this->create($connectedUser);
    }

    public function delete(User $connectedUser, Applicant $applicant)
    {
        return $this->create($connectedUser);
    }
}
