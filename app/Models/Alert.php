<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Alerte affichée dans l'application (la cloche), doublant un e-mail
 */
class Alert extends Model
{
	protected $fillable = ["user_id", "title", "body", "link", "read_at"];

	protected $casts = [
		"read_at" => "datetime",
	];

	protected $appends = ["created_at_human"];

	public function getCreatedAtHumanAttribute()
	{
		return $this->created_at?->locale("fr")->diffForHumans();
	}
}
