<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anamnesa;
use App\Models\Kunjungan;
use App\Models\Obat;
use App\Models\Pasien;
use App\Models\Resep;
use App\Models\Tagihan;
use Illuminate\Http\JsonResponse;

class WorkflowController extends Controller
{
    public function patients(): JsonResponse
    {
        return response()->json(Pasien::all());
    }

    public function visits(): JsonResponse
    {
        return response()->json(Kunjungan::with('pasien')->get());
    }

    public function medicines(): JsonResponse
    {
        return response()->json(Obat::all());
    }

    public function anamnesas(): JsonResponse
    {
        return response()->json(Anamnesa::all());
    }

    public function prescriptions(): JsonResponse
    {
        return response()->json(Resep::with('detail')->get());
    }

    public function bills(): JsonResponse
    {
        return response()->json(Tagihan::with('detail')->get());
    }

    public function call(string $visitId, \App\Services\RealtimeService $realtime): JsonResponse
    {
        $visit = Kunjungan::query()->findOrFail($visitId);
        $visit->update(['status' => 'DIPANGGIL']);

        $realtime->broadcast('queue-update', [
            'type' => 'CALL_NEXT',
            'visit' => $visit->load('pasien'),
        ]);

        return response()->json([
            'status' => 'sukses',
            'data' => $visit,
        ]);
    }
}
