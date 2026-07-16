import React, { useEffect } from 'react';
import './FilmsReels.css';

const films = [
  {
    id: 'hamlet',
    ytId: '3g3MioCVho8',
    num: '01',
    tag: 'Shakespeare',
    title: 'Hamlet',
    desc: '"To be, or not to be…" Stripping away the theatricality to find the quiet, terrifying truth inside the prince\'s mind.',
  },
  {
    id: 'never-posted',
    ytId: 'B9p_xqOTKFM',
    num: '02',
    tag: 'Classical Verse',
    title: 'The Video I Never Posted',
    desc: 'A performance held back — until now. Raw, unpolished, and completely honest.',
  },
];

const reels = [
  {
    num: '03',
    tag: 'Featured Monologue',
    permalink: 'https://www.instagram.com/p/DEAiBtGSiGM/',
  },
  {
    num: '04',
    tag: 'Act Snippet',
    permalink: 'https://www.instagram.com/p/DRrZSmhk0m_/',
  },
];

const FilmsReels = () => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//www.instagram.com/embed.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="films" className="films-section">
      <div className="films-ambient" />
      <div className="container">

        {/* Header */}
        <div className="section-header fade-up">
          <h2 className="section-title">REELS &amp; FILMS</h2>
          <p className="section-subtitle">
            From classical stages to digital screens — every frame a confession.
          </p>
        </div>

        {/* YouTube Films */}
        <div className="films-grid fade-up">
          {films.map((f) => (
            <div key={f.id} className="film-card">
              <div className="film-meta">
                <span className="film-num">{f.num}</span>
                <span className="film-tag">{f.tag}</span>
              </div>
              <div className="film-video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${f.ytId}?controls=1&rel=0&showinfo=0`}
                  title={f.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                {/* Cinematic corners */}
                <span className="fc tl" /><span className="fc tr" />
                <span className="fc bl" /><span className="fc br" />
              </div>
              <div className="film-info">
                <h3 className="film-title">{f.title}</h3>
                <p className="film-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="films-divider fade-up">
          <span className="films-divider-label">Instagram Reels</span>
        </div>

        {/* Instagram Reels */}
        <div className="reels-grid fade-up">
          {reels.map((r) => (
            <div key={r.num} className="reel-column">
              <div className="reel-meta">
                <span className="reel-num">{r.num}</span>
                <span>{r.tag}</span>
              </div>
              <div className="reel-embed">
                <blockquote
                  className="instagram-media"
                  data-instgrm-theme="dark"
                  data-instgrm-permalink={r.permalink}
                  data-instgrm-version="14"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FilmsReels;
