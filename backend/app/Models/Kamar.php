<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kamar extends Model
{
    use HasUuids;

    protected $table = 'kamar';

    protected $fillable = ['kode_kamar', 'nama_kamar', 'kelas', 'harga_per_hari', 'is_tersedia'];

    protected function casts(): array
    {
        return [
            'is_tersedia' => 'boolean',
            'harga_per_hari' => 'decimal:2',
        ];
    }
}
