import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import IoTProjects from './sections/IoTProjects';
import ExperienceCertifications from './sections/ExperienceCertifications';
import Contact from './sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <main className="app-container" style={{ position: 'relative', zIndex: 1, opacity: 1, transition: 'opacity 1s ease-in', background: 'var(--bg-dark)' }}>
          <Navbar />
          
          <div id="hero" style={{ position: 'relative' }}>
            <Hero />
          </div>
          
          <About />
          <Skills />
          <Projects />
          <IoTProjects />
          <ExperienceCertifications />
          <Contact />
          
          <Footer />
        </main>
      )}
    </>
  );
}

export default App;
