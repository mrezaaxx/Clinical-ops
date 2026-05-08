<?php

namespace App\Services;

use App\Models\Kunjungan;
use App\Models\Pasien;
use Illuminate\Support\Facades\DB;

class PendaftaranService
{
    public function __construct(
        private RealtimeService $realtime
    ) {}

    /**
     * @return array{pasien: Pasien, kunjungan: Kunjungan}
     */
    public function daftarPasien(array $data): array
    {
        $result = DB::transaction(function () use ($data): array {
            $pasien = Pasien::query()->create([
                'no_rm' => $this->generateNoRm(),
                'nik' => $data['nik'],
                'nama_lengkap' => $data['nama_lengkap'],
                'tanggal_lahir' => $data['tanggal_lahir'],
                'riwayat_alergi' => $data['riwayat_alergi'] ?? [],
            ]);

            $kunjungan = Kunjungan::query()->create([
                'pasien_id' => $pasien->id,
                'kode_poli' => $data['kode_poli'],
                'nomor_antrian' => $this->nextQueueNumber($data['kode_poli']),
                'status' => 'MENUNGGU',
                'tanda_vital' => $data['tanda_vital'] ?? [],
            ]);

            return compact('pasien', 'kunjungan');
        });

        $this->realtime->broadcast('queue-update', [
            'type' => 'NEW_REGISTRATION',
            'visit' => $result['kunjungan']->load('pasien'),
        ]);

        return $result;
    }

    private function generateNoRm(): string
    {
        $next = Pasien::withTrashed()->count() + 1;

        return sprintf('RM-%s-%04d', now()->year, $next);
    }

    private function nextQueueNumber(string $kodePoli): int
    {
        return (int) Kunjungan::query()
            ->where('kode_poli', $kodePoli)
            ->max('nomor_antrian') + 1;
    }
}
