<?php

use App\Http\Controllers\Api\AnamnesaController;
use App\Http\Controllers\Api\FarmasiController;
use App\Http\Controllers\Api\IgdController;
use App\Http\Controllers\Api\KasirController;
use App\Http\Controllers\Api\PendaftaranController;
use App\Http\Controllers\Api\WorkflowController;
use Illuminate\Support\Facades\Route;

Route::get('/pasien', [WorkflowController::class, 'patients']);
Route::get('/kunjungan', [WorkflowController::class, 'visits']);
Route::get('/obat', [WorkflowController::class, 'medicines']);
Route::get('/anamnesa', [WorkflowController::class, 'anamnesas']);
Route::get('/resep', [WorkflowController::class, 'prescriptions']);
Route::get('/tagihan', [WorkflowController::class, 'bills']);
Route::post('/kunjungan/{visitId}/panggil', [WorkflowController::class, 'call']);

Route::post('/pendaftaran/pasien', [PendaftaranController::class, 'store']);
Route::post('/igd/pasien', [IgdController::class, 'store']);
Route::post('/poliklinik/anamnesa', [AnamnesaController::class, 'store']);
Route::post('/farmasi/resep/{resepId}/validasi', [FarmasiController::class, 'validasi']);
Route::post('/kasir/tagihan/{tagihanId}/bayar', [KasirController::class, 'bayar']);
