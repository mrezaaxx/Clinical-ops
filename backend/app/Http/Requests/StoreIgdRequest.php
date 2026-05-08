<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIgdRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => ['required', 'string', 'size:16'],
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'tanggal_lahir' => ['required', 'date'],
            'riwayat_alergi' => ['nullable', 'array'],
            'riwayat_alergi.*' => ['string', 'max:100'],
            'tanda_vital' => ['nullable', 'array'],
            'triage_level' => ['required', 'string', 'in:P1,P2,P3,P4,P5'],
            'triage_detail' => ['nullable', 'array'],
        ];
    }
}
