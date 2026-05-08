<?php

namespace App\Services;

use App\Models\Kunjungan;
use App\Models\Pasien;
use Illuminate\Support\Facades\DB;

class IgdService
{
    public function __construct(
        private RealtimeService $realtime,
        private PendaftaranService $pendaftaran
    ) {}

    /**
     * @return array{pasien: Pasien, kunjungan: Kunjungan}
     */
    public function daftarIgd(array $data): array
    {
        $result = DB::transaction(function () use ($data): array {
            // If patient already exists, use them. Otherwise create new.
            $pasien = Pasien::query()->where('nik', $data['nik'])->first();

            if (!$pasien) {
                $pasien = Pasien::query()->create([
                    'no_rm' => $this->generateNoRm(),
                    'nik' => $data['nik'],
                    'nama_lengkap' => $data['nama_lengkap'],
                    'tanggal_lahir' => $data['tanggal_lahir'],
                    'riwayat_alergi' => $data['riwayat_alergi'] ?? [],
                ]);
            }

            $kunjungan = Kunjungan::query()->create([
                'pasien_id' => $pasien->id,
                'kode_poli' => 'IGD',
                'nomor_antrian' => $this->nextQueueNumber('IGD'),
                'status' => 'MENUNGGU',
                'tanda_vital' => $data['tanda_vital'] ?? [],
                'triage_level' => $data['triage_level'] ?? 'P3', // Default to P3 (Green/Urgent but stable)
                'triage_detail' => $data['triage_detail'] ?? [],
                'waktu_triage' => now(),
            ]);

            return compact('pasien', 'kunjungan');
        });

        $this->realtime->broadcast('queue-update', [
            'type' => 'NEW_IGD_REGISTRATION',
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
