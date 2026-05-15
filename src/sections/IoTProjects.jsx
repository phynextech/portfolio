import React from 'react';
import { motion } from 'framer-motion';

const IoTProjects = () => {
  const projects = [
    { 
      name: 'Line Follower Robot', 
      type: 'AUTONOMOUS SYSTEM', 
      description: 'An autonomous robot capable of following complex paths. Features remote control capabilities for manual override.',
      glow: '#00ff88',
      image: '/iot_robots.png'
    },
    { 
      name: 'Gesture Control System', 
      type: 'HCI ROBOTICS', 
      description: 'A robotics system controlled purely by hand gestures. Includes voice command integration for seamless interaction.',
      glow: '#00ffff',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Obstacle Avoidance Robot', 
      type: 'SENSOR FUSION', 
      description: 'Equipped with advanced sensors to detect and avoid obstacles in real-time. Can be monitored via WiFi/Bluetooth control.',
      glow: '#ff00ff',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Self Balancing Robot', 
      type: 'CONTROL SYSTEMS', 
      description: 'A two-wheeled robot utilizing PID controllers to maintain balance. Supports remote tuning via Bluetooth.',
      glow: '#9d00ff',
      image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section id="iot" className="section-container" style={{ position: 'relative' }}>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-title text-gradient"
      >
        Hardware & Robotics
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -10, boxShadow: `0 20px 40px ${proj.glow}20` }}
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
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: `radial-gradient(circle at top, ${proj.glow}10, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Image Container */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `0 0 20px ${proj.glow}30`,
                border: `1px solid ${proj.glow}40`,
                overflow: 'hidden'
              }}>
                <img 
                  src={proj.image} 
                  alt={proj.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
            </div>

            {/* Content Container */}
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>{proj.name}</h3>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: proj.glow, letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              {proj.type}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
              {proj.description}
            </p>

            {/* Feature tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {['Voice Command', 'Remote Control', 'WiFi / Bluetooth'].map(tag => (
                <span key={tag} style={{ 
                  fontSize: '0.7rem', 
                  color: 'rgba(255,255,255,0.7)', 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: '20px',
                  border: `1px solid ${proj.glow}30`
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IoTProjects;
