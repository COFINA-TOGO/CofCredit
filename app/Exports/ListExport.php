<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * Export Excel d'une liste, avec ses filtres : $columns associe chaque en-tête à la valeur d'une ligne
 */
class ListExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
	/**
	 * @param	Builder		$query		La requête de la liste (filtres et périmètre appliqués)
	 * @param	array		$columns	[en-tête => fn($row) => valeur]
	 */
	public function __construct(private Builder $query, private array $columns)
	{
	}

	public function query()
	{
		return $this->query;
	}

	public function headings(): array
	{
		return array_keys($this->columns);
	}

	public function map($row): array
	{
		return array_map(fn($value) => $value($row), array_values($this->columns));
	}

	public function styles(Worksheet $sheet)
	{
		return [1 => ["font" => ["bold" => true]]];
	}
}
