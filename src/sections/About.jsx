import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-container">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-title text-gradient"
      >
        About Core
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel" 
          style={{ padding: '3rem' }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--neon-blue)' }}>Prem M</h3>
          <h4 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            B.Sc Computer Science (AI & ML)<br />
            <span style={{ color: 'var(--neon-purple)' }}>Takshashila University – FACE Prep Campus</span>
          </h4>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
            Passionate full-stack developer and AI innovator focused on building futuristic digital experiences, intelligent systems, and cross-platform applications. My objective is to bridge the gap between human interaction and advanced technology.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-panel" 
          style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--neon-cyan)', borderBottom: '1px solid rgba(0,255,255,0.2)', paddingBottom: '1rem' }}>Core Expertise</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {['Android Studio', 'Microsoft Visual Studio', 'React', 'Node.js', 'AI Chatbots', 'IoT Systems', 'App Development', 'UI/UX Design'].map((skill, i) => (
              <motion.span 
                key={skill}
                whileHover={{ scale: 1.05, borderColor: 'var(--neon-blue)', color: 'var(--neon-blue)' }}
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: 'rgba(0, 243, 255, 0.05)', 
                  border: '1px solid rgba(0, 243, 255, 0.2)', 
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  cursor: 'default',
                  transition: 'all 0.3s ease'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
