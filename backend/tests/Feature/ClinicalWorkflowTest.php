<?php

namespace Tests\Feature;

use App\Models\Kunjungan;
use App\Models\Obat;
use App\Models\Tagihan;
use App\Services\AnamnesaService;
use App\Services\FarmasiService;
use App\Services\KasirService;
use App\Services\PendaftaranService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClinicalWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_pendaftaran_service_creates_patient_and_visit_with_uuid(): void
    {
        $result = app(PendaftaranService::class)->daftarPasien([
            'nik' => '3273010705260004',
            'nama_lengkap' => 'Dewi Kartika',
            'tanggal_lahir' => '1996-02-14',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => ['Lateks'],
            'tanda_vital' => [
                'tekanan_darah' => '118/78',
                'suhu' => '36.6',
                'nadi' => 79,
            ],
        ]);

        $this->assertMatchesRegularExpression('/^[0-9a-f-]{36}$/', $result['pasien']->id);
        $this->assertMatchesRegularExpression('/^RM-'.date('Y').'-[0-9]{4}$/', $result['pasien']->no_rm);
        $this->assertSame('MENUNGGU', $result['kunjungan']->status);
        $this->assertSame(1, $result['kunjungan']->nomor_antrian);
        $this->assertSame(['Lateks'], $result['pasien']->riwayat_alergi);
    }

    public function test_anamnesa_service_creates_record_prescription_bill_and_updates_visit(): void
    {
        $visit = app(PendaftaranService::class)->daftarPasien([
            'nik' => '3273010705260005',
            'nama_lengkap' => 'Raka Wijaya',
            'tanggal_lahir' => '1992-04-11',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => [],
            'tanda_vital' => ['nadi' => 80],
        ])['kunjungan'];

        $result = app(AnamnesaService::class)->simpanAnamnesa([
            'kunjungan_id' => $visit->id,
            'kode_icd10' => 'J00',
            'keluhan_utama' => 'Demam dan pilek.',
            'pemeriksaan_fisik' => ['faring' => 'hiperemis'],
            'resep' => [
                ['kode_obat' => 'OBT-PCM', 'jumlah' => 6, 'aturan_pakai' => '3x1 setelah makan'],
            ],
            'tagihan' => [
                ['nama_item' => 'Konsultasi Dokter Umum', 'harga_satuan' => '120000.00', 'jumlah' => 1],
            ],
        ]);

        $this->assertSame('RESEP', $visit->fresh()->status);
        $this->assertSame('J00', $result['anamnesa']->kode_icd10);
        $this->assertSame('MENUNGGU', $result['resep']->status);
        $this->assertSame('120000.00', $result['tagihan']->total_biaya);
    }

    public function test_farmasi_service_validates_prescription_and_decrements_stock(): void
    {
        Obat::query()->create([
            'kode_obat' => 'OBT-PCM',
            'nama_obat' => 'Paracetamol 500 mg',
            'stok' => 10,
            'satuan' => 'tablet',
        ]);
        $visit = app(PendaftaranService::class)->daftarPasien([
            'nik' => '3273010705260006',
            'nama_lengkap' => 'Nina Lestari',
            'tanggal_lahir' => '1988-07-20',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => [],
            'tanda_vital' => [],
        ])['kunjungan'];
        $prescription = app(AnamnesaService::class)->simpanAnamnesa([
            'kunjungan_id' => $visit->id,
            'kode_icd10' => 'J00',
            'keluhan_utama' => 'Flu.',
            'pemeriksaan_fisik' => [],
            'resep' => [
                ['kode_obat' => 'OBT-PCM', 'jumlah' => 4, 'aturan_pakai' => '3x1'],
            ],
            'tagihan' => [],
        ])['resep'];

        app(FarmasiService::class)->validasiResep($prescription->id);

        $this->assertSame('VALID', $prescription->fresh()->status);
        $this->assertSame(6, Obat::query()->where('kode_obat', 'OBT-PCM')->first()->stok);
        $this->assertSame('TAGIHAN', Kunjungan::query()->find($visit->id)->status);
    }

    public function test_kasir_service_marks_bill_paid_and_visit_finished(): void
    {
        $visit = app(PendaftaranService::class)->daftarPasien([
            'nik' => '3273010705260007',
            'nama_lengkap' => 'Bagus Santoso',
            'tanggal_lahir' => '1979-01-09',
            'kode_poli' => 'UMUM',
            'riwayat_alergi' => [],
            'tanda_vital' => [],
        ])['kunjungan'];
        $bill = Tagihan::query()->create([
            'kunjungan_id' => $visit->id,
            'total_biaya' => '185000.00',
            'status' => 'BELUM',
        ]);

        app(KasirService::class)->bayarTagihan($bill->id);

        $this->assertSame('LUNAS', $bill->fresh()->status);
        $this->assertSame('SELESAI', $visit->fresh()->status);
    }
}
