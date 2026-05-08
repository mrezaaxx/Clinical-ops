<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Obat extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'obat';

    protected $fillable = ['kode_obat', 'nama_obat', 'stok', 'satuan'];
}
