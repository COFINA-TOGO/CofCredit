<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Une décision dans l'historique d'un dossier
 */
class Activity extends Model
{
	const UPDATED_AT = null;

	protected $fillable = ["subject_type", "subject_id", "action", "comment", "user_id", "on_behalf_of_id"];

	protected $appends = ["created_at_fr"];

	public function subject(): MorphTo
	{
		return $this->morphTo();
	}

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	public function on_behalf_of(): BelongsTo
	{
		return $this->belongsTo(User::class, "on_behalf_of_id");
	}

	public function getCreatedAtFrAttribute()
	{
		return $this->created_at?->format('d/m/Y H:i');
	}

	/**
	 * Enregistre une décision sur un dossier, au nom de l'utilisateur connecté
	 * @param	Model		$subject	Le dossier (PV, contrat, notification, CAT)
	 * @param	string		$action		L'action (created, validated, rejected, sent_back...)
	 * @param	?string		$comment	Le motif ou le détail
	 */
	public static function record(Model $subject, string $action, ?string $comment = null): self
	{
		$user = auth()->user();

		return self::create([
			"subject_type" => $subject->getMorphClass(),
			"subject_id" => $subject->getKey(),
			"action" => $action,
			"comment" => $comment !== null && trim($comment) !== "" ? $comment : null,
			"user_id" => $user?->id,
			"on_behalf_of_id" => $user instanceof User ? $user->activeDelegators()->first()?->id : null,
		]);
	}
}
