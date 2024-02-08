<?php

namespace App\Models;

use App\Models\TypeOfApplicant;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TypeOfCredit extends Model
{
    use HasFactory;

    protected $table = "types_of_credit";

    protected $fillable = [
        "name",
        "type_of_applicant_id",
        "min_month",
        "max_month",
    ];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at"] = Carbon::parse($data["created_at"])->format("d/m/yy H:i:s");
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format("d/m/yy H:i:s");
        return $data;
    }

    public function type_of_applicant(): BelongsTo
    {
        return $this->belongsTo(TypeOfApplicant::class, "type_of_applicant_id", "id");
    }
}
