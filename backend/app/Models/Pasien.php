<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pasien extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pasien';

    protected $fillable = ['no_rm', 'nik', 'nama_lengkap', 'tanggal_lahir', 'riwayat_alergi'];

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date',
            'riwayat_alergi' => 'array',
        ];
    }

    public function kunjungan(): HasMany
    {
        return $this->hasMany(Kunjungan::class);
    }
}
