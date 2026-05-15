import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Bot, Cpu, Layout, Cloud } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    { name: 'Frontend Development', icon: <Layout size={32} color="var(--neon-blue)" />, progress: 90, glow: 'var(--neon-blue)' },
    { name: 'Backend Development', icon: <Database size={32} color="var(--neon-purple)" />, progress: 85, glow: 'var(--neon-purple)' },
    { name: 'Mobile App Dev', icon: <Smartphone size={32} color="var(--neon-cyan)" />, progress: 88, glow: 'var(--neon-cyan)' },
    { name: 'AI & Chatbot Systems', icon: <Bot size={32} color="var(--neon-pink)" />, progress: 95, glow: 'var(--neon-pink)' },
    { name: 'IoT & Robotics', icon: <Cpu size={32} color="#00ff88" />, progress: 92, glow: '#00ff88' },
    { name: 'UI/UX', icon: <Code size={32} color="#ffaa00" />, progress: 80, glow: '#ffaa00' },
    { name: 'Cloud & APIs', icon: <Cloud size={32} color="var(--neon-blue)" />, progress: 85, glow: 'var(--neon-blue)' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section id="skills" className="section-container">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-title text-gradient"
      >
        System Capabilities
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
      >
        {skillsData.map((skill) => (
          <motion.div 
            key={skill.name}
            variants={itemVariants}
            whileHover={{ 
              y: -15, 
              scale: 1.05, 
              boxShadow: `0 20px 40px ${skill.glow}30`,
              borderColor: skill.glow
            }}
            style={{ 
              padding: '2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start', 
              position: 'relative', 
              overflow: 'hidden',
              background: 'rgba(10, 10, 15, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              transition: 'border-color 0.3s ease'
            }}
          >
            <div style={{ marginBottom: '1.5rem', background: `linear-gradient(135deg, rgba(255,255,255,0.05), ${skill.glow}20)`, padding: '1rem', borderRadius: '16px', boxShadow: `0 0 20px ${skill.glow}20` }}>
              {skill.icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--text-main)', letterSpacing: '0.5px' }}>{skill.name}</h3>
            
            {/* Progress Bar container */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginTop: 'auto' }}>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                style={{ 
                  height: '100%', 
                  background: skill.glow,
                  boxShadow: `0 0 10px ${skill.glow}`
                }}
              />
            </div>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.03, transform: 'scale(4)' }}>
              {skill.icon}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
