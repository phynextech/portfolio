import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Terminal } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const socials = [
    { name: 'Email', url: 'mailto:prem005m@gmail.com', icon: <Mail size={24} />, color: 'var(--neon-cyan)' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/prem-05m/', icon: <FaLinkedin size={24} />, color: 'var(--neon-blue)' },
    { name: 'GitHub', url: 'https://github.com/prem-05m/', icon: <FaGithub size={24} />, color: 'var(--text-main)' },
  ];

  return (
    <section id="contact" className="section-container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title text-gradient"
      >
        Initialize Connection
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '4rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(0, 243, 255, 0.1)'
        }}
      >
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        
        <Terminal size={48} color="var(--neon-cyan)" style={{ margin: '0 auto 2rem', opacity: 0.8 }} />
        
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to build the future?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
          Whether it's an ambitious AI project, a complex mobile application, or a futuristic IoT system, let's collaborate and bring it to life.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5, boxShadow: `0 10px 20px ${social.color}40`, borderColor: social.color }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '30px',
                color: 'var(--text-main)',
                fontSize: '1.1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
            >
              {React.cloneElement(social.icon, { color: social.color })}
              {social.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
