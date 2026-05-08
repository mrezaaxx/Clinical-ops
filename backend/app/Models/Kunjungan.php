<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\HasOne;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kunjungan extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'kunjungan';

    protected $fillable = ['pasien_id', 'kode_poli', 'nomor_antrian', 'status', 'tanda_vital'];

    protected function casts(): array
    {
        return [
            'tanda_vital' => 'array',
        ];
    }

    public function pasien(): BelongsTo
    {
        return $this->belongsTo(Pasien::class);
    }

    public function anamnesa(): HasMany
    {
        return $this->hasMany(Anamnesa::class);
    }

    public function resep(): HasMany
    {
        return $this->hasMany(Resep::class);
    }

    public function tagihan(): HasOne
    {
        return $this->hasOne(Tagihan::class);
    }
}
