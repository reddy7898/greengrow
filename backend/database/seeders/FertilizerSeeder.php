<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Fertilizer;

class FertilizerSeeder extends Seeder
{
    public function run()
    {
        Fertilizer::create([
            'name' => 'All-purpose NPK 20-20-20',
            'description' => 'Balanced NPK fertilizer suitable for most crops.',
            'price' => 499.00,
            'stock' => 100,
        ]);

        Fertilizer::create([
            'name' => 'Urea 46%',
            'description' => 'High nitrogen fertilizer for leafy growth.',
            'price' => 599.00,
            'stock' => 200,
        ]);

        Fertilizer::create([
            'name' => 'DAP 18-46-0',
            'description' => 'Phosphorus-rich fertilizer to encourage root development.',
            'price' => 799.00,
            'stock' => 150,
        ]);
    }
}
