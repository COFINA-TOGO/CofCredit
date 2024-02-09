<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Guarantee extends Model
{
    use HasFactory;

    protected $fillable = [
        "verbal_trial_id",
        "value",
        "type_of_guarantee_id",
        "comment",
    ];
    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at"] = Carbon::parse($data["created_at"])->format("d/m/yy H:i:s");
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format("d/m/yy H:i:s");
        return $data;
    }

    public function verbal_trial(): BelongsTo
    {
        return $this->belongsTo(VerbalTrial::class, "verbal_trial_id", "id");
    }

    public function type_of_guarantee(): BelongsTo
    {
        return $this->belongsTo(TypeOfGuarantee::class, "type_of_guarantee_id", "id");
    }
}
