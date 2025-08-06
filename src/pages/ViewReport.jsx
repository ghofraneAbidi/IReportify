import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const ViewReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state;

  // ✅ Chargement du logo depuis localStorage si clé présente
  const logoUrl = report.logoKey ? localStorage.getItem(report.logoKey) : report.logoUrl || null;

  // ✅ Redirection vers éditeur avec les données actuelles
  const handleEdit = () => {
    navigate('/template-editor', {
      state: {
        data: report.data,
        columns: report.columns,
        table: report.table,
        logoUrl: logoUrl,
        html: report.html,
        css: report.css,
      }
    });
  };

  return (
    <div>
      {/* ✅ Navbar centrée */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: '#fff',
        borderBottom: '4px solid orange',
        fontFamily: 'Arial'
      }}>
        <img src={logo} alt="logo" style={{ height: '40px' }} />
        <ul style={{
          display: 'flex',
          gap: '20px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          justifyContent: 'center',
          flex: 1
        }}>
          <li><strong>TAC–TIC</strong></li>
          <li><strong>SERVICES</strong></li>
          <li><strong>ACTUALITÉS</strong></li>
          <li><strong>REJOIGNEZ NOUS</strong></li>
          <li><strong>CONTACT</strong></li>
          <li>
            <a href="/reporter" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
              Tac-Tic Reporter
            </a>
          </li>
        </ul>
        <div style={{ width: 40 }}></div>
      </nav>

      {/* ✅ Contenu du rapport */}
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/rapports')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c63ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ⬅️ Retour aux rapports
          </button>

          <button
            onClick={handleEdit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#FFA500',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ✏️ Modifier
          </button>
        </div>

        <h1>{report.name}</h1>
        <p><strong>📊 Table :</strong> {report.table}</p>
        <p><strong>📅 Date :</strong> {report.date}</p>

        {logoUrl && (
          <div>
            <h3>📌 Logo :</h3>
            <img src={logoUrl} alt="Logo" style={{ maxWidth: '150px', marginBottom: '20px' }} />
          </div>
        )}

        <div style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px',
          backgroundColor: '#fafafa',
          borderRadius: '10px'
        }}>
          <style>{report.css}</style>
          <div dangerouslySetInnerHTML={{ __html: report.html }} />
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
