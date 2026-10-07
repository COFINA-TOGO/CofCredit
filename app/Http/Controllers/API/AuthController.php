<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * @group Authentification
 *
 * Endpoints pour gérer l_authentification
 */
class AuthController extends Controller
{

    /**
     * Connecte un utilisateur
     *
     * @bodyParam email     string  required L'email de l'utilsateur.                   Example: admin@cofinacorp.com
     * @bodyParam password  string  required Le mot de passe complet de l'utilisateur.  Example: Coftg2021
     *
     * @response 200
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            "password" => 'required'
        ]);
        if ($validator->fails()) {
            return $this->responseError($validator->errors(), 400);
        }
        $user = User::where('email', $request->email)->first();
        // Même message que l'email existe ou non, pour ne pas révéler les comptes existants
        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->responseError(["password" => ["Email ou mot de passe incorrect"]], 400);
        }
        if (!$user->activated) {
            return $this->responseError(["activated" => ["Votre compte est désactivé"], "sub_code" => ["001"]], 403);
        }
        return $this->responseOk([
            "userToken" => $user->createToken($request->email)->plainTextToken,
            "user" => $this->sessionUser($user)
        ]);
    }

    /**
     * Affiche l'utilisateur connecté
     *
     * @response 200
     */
    public function show(Request $request)
    {
        return $this->responseOk($this->sessionUser($request->user()));
    }

    /**
     * L'utilisateur connecté tel que l'application l'utilise : droits effectifs (intérims compris),
     * profils exercés, dossiers dont il répond et collègues remplacés
     */
    private function sessionUser(User $user): array
    {
        return array_merge($user->toArray(), [
            "ability_rules" => $user->effective_ability_rules,
            "acting_profiles" => $user->actingProfiles(),
            "acting_ids" => $user->actingIds(),
            "delegators" => $user->activeDelegators()->map(fn($delegator) => ["id" => $delegator->id, "full_name" => $delegator->full_name, "profile_fr" => $delegator->profile_fr])->values(),
        ]);
    }

    /**
     * Déconnecte l'utilisateur connecté
     *
     * @response 204
     */
    public function logout(Request $request)
    {
        if ($request->user()->currentuserToken()->delete()) {
            return $this->responseOk(["messages" => ["Deconnexion complète"]]);
        } else {
            return $this->responseError(["errors" => ["Erreur durant la deconnexion"]]);
        }
    }

}
