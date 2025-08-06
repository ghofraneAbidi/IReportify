<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\SqlServerRepository;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    private $repository;

    public function __construct(SqlServerRepository $repository)
    {
        $this->repository = $repository;
    }

    // ✅ 1. Lister les tables autorisées
    public function getTables()
    {
        return response()->json($this->repository->getAllowedTables());
    }

    // ✅ 2. Lister les colonnes d'une table
    public function getColumns($table)
    {
        $allowedTables = $this->repository->getAllowedTables();

        if (!in_array($table, $allowedTables)) {
            return response()->json(['error' => 'Table non autorisée'], 403);
        }

        return response()->json($this->repository->getColumns($table));
    }
public function getTableData($name)
{
    try {
        $data = \DB::table($name)->limit(100)->get();
        return response()->json($data);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    // ✅ 3. Générer dynamiquement un rapport à partir d'une table
    public function generateReport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'table' => 'required|string',
            'columns' => 'required|array|min:1',
            'filters' => 'array'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $table = $request->input('table');
        $columns = $request->input('columns');
        $filters = $request->input('filters', []);

        $allowedTables = $this->repository->getAllowedTables();

        if (!in_array($table, $allowedTables)) {
            return response()->json(['error' => 'Table non autorisée'], 403);
        }

        try {
            $data = $this->repository->executeDynamicQuery($table, $columns, $filters);
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur SQL : ' . $e->getMessage()], 500);
        }
    }
}
