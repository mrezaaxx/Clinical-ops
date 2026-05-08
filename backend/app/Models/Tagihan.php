<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tagihan extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'tagihan';

    protected $fillable = ['kunjungan_id', 'total_biaya', 'status'];

    protected function casts(): array
    {
        return [
            'total_biaya' => 'decimal:2',
        ];
    }

    public function kunjungan(): BelongsTo
    {
        return $this->belongsTo(Kunjungan::class);
    }

    public function detail(): HasMany
    {
        return $this->hasMany(TagihanDetail::class);
    }
}
