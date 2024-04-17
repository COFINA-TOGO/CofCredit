<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeadlinePostponed extends Model
{
	use HasFactory;

	protected $fillable = [
		"caf_id",
		"credit_number",
		"deadline_number",
		"new_date",
		"request_path",
		"memo_path",
		"status",
		"comment",
	];

	public function toArray()
	{
		$data = parent::toArray();
		$data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
		$data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
		$data["caf_id"] = isset($data["caf_id"]) ? (int) $data["caf_id"] : null;
		$data["deadline_number"] = isset($data["deadline_number"]) ? (int) $data["deadline_number"] : null;
		return $data;
	}

	public function caf(): BelongsTo
	{
		return $this->belongsTo(User::class, "caf_id", "id");
	}
}
