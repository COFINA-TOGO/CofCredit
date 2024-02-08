<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeOfGuarantee extends Model
{
    use HasFactory;

    protected $table = "types_of_guarantee";

    protected $fillable = [
        "name",
    ];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at"] = Carbon::parse($data["created_at"])->format("d/m/yy H:i:s");
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format("d/m/yy H:i:s");
        return $data;
    }
}
