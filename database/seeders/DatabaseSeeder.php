<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory(1)->create(["full_name" => "admin", "name" => "admin", "email" => "charles.gamligo@cofinacorp.com", "profile" => "admin", "activated" => true, "password_change_required" => false, "password" => "Coftg2021"])->first();
        User::factory(1)->create(["profile" => "credit_admin"]);
        User::factory(1)->create(["profile" => "head_credit"]);
        User::factory(1)->create(["profile" => "operation"]);
        User::factory(1)->create(["profile" => "legal"]);
        User::factory(1)->create(["profile" => "dex"]);

        echo "admin Token: " . $admin->createToken("auth-token")->plainTextToken;
    }
}
