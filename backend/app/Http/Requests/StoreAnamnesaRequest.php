<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnamnesaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kunjungan_id' => ['required', 'uuid', 'exists:kunjungan,id'],
            'kode_icd10' => ['required', 'string', 'max:10'],
            'keluhan_utama' => ['required', 'string'],
            'pemeriksaan_fisik' => ['nullable', 'array'],
            'resep' => ['nullable', 'array'],
            'resep.*.kode_obat' => ['required', 'string', 'max:20'],
            'resep.*.jumlah' => ['required', 'integer', 'min:1'],
            'resep.*.aturan_pakai' => ['required', 'string', 'max:100'],
            'tagihan' => ['nullable', 'array'],
            'tagihan.*.nama_item' => ['required', 'string', 'max:100'],
            'tagihan.*.harga_satuan' => ['required', 'numeric', 'min:0'],
            'tagihan.*.jumlah' => ['required', 'integer', 'min:1'],
        ];
    }
}
