import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase } from 'lucide-react';

const ExperienceCertifications = () => {
  const experiences = [
    { role: 'Full-Stack Development', details: 'Building robust scalable web applications with React, Node.js, and modern tools.' },
    { role: 'AI Systems Building', details: 'Developing and integrating LLMs and intelligent chatbots for dynamic interactions.' },
    { role: 'Mobile App Development', details: 'Creating cross-platform mobile experiences with Android Studio and modern frameworks.' },
    { role: 'IoT Engineering', details: 'Bridging software and hardware with advanced robotics and sensor systems.' },
    { role: 'Team Collaboration', details: 'Leading and participating in collaborative development to deliver high-quality products.' },
  ];

  const certifications = [
    { title: '2000+ LinkedIn Certificates', highlight: 'var(--neon-blue)' },
    { title: '5+ Microsoft Certifications', highlight: 'var(--neon-purple)' },
    { title: 'Multiple Technical Certifications', highlight: 'var(--neon-cyan)' },
  ];

  return (
    <section id="experience" className="section-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Experience Timeline */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title text-gradient"
            style={{ textAlign: 'left', fontSize: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <Briefcase size={36} color="var(--neon-blue)" /> Experience
          </motion.h2>

          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(0, 243, 255, 0.2)' }}>
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ marginBottom: '2rem', position: 'relative' }}
              >
                {/* Timeline node */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-2rem', 
                  top: '6px', 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: 'var(--neon-blue)', 
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 10px var(--neon-blue)'
                }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{exp.role}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{exp.details}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title text-gradient"
            style={{ textAlign: 'left', fontSize: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <Award size={36} color="var(--neon-purple)" /> Achievements
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass-panel"
                style={{ 
                  padding: '1.5rem 2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  borderLeft: `4px solid ${cert.highlight}`
                }}
              >
                <Award size={24} color={cert.highlight} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{cert.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceCertifications;
