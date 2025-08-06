<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PDFExportController;
use App\Http\Controllers\ReportController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/web-check', function () {
    return response()->json(['success' => true, 'from' => 'web.php']);
});

Route::get('/export-form', function () {
    return view('export_form'); // ← le formulaire
});

Route::post('/export/pdf', [PDFExportController::class, 'exportDynamicPDF']);

// ✅ Ajout des routes pour le reporter
Route::get('/tables', [ReportController::class, 'getTables']);
Route::get('/columns/{table}', [ReportController::class, 'getColumns']);
Route::get('/table-data/{name}', [ReportController::class, 'getTableData']);
Route::post('/generate-report', [ReportController::class, 'generateReport']);
