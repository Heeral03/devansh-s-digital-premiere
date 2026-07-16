import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section bg-secondary">
      <div className="container">

        <div className="about-grid">
          <div className="about-image-col fade-up">
            <img
              src="/devansh/Headshots/FK004457.JPG"
              alt="Devansh Portrait"
              className="about-image"
            />
          </div>

          <div className="about-text-col fade-up" style={{ transitionDelay: '0.2s' }}>
            <h2 className="section-title">
              About Me
            </h2>

            <div className="about-body">
              <p>
                From an early age, I found solace in stories. But observing them was never enough. I needed to step inside them.
                Whether I am embodying the divine stillness of Krishna, navigating the moral ambiguities of Mayank,
                or delving into Hamlet's suffocating grief, my approach to acting is absolute surrender.
              </p>

              <p>
                As the Coordinator of <strong>Rendition</strong>, my college's premier acting club, I have spent years
                not only honing my own technique but helping others find their voices. Directing energy, leading an ensemble,
                and shaping a raw narrative into a breathing performance are skills I've cultivated with obsession.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
