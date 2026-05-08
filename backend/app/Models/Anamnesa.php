<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Anamnesa extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'anamnesa';

    protected $fillable = ['kunjungan_id', 'kode_icd10', 'keluhan_utama', 'pemeriksaan_fisik'];

    protected function casts(): array
    {
        return [
            'pemeriksaan_fisik' => 'array',
        ];
    }

    public function kunjungan(): BelongsTo
    {
        return $this->belongsTo(Kunjungan::class);
    }
}
