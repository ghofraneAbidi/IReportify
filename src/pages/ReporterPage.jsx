import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTables, getTableData, getTableColumns } from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png';
import Navbar from '../components/Navbar';

const ReporterPage = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showExportButton, setShowExportButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const navigate = useNavigate();

  useEffect(() => {
    getTables()
      .then((res) => setTables(res.data))
      .catch((err) => console.error('Erreur récupération tables :', err));
  }, []);

  const handleTableChange = async (e) => {
    const table = e.target.value;
    setSelectedTable(table);
    setSelectedColumns([]);
    setData([]);
    setSelectedRows([]);
    setFilteredData([]);
    setSearchTerm('');
    setShowExportButton(false);

    try {
      const res = await getTableColumns(table);
      const cols = res.data.map((col) => col.COLUMN_NAME || col);
      setColumns(cols);
    } catch (error) {
      console.error('Erreur récupération colonnes :', error);
    }
  };

  const handleColumnToggle = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  const handleSelectAllColumns = () => {
    setSelectedColumns(columns.length === selectedColumns.length ? [] : columns);
  };

  const handleAfficher = async () => {
    try {
      const res = await getTableData(selectedTable);
      setData(res.data);
      setSelectedRows([]);
      setFilteredData([]);
      setSearchTerm('');
      setShowExportButton(false);
    } catch (error) {
      console.error('Erreur chargement données :', error);
    }
  };

  const handleRowToggle = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAllRows = () => {
    setSelectedRows(selectedRows.length === data.length ? [] : data.map((_, i) => i));
  };

  const handleGenerateRowReport = () => {
    const filtered = data.filter((_, index) => selectedRows.includes(index));
    setFilteredData(filtered);
    setShowExportButton(true);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const headers = selectedColumns;
    const rows = filteredData.map((row) => selectedColumns.map((col) => row[col]));
    const currentDate = new Date().toLocaleString();

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, 'PNG', 150, 10, 40, 15);
      doc.setFontSize(16);
      doc.text(`Rapport: ${selectedTable}`, 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date : ${currentDate}`, 14, 26);

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 30,
        theme: 'grid',
        styles: { fillColor: [255, 255, 255] },
        headStyles: {
          fillColor: [40, 90, 255],
          textColor: 255,
          halign: 'center'
        },
        bodyStyles: {
          textColor: 50
        },
      });

      doc.save(`${selectedTable}_rapport.pdf`);
    };
  };

  const handleGoToTemplateEditor = () => {
    navigate('/template-editor', {
      state: {
        data: filteredData,
        columns: selectedColumns,
        table: selectedTable
      }
    });
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredTableData = sortedData.filter((row) =>
    selectedColumns.some((col) =>
      String(row[col] || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <Navbar />
      <div style={{ borderTop: '5px solid orange', padding: '30px' }}>
        <img src={logo} alt="Logo" style={{ height: '60px', display: 'block', margin: '10px auto' }} />
        <h1 style={{ textAlign: 'center', fontSize: '28px' }}>TAC-TIC REPORTER</h1>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <label>📋 Choisir une table :</label>
        <select
          value={selectedTable}
          onChange={handleTableChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">-- Sélectionner --</option>
          {tables.map((table, i) => (
            <option key={i} value={table}>{table}</option>
          ))}
        </select>
      </div>

      {columns.length > 0 && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h3>✅ Colonnes à inclure :</h3>
          <button onClick={handleSelectAllColumns} style={{ marginBottom: '10px' }}>
            {selectedColumns.length === columns.length ? 'Tout désélectionner' : 'Tout sélectionner'}
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            {columns.map((col, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => handleColumnToggle(col)}
                /> {col}
              </label>
            ))}
          </div>
          <button onClick={handleAfficher} style={{ marginTop: '15px' }}>▶️ Afficher les données</button>
        </div>
      )}

      {data.length > 0 && selectedColumns.length > 0 && (
        <div>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <input
              type="text"
              placeholder="🔎 Filtrer par mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px', width: '50%' }}
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '10px', paddingRight: '20px' }}>
            <button onClick={handleSelectAllRows}>
              {selectedRows.length === data.length ? '❌ Tout désélectionner' : '✅ Tout sélectionner'}
            </button>
          </div>

          <div style={{ overflowX: 'auto', marginTop: '30px' }}>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f5f5f5' }}>
                <tr>
                  <th>Sélection</th>
                  {selectedColumns.map((col, index) => (
                    <th key={index} style={{ cursor: 'pointer' }} onClick={() => handleSort(col)}>
                      {col} {sortConfig.key === col ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTableData.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(i)}
                        onChange={() => handleRowToggle(i)}
                      />
                    </td>
                    {selectedColumns.map((col, j) => (
                      <td key={j}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedRows.length > 0 && !showExportButton && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={handleGenerateRowReport}>
                  📝 Générer le rapport avec les lignes sélectionnées
                </button>
              </div>
            )}

            {showExportButton && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={handleExportPDF}>📄 Exporter en PDF</button>
                <button onClick={handleGoToTemplateEditor} style={{ marginLeft: '10px' }}>
                  🎨 Personnaliser dans l’éditeur
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReporterPage;
