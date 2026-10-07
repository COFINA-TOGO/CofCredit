<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Délégation pendant une absence : sur la période, le délégataire exerce les droits du délégant
 * et répond de ses dossiers ; les alertes du délégant lui parviennent aussi.
 */
class Delegation extends Model
{
	protected $fillable = ["delegator_id", "delegate_id", "starts_at", "ends_at", "reason", "creator_id"];

	protected $casts = [
		"starts_at" => "date",
		"ends_at" => "date",
	];

	protected $appends = ["status", "starts_at_fr", "ends_at_fr"];

	public function delegator(): BelongsTo
	{
		return $this->belongsTo(User::class, "delegator_id");
	}

	public function delegate(): BelongsTo
	{
		return $this->belongsTo(User::class, "delegate_id");
	}

	/**
	 * Délégations en cours aujourd'hui
	 */
	public function scopeActive($query)
	{
		$today = Carbon::today()->toDateString();

		return $query->whereDate("starts_at", "<=", $today)->whereDate("ends_at", ">=", $today);
	}

	/**
	 * upcoming, active ou ended
	 */
	public function getStatusAttribute()
	{
		$today = Carbon::today();

		return match (true) {
			$this->starts_at->gt($today) => "upcoming",
			$this->ends_at->lt($today) => "ended",
			default => "active",
		};
	}

	public function getStartsAtFrAttribute()
	{
		return $this->starts_at?->format("d/m/Y");
	}

	public function getEndsAtFrAttribute()
	{
		return $this->ends_at?->format("d/m/Y");
	}
}
