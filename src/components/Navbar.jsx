import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'IoT', href: '#iot' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '20px', width: '100%', zIndex: 100, pointerEvents: 'none' }}>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          pointerEvents: 'auto',
          padding: '1rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          background: scrolled || mobileMenuOpen ? 'rgba(10, 10, 15, 0.75)' : 'rgba(10, 10, 15, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 243, 255, 0.15)',
          borderRadius: mobileMenuOpen ? '20px' : '50px',
          boxShadow: scrolled || mobileMenuOpen ? '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 243, 255, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          width: '90%',
          maxWidth: '800px',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '2px' }} className="text-gradient">
            PHYNEX
          </div>
          
          <ul className="desktop-nav-links" style={{ display: 'flex', gap: '1.5rem', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--text-main)',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--neon-cyan)';
                    e.target.style.textShadow = '0 0 10px var(--neon-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text-main)';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div 
            className="mobile-menu-toggle" 
            style={{ display: 'none', cursor: 'pointer', color: 'var(--neon-cyan)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.ul 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0 0 0', padding: '1rem 0 0 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              {navLinks.map((link) => (
                <li key={link.name} style={{ textAlign: 'center' }}>
                  <a 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--text-main)',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
