import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import html2pdf from 'html2pdf.js';
import logoNav from '../assets/logo.png';

const TemplateEditor = () => {
  const editorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, columns, table, html: existingHtml, css: existingCss, logoUrl: existingLogo } = location.state || {};
  const currentDate = new Date().toLocaleDateString();
  const [logoUrl, setLogoUrl] = useState(existingLogo || null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setLogoUrl(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveReport = () => {
    const name = prompt('📝 Entrez un nom pour le rapport :');
    if (!name) return;

    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();

    const newReport = {
      name,
      html,
      css,
      table,
      date: new Date().toLocaleDateString(),
      logoUrl,
    };

    let existing = JSON.parse(localStorage.getItem('saved-reports') || '[]');
    while (new Blob([JSON.stringify(existing)]).size > 4000000) {
      existing.shift();
    }

    existing.push(newReport);

    try {
      localStorage.setItem('saved-reports', JSON.stringify(existing));
      alert('✅ Rapport enregistré avec succès.');
    } catch (e) {
      alert('❌ Rapport trop volumineux.');
      console.error(e);
    }
  };

  const handleExportPDF = () => {
    const iframe = document.querySelector('#gjs iframe');
    if (!iframe || !iframe.contentDocument) return;

    const content = iframe.contentDocument.body;
    const logo = iframe.contentDocument.querySelector('#custom-logo');

    if (logo && !logo.complete) {
      logo.onload = () => {
        html2pdf().from(content).save(`rapport_${table}.pdf`);
      };
    } else {
      html2pdf().from(content).save(`rapport_${table}.pdf`);
    }
  };

  useEffect(() => {
    if (editorRef.current) return;
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      fromElement: false,
      storageManager: false,
    });
    editorRef.current = editor;

    if (existingHtml && existingCss) {
      editor.setComponents(existingHtml);
      editor.setStyle(existingCss);
    } else if (data && columns) {
      const tableHTML = `
        <table style="width:100%; border-collapse:collapse;" border="1">
          <thead><tr>${columns.map(col => `<th style="padding:8px">${col}</th>`).join('')}</tr></thead>
          <tbody>${data.map(row => `<tr>${columns.map(col => `<td style="padding:8px">${row[col]}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
        <p style="text-align:right; font-style:italic;">Table : ${table}</p>
      `;

      editor.setComponents(`
        <div style="padding:30px; font-family:Arial; border: 3px solid #ccc; min-height: 1000px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <img src="${logoUrl || ''}" id="custom-logo" alt="Logo" style="max-width:120px; max-height:60px;" />
            <p style="text-align:right;">Date : ${currentDate}</p>
          </div>
          <h1 style="text-align:center; margin-top:20px;">Rapport - ${table}</h1>
          <p style="margin:20px 0; font-size:16px;">Zone de texte personnalisable : écrivez ici une introduction, un résumé ou des remarques importantes...</p>
          ${tableHTML}
        </div>
      `);
    }
  }, [columns, data, table, currentDate, existingHtml, existingCss, logoUrl]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !logoUrl) return;

    const iframe = document.querySelector('#gjs iframe');
    if (!iframe || !iframe.contentDocument) return;

    const doc = iframe.contentDocument;
    const logoEl = doc.querySelector('#custom-logo');
    if (logoEl) {
      logoEl.src = logoUrl;
    }
  }, [logoUrl]);

  return (
    <div>
      <nav style={{ background: '#fff', borderBottom: '4px solid orange', fontFamily: 'Arial' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', padding: '10px' }}>
          <img src={logoNav} alt="logo" style={{ height: '40px' }} />
          <a href="/" style={{ textDecoration: 'none', color: 'black' }}><strong>TAC–TIC</strong></a>
          <a href="#" style={{ textDecoration: 'none', color: 'black' }}><strong>SERVICES</strong></a>
          <a href="#" style={{ textDecoration: 'none', color: 'black' }}><strong>ACTUALITÉS</strong></a>
          <a href="#" style={{ textDecoration: 'none', color: 'black' }}><strong>REJOIGNEZ NOUS</strong></a>
          <a href="#" style={{ textDecoration: 'none', color: 'black' }}><strong>CONTACT</strong></a>

          <div className="dropdown-container" style={{ position: 'relative' }}>
            <a href="/reporter" style={{ textDecoration: 'none', color: 'black' }}>
              <strong>Tac-Tic Reporter ▾</strong>
            </a>
            <ul className="dropdown-menu" style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              listStyle: 'none',
              padding: '10px',
              margin: 0,
              zIndex: 999,
              width: '200px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <li onClick={handleSaveReport} style={{ padding: '8px 0', cursor: 'pointer' }}>💾 Enregistrer le rapport</li>
              <li onClick={() => navigate('/rapports')} style={{ padding: '8px 0', cursor: 'pointer' }}>📚 Visualiser les rapports</li>
              <li onClick={handleExportPDF} style={{ padding: '8px 0', cursor: 'pointer' }}>📄 Exporter le rapport</li>
            </ul>
          </div>
        </div>
        <style>{`
          .dropdown-container:hover .dropdown-menu {
            display: block !important;
          }
        `}</style>
      </nav>

      <div style={{ padding: '10px', backgroundColor: '#f9f9f9', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label><strong>📤 Ajouter un logo :</strong></label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {logoUrl && <img src={logoUrl} alt="Logo" style={{ maxHeight: '60px' }} />}
      </div>

      <div id="gjs" style={{ height: '100vh', border: '1px solid #ccc' }}></div>
    </div>
  );
};

export default TemplateEditor;
