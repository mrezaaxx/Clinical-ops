<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resep extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'resep';

    protected $fillable = ['kunjungan_id', 'status', 'keterangan'];

    public function kunjungan(): BelongsTo
    {
        return $this->belongsTo(Kunjungan::class);
    }

    public function detail(): HasMany
    {
        return $this->hasMany(ResepDetail::class);
    }
}
