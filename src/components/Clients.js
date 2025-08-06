import React from 'react';
import clientsImage from '../assets/clients.png'; // Vérifie bien le chemin

const Client = () => {
  return (
    <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
      
      {/* Titre décoratif */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#1b1b1b', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>
          Nos Clients
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

      {/* Image des logos clients */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={clientsImage}
          alt="Nos Clients"
          style={{ maxWidth: '80%', height: 'auto' }}
        />
      </div>
    </section>
  );
};

export default Client;
