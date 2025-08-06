import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Intro from './components/Intro';
import Services from './components/Services';
import StatsSection from './components/StatsSection';
import Frameworks from './components/Frameworks';
import ProjetsSection from './components/ProjetsSection';
import Clients from './components/Clients';
import Footer from './components/Footer';
import RapportsPage from './pages/RapportsPage'; // ou ton chemin exact
import ViewReport from './pages/ViewReport'; // ou chemin exact

import ReporterPage from './pages/ReporterPage';
import TemplateEditor from './pages/TemplateEditor'; // ✅ Import de l’éditeur visuel

// 🏠 Composant page d’accueil
function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Intro />
      <Services />
      <Frameworks />
      <StatsSection />
      <ProjetsSection />
      <Clients />
      <Footer />
    </>
  );
}

// 🚀 Routes principales de l’app
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reporter" element={<ReporterPage />} />
        <Route path="/template-editor" element={<TemplateEditor />} /> {/* ✅ Ajoutée */}
     <Route path="/view-report" element={<ViewReport />} />

     <Route path="/rapports" element={<RapportsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
