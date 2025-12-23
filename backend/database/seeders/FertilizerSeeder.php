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
           Fertilizer::create([
            'name' => 'MOP (Potash) 60%',
            'description' => 'Improves crop quality and disease resistance.',
            'price' => 650.00,
            'stock' => 120,
        ]);

        Fertilizer::create([
            'name' => 'SSP (Single Super Phosphate)',
            'description' => 'Provides phosphorus and sulfur for plant growth.',
            'price' => 450.00,
            'stock' => 180,
        ]);

        Fertilizer::create([
            'name' => 'Organic Vermicompost',
            'description' => 'Organic manure improving soil fertility.',
            'price' => 399.00,
            'stock' => 250,
        ]);

        Fertilizer::create([
            'name' => 'Neem Cake Fertilizer',
            'description' => 'Organic fertilizer and natural pest repellent.',
            'price' => 550.00,
            'stock' => 90,
        ]);

        Fertilizer::create([
            'name' => 'Zinc Sulphate',
            'description' => 'Micronutrient fertilizer preventing zinc deficiency.',
            'price' => 320.00,
            'stock' => 140,
        ]);

        Fertilizer::create([
            'name' => 'Calcium Nitrate',
            'description' => 'Water-soluble fertilizer improving fruit quality.',
            'price' => 780.00,
            'stock' => 110,
        ]);

        Fertilizer::create([
            'name' => 'Magnesium Sulphate',
            'description' => 'Enhances chlorophyll production in plants.',
            'price' => 360.00,
            'stock' => 160,
        ]);

        Fertilizer::create([
            'name' => 'Bio Fertilizer (Azospirillum)',
            'description' => 'Improves nitrogen availability in soil naturally.',
            'price' => 299.00,
            'stock' => 200,
        ]);

        Fertilizer::create([
            'name' => 'Humic Acid Granules',
            'description' => 'Enhances nutrient uptake and soil structure.',
            'price' => 699.00,
            'stock' => 130,
        ]);
    }
    
}
