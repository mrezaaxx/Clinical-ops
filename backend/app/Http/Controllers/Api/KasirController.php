<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\KasirService;
use Illuminate\Http\JsonResponse;

class KasirController extends Controller
{
    public function bayar(string $tagihanId, KasirService $service): JsonResponse
    {
        return response()->json([
            'status' => 'sukses',
            'data' => $service->bayarTagihan($tagihanId),
        ]);
    }
}
