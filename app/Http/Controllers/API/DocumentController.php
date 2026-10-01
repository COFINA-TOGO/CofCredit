<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\DeadlinePostponed;
use App\Models\Guarantor;
use App\Models\Notification;
use App\Support\Documents;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

/**
 * @group Document
 *
 * EndPoint pour télécharger les documents privés (documents signés, pièces jointes)
 */
class DocumentController extends Controller
{
	/**
	 * Les modèles pouvant posséder un document et l'ability de policy à vérifier
	 */
	private const OWNERS = [
		"contracts" => [Contract::class, "downloadDocument"],
		"guarantors" => [Guarantor::class, "downloadDocument"],
		"notifications" => [Notification::class, "downloadDocument"],
		"deadline_postponeds" => [DeadlinePostponed::class, "download"],
	];

	/**
	 * Télécharge un document privé
	 *
	 * L'accès est accordé selon les droits sur le dossier auquel le document appartient.
	 *
	 * @urlParam	path	string	required	Le chemin du document.	Example: upload/Contracts/signed_contracts/cfntg-001-signed.pdf
	 *
	 * @response 200
	 */
	public function show(string $path)
	{
		if (str_contains($path, "..") || !($owner = $this->findOwner(Documents::URL_PREFIX . $path))) {
			return $this->responseError(["document" => ["Le document n'existe pas"]], 404);
		}
		[$model, $ability] = $owner;
		if (!($authorisation = Gate::inspect($ability, $model))->allowed()) {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
		if (!Storage::disk("documents")->exists($path)) {
			return $this->responseError(["document" => ["Le fichier est introuvable"]], 404);
		}
		return response()->file(Storage::disk("documents")->path($path));
	}

	/**
	 * Retrouve le dossier auquel appartient un document
	 * @param	string	$url	L'URL enregistrée en base
	 * @return	array|null		[modèle, ability]
	 */
	private function findOwner(string $url)
	{
		foreach (Documents::COLUMNS as $table => $columns) {
			[$modelClass, $ability] = self::OWNERS[$table];
			$model = $modelClass::where(function ($query) use ($columns, $url) {
				foreach ($columns as $column) {
					$query->orWhere($column, $url);
				}
			})->first();
			if ($model) {
				return [$model, $ability];
			}
		}
		return null;
	}
}
