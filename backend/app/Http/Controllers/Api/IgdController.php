<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIgdRequest;
use App\Services\IgdService;
use Illuminate\Http\JsonResponse;

class IgdController extends Controller
{
    public function store(StoreIgdRequest $request, IgdService $service): JsonResponse
    {
        $result = $service->daftarIgd($request->validated());

        return response()->json([
            'status' => 'sukses',
            'data' => $result,
        ], 201);
    }
}
