<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kamar', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode_kamar', 20)->unique();
            $table->string('nama_kamar', 100);
            $table->string('kelas', 20);
            $table->decimal('harga_per_hari', 15, 2);
            $table->boolean('is_tersedia')->default(true);
            $table->timestamps();
        });

        Schema::create('rawat_inap', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('kunjungan_id')->constrained('kunjungan');
            $table->foreignUuid('kamar_id')->constrained('kamar');
            $table->timestamp('tgl_masuk');
            $table->timestamp('tgl_keluar')->nullable();
            $table->string('status', 20)->default('DIRAWAT');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rawat_inap');
        Schema::dropIfExists('kamar');
    }
};
