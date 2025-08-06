import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const RapportsPage = () => {
  const [rapports, setRapports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved-reports')) || [];
    setRapports(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = [...rapports];
    updated.splice(index, 1);
    setRapports(updated);
    localStorage.setItem('saved-reports', JSON.stringify(updated));
  };

  const handleRename = (index) => {
    const newName = prompt('Entrez le nouveau nom du rapport :', rapports[index].name);
    if (!newName) return;
    const updated = [...rapports];
    updated[index].name = newName;
    setRapports(updated);
    localStorage.setItem('saved-reports', JSON.stringify(updated));
  };

  const handlePreview = (report) => {
    navigate('/view-report', { state: report });
  };

  const handleBack = () => {
    navigate('/template-editor');
  };

  const filteredRapports = rapports.filter((r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* ✅ NAVBAR */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        background: '#fff',
        borderBottom: '4px solid orange',
        fontFamily: 'Arial'
      }}>
        <img src={logo} alt="logo" style={{ height: '40px', marginRight: '20px' }} />
        <ul style={{
          display: 'flex',
          gap: '20px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontWeight: 'bold'
        }}>
          <li><a href="/" style={{ textDecoration: 'none', color: 'black' }}>TAC–TIC</a></li>
          <li>SERVICES</li>
          <li>ACTUALITÉS</li>
          <li>REJOIGNEZ NOUS</li>
          <li>CONTACT</li>
          <li><a href="/reporter" style={{ textDecoration: 'none', color: 'black' }}>Tac-Tic Reporter</a></li>
        </ul>
      </nav>

      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h2 style={{ fontSize: '24px' }}>📂 Liste des rapports enregistrés</h2>

        <input
          type="text"
          placeholder="🔍 Rechercher un rapport..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        <button
          onClick={handleBack}
          style={{
            backgroundColor: '#6c63ff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginLeft: '10px',
            cursor: 'pointer'
          }}
        >
          🔙 Retour à l'éditeur
        </button>

        {filteredRapports.length === 0 ? (
          <p>Aucun rapport trouvé.</p>
        ) : (
          filteredRapports.map((report, index) => (
            <div key={index} style={{
              background: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '10px',
              marginBottom: '15px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  padding: '15px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fff'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{report.name || 'Rapport sans nom'}</span>
                <span>▼</span>
              </div>

              {openIndex === index && (
                <div style={{ padding: '15px 20px', backgroundColor: '#fafafa' }}>
                  <p>📅 Table : <strong>{report.table}</strong></p>
                  {report.logoUrl && (
                    <img src={report.logoUrl} alt="Logo" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                  )}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => handlePreview(report)} style={btnStyle}>🧾 Ouvrir</button>
                    <button onClick={() => handleRename(index)} style={btnStyle}>✏️ Renommer</button>
                    <button onClick={() => handleDelete(index)} style={btnStyle}>🗑️ Supprimer</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '8px 14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  background: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default RapportsPage;
