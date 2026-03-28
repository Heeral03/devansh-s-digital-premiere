import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [showReel, setShowReel] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = ['an Actor.', 'a Performer.', 'a Storyteller.'];

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  const handleType = () => {
    const i = loopNum % words.length;
    const fullText = words[i];

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    );

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
      setTypingSpeed(40);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(100);
    } else {
      setTypingSpeed(isDeleting ? 40 : 100);
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="hero-content z-10">
        <p className="hero-pretitle fade-up"></p>
        <h1 className="hero-title fade-up" style={{ transitionDelay: '0.1s' }}>
          Devansh Pareek.
        </h1>
        <p className="hero-subtitle fade-up" style={{ transitionDelay: '0.2s' }}>
          I am <span className="typing-text">{text}</span>
          <span className="cursor">|</span>
        </p>
        <div className="hero-cta fade-up" style={{ transitionDelay: '0.3s' }}>
          <button onClick={() => setShowReel(true)} className="btn btn-primary">
            Watch Showreel
          </button>
        </div>
      </div>
      
      <div className="hero-visual z-0 fade-up">
        <img 
          src="/devansh/Headshots/hero.jpeg" 
          alt="Devansh Pareek" 
          className="hero-image"
        />
        <div className="hero-gradient"></div>
      </div>
      
      <div className="scroll-indicator fade-up" style={{ transitionDelay: '0.6s' }}>
        <span>Scroll to Explore</span>
        <div className="scroll-line"></div>
      </div>

      {showReel && (
        <div className="showreel-modal" onClick={() => setShowReel(false)}>
          <button className="modal-close">CLOSE [X]</button>
          <div className="modal-video-wrapper" onClick={e => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/JNMSnsb30Q4?autoplay=1"
              title="Devansh Pareek Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
