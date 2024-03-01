<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Guarantor extends Model
{
    use HasFactory;

    protected $table = "guarantors";

    protected $fillable = [
        "contract_id",
        "civility",
        "first_name",
        "last_name",
        "birth_date",
        "birth_place",
        "nationality",
        "home_address",
        "type_of_identity_document",
        "number_of_identity_document",
        "date_of_issue_of_identity_document",
        "function",
        "phone_number",
    ];

    protected $appends = ["full_name"];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
        $data["birth_date"] = Carbon::parse($data["birth_date"])->format("d/m/Y");
        $data["date_of_issue_of_identity_document"] = Carbon::parse($data["date_of_issue_of_identity_document"])->format("d/m/Y");
        return $data;
    }

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, "contract_id", "id");
    }

    public function getFullNameAttribute()
    {
        return $this->first_name . " " . $this->last_name;
    }
}
