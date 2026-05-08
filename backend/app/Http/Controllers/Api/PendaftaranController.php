<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePendaftaranRequest;
use App\Services\PendaftaranService;
use Illuminate\Http\JsonResponse;

class PendaftaranController extends Controller
{
    public function store(StorePendaftaranRequest $request, PendaftaranService $service): JsonResponse
    {
        $result = $service->daftarPasien($request->validated());

        return response()->json([
            'status' => 'sukses',
            'data' => $result,
        ], 201);
    }
}
