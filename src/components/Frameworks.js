import React from 'react';
import frameworksImg from '../assets/frameworks.png'; // ton image avec tous les logos
import './Frameworks.css'; // le fichier CSS personnalisé

function Frameworks() {
  return (
    <section className="frameworks-section">
      <div className="frameworks-container">
        <h5 className="frameworks-subtitle">Quels Frameworks utiliser ?</h5>
        <hr className="frameworks-divider" />
        <h2 className="frameworks-title">
          DÉVELOPPEMENT DE VOTRE APPLICATION AVEC<br />
          UNE MULTITUDE DE FRAMEWORKS OPEN SOURCE
        </h2>
        <p className="frameworks-description">
          Un framework définit des conventions et des méthodologies standardisées pour un certain nombre de tâches,
          d'où le terme « convention over configuration ». Le respect de ces pratiques dans un framework permet de
          faciliter l'entrée d'un nouveau développeur dans un projet existant dès le moment où celui-ci connaît le
          framework utilisé. Pour terminer, l’un de ses points les plus positifs est qu’il assure une maintenance
          évolutive des applications.
        </p>
        <img
          src={frameworksImg}
          alt="Frameworks open source"
          className="frameworks-image"
        />
      </div>
    </section>
  );
}

export default Frameworks;
