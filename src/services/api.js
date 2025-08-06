import axios from 'axios';

// Le backend Laravel tourne sur http://localhost:8000
const BASE_URL = 'http://localhost:8000';

// Récupérer toutes les tables autorisées
export const getTables = () => {
  return axios.get(`${BASE_URL}/tables`);
};

// 🔧 Correction ici : route correcte pour afficher les données d’une table
export const getTableData = (table) => {
return axios.get(`${BASE_URL}/table-data/${table}`);
};

// Récupérer les colonnes d’une table
export const getTableColumns = (tableName) => {
  return axios.get(`${BASE_URL}/columns/${tableName}`);
};

// Générer un rapport personnalisé
export const generateReport = (table, columns, filters = []) => {
  return axios.post(`${BASE_URL}/generate-report`, {
    table,
    columns,
    filters,
  });
};
