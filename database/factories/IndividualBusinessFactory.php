<?php

namespace Database\Factories;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IndividualBusiness>
 */
class IndividualBusinessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "contract_id" => Contract::inRandomOrder()->first()->id ?? Contract::factory(),
            "denomination" => $this->faker->company(),
            "corporate_purpose" => "pme",
            "head_office_address" => "Lomé",
            "rccm_number" => $this->faker->unique()->numerify("####"),
            "phone_number" => $this->faker->phoneNumber()
        ];
    }
}
