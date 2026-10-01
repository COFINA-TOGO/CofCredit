<?php

use App\Support\Documents;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

/**
 * Déplace les documents signés et pièces jointes du disque public (accessible sans authentification via /storage)
 * vers le disque privé "documents", servi par la route authentifiée document.show
 */
return new class extends Migration
{
	public function up(): void
	{
		$this->moveDocuments("public", "documents", function (string $value) {
			// "/storage/upload/..." (documents signés) ou "upload/..." (reports d'échéance)
			return str_starts_with($value, Documents::URL_PREFIX) ? null : preg_replace('#^/?(storage/)?#', '', $value);
		}, fn(string $key) => Documents::URL_PREFIX . $key);

		foreach (Documents::COLUMNS as $table => $columns) {
			Schema::table($table, function (Blueprint $blueprint) use ($columns) {
				foreach ($columns as $column) {
					$blueprint->index($column);
				}
			});
		}
	}

	public function down(): void
	{
		foreach (Documents::COLUMNS as $table => $columns) {
			Schema::table($table, function (Blueprint $blueprint) use ($columns) {
				foreach ($columns as $column) {
					$blueprint->dropIndex([$column]);
				}
			});
		}

		$this->moveDocuments("documents", "public", function (string $value) {
			return str_starts_with($value, Documents::URL_PREFIX) ? substr($value, strlen(Documents::URL_PREFIX)) : null;
		}, fn(string $key) => str_starts_with($key, "upload/deadlinePostponed/") ? $key : "/storage/" . $key);
	}

	/**
	 * Déplace les fichiers d'un disque à l'autre et met à jour les chemins en base
	 * @param	string		$fromDisk	Le disque source
	 * @param	string		$toDisk		Le disque de destination
	 * @param	callable	$toKey		Chemin en base => clé du fichier sur le disque source (null : ne rien faire)
	 * @param	callable	$toValue	Clé du fichier => nouveau chemin en base
	 */
	private function moveDocuments(string $fromDisk, string $toDisk, callable $toKey, callable $toValue): void
	{
		foreach (Documents::COLUMNS as $table => $columns) {
			foreach ($columns as $column) {
				DB::table($table)->whereNotNull($column)->orderBy("id")->chunkById(500, function ($rows) use ($table, $column, $fromDisk, $toDisk, $toKey, $toValue) {
					foreach ($rows as $row) {
						if (!($key = $toKey($row->$column))) {
							continue;
						}
						$source = Storage::disk($fromDisk)->path($key);
						$destination = Storage::disk($toDisk)->path($key);
						if (File::exists($source)) {
							File::ensureDirectoryExists(dirname($destination));
							File::move($source, $destination);
						}
						DB::table($table)->where("id", $row->id)->update([$column => $toValue($key)]);
					}
				});
			}
		}
	}
};
