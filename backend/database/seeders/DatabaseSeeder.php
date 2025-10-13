<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@greengrow.local',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // Sample customer
        User::factory()->create([
            'name' => 'John Farmer',
            'email' => 'john@farm.com',
            'role' => 'customer',
            'password' => bcrypt('password'),
        ]);

        // Create some fertilizers
        $this->call(FertilizerSeeder::class);
    }
}
