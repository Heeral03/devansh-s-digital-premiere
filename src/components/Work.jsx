import React from 'react';
import './Work.css';

const Work = () => {
  const videos = [
    { title: 'Krishna', role: 'Stage Play', src: 'https://www.youtube.com/embed/ymV2yaColF4?controls=0', id: 'krishna' },
    { title: 'Kishan', role: 'Monoact', src: 'https://www.youtube.com/embed/cUkCAEDES-c?controls=0', id: 'kishan' },
    { title: 'Silence', role: 'Mime Act', src: 'https://www.youtube.com/embed/42wG6idkOCA?controls=0', id: 'mime' },
    { title: 'Maya', role: 'Stage Play', src: 'https://www.youtube.com/embed/Uey2mgTkwAw?controls=0', id: 'maya' }
  ];

  return (
    <section id="work" className="section bg-tertiary">
      <div className="container">
        
        <div className="section-header fade-up">
          <h2 className="section-title">THE STAGE</h2>
          <p className="section-subtitle">
            Theatre is a living, breathing entity. The energy exchanged in the room cannot be faked.
          </p>
        </div>

        <div className="video-grid">
          {videos.map((vid, idx) => (
            <div key={vid.id} className="video-card fade-up" style={{ transitionDelay: `${(idx % 2) * 0.1}s` }}>
              <div className="video-wrapper">
                <iframe
                  src={vid.src}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="video-meta">
                <span className="video-role">{vid.role}</span>
                <h4 className="video-title">{vid.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Work;
