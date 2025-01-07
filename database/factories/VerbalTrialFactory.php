<?php

namespace Database\Factories;

use App\Models\TypeOfCredit;
use App\Models\User;
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
		$first_name = $this->faker->firstName();
		$last_name = $this->faker->lastName();
		$entity_name = $first_name . " " . $last_name;
		return [
			"committee_id" => $this->faker->unique()->numerify('CFNTG-###-##-##-##-#####'),
			"committee_date" => $this->faker->date,
			"civility" => $this->faker->randomElement(["Mr", "Mme", "Mlle"]),
			"entity_name" => $entity_name,
			"applicant_first_name" => $first_name,
			"applicant_last_name" => $last_name,
			"account_number" => $this->faker->unique()->numerify('############'),
			"activity" => $this->faker->company(),
			"purpose_of_financing" => $this->faker->company(),
			"type_of_credit_id" => TypeOfCredit::inRandomOrder()->first()->id,
			"amount" => $this->faker->randomFloat(0, 15000000, 150000000),
			"duration" => $this->faker->numberBetween(1, 120),
			"periodicity" => $this->faker->randomElement(['mensual', 'quarterly', "semi-annual", "annual", 'in-fine']),
			"taf" => 10,
			"administrative_fees_percentage" => $this->faker->randomFloat(0, 0, 100),
			"tax_fee_interest_rate" => $this->faker->randomFloat(0, 0, 100),
			"caf_id" => User::inRandomOrder()->where("profile", "caf")->first()->id ?? 9,
			"credit_analyst_id" => User::inRandomOrder()->where("profile", "credit_analyst")->first()->id ?? 3,
			"credit_admin_id" => User::inRandomOrder()->where("profile", "credit_admin")->first()->id ?? 4,
			"creator_id" => User::where('profile', 'credit_analyst')->inRandomOrder()->first()->id ?? 3,
			"risk_premium_percentage" => $this->faker->numberBetween(10, 30),
			"has_line_review_bonus" => $this->faker->boolean(),
			"number_deferred" => $this->faker->numberBetween(0, 5),
		];
	}
}
