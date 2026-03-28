import React, { useEffect } from 'react';
import './Reels.css';

const Reels = () => {

  useEffect(() => {
    // Process Instagram embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="reels" className="section">
      <div className="container">
        <div className="section-header fade-up">
          <h2 className="section-title">THE REELS</h2>
          <p className="section-subtitle">
            Bite-sized performances designed for the digital stage. Short, intense, and unfiltered.
          </p>
        </div>
        
        <div className="reels-grid">
          <div className="reel-column fade-up">
            <div className="reel-meta">
              <span className="reel-num">01</span>
              <span>Featured Monologue</span>
            </div>
            <div className="reel-embed">
              <blockquote 
                className="instagram-media" 
                data-instgrm-theme="dark"
                data-instgrm-permalink="https://www.instagram.com/p/DEAiBtGSiGM/" 
                data-instgrm-version="14"
              ></blockquote>
            </div>
          </div>

          <div className="reel-column fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="reel-meta">
              <span className="reel-num">02</span>
              <span>Act Snippet</span>
            </div>
            <div className="reel-embed">
              <blockquote 
                className="instagram-media" 
                data-instgrm-theme="dark"
                data-instgrm-permalink="https://www.instagram.com/p/DRrZSmhk0m_/" 
                data-instgrm-version="14"
              ></blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reels;
