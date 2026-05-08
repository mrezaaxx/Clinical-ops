<?php

namespace Database\Seeders;

use App\Models\Obat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Obat::query()->upsert([
            ['kode_obat' => 'OBT-PCM', 'nama_obat' => 'Paracetamol 500 mg', 'stok' => 100, 'satuan' => 'tablet'],
            ['kode_obat' => 'OBT-CTM', 'nama_obat' => 'CTM 4 mg', 'stok' => 75, 'satuan' => 'tablet'],
            ['kode_obat' => 'OBT-ORS', 'nama_obat' => 'Oralit', 'stok' => 60, 'satuan' => 'sachet'],
        ], ['kode_obat'], ['nama_obat', 'stok', 'satuan']);
    }
}
