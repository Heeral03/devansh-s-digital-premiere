import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Showreel from './components/Showreel';
import Headshots from './components/Headshots';
import Work from './components/Work';
import Gallery from './components/Gallery';
import Reels from './components/Reels';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // Global scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showreel />
        <Headshots />
        <Work />
        <Gallery />
        <Reels />
      </main>
      <Contact />
    </div>
  );
}

export default App;
