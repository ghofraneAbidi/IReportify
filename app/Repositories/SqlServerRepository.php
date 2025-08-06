<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class SqlServerRepository
{
    // ✅ Liste exacte des tables autorisées (présentes dans ta base STDEMO)
    private $allowedTables = [
        'LIGNES',
        'ARC_LIGNES',
        'ECHEANCES',
        'MODE_REG',
        'REGLEMENTS',
        'RELANCES',
        'DEPOT',
        'JOURNAUX',
        'ARTICLES',
        'TIERS',
        'ADRESSES',
        'REPRESENTANTS',
        'DOCUMENTS',
        'USERS',
        'DEVIS',
        'CATEGORIES',
        'BANQUES',
        'CONTACTS',
        'SERVICES',
        'SOCIETE'
    ];

    // ✅ Récupère la liste des tables autorisées
    public function getAllowedTables()
    {
        return $this->allowedTables;
    }

    // ✅ Récupère les colonnes d’une table donnée
    public function getColumns($table)
    {
        if (!in_array($table, $this->allowedTables)) {
            throw new \InvalidArgumentException("Table non autorisée");
        }

        return DB::select("
            SELECT COLUMN_NAME, DATA_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = ?
        ", [$table]);
    }

    // ✅ Exécute une requête dynamique avec colonnes sélectionnées et filtres
    public function executeDynamicQuery($table, $columns, $filters = [])
    {
        if (!in_array($table, $this->allowedTables)) {
            throw new \InvalidArgumentException("Table non autorisée");
        }

        $columnsSql = implode(', ', array_map(fn($col) => "[$col]", $columns));

        $whereClauses = [];
        $bindings = [];

        foreach ($filters as $filter) {
            if (isset($filter['column'], $filter['operator'], $filter['value'])) {
                $whereClauses[] = "[{$filter['column']}] {$filter['operator']} ?";
                $bindings[] = $filter['value'];
            }
        }

        $sql = "SELECT {$columnsSql} FROM [{$table}]";
        if (!empty($whereClauses)) {
            $sql .= " WHERE " . implode(' AND ', $whereClauses);
        }

        return DB::select($sql, $bindings);
    }
}
