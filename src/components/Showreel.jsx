import React from 'react';
import './Showreel.css';

const Showreel = () => {
  return (
    <section id="showreel" className="showreel-section">
      {/* Cinematic ambient glow */}
      <div className="showreel-ambient" />

      <div className="showreel-container">
        {/* Header */}
        <div className="showreel-text fade-up">
          <p className="showreel-eyebrow">Selected Work</p>
          <h2 className="showreel-title">On Camera</h2>
          <div className="showreel-divider" />
        </div>

        {/* Single cinematic player */}
        <div className="showreel-stage fade-up">
          <div className="showreel-player-wrapper">
            <iframe
              src="https://www.youtube.com/embed/JNMSnsb30Q4?controls=1&showinfo=0&rel=0"
              title="Introduction — Self-Tape"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="showreel-iframe"
            />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </div>

          <div className="showreel-caption">
            <p className="showreel-eyebrow" style={{ marginBottom: '0.5rem' }}>Self-Tape</p>
            <p className="showreel-desc">
              A montage of moments. No filters, no safety nets. Just truth in performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showreel;
