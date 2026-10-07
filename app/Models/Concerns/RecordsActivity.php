<?php

namespace App\Models\Concerns;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Historise les décisions d'un dossier à chaque création, changement d'état et suppression,
 * quel que soit l'écran ou l'action (y compris les actions groupées).
 *
 * Le modèle décrit ses changements notables dans activityEvents() : liste de [action, motif].
 */
trait RecordsActivity
{
	public static function bootRecordsActivity(): void
	{
		static::created(fn($model) => Activity::record($model, "created"));
		static::updated(function ($model) {
			foreach ($model->activityEvents() as [$action, $comment]) {
				Activity::record($model, $action, $comment);
			}
		});
		static::deleted(fn($model) => Activity::record($model, "deleted"));
	}

	public function activities(): MorphMany
	{
		return $this->morphMany(Activity::class, "subject");
	}

	/**
	 * Événement de dépôt d'un document signé, si le chemin vient d'être renseigné
	 */
	protected function documentEvent(string $column, string $label): ?array
	{
		return $this->wasChanged($column) && $this->$column ? ["document_uploaded", $label] : null;
	}

	/**
	 * Changements notables de la dernière mise à jour : [[action, motif], ...]
	 */
	abstract protected function activityEvents(): array;
}
