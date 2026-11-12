<?php

use App\Http\Controllers\BajoController;
use Illuminate\Support\Facades\Route;

// Crea las 5 rutas del CRUD: index, store, show, update, destroy
Route::apiResource('bajos', BajoController::class);
