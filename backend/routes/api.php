<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FertilizerController;

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Fertilizer routes
Route::get('/fertilizers', [FertilizerController::class, 'index']);
Route::get('/fertilizers/{fertilizer}', [FertilizerController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/fertilizers', [FertilizerController::class, 'store']);
    Route::put('/fertilizers/{fertilizer}', [FertilizerController::class, 'update']);
    Route::delete('/fertilizers/{fertilizer}', [FertilizerController::class, 'destroy']);
});
