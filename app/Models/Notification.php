<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'verbal_trial_id',
        'representative_phone_number',
        'head_credit_observation',
        'head_credit_validation',
        'signed_contract_path',
        'signed_promissory_note_path',
        'creator_id',
    ];

    protected $appends = ['observations', 'upload_completed'];

    public function toArray()
    {
        $data = parent::toArray();
        $data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
        $data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
        $data["verbal_trial_id"] = (int) $data["verbal_trial_id"];
        return $data;
    }


    public function verbal_trial(): BelongsTo
    {
        return $this->belongsTo(VerbalTrial::class, 'verbal_trial_id', 'id');
    }

    public function c_a_t(): HasOne
    {
        return $this->hasOne(CAT::class, 'notification_id', 'id');
    }

    public function getObservationsAttribute()
    {
        $observations = [];
        if ($this->head_credit_validation == "rejected")
            return ["Notification rejetée"];
        if ($this->head_credit_validation == "waiting")
            $observations[] = "Validation head credit manquante";
        if (!$this->signed_notification_path)
            $observations[] = "Notification signé manquante";
        if (!$this->signed_contract_path)
            $observations[] = "Contrat notarié signé manquant";
        if (!$this->signed_promissory_note_path)
            $observations[] = "Billet à ordre signé manquant";
        $incompleteGuarantor = $this->verbal_trial->guarantors?->filter(function ($item) {
            return $item['signed_contract_path'] == null || $item['signed_promissory_note_path'] == null;
        })->toArray();
        if ($incompleteGuarantor)
            $observations[] = "Billet à ordre manquantes des cautions";
        return $observations;
    }

    public function getUploadCompletedAttribute()
    {
        return empty($this->observations);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, "creator_id", "id");
    }
}
