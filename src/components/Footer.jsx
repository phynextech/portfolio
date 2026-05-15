import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '2rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      marginTop: '4rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '100px',
        background: 'var(--neon-cyan)',
        filter: 'blur(80px)',
        opacity: 0.1,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <p style={{
        position: 'relative',
        zIndex: 1,
        fontSize: '1rem',
        color: 'var(--text-muted)',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        Powered by <span className="text-gradient" style={{ fontWeight: 800, marginLeft: '0.5rem' }}>Phynex</span>
      </p>
    </footer>
  );
};

export default Footer;
