/* ══════════════════════════════════════════
   DEVANSH PAREEK — ACTOR PORTFOLIO
   Main Script
══════════════════════════════════════════ */

'use strict';

/* ── Gallery images (from Act_Pictures) ── */
const GALLERY_IMAGES = [
  "devansh/Act_Pictures/Copy of DSC03240.JPEG",
  "devansh/Act_Pictures/Copy of DSC09648.JPEG",
  "devansh/Act_Pictures/Copy of DSC09861.JPEG",
  "devansh/Act_Pictures/Copy of DSC_0371.JPEG",
  "devansh/Act_Pictures/Copy of DSC_0886.JPEG",
  "devansh/Act_Pictures/Copy of DSC_0897.JPEG",
  "devansh/Act_Pictures/Copy of DSC_0898.JPEG",
  "devansh/Act_Pictures/Copy of DSC_0948.JPEG",
  "devansh/Act_Pictures/Copy of DSC_0953.JPEG",
  "devansh/Act_Pictures/IMG_4937.JPEG",
  "devansh/Act_Pictures/IMG_4944.JPEG",
  "devansh/Act_Pictures/IMG_4956.JPEG",
  "devansh/Act_Pictures/IMG_5156.JPEG",
  "devansh/Act_Pictures/IMG_5168.JPEG",
  "devansh/Act_Pictures/IMG_5218.jpg",
  "devansh/Act_Pictures/IMG_6385.jpg",
  "devansh/Act_Pictures/1000065356.JPG",
  "devansh/Act_Pictures/1000065357.JPG",
  "devansh/Act_Pictures/1000065364.JPG",
  "devansh/Act_Pictures/1000088571.JPG",
  "devansh/Act_Pictures/1000088574.JPG",
  "devansh/Act_Pictures/1000088577.JPG",
  "devansh/Act_Pictures/1000096028.JPG",
  "devansh/Act_Pictures/1000096029.JPG",
  "devansh/Act_Pictures/1000096032.JPG",
  "devansh/Act_Pictures/1000108495.JPG",
  "devansh/Act_Pictures/1000108496.JPG",
  "devansh/Act_Pictures/1000108500.JPG",
  "devansh/Act_Pictures/1000108502.JPG",
  "devansh/Act_Pictures/1000113353.JPG",
  "devansh/Act_Pictures/1000113429.JPG",
  "devansh/Act_Pictures/696f723a-e2bc-4342-a49d-574fe11700fb.jpg",
];

const INITIAL_GALLERY_COUNT = 16;
let galleryLoaded = INITIAL_GALLERY_COUNT;
let currentLightboxIdx = 0;

/* ════════════════════════════════════════
   LOADER
════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  const curtainL = document.querySelector('.curtain-left');
  const curtainR = document.querySelector('.curtain-right');

  // After letters animate, open curtains then fade loader
  setTimeout(() => {
    curtainL.classList.add('open');
    curtainR.classList.add('open');
  }, 1600);

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2800);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
}

/* ════════════════════════════════════════
   PARTICLES
════════════════════════════════════════ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  function spawnParticle() {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 5;
    const dur = Math.random() * 8 + 6;

    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; bottom:-10px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      opacity:0;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay) * 1000 + 200);
  }

  // Spawn initial batch
  for (let i = 0; i < 25; i++) spawnParticle();
  setInterval(spawnParticle, 600);
}

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ════════════════════════════════════════
   TYPING EFFECT
════════════════════════════════════════ */
function initTyping() {
  const el = document.getElementById('typingTagline');
  if (!el) return;

  const phrases = [
    "Every character is a new life.",
    "The stage is my canvas.",
    "Stories live through performance.",
    "Raw emotion. Pure theatre.",
  ];

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let textNode = document.createTextNode('');
  el.insertBefore(textNode, cursor);

  function type() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      textNode.nodeValue = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 60);
    } else {
      textNode.nodeValue = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 35);
    }
  }

  // Start typing after loader delay
  setTimeout(type, 3000);
}

/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-aos]');
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => obs.observe(t));
}

/* ════════════════════════════════════════
   GALLERY
════════════════════════════════════════ */
function buildGalleryItem(src, idx) {
  const div = document.createElement('div');
  div.className = 'gallery-item';
  div.dataset.idx = idx;
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Performance photo ${idx + 1}`;
  img.loading = 'lazy';
  div.appendChild(img);
  div.addEventListener('click', () => openLightbox(idx));
  return div;
}

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  // Initial render
  for (let i = 0; i < Math.min(INITIAL_GALLERY_COUNT, GALLERY_IMAGES.length); i++) {
    grid.appendChild(buildGalleryItem(GALLERY_IMAGES[i], i));
  }

  // Add data-aos to gallery items
  grid.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.setAttribute('data-aos', 'fade-up');
    item.style.transitionDelay = `${(i % 4) * 0.07}s`;
  });

  // Load More
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    if (GALLERY_IMAGES.length <= INITIAL_GALLERY_COUNT) loadMoreBtn.style.display = 'none';

    loadMoreBtn.addEventListener('click', () => {
      const start = galleryLoaded;
      const end = Math.min(galleryLoaded + 8, GALLERY_IMAGES.length);
      for (let i = start; i < end; i++) {
        const item = buildGalleryItem(GALLERY_IMAGES[i], i);
        item.setAttribute('data-aos', 'fade-up');
        grid.appendChild(item);
        // Trigger scroll reveal for new items
        setTimeout(() => item.classList.add('revealed'), 50);
      }
      galleryLoaded = end;
      if (galleryLoaded >= GALLERY_IMAGES.length) {
        loadMoreBtn.textContent = 'All Photos Loaded';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
        loadMoreBtn.style.cursor = 'default';
      }
    });
  }
}

/* ════════════════════════════════════════
   LIGHTBOX
════════════════════════════════════════ */
function openLightbox(idx) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (!lb || !img) return;

  currentLightboxIdx = idx;
  img.src = GALLERY_IMAGES[idx];
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentLightboxIdx = (currentLightboxIdx + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  const img = document.getElementById('lbImg');
  if (img) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.2s';
    setTimeout(() => {
      img.src = GALLERY_IMAGES[currentLightboxIdx];
      img.style.opacity = '1';
    }, 200);
  }
}

function initLightbox() {
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');
  const lb      = document.getElementById('lightbox');

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lbNext)  lbNext.addEventListener('click', () => navigateLightbox(1));
  if (lb) lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    const active = document.getElementById('lightbox')?.classList.contains('active');
    if (!active) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

/* ════════════════════════════════════════
   CURSOR GLOW
════════════════════════════════════════ */
function initCursorGlow() {
  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ════════════════════════════════════════
   HEADSHOT CARD TILT
════════════════════════════════════════ */
function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.headshot-card, .work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ════════════════════════════════════════
   SMOOTH SECTION INDICATOR highlight
════════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.style.color = l.getAttribute('href') === '#' + id
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ════════════════════════════════════════
   INSTAGRAM EMBED RELOAD helper
════════════════════════════════════════ */
function reloadInstagram() {
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticles();
  initNavbar();
  initTyping();
  initGallery();
  initLightbox();
  initCursorGlow();
  initScrollReveal();

  // Run tilt & active nav after small delay to let DOM settle
  setTimeout(() => {
    initTilt();
    initActiveNav();
    reloadInstagram();
  }, 300);

  // Re-run scroll reveal for dynamically added items
  const observer = new MutationObserver(() => {
    document.querySelectorAll('[data-aos]:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) el.classList.add('revealed');
    });
  });
  observer.observe(document.getElementById('galleryGrid'), { childList: true });
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('[data-aos]:not(.revealed)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) el.classList.add('revealed');
  });
}, { passive: true });
