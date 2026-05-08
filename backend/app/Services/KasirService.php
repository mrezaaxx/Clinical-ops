<?php

namespace App\Services;

use App\Models\Kunjungan;
use App\Models\Tagihan;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class KasirService
{
    public function bayarTagihan(string $tagihanId): Tagihan
    {
        return DB::transaction(function () use ($tagihanId): Tagihan {
            $tagihan = Tagihan::query()->lockForUpdate()->findOrFail($tagihanId);

            if ($tagihan->status === 'LUNAS') {
                throw new RuntimeException('Tagihan sudah lunas');
            }

            $tagihan->update(['status' => 'LUNAS']);

            Kunjungan::query()
                ->whereKey($tagihan->kunjungan_id)
                ->update(['status' => 'SELESAI']);

            return $tagihan->fresh(['detail']);
        });
    }
}
