<?php

namespace App\Services;

use App\Models\Anamnesa;
use App\Models\Kunjungan;
use App\Models\Resep;
use App\Models\Tagihan;
use Brick\Math\BigDecimal;
use Illuminate\Support\Facades\DB;

class AnamnesaService
{
    /**
     * @return array{anamnesa: Anamnesa, resep: Resep, tagihan: Tagihan}
     */
    public function simpanAnamnesa(array $data): array
    {
        return DB::transaction(function () use ($data): array {
            $anamnesa = Anamnesa::query()->create([
                'kunjungan_id' => $data['kunjungan_id'],
                'kode_icd10' => $data['kode_icd10'],
                'keluhan_utama' => $data['keluhan_utama'],
                'pemeriksaan_fisik' => $data['pemeriksaan_fisik'] ?? [],
            ]);

            $resep = Resep::query()->create([
                'kunjungan_id' => $data['kunjungan_id'],
                'status' => 'MENUNGGU',
                'keterangan' => 'Resep elektronik dari poliklinik',
            ]);

            foreach ($data['resep'] ?? [] as $item) {
                $resep->detail()->create($item);
            }

            $tagihan = Tagihan::query()->create([
                'kunjungan_id' => $data['kunjungan_id'],
                'total_biaya' => $this->sumBill($data['tagihan'] ?? []),
                'status' => 'BELUM',
            ]);

            foreach ($data['tagihan'] ?? [] as $item) {
                $tagihan->detail()->create([
                    'nama_item' => $item['nama_item'],
                    'harga_satuan' => $item['harga_satuan'],
                    'jumlah' => $item['jumlah'],
                    'subtotal' => BigDecimal::of((string) $item['harga_satuan'])
                        ->multipliedBy((string) $item['jumlah'])
                        ->toScale(2)
                        ->__toString(),
                ]);
            }

            Kunjungan::query()
                ->whereKey($data['kunjungan_id'])
                ->update(['status' => 'RESEP']);

            return compact('anamnesa', 'resep', 'tagihan');
        });
    }

    private function sumBill(array $items): string
    {
        $total = '0.00';

        foreach ($items as $item) {
            $subtotal = BigDecimal::of((string) $item['harga_satuan'])
                ->multipliedBy((string) $item['jumlah']);
            $total = BigDecimal::of($total)
                ->plus($subtotal)
                ->toScale(2)
                ->__toString();
        }

        return $total;
    }
}
