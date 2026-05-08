<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FarmasiService;
use Illuminate\Http\JsonResponse;

class FarmasiController extends Controller
{
    public function validasi(string $resepId, FarmasiService $service): JsonResponse
    {
        return response()->json([
            'status' => 'sukses',
            'data' => $service->validasiResep($resepId),
        ]);
    }
}
