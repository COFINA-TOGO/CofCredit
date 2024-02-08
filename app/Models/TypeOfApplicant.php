<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeOfApplicant extends Model
{
    use HasFactory;

    protected $table = "types_of_applicant";

    protected $fillable = [
        "name",
        "slug",
    ];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at"] = Carbon::parse($data["created_at"])->format("d/m/yy H:i:s");
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format("d/m/yy H:i:s");
        return $data;
    }

    public function types_of_credit(): HasMany
    {
        return $this->hasMany(TypeOfCredit::class, "type_of_applicant_id", "id");
    }
}
