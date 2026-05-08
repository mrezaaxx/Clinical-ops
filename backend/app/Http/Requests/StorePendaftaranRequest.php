<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePendaftaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => ['required', 'string', 'size:16', 'unique:pasien,nik'],
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'tanggal_lahir' => ['required', 'date'],
            'kode_poli' => ['required', 'string', 'max:10'],
            'riwayat_alergi' => ['nullable', 'array'],
            'riwayat_alergi.*' => ['string', 'max:100'],
            'tanda_vital' => ['nullable', 'array'],
        ];
    }
}
