<?php

namespace App\Services;

use App\Models\Kunjungan;
use App\Models\Obat;
use App\Models\Resep;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class FarmasiService
{
    public function validasiResep(string $resepId): Resep
    {
        return DB::transaction(function () use ($resepId): Resep {
            $resep = Resep::query()->with('detail')->lockForUpdate()->findOrFail($resepId);

            foreach ($resep->detail as $detail) {
                $obat = Obat::query()
                    ->where('kode_obat', $detail->kode_obat)
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($obat->stok < $detail->jumlah) {
                    throw new RuntimeException("Stok {$detail->kode_obat} tidak cukup");
                }

                $obat->decrement('stok', $detail->jumlah);
            }

            $resep->update(['status' => 'VALID']);

            Kunjungan::query()
                ->whereKey($resep->kunjungan_id)
                ->update(['status' => 'TAGIHAN']);

            return $resep->fresh(['detail']);
        });
    }
}
