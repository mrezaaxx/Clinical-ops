<?php

namespace Tests\Feature;

use App\Models\Obat;
use App\Services\AnamnesaService;
use App\Services\PendaftaranService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClinicalApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_endpoint_creates_patient_visit_payload(): void
    {
        $response = $this->postJson('/api/pendaftaran/pasien', [
            'nik' => '3273010705261001',
            'nama_lengkap' => 'Maya Putri',
            'tanggal_lahir' => '1994-05-08',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => ['Penisilin'],
            'tanda_vital' => ['nadi' => 82],
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('status', 'sukses')
            ->assertJsonPath('data.kunjungan.status', 'MENUNGGU')
            ->assertJsonPath('data.pasien.nama_lengkap', 'Maya Putri');
    }

    public function test_anamnesa_endpoint_creates_prescription_and_bill(): void
    {
        $visit = app(PendaftaranService::class)->daftarPasien([
            'nik' => '3273010705261002',
            'nama_lengkap' => 'Yoga Pratama',
            'tanggal_lahir' => '1991-03-18',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => [],
            'tanda_vital' => [],
        ])['kunjungan'];

        $response = $this->postJson('/api/poliklinik/anamnesa', [
            'kunjungan_id' => $visit->id,
            'kode_icd10' => 'J00',
            'keluhan_utama' => 'Pilek.',
            'pemeriksaan_fisik' => ['faring' => 'hiperemis'],
            'resep' => [
                ['kode_obat' => 'OBT-PCM', 'jumlah' => 6, 'aturan_pakai' => '3x1'],
            ],
            'tagihan' => [
                ['nama_item' => 'Konsultasi', 'harga_satuan' => '120000.00', 'jumlah' => 1],
            ],
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.resep.status', 'MENUNGGU')
            ->assertJsonPath('data.tagihan.total_biaya', '120000.00');
    }

    public function test_pharmacy_and_cashier_endpoints_progress_visit(): void
    {
        Obat::query()->create([
            'kode_obat' => 'OBT-PCM',
            'nama_obat' => 'Paracetamol 500 mg',
            'stok' => 8,
            'satuan' => 'tablet',
        ]);
        $visit = app(PendaftaranService::class)->daftarPasien([
            'nik' => '3273010705261003',
            'nama_lengkap' => 'Lina Hakim',
            'tanggal_lahir' => '1987-09-01',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => [],
            'tanda_vital' => [],
        ])['kunjungan'];
        $clinical = app(AnamnesaService::class)->simpanAnamnesa([
            'kunjungan_id' => $visit->id,
            'kode_icd10' => 'J00',
            'keluhan_utama' => 'Demam.',
            'pemeriksaan_fisik' => [],
            'resep' => [
                ['kode_obat' => 'OBT-PCM', 'jumlah' => 3, 'aturan_pakai' => '3x1'],
            ],
            'tagihan' => [
                ['nama_item' => 'Konsultasi', 'harga_satuan' => '120000.00', 'jumlah' => 1],
            ],
        ]);

        $this->postJson("/api/farmasi/resep/{$clinical['resep']->id}/validasi")
            ->assertOk()
            ->assertJsonPath('data.status', 'VALID');

        $this->postJson("/api/kasir/tagihan/{$clinical['tagihan']->id}/bayar")
            ->assertOk()
            ->assertJsonPath('data.status', 'LUNAS');

        $this->assertSame('SELESAI', $visit->fresh()->status);
    }
}
