import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'NexLink',
      category: 'CROSS-PLATFORM • CONNECTIVITY',
      description: 'A cross-platform app that seamlessly connects your phone and PC — share files, mirror controls, and stay linked across devices.',
      image: '/nexlink_logo.png',
      glow: '#00f3ff',
      linkText: 'VIEW PROJECT',
      linkUrl: '#'
    },
    {
      title: 'Moon AI',
      category: 'AI • CHATBOT • ANDROID',
      description: 'An AI-powered chatbot built with a friend — your intelligent conversational companion. Launched on web and Android.',
      image: '/moonai_logo.png',
      glow: '#9d00ff',
      linkText: 'VISIT WEBSITE',
      linkUrl: 'https://moon-ai.info'
    },
    {
      title: 'Music App',
      category: 'ANDROID • MEDIA • PLAY STORE',
      description: 'A feature-rich music player app built and published to Google Play Store under Phynex.',
      image: '/music_icon.png',
      glow: '#00ffff',
      linkText: 'VIEW ON PLAY STORE',
      linkUrl: '#'
    },
    {
      title: '5+ Apps on Play Store',
      category: 'ANDROID • ECOSYSTEM',
      description: 'All apps built and launched under the Phynex brand on Google Play Store.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Google_Play_Store_logo_%282022%29.svg',
      glow: '#9d00ff',
      linkText: 'VIEW ALL APPS',
      linkUrl: '#'
    }
  ];

  return (
    <section id="projects" className="section-container">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-title text-gradient"
      >
        Built Under Phynex
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {projects.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: `0 20px 40px ${project.glow}20` }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-panel hover-target"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              padding: '2rem',
              background: `linear-gradient(to bottom, rgba(10, 10, 15, 0.8), rgba(10, 10, 15, 0.4))`,
              border: `1px solid rgba(255, 255, 255, 0.05)`,
              borderRadius: '24px', // Curved edges
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Soft Glow Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: `radial-gradient(circle at top, ${project.glow}10, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Image Container */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `0 0 20px ${project.glow}30`,
                border: `1px solid ${project.glow}40`
              }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '60%', height: '60%', objectFit: 'contain', filter: `drop-shadow(0 0 10px ${project.glow})` }} 
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            </div>

            {/* Content */}
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>{project.title}</h3>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: project.glow, letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              {project.category}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
              {project.description}
            </p>

            {/* Pill Button */}
            <a 
              href={project.linkUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: '2rem',
                display: 'inline-block',
                padding: '0.8rem 1.5rem',
                border: `1px solid ${project.glow}50`,
                borderRadius: '50px',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                background: 'rgba(0,0,0,0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${project.glow}20`;
                e.currentTarget.style.boxShadow = `0 0 15px ${project.glow}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {project.linkText}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
