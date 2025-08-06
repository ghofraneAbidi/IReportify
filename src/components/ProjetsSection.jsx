import React from 'react';
import ooredooProject from '../assets/ooredoo-project.png'; // Assure-toi du bon chemin

const ProjetsSection = () => {
  return (
    <section style={{ backgroundColor: '#312f67', color: 'white', padding: '0 0 60px 0' }}>
      
      {/* Titre centré avec ligne décorative et icône */}
      <div style={{ textAlign: 'center', padding: '60px 20px 40px 20px', backgroundColor: 'white' }}>
        <h2 style={{ color: '#1b1b1b', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>
          Projets En Développement Web Et Mobile
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <hr style={{ width: '80px', borderTop: '2px solid #312f67' }} />
          <span style={{
            display: 'inline-block',
            width: '32px',
            height: '32px',
            border: '2px solid #312f67',
            borderRadius: '50%',
            margin: '0 10px',
            textAlign: 'center',
            lineHeight: '28px',
            fontWeight: 'bold',
            color: '#312f67'
          }}>
            W
          </span>
          <hr style={{ width: '80px', borderTop: '2px solid #312f67' }} />
        </div>
      </div>

      {/* Section projet */}
      <div
        style={{
          padding: '60px 20px 0 20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* Texte à gauche */}
          <div style={{ flex: '1 1 500px', paddingRight: '40px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px' }}>
              Projet de l’Ecole Nationale d’Ingénieurs de Tunis <br />
              au profit de l’Entreprise Tunisienne d’Activités Pétrolières
            </h2>
            <p style={{ fontSize: '17px', lineHeight: '1.6' }}>
              Conception, développement, hébergement et audit sécurité d’une plateforme web pour :<br />
              L’inscription de candidat à un concours de recrutement national.
            </p>
          </div>

          {/* Image à droite */}
          <div style={{ flex: '1 1 500px', textAlign: 'center' }}>
            <img
              src={ooredooProject}
              alt="Projet Ooredoo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjetsSection;
