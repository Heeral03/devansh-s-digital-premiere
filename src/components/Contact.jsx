import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section bg-secondary">
      <div className="container">
        
        <div className="contact-layout">
          <div className="contact-text fade-up">
            <h2 className="contact-title">
              LET'S CREATE<br/>
              SOMETHING<br/>
              TRUE.
            </h2>
            <p className="contact-desc">
              For casting, collaborations, or artistic inquiries,
              the stage is always open. Let's tell a story together.
            </p>
            
            <div className="contact-links">
              <a 
                href="https://www.instagram.com/pareekdevansh_" 
                target="_blank" 
                rel="noreferrer" 
                className="contact-link"
              >
                <span className="link-label">INSTAGRAM</span>
                <span className="link-value">@pareekdevansh_</span>
              </a>
              <a 
                href="tel:+917677333444" 
                className="contact-link"
              >
                <span className="link-label">PHONE</span>
                <span className="link-value">+91-7677333444</span>
              </a>
              <a 
                href="mailto:devpareek2004@gmail.com" 
                className="contact-link"
              >
                <span className="link-label">EMAIL</span>
                <span className="link-value">devpareek2004@gmail.com</span>
              </a>
            </div>
          </div>
          
          <div className="contact-brand fade-up" style={{ transitionDelay: '0.2s' }}>
            <h1 className="brand-watermark">ACT.</h1>
          </div>
        </div>
        
      </div>
      
      <footer className="footer fade-up" style={{ transitionDelay: '0.4s' }}>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              DEVANSH PAREEK
            </div>
            
            <div className="footer-nav">
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#work">Showreel</a>
              <a href="#headshots">Portraits</a>
            </div>
            
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} DEVANSH PAREEK.</span>
              <span>THE ACTOR'S PORTFOLIO.</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;