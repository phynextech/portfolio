import React from 'react';
import { motion } from 'framer-motion';

const IoTProjects = () => {
  const projects = [
    { 
      name: 'Line Follower Robot', 
      type: 'Autonomous System', 
      glow: '#00ff88',
      image: '/iot_robots.png'
    },
    { 
      name: 'Gesture Control System', 
      type: 'HCI Robotics', 
      glow: '#00ffff',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Obstacle Avoidance Robot', 
      type: 'Sensor Fusion', 
      glow: '#ff00ff',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Self Balancing Robot', 
      type: 'Control Systems', 
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -15, scale: 1.02 }}
            style={{
              background: 'rgba(10, 10, 15, 0.4)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${proj.glow}30`,
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 10px 30px ${proj.glow}10`,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Top decorative circuit line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${proj.glow}, transparent)` }} />
            
            {/* Image Container */}
            <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent, rgba(10,10,15,1))` }} zIndex={1} />
              <motion.img 
                src={proj.image} 
                alt={proj.name}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>

            {/* Content Container */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-main)', textShadow: `0 0 10px ${proj.glow}40` }}>{proj.name}</h3>
              <p style={{ color: proj.glow, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{proj.type}</p>

              {/* Circuit-like dots pattern */}
              <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '2rem' }}>
                {[1, 2, 3].map(dot => (
                  <div key={dot} style={{ width: '6px', height: '6px', borderRadius: '50%', background: `${proj.glow}80`, boxShadow: `0 0 8px ${proj.glow}` }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IoTProjects;
