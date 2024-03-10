<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CAT extends Model
{
    use HasFactory;

    protected $table = "c_a_t_s";
    protected $fillable = [
        "contract_id",
        "credit_number",
        "sector",
        "first_deadline",
        "last_deadline",
        "source_of_reimbursement",
        "instructions_from_the_risk_and_credit_department",
        "outstanding_number_ready_to_settle",
        "other_expenses",
        "teg",
    ];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
        $data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
        $data["contract_id"] = (int) $data["contract_id"];
        $data["other_expenses"] = (int) $data["other_expenses"];
        $data["teg"] = (int) $data["teg"];
        return $data;
    }

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, "contract_id", "id");
    }
}
