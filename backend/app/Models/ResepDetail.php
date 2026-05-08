<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResepDetail extends Model
{
    use HasUuids;

    protected $table = 'resep_detail';

    protected $fillable = ['resep_id', 'kode_obat', 'jumlah', 'aturan_pakai'];

    public function resep(): BelongsTo
    {
        return $this->belongsTo(Resep::class);
    }
}
