<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnamnesaRequest;
use App\Services\AnamnesaService;
use Illuminate\Http\JsonResponse;

class AnamnesaController extends Controller
{
    public function store(StoreAnamnesaRequest $request, AnamnesaService $service): JsonResponse
    {
        $result = $service->simpanAnamnesa($request->validated());

        return response()->json([
            'status' => 'sukses',
            'data' => $result,
        ], 201);
    }
}
