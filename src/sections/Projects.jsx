import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'NexLink',
      description: 'A cross-platform app that seamlessly connects your phone and PC, bridging the gap between mobile and desktop ecosystems.',
      tag: 'Cross-Platform • Connectivity',
      image: '/nexlink_logo.png',
      links: [
        { name: 'View on Play Store', url: '#', class: 'btn-outline' }
      ]
    },
    {
      title: 'Moon AI',
      description: 'Advanced AI chatbot platform featuring conversational neural network effects and real-time inference.',
      tag: 'AI • Web Application',
      image: '/moonai_logo.png',
      links: [
        { name: 'Website', url: 'https://moon-ai.info', class: 'btn-outline' },
        { name: 'Play Store', url: '#', class: 'btn-primary btn-sm' }
      ]
    },
    {
      title: 'Play Store Apps',
      description: 'Published multiple successful Android applications reaching thousands of active daily users globally.',
      tag: 'Android • App Dev',
      image: '/music_icon.png',
      links: [
        { name: 'Developer Profile', url: '#', class: 'btn-outline' }
      ]
    }
  ];

  return (
    <section id="projects" className="section">
      <h2 className="section-title" style={{ marginTop: '5rem' }}>Featured Deployments</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card tilt-card" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div className="card-glow" style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 20px rgba(0, 245, 255, 0.0)', transition: 'box-shadow 0.3s', zIndex: 0, pointerEvents: 'none' }}></div>
            
            <div className="project-img-wrapper" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', zIndex: 1 }}>
              <img src={project.image} alt={project.title} className="project-img" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.3))' }} />
            </div>
            
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', zIndex: 1 }}>{project.title}</h3>
            <span className="project-tag" style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, zIndex: 1 }}>{project.tag}</span>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1, zIndex: 1 }}>{project.description}</p>
            
            <div className="card-buttons" style={{ display: 'flex', gap: '1rem', marginTop: 'auto', zIndex: 1 }}>
              {project.links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`btn ${link.class}`}
                  style={{
                    padding: link.class.includes('btn-sm') ? '0.5rem 1.2rem' : '0.8rem 2rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    letterSpacing: '1px',
                    fontSize: link.class.includes('btn-sm') ? '0.85rem' : '0.9rem',
                    border: link.class.includes('btn-outline') ? '1px solid var(--neon-violet)' : '1px solid transparent',
                    background: link.class.includes('btn-outline') ? 'transparent' : 'linear-gradient(45deg, var(--neon-cyan), var(--neon-violet))',
                    color: link.class.includes('btn-outline') ? 'var(--text-primary)' : '#fff',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (link.class.includes('btn-outline')) {
                      e.target.style.borderColor = 'var(--neon-cyan)';
                      e.target.style.color = 'var(--neon-cyan)';
                      e.target.style.background = 'rgba(124, 58, 237, 0.15)';
                    } else {
                      e.target.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (link.class.includes('btn-outline')) {
                      e.target.style.borderColor = 'var(--neon-violet)';
                      e.target.style.color = 'var(--text-primary)';
                      e.target.style.background = 'transparent';
                    } else {
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
