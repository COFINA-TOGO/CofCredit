<?php

namespace App\Http\Traits;

use Exception;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait ControllerHelperTrait
{

    /**
     * Permet d'ajouter des filtres sur un objet Eloquent
     * @param 	mixed 	$query				L'objet Eloquent
     * @param 	mixed 	$requestData		Les données de la requete
     * @param 	mixed 	$modelName			Le nom du model
     * @return 	mixed
     */
    public function queryFilter($query, $requestData, $modelName)
    {
        $modelPath = "\App\Models\\$modelName";
        foreach ($requestData as $filter => $value) {
            if (in_array($filter, Schema::getColumnListing((new $modelPath)->getTable())) && $requestData[$filter]) {
                $query->where($filter, $requestData[$filter]);
            }
        }
        return $query;
    }

    /**
     * Permet d'ajouter des relation sur un objet Eloquent
     * @param 	mixed 	$query				L'objet Eloquent
     * @param 	mixed 	$requestData		Les données de la requete
     * @param 	mixed 	$modelName			Le nom du model
     * @return 	mixed
     */
    public function queryRelation($query, $requestData, $modelName)
    {
        $modelPath = "App\Models\\$modelName";
        $currentObjet = new $modelPath();
        $relations = collect($requestData)->filter(function ($value, $key) {
            return strpos($key, 'with_') === 0;
        });
        $validatedRelations = [];
        foreach ($relations as $relation => $value) {
            $relation = str_replace("<", ".", substr($relation, 5));
            try {
                $currentObjet->load($relation);
                ($value == "true") ? $validatedRelations[] = $relation : null;
            } catch (RelationNotFoundException $ex) {
                continue;
            }
        }
        $query->with($validatedRelations);
        return $query;
    }

    /**
     * Permet d'ajouter un filtre de recherche sur un objet Eloquent
     * @param 	mixed 	$query				L'objet Eloquent
     * @param 	mixed 	$columns			Les colones où rechercher
     * @param 	mixed 	$search				Le mot clé à rechercher
     * @return 	mixed
     */
    public function querySearch($query, $columns, $search)
    {
        $query
            ->where(function ($query) use ($columns, $search) {
                foreach ($columns as $column) {
                    $query->where($column, 'LIKE', "%$search%");
                }
            });
        return $query;
    }

    /**
     * Permet d'ajouter des relation sur un model laravel via chargement load
     * @param 	mixed 	$query				L'objet Eloquent
     * @param 	mixed 	$requestData		Les valeurs à utiliser pour appliquer les relations
     * @param 	mixed 	$modelName			Le nom du model
     * @return 	mixed
     */
    public function modelRelationLoad($model, $requestData, $modelName)
    {
        $modelPath = "App\Models\\$modelName";
        $currentObjet = new $modelPath();
        $relations = collect($requestData)->filter(function ($value, $key) {
            return strpos($key, 'with_') === 0;
        });
        $validatedRelations = [];
        foreach ($relations as $relation => $value) {
            $relation = str_replace("<", ".", substr($relation, 5));
            try {
                $currentObjet->load($relation);
                ($value == "true") ? $validatedRelations[] = $relation : null;
            } catch (RelationNotFoundException $ex) {
                continue;
            }
        }

        $model->load($validatedRelations);
        return $model;
    }

    /**
     * Les types MIME d'image acceptés et leur extension
     * @return	array
     */
    public function imageMimeTypes()
    {
        return ["image/png" => "png", "image/jpeg" => "jpg", "image/gif" => "gif"];
    }

    /**
     * Les types MIME de document acceptés (pdf ou image) et leur extension
     * @return	array
     */
    public function documentMimeTypes()
    {
        return ["application/pdf" => "pdf"] + $this->imageMimeTypes();
    }

    /**
     * Retourne le signataire d'un document selon le montant du crédit
     * @param 	mixed	$amount		Le montant du crédit
     * @return	string
     */
    public function signatoryFor($amount)
    {
        return ((float) $amount <= (float) config("credit.signatory_threshold")) ? config("credit.signatories.legal") : config("credit.signatories.head_credit");
    }

    /**
     * Retourne un chemin unique (hors du dossier public) pour un document généré, supprimé après envoi
     * @param 	string	$name		Le nom lisible du document (ex: Contrat-XXX.docx)
     * @return	string
     */
    public function temporaryDocumentPath(string $name)
    {
        $directory = storage_path("app/tmp");
        File::ensureDirectoryExists($directory);
        return $directory . "/" . Str::random(12) . "-" . Str::slug(pathinfo($name, PATHINFO_FILENAME)) . ".docx";
    }

    /**
     * Décode un document base64 (data URI) et détermine son extension à partir de son contenu réel
     * @param 	mixed	$base64				Le base64 (data:<mime>;base64,<données>)
     * @param 	array	$allowedMimeTypes	Les types MIME acceptés et l'extension associée
     * @param 	int		$maxSize			La taille maximale en octets
     * @return	array|null					["extension" => string, "data" => string] ou null si le document est invalide
     */
    public function decodeBase64Document($base64, ?array $allowedMimeTypes = null, int $maxSize = 10 * 1024 * 1024)
    {
        $allowedMimeTypes ??= $this->documentMimeTypes();
        if (!is_string($base64) || !preg_match('/^data:[\w.+-]+\/[\w.+-]+;base64,/', $base64, $matches)) {
            return null;
        }
        $data = base64_decode(str_replace(' ', '+', substr($base64, strlen($matches[0]))), true);
        if ($data === false || $data === '' || strlen($data) > $maxSize) {
            return null;
        }
        $mimeType = (new \finfo(FILEINFO_MIME_TYPE))->buffer($data);
        if (!isset($allowedMimeTypes[$mimeType])) {
            return null;
        }
        return ["extension" => $allowedMimeTypes[$mimeType], "data" => $data];
    }

    /**
     * Enregistre une image
     * @param 	string	$base64				Le base64
     * @param 	string	$savePath			Le chemin d'enregistrement (sans extension)
     * @return	string|false				Le chemin du fichier enregistré
     */
    public function saveImageFromBase64($base64, $savePath)
    {
        try {
            $document = $this->decodeBase64Document($base64, $this->imageMimeTypes());
            if (!$document) {
                return false;
            }
            $savePath .= "." . $document["extension"];
            Storage::disk("public")->put($savePath, $document["data"]);
            return $savePath;
        } catch (Exception $ex) {
            return false;
        }
    }



    /**
     * Permet d'ajouter des filtres avec des valeurs multiples sur un objet Eloquent
     * @param 	mixed 	$query				L'objet Eloquent
     * @param 	mixed 	$filters			Les filtres
     * @param 	mixed 	$requestData		Les données de la requete
     * @param 	mixed 	$correlationData	Les valeurs à utiliser pour appliquer les filtres
     * @return 	mixed
     */
    public function queryMultipeValvueFilter($query, $associationFilters, $requestData, $correlationData)
    {
        foreach ($associationFilters as $filter => $chain) {
            if (isset($requestData[$filter]) && $requestData[$filter]) {
                $query->where(function ($query) use ($filter, $requestData, $correlationData) {
                    foreach (explode("-", $requestData[$filter]) as $char) {
                        if (array_key_exists($char, $correlationData)) {
                            $query->where($filter, $correlationData[$char]);
                        }
                    }
                });
            }
        }
        return $query;
    }
}
