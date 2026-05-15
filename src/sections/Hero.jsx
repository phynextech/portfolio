import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const letters = "PHYNEX".split("");

  return (
    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
        
        {/* Massive 3D Text Container */}
        <div style={{ display: 'flex', gap: 'clamp(2px, 1vw, 15px)', perspective: '1000px' }}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.2, type: 'spring', bounce: 0.4 }}
              whileHover={{ 
                y: -20, 
                rotateX: 10, 
                rotateY: (index - 2.5) * 5, 
                scale: 1.1,
                textShadow: `
                  0 1px 0 #e0e0e0, 
                  0 2px 0 #d0d0d0, 
                  0 3px 0 #c0c0c0, 
                  0 4px 0 #b0b0b0, 
                  0 5px 0 #a0a0a0, 
                  0 6px 0 #909090,
                  0 7px 0 #808080,
                  0 8px 10px rgba(0, 243, 255, 0.4), 
                  0 15px 20px rgba(0, 0, 0, 0.5)
                `,
                color: '#ffffff'
              }}
              style={{
                fontSize: 'clamp(4rem, 15vw, 15rem)',
                fontWeight: 900,
                color: '#ffffff',
                display: 'inline-block',
                lineHeight: 1,
                transformStyle: 'preserve-3d',
                fontFamily: 'var(--font-heading)',
                textShadow: `
                  0 1px 0 #e0e0e0, 
                  0 2px 0 #d0d0d0, 
                  0 3px 0 #c0c0c0, 
                  0 4px 0 #b0b0b0, 
                  0 5px 0 #a0a0a0, 
                  0 6px 5px rgba(0,0,0,.3), 
                  0 10px 15px rgba(0,0,0,.2)
                `
              }}
              className="hover-target"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 400, color: 'var(--text-main)', letterSpacing: '3px', textTransform: 'uppercase' }}
        >
          Building AI, Apps & Intelligent Experiences
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)', color: 'var(--neon-cyan)', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          Developer • Innovator • AI Builder • IoT Creator
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '2rem',
            padding: '1rem 3rem',
            background: 'transparent',
            color: 'var(--text-main)',
            border: '1px solid var(--neon-cyan)',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="glow-box hover-target"
        >
          Explore My Work
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
