import React from 'react';
import ooredooImg from '../assets/ooredoo-project.png';

function Projects() {
  return (
    <section className="py-5 bg-white text-center" id="projects">
      <div className="container">
        <h2 className="fw-bold mb-4">Quelques projets réalisés</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <img
                src={ooredooImg}
                alt="Projet Ooredoo"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Plateforme de gestion interne</h5>
                <p className="card-text">
                  Développement d’une solution sur mesure pour la gestion des demandes, documents
                  RH, projets et suivi d’activités.
                </p>
                <p className="text-muted">Client : Ooredoo Tunisie</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Projects;
