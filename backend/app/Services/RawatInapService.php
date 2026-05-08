<?php

namespace App\Services;

use App\Models\Kamar;
use App\Models\RawatInap;
use App\Models\Kunjungan;
use Illuminate\Support\Facades\DB;
use Exception;

class RawatInapService
{
    public function daftarRawatInap(array $data)
    {
        return DB::transaction(function () use ($data) {
            $kamar = Kamar::query()
                ->where('id', $data['kamar_id'])
                ->lockForUpdate()
                ->first();

            if (!$kamar || !$kamar->is_tersedia) {
                throw new Exception('Kamar tidak tersedia');
            }

            $rawatInap = RawatInap::query()->create([
                'kunjungan_id' => $data['kunjungan_id'],
                'kamar_id' => $kamar->id,
                'tgl_masuk' => now(),
                'status' => 'DIRAWAT',
            ]);

            $kamar->update(['is_tersedia' => false]);
            
            Kunjungan::where('id', $data['kunjungan_id'])->update(['status' => 'RAWAT_INAP']);

            return $rawatInap;
        });
    }
}
