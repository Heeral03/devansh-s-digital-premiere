import React from 'react';
import './Showreel.css';

const Showreel = () => {
  return (
    <section id="showreel" className="showreel-section">
      <div className="showreel-container">
        
        <div className="showreel-text fade-up">
          <h2 className="showreel-title">Introduction Video</h2>
          <p className="showreel-desc">
            A montage of moments. No filters, no safety nets. Just truth in performance.
          </p>
        </div>

        <div className="showreel-player-wrapper fade-up" style={{ transitionDelay: '0.2s' }}>
          <iframe
            src="https://www.youtube.com/embed/JNMSnsb30Q4?controls=1&showinfo=0&rel=0"
            title="Devansh Pareek Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="showreel-iframe"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Showreel;
