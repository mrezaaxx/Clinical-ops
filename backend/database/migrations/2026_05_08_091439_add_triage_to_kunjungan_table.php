<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kunjungan', function (Blueprint $table) {
            $table->string('triage_level', 20)->nullable()->index()->after('nomor_antrian');
            $table->jsonb('triage_detail')->nullable()->after('triage_level');
            $table->timestamp('waktu_triage')->nullable()->after('triage_detail');
        });
    }

    public function down(): void
    {
        Schema::table('kunjungan', function (Blueprint $table) {
            $table->dropColumn(['triage_level', 'triage_detail', 'waktu_triage']);
        });
    }
};
