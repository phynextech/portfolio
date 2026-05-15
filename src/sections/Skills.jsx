import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaGithub, FaDatabase, FaNodeJs, FaReact, FaHtml5, FaCss3Alt, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiExpress, SiRender, SiMongodb, SiFirebase, SiCloudinary } from 'react-icons/si';

const Skills = () => {
  const skillsData = [
    { name: 'HTML5', icon: <FaHtml5 size={40} color="#E34F26" />, glow: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt size={40} color="#1572B6" />, glow: '#1572B6' },
    { name: 'JavaScript', icon: <SiJavascript size={40} color="#F7DF1E" />, glow: '#F7DF1E' },
    { name: 'React', icon: <FaReact size={40} color="#61DAFB" />, glow: '#61DAFB' },
    { name: 'Node.js', icon: <FaNodeJs size={40} color="#339933" />, glow: '#339933' },
    { name: 'Express.js', icon: <SiExpress size={40} color="#ffffff" />, glow: '#ffffff' },
    { name: 'Java', icon: <FaJava size={40} color="#007396" />, glow: '#007396' },
    { name: 'Docker', icon: <FaDocker size={40} color="#2496ED" />, glow: '#2496ED' },
    { name: 'Render', icon: <SiRender size={40} color="#46E3B7" />, glow: '#46E3B7' },
    { name: 'GitHub', icon: <FaGithub size={40} color="#ffffff" />, glow: '#ffffff' },
    { name: 'SQL', icon: <FaDatabase size={40} color="#003B57" />, glow: '#003B57' },
    { name: 'MongoDB', icon: <SiMongodb size={40} color="#47A248" />, glow: '#47A248' },
    { name: 'Firebase', icon: <SiFirebase size={40} color="#FFCA28" />, glow: '#FFCA28' },
    { name: 'Cloudinary', icon: <SiCloudinary size={40} color="#3448C5" />, glow: '#3448C5' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } }
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
        Technology Stack
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '2rem',
          justifyItems: 'center'
        }}
      >
        {skillsData.map((skill) => (
          <motion.div 
            key={skill.name}
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.15, 
              boxShadow: `0 15px 30px ${skill.glow}40`,
              borderColor: skill.glow
            }}
            className="hover-target"
            style={{ 
              width: '120px',
              height: '120px',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative', 
              background: 'rgba(10, 10, 15, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '24px', // Curved edges
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            <div style={{ filter: `drop-shadow(0 0 10px ${skill.glow}80)` }}>
              {skill.icon}
            </div>
            <h3 style={{ fontSize: '0.8rem', marginTop: '1rem', fontWeight: 600, color: 'var(--text-main)', letterSpacing: '0.5px', textAlign: 'center' }}>
              {skill.name}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
