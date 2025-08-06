<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFExportController extends Controller
{
    public function exportDynamicPDF(Request $request)
    {
        $table = $request->input('table');
        $columns = $request->input('columns');

        if (!$table || !$columns || !is_array($columns)) {
            return response()->json(['error' => 'Paramètres manquants'], 400);
        }

        try {
            $data = DB::table($table)->select($columns)->get();

            $pdf = Pdf::loadView('pdf.dynamic', [
                'table' => $table,
                'columns' => $columns,
                'data' => $data
            ]);

            return $pdf->stream("rapport_{$table}.pdf");
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }
}
