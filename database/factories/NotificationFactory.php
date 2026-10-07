<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VerbalTrial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "verbal_trial_id" => VerbalTrial::inRandomOrder()->first()?->id,
            "representative_home_address" => $this->faker->address(),
            "representative_type_of_identity_document" => "cni",
            "representative_number_of_identity_document" => $this->faker->unique()->numerify('###-###-###'),
            "representative_date_of_issue_of_identity_document" => $this->faker->date,
            "number_of_due_dates" => $this->faker->numberBetween(1, 25),
            "total_amount_of_interest" => 14785236,
            "due_amount" => $this->faker->randomFloat(0, 150000, 1500000),
            "type" => $this->faker->randomElement(['particular', 'company', 'individual_business']),
            "creator_id" => User::where('profile', 'credit_admin')->inRandomOrder()->first()?->id ?? 1,
        ];
    }
}
