import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Lock body scroll when menu open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Portraits', href: '#headshots' },
    { name: 'Films', href: '#films' },
    { name: 'Stage', href: '#work' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <a href="#hero">
         
        </a>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link, idx) => (
          <a 
            key={idx} 
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? 'bar active' : 'bar'}></span>
        <span className={menuOpen ? 'bar active' : 'bar'}></span>
        <span className={menuOpen ? 'bar active' : 'bar'}></span>
      </div>
    </nav>
  );
};

export default Navbar;
