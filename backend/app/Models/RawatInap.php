<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RawatInap extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'rawat_inap';

    protected $fillable = ['kunjungan_id', 'kamar_id', 'tgl_masuk', 'tgl_keluar', 'status'];

    protected function casts(): array
    {
        return [
            'tgl_masuk' => 'datetime',
            'tgl_keluar' => 'datetime',
        ];
    }

    public function kunjungan(): BelongsTo
    {
        return $this->belongsTo(Kunjungan::class);
    }

    public function kamar(): BelongsTo
    {
        return $this->belongsTo(Kamar::class);
    }
}
