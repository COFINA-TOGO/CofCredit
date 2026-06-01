<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadings;

class QueryGuarantee implements FromQuery, WithHeadings, WithChunkReading
{
    public function query()
    {
        return DB::table('guarantees as g')
            ->leftJoin('types_of_guarantee as t', 't.id', '=', 'g.type_of_guarantee_id')
            ->leftJoin('verbals_trials as v', 'v.id', '=', 'g.verbal_trial_id')
            ->select([
                'g.id as ID',
                't.name as TYPE_DE_GARANTIE',
                'v.committee_id as ID_COMITE',
                DB::raw("CONCAT(v.applicant_first_name, ' ', v.applicant_last_name) as DEMANDEUR"),
                'g.comment as COMMENTAIRE',
                'g.created_at as CREE_LE',
            ])
            ->orderBy('g.id');
    }

    public function headings(): array
    {
        return [
            'ID',
            'TYPE DE GARANTIE',
            'ID COMITE',
            'DEMANDEUR',
            'COMMENTAIRE',
            'CREE LE',
        ];
    }

    public function chunkSize(): int
    {
        return 1000;
    }
}
