<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pasien', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('no_rm', 15)->unique();
            $table->string('nik', 16)->unique();
            $table->string('nama_lengkap', 150);
            $table->date('tanggal_lahir');
            $table->jsonb('riwayat_alergi')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('nama_lengkap');
        });

        Schema::create('kunjungan', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('pasien_id')->constrained('pasien');
            $table->string('kode_poli', 10)->index();
            $table->integer('nomor_antrian');
            $table->string('status', 20)->index();
            $table->jsonb('tanda_vital')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('anamnesa', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('kunjungan_id')->constrained('kunjungan');
            $table->string('kode_icd10', 10)->index();
            $table->text('keluhan_utama');
            $table->jsonb('pemeriksaan_fisik')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('resep', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('kunjungan_id')->constrained('kunjungan');
            $table->string('status', 20)->index();
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('resep_detail', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('resep_id')->constrained('resep')->cascadeOnDelete();
            $table->string('kode_obat', 20)->index();
            $table->integer('jumlah');
            $table->string('aturan_pakai', 100);
            $table->timestamps();
        });

        Schema::create('obat', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('kode_obat', 20)->unique();
            $table->string('nama_obat', 120);
            $table->integer('stok');
            $table->string('satuan', 30);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('tagihan', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('kunjungan_id')->constrained('kunjungan');
            $table->decimal('total_biaya', 15, 2);
            $table->string('status', 20)->index();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('tagihan_detail', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('tagihan_id')->constrained('tagihan')->cascadeOnDelete();
            $table->string('nama_item', 100);
            $table->decimal('harga_satuan', 15, 2);
            $table->integer('jumlah');
            $table->decimal('subtotal', 15, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tagihan_detail');
        Schema::dropIfExists('tagihan');
        Schema::dropIfExists('obat');
        Schema::dropIfExists('resep_detail');
        Schema::dropIfExists('resep');
        Schema::dropIfExists('anamnesa');
        Schema::dropIfExists('kunjungan');
        Schema::dropIfExists('pasien');
    }
};
