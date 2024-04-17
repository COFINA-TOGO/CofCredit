<?php

namespace App\Http\Controllers;

use App\Http\Traits\ControllerHelperTrait;
use App\Http\Traits\CustomResponseTrait;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
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
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function modelStore($modelClass, array $requestData, array $validations, callable $manualValidations = null, callable $beforeCreate = null, callable $afterCreate = null)
	{
		if (($authorisation = Gate::inspect('create', $modelClass))->allowed()) {
			$validator = Validator::make($requestData, $validations);
			if ($validator->fails()) {
				return $this->responseError($validator->errors(), 400);
			} else {
				$manualValidationsErrors = ($manualValidations) ? $manualValidations($requestData) : null;
				if ($manualValidationsErrors) {
					return $manualValidationsErrors;
				}
				$requestData = ($beforeCreate) ? $beforeCreate($requestData) : $requestData;
				$model = call_user_func_array([$modelClass, 'create'], [$requestData]);
				$model = ($afterCreate) ? $afterCreate($model) : $model;
				$modelClassExployed = explode("\\", $modelClass);
				return $this->responseOk([
					lcfirst(end($modelClassExployed)) => $model
				]);
			}
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
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
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function modelUpdate(int $modelId, $modelClass, array $requestData, array $validations, callable $manualValidations = null, callable $beforeUpdate = null, callable $afterUpdate = null)
	{
		$modelClassExployed = explode("\\", $modelClass);
		$model = call_user_func_array([$modelClass, 'find'], [$modelId]);
		$modelClassName = lcfirst(end($modelClassExployed));
		if ($model) {
			if (($authorisation = Gate::inspect('update', $model))->allowed()) {
				$validator = Validator::make($requestData, $validations);
				if ($validator->fails()) {
					return $this->responseError($validator->errors(), 400);
				} else {
					$manualValidationsErrors = ($manualValidations) ? $manualValidations($requestData) : null;
					if ($manualValidationsErrors) {
						return $manualValidationsErrors;
					}
					$requestData = ($beforeUpdate) ? $beforeUpdate($requestData, $model) : $requestData;
					$model->update($requestData);
					$model = ($afterUpdate) ? $afterUpdate($model) : $model;
					return $this->responseOk([
						$modelClassName => $model
					]);
				}
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
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
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function modelDelete(int $modelId, $modelClass, callable $manualValidations = null, callable $beforeDelete = null, callable $afterDelete = null)
	{
		$modelClassExployed = explode("\\", $modelClass);
		$model = call_user_func_array([$modelClass, 'find'], [$modelId]);
		$modelClassName = lcfirst(end($modelClassExployed));
		if ($model) {
			if (($authorisation = Gate::inspect('delete', $model))->allowed()) {
				$manualValidationsErrors = ($manualValidations) ? $manualValidations() : null;
				if ($manualValidationsErrors) {
					return $manualValidationsErrors;
				}
				($beforeDelete) ? $beforeDelete() : null;
				if ($model->delete()) {
					$model = ($afterDelete) ? $afterDelete($model) : $model;
					return $this->responseOk(messages: [$modelClassName => "Element supprimé"], status: 204);
				} else {
					return $this->responseError(["server" => "Erreur du serveur"], 500);
				}
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "L'élément n'existe pas"], 404);
		}
	}
}
