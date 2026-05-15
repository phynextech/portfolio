import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={onComplete}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#030303',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '4px' }} className="text-gradient">
          PHYNEX
        </h1>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
          marginTop: '2rem'
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ marginTop: '1rem', color: 'var(--text-muted)', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}
      >
        Initializing System...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
