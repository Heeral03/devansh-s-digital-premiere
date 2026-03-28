import React from 'react';
import './Headshots.css';

const Headshots = () => {
  const images = [
    { src: '/devansh/Headshots/Trek.jpeg' },
    { src: '/devansh/Headshots/FK003970.JPG' },
    { src: '/devansh/Headshots/1000082892.jpg' },
    { src: '/devansh/Headshots/IMG_3527.JPG' },
    { src: '/devansh/Headshots/IMG_3567.JPG' },
    { src: '/devansh/Headshots/97B90BB3-6ED8-4544-8F15-57A76DCD275A_1_105_c.jpeg' },
    { src: '/devansh/Headshots/Trek2.jpeg'},
    { src: '/devansh/Headshots/Viva1.jpeg'},
    { src: '/devansh/Headshots/Plinth1.jpeg'}
  ];

  return (
    <section id="headshots" className="section">
      <div className="container">
        
        <div className="section-header fade-up">
          <h2 className="section-title">THE PORTRAITS</h2>
          <p className="section-subtitle">
            A face is a canvas. It is the first point of truth between the character and the audience.
          </p>
        </div>

        <div className="headshot-grid">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`headshot-card fade-up`}
              style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}
            >
             <img 
  src={img.src} 
  alt={`Portrait ${idx + 1}`} 
  loading="lazy"
  style={{ width: '100%', height: 'auto', display: 'block' }}  // ← inline override
/>
              <div className="headshot-overlay">
                <span className="portrait-num">No. {String(idx + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Headshots;
