import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero3DBackground from '../components/Hero3DBackground';

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Character-by-character animation logic (framer-motion)
  const title = "PHYNEX";
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <Hero3DBackground />

      {/* Content */}
      <motion.div 
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '1rem',
          scale,
          opacity
        }}
      >
        <motion.h1 
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            fontSize: '8vw', 
            fontWeight: 900, 
            margin: 0, 
            letterSpacing: '8px', 
            display: 'flex',
            fontFamily: '"Orbitron", sans-serif',
            background: 'linear-gradient(90deg, #ffffff 40%, var(--neon-cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
          }}
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={charVariants} style={{ display: 'inline-block' }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            fontFamily: '"Orbitron", sans-serif',
            letterSpacing: '5px',
            background: 'linear-gradient(90deg, #00d2ff, var(--neon-violet))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}
        >
          <span style={{ color: 'var(--neon-cyan)', WebkitTextFillColor: 'var(--neon-cyan)', marginRight: '10px' }}>//</span> Prem M
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '1rem' }}
        >
          Developer • Innovator • App Builder • IoT Engineer
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '0.8rem',
          zIndex: 1
        }}
      >
        <span>Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--neon-cyan), transparent)' }} 
        />
      </motion.div>
    </section>
  );
};

export default Hero;
