<?php

namespace App\Http\Controllers;

use App\Http\Traits\ControllerHelperTrait;
use App\Jobs\SendEmail;
use App\Models\User;
use Illuminate\Support\Arr;
use App\Http\Traits\CustomResponseTrait;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
	use AuthorizesRequests, ValidatesRequests, CustomResponseTrait, ControllerHelperTrait;

	/**
	 * Enregistrer un model
	 * @param 	mixed 		$modelClass			La classe du model
	 * @param 	array 		$requestData		Les données de la requête
	 * @param 	array 		$manualValidations	Une fonction de validations manuelles
	 * @param 	array 		$validations		Les données des validations à effectuer
	 * @param 	callable 	$beforeCreate		Une fonction à appeler avant l'insertion
	 * @param 	callable 	$afterCreate		Une fonction à appeler après l'insertion
	 * @param 	string	    $authName   		Le nom de la fonction de police à utiliser
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function modelStore($modelClass, array $requestData, array $validations = [], callable $manualValidations = null, callable $beforeCreate = null, callable $afterCreate = null, callable $afterCommit = null, string $authName = "create")
	{
		if ($authName && !($authorisation = Gate::inspect($authName, $modelClass))->allowed()) {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
		$validator = Validator::make($requestData, $validations);
		if ($validator->fails()) {
			return $this->responseError($validator->errors(), 400);
		} else {
			DB::beginTransaction();
			$manualValidationsReturn = ($manualValidations) ? $manualValidations($requestData) : null;
			if (isset($manualValidationsReturn["errors"])) {
				if ($manualValidationsReturn["errors"]) {
					DB::rollBack();
					return $manualValidationsReturn["errors"];
				}
			}
			$manualValidationsReturn["data"] = isset($manualValidationsReturn["data"]) ? $manualValidationsReturn["data"] : [];
			$requestData = ($beforeCreate) ? $beforeCreate($requestData, $manualValidationsReturn["data"]) : $requestData;
			$model = call_user_func_array([$modelClass, 'create'], [$requestData]);
			$model = ($afterCreate) ? $afterCreate($model, $manualValidationsReturn["data"]) : $model;
			$modelClassExployed = explode("\\", $modelClass);
			DB::commit();
			$model = ($afterCommit) ? $afterCommit($model, $manualValidationsReturn["data"]) : $model;
			return $this->responseOk([
				lcfirst(end($modelClassExployed)) => $model
			]);
		}
	}

	/**
	 * Mettre à jour un model
	 * @param 	mixed 		$modelId			L'ID du model
	 * @param 	mixed 		$modelClass			La classe du model
	 * @param 	array 		$requestData		Les données de la requête
	 * @param 	array 		$manualValidations	Une fonction de validations manuelles
	 * @param 	array 		$validations		Les données des validations à effectuer
	 * @param 	callable 	$beforeUpdate		Une fonction à appeler avant la mise à jour
	 * @param 	callable 	$afterUpdate		Une fonction à appeler après la mise à jour
	 * @param 	string	    $afterUpdate		Une fonction à appeler après la mise à jour
	 * @param 	string	    $authName   		Le nom de la fonction de police à utiliser
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function modelUpdate(int $modelId, $modelClass, array $requestData, array $validations = [], callable $manualValidations = null, callable $beforeUpdate = null, callable $afterUpdate = null, callable $afterCommit = null, $authName = "update")
	{
		$modelClassExployed = explode("\\", $modelClass);
		$model = call_user_func_array([$modelClass, 'find'], [$modelId]);
		$modelClassName = lcfirst(end($modelClassExployed));
		if ($model) {
			if ($authName && !($authorisation = Gate::inspect($authName, $model))->allowed()) {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
			$validator = Validator::make($requestData, $validations);
			if ($validator->fails()) {
				return $this->responseError($validator->errors(), 400);
			} else {
				DB::beginTransaction();
				$manualValidationsReturn = ($manualValidations) ? $manualValidations($requestData, $model) : null;
				if (isset($manualValidationsReturn["errors"])) {
					if ($manualValidationsReturn["errors"]) {
						DB::rollBack();
						return $manualValidationsReturn["errors"];
					}
				}
				$manualValidationsReturn["data"] = isset($manualValidationsReturn["data"]) ? $manualValidationsReturn["data"] : [];
				$requestData = ($beforeUpdate) ? $beforeUpdate($requestData, $model, $manualValidationsReturn["data"]) : $requestData;
				$model->update($requestData);
				$model = ($afterUpdate) ? $afterUpdate($model, $manualValidationsReturn["data"]) : $model;
				DB::commit();
				$model = ($afterCommit) ? $afterCommit($model, $manualValidationsReturn["data"]) : $model;
				return $this->responseOk([
					$modelClassName => $model
				]);
			}
		} else {
			return $this->responseError(["id" => "L'élément n'existe pas"], 404);
		}
	}

	/**
	 * Supprimer un model
	 * @param 	mixed 		$modelId			L'ID du model
	 * @param 	mixed 		$modelClass			La classe du model
	 * @param 	array 		$manualValidations	Une fonction de validations manuelles
	 * @param 	callable 	$beforeDelete		Une fonction à appeler avant la suppression
	 * @param 	callable 	$afterDelete		Une fonction à appeler après la suppression
	 * @param 	string	    $authName   		Le nom de la fonction de police à utiliser
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function modelDelete(int $modelId, $modelClass, callable $manualValidations = null, callable $beforeDelete = null, callable $afterDelete = null, $authName = "delete")
	{
		$modelClassExployed = explode("\\", $modelClass);
		$model = call_user_func_array([$modelClass, 'find'], [$modelId]);
		$modelClassName = lcfirst(end($modelClassExployed));
		if ($model) {
			if ($authName && !($authorisation = Gate::inspect($authName, $model))->allowed()) {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
			$manualValidationsErrors = ($manualValidations) ? $manualValidations() : null;
			if ($manualValidationsErrors) {
				return $manualValidationsErrors;
			}
			($beforeDelete) ? $beforeDelete() : null;
			if ($model->delete()) {
				$model = ($afterDelete) ? $afterDelete($model) : $model;
				return $this->responseOk(messages: [$modelClassName => "Element supprimé"]);
			} else {
				return $this->responseError(["server" => "Erreur du serveur"], 500);
			}
		} else {
			return $this->responseError(["id" => "L'élément n'existe pas"], 404);
		}
	}

	/**
	 * Envoie un email de notification avec la mise en page standard (toutes les valeurs sont échappées)
	 * @param 	mixed 		$receivers		Un utilisateur, un email ou une liste (tableau / collection) d'utilisateurs ou d'emails
	 * @param 	string 		$subject		L'objet du mail
	 * @param 	string 		$greeting		La formule d'appel (ex: "Cher(e) Admin crédit,")
	 * @param 	array 		$paragraphs		Les paragraphes du message (texte brut)
	 * @param 	string		$linkPath		Le chemin du lien dans l'application (ex: "/contract")
	 * @param 	string		$linkLabel		Le libellé du lien
	 * @return 	void
	 */
	public function notifyByEmail($receivers, string $subject, string $greeting, array $paragraphs, ?string $linkPath = null, ?string $linkLabel = null)
	{
		$content = view('emails.notification', [
			"greeting" => $greeting,
			"paragraphs" => $paragraphs,
			"linkUrl" => $linkPath ? rtrim(config("app.url"), "/") . $linkPath : null,
			"linkLabel" => $linkLabel ?? "Accéder à l'application",
		])->render();

		foreach (Arr::flatten([$receivers]) as $receiver) {
			$email = $receiver instanceof User ? $receiver->email : $receiver;
			if ($email) {
				SendEmail::dispatch($email, $subject, $content);
			}
		}
	}
}
