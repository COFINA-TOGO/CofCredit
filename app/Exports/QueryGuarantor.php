<?php

namespace App\Exports;

use App\Models\Guarantor;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadings;

class QueryGuarantor implements FromQuery, WithHeadings, WithChunkReading
{
    public function query()
    {
        return DB::table('guarantors as g')
            ->leftJoin('c_a_t_s as c', 'c.contract_id', '=', 'g.contract_id')
            ->select([
                'g.id as ID',
                'c.credit_number as NO_PRET',
                'g.civility as CIVILITE',
                DB::raw("CONCAT(g.first_name, ' ', g.last_name) as NOM"),
                'g.home_address as ADDRESS',
                'g.type_of_identity_document as TYPE_DE_PIECE',
                'g.number_of_identity_document as VALEUR_DE_PIECE',
                'g.date_of_issue_of_identity_document as DATE_EXPIRATION_PIECE',
                'g.birth_date as DATE_DE_NAISSANCE',
                'g.birth_place as LIEU_DE_NAISSANCE',
                'g.nationality as NATIONALITE',
                'g.function as FONCTION',
                'g.phone_number as TEL',
            ])
            ->orderBy('g.id')
            ;
    }

    public function headings(): array
    {
        return [
            'ID',
            'NO PRET',
            'CIVILITE',
            'NOM',
            'ADDRESS',
            'TYPE DE PIECE',
            'VALEUR DE PIECE',
            'DATE EXPIRATION PIECE',
            'DATE DE NAISSANCE',
            'LIEU DE NAISSANCE',
            'NATIONALITE',
            'FONCTION',
            'TEL',
        ];
    }

    public function chunkSize(): int
    {
        return 1000;
    }
}
