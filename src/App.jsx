import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

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
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && !vantaEffect && window.VANTA && window.VANTA.NET) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00f5ff,
          backgroundColor: 0x030303, // matching global bg
          points: 12.00,
          maxDistance: 22.00,
          spacing: 18.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [loading, vantaEffect]);

  useEffect(() => {
    if (vantaEffect) {
      const handleResize = () => vantaEffect.resize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [vantaEffect]);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          {/* Global Vanta Background */}
          <div ref={vantaRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
          
          <main className="app-container" style={{ position: 'relative', zIndex: 1, opacity: 1, transition: 'opacity 1s ease-in' }}>
            <Navbar />
            
            <div id="hero">
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
        </>
      )}
    </>
  );
}

export default App;
