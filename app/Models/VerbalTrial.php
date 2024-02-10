<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VerbalTrial extends Model
{
    use HasFactory;

    protected $table = "verbals_trials";

    protected $fillable = [
        "committee_id",
        "committee_date",
        'civility',
        'applicant_first_name',
        'applicant_last_name',
        'account_number',
        'activity',
        'purpose_of_financing',
        'type_of_credit_id',
        'amount',
        'duration',
        'periodicity',
        'taf',
        'due_amount',
        'administrative_fees_percentage',
        'insurance_premium',
    ];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at"] = Carbon::parse($data["created_at"])->format('d/m/Y H:i:s');
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format('d/m/Y H:i:s');
        return $data;
    }

    public function type_of_credit(): BelongsTo
    {
        return $this->belongsTo(TypeOfCredit::class, 'type_of_credit_id', 'id');
    }

    public function guarantees(): HasMany
    {
        return $this->hasMany(Guarantee::class, "verbal_trial_id", "id");
    }

    public function contract(): HasOne
    {
        return $this->hasOne(Contract::class, 'verbal_trial_id', 'id');
    }
}
