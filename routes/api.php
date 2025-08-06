<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;

Route::get('/table/{name}', [ReportController::class, 'getTableData']);

Route::get('/tables', [ReportController::class, 'getTables']);
Route::get('/columns/{table}', [ReportController::class, 'getColumns']);
Route::post('/generate-report', [ReportController::class, 'generateReport']);
Route::get('/table/{name}', [ReportController::class, 'getTableData']);
