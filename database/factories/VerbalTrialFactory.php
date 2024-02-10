<?php

namespace Database\Factories;

use App\Models\TypeOfCredit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VerbalTrial>
 */
class VerbalTrialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "committee_id" => $this->faker->unique()->numerify('CFNTG-###-##-##-##-#####'),
            "committee_date" => $this->faker->date,
            "civility" => $this->faker->randomElement(["Mr", "Mme", "Mlle"]),
            "applicant_first_name" => $this->faker->firstName(),
            "applicant_last_name" => $this->faker->lastName(),
            "account_number" => $this->faker->unique()->numerify('##########'),
            "activity" => $this->faker->company(),
            "purpose_of_financing" => $this->faker->company(),
            "type_of_credit_id" => TypeOfCredit::inRandomOrder()->first()->id,
            "amount" => 10000000,
            "duration" => 12,
            "periodicity" => $this->faker->randomElement(['mensual', 'quarterly', "semi-annual", "annual", 'in-fine']),
            "taf" => 15,
            "due_amount" => 500000,
            "administrative_fees_percentage" => 45000,
            "insurance_premium" => 452580,
        ];
    }
}
