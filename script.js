/**
 * MERIDYEN TERAPI — NOIR BOTANIK
 * script.js  |  Vanilla ES6+ — no dependencies
 * ─────────────────────────────────────────────
 * 1.  Header / Footer fetch loader
 * 2.  Mobile menu
 * 3.  Active nav link
 * 4.  Scroll-reveal (Intersection Observer)
 * 5.  Parallax hero
 * 6.  Counter animation
 * 7.  FAQ accordion
 * 8.  Header scroll state
 * 9.  Smooth anchors
 * 10. Image lazy load
 * 11. WhatsApp float
 * 12. Particle canvas (gold dust background)
 * 13. Magnetic CTA buttons
 * 14. Cursor glow trail (desktop only)
 * 15. Typewriter hero effect    [WOW Level 1]
 * 16. Card 3D tilt on hover     [WOW Level 1]
 * 17. Page transition fade      [WOW Level 1]
 */

// ── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadComponents();          // #1 – fetch header + footer
  initScrollReveal();        // #4
  initParallax();            // #5
  initCounters();            // #6
  initFAQ();                 // #7
  initHeaderScroll();        // #8
  initSmoothAnchors();       // #9
  initLazyImages();          // #10
  initWaFloat();             // #11
  initParticles();           // #12
  initMagneticButtons();     // #13
  initCursorGlow();          // #14
  initTypewriter();          // #15
  initCardTilt();            // #16
  initPageTransition();      // #17
});

// ── 1. HEADER / FOOTER FETCH LOADER ────────────────────────────────────────
function loadComponents() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) {
    fetch('/header.html')
      .then(r => r.text())
      .then(html => {
        headerSlot.innerHTML = html;
        initMobileMenu();   // #2 – must run AFTER header is in DOM
        initActiveNav();    // #3
      })
      .catch(() => {/* silent fail */});
  }

  if (footerSlot) {
    fetch('/footer.html')
      .then(r => r.text())
      .then(html => { footerSlot.innerHTML = html; })
      .catch(() => {});
  }
}

// ── 2. MOBILE MENU ──────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn   = document.getElementById('mobileMenuBtn');
  const menu  = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', open);
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.add('hidden'));
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('header')) menu.classList.add('hidden');
  });
}

// ── 3. ACTIVE NAV ───────────────────────────────────────────────────────────
function initActiveNav() {
  const page = document.body.getAttribute('data-page') || '';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.getAttribute('data-nav') === page) {
      link.style.color = 'var(--cream)';
      link.style.borderBottomColor = 'var(--gold)';
    }
  });
}

// ── 4. SCROLL REVEAL ────────────────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const siblings = Array.from((el.parentElement || el).querySelectorAll('.reveal'));
      const idx = siblings.indexOf(el);
      if (idx > 0 && idx < 7 && !el.classList.contains('stagger-' + idx)) {
        el.style.transitionDelay = (idx * 80) + 'ms';
      }
      el.classList.add('visible');
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

// ── 5. PARALLAX ─────────────────────────────────────────────────────────────
function initParallax() {
  const bg = document.querySelector('.parallax-bg');
  if (!bg) return;
  // Disable on mobile (causes jank)
  if (window.matchMedia('(max-width: 767px)').matches) return;
  let raf;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      bg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    });
  }, { passive: true });
}

// ── 6. COUNTERS ─────────────────────────────────────────────────────────────
function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = '1';
      const target = +entry.target.getAttribute('data-counter');
      const dur    = 1600;
      const start  = Date.now();
      const tick   = () => {
        const p    = Math.min((Date.now() - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        entry.target.textContent = Math.floor(target * ease);
        if (p < 1) requestAnimationFrame(tick);
        else entry.target.textContent = target;
      };
      tick();
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
}

// ── 7. FAQ ACCORDION ────────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close ALL open items and reset their icons
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        const ans  = i.querySelector('.faq-answer');
        const icon = i.querySelector('.faq-icon');
        if (ans)  ans.style.maxHeight = '0';
        if (icon) { icon.textContent = '+'; icon.style.transform = 'rotate(0deg)'; }
      });

      // Open clicked item (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        const ans  = item.querySelector('.faq-answer');
        const icon = q.querySelector('.faq-icon');
        if (ans)  ans.style.maxHeight = ans.scrollHeight + 'px';
        if (icon) { icon.textContent = '×'; icon.style.transform = 'rotate(90deg)'; }
      }
    });
  });
}

// ── 8. HEADER SCROLL STATE ──────────────────────────────────────────────────
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    const h = document.querySelector('header');
    if (!h) return;
    if (window.scrollY > 50) {
      h.style.borderBottomColor = 'rgba(201,169,110,0.28)';
      h.style.backgroundColor   = 'rgba(12,11,9,0.98)';
    } else {
      h.style.borderBottomColor = 'rgba(201,169,110,0.14)';
      h.style.backgroundColor   = 'rgba(12,11,9,0.92)';
    }
  }, { passive: true });
}

// ── 9. SMOOTH ANCHORS ───────────────────────────────────────────────────────
function initSmoothAnchors() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ── 10. LAZY IMAGES ─────────────────────────────────────────────────────────
function initLazyImages() {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
}

// ── 11. WHATSAPP FLOAT ──────────────────────────────────────────────────────
function initWaFloat() {
  const wa = document.querySelector('.wa-float');
  if (!wa) return;
  setTimeout(() => wa.classList.add('visible'), 2800);
}

// ── 12. PARTICLE CANVAS (gold dust) ─────────────────────────────────────────
function initParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'nb-particles';
  canvas.style.cssText = [
    'position:fixed', 'top:0', 'left:0',
    'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:0',
    'opacity:0.55'
  ].join(';');
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.4 + 0.3,
      vx:   (Math.random() - 0.5) * 0.25,
      vy:   -(Math.random() * 0.35 + 0.08),
      a:    Math.random() * 0.55 + 0.15,
      da:   (Math.random() - 0.5) * 0.003,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function initPool() {
    const count = window.innerWidth < 768 ? 45 : 110;
    particles = Array.from({ length: count }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.pulse += 0.012;
      p.a     += p.da;
      if (p.a > 0.7)  { p.a = 0.7;  p.da *= -1; }
      if (p.a < 0.05) { p.a = 0.05; p.da *= -1; }
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5)  p.y = H + 5;
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W+5) p.x = -5;
      const r = p.r + Math.sin(p.pulse) * 0.3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,169,110,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initPool();
  draw();

  window.addEventListener('resize', () => { resize(); initPool(); }, { passive: true });
}

// ── 13. MAGNETIC CTA BUTTONS ────────────────────────────────────────────────
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.18;
      const dy = (e.clientY - cy) * 0.18;
      btn.style.transform = `translate(${dx}px,${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── 14. CURSOR GLOW TRAIL ───────────────────────────────────────────────────
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.createElement('div');
  dot.id = 'cursor-glow';
  dot.style.cssText = [
    'position:fixed', 'width:320px', 'height:320px',
    'border-radius:50%', 'pointer-events:none', 'z-index:1',
    'transform:translate(-50%,-50%)',
    'background:radial-gradient(circle,rgba(201,169,110,0.055) 0%,transparent 70%)',
    'transition:opacity .3s ease', 'opacity:0'
  ].join(';');
  document.body.appendChild(dot);

  let mx = 0, my = 0, raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.opacity = '1';
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// ── 15. TYPEWRITER HERO EFFECT  [WOW Level 1] ──────────────────────────────
// Targets any element with id="nb-typewriter"
// Cycles through data-words attribute: data-words="Stres|Boyun ağrısı|Uyku sorunu"
// ═══════════════════════════════════════════════════════════════════════════
function initTypewriter() {
  const el = document.getElementById('nb-typewriter');
  if (!el) return;

  const raw   = el.getAttribute('data-words') || '';
  const words = raw.split('|').map(w => w.trim()).filter(Boolean);
  if (!words.length) return;

  let wIdx    = 0;  // current word index
  let cIdx    = 0;  // current char index
  let deleting = false;
  let paused   = false;

  // Create cursor blink element
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  cursor.textContent = '|';
  el.insertAdjacentElement('afterend', cursor);

  function tick() {
    const word = words[wIdx];

    if (paused) {
      paused = false;
      deleting = true;
      setTimeout(tick, 1200);  // pause before deleting
      return;
    }

    if (!deleting) {
      // Typing forward
      cIdx++;
      el.textContent = word.slice(0, cIdx);
      if (cIdx === word.length) {
        paused = true;
        setTimeout(tick, 80);
        return;
      }
      setTimeout(tick, 70 + Math.random() * 40);
    } else {
      // Deleting backward
      cIdx--;
      el.textContent = word.slice(0, cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        setTimeout(tick, 420);
        return;
      }
      setTimeout(tick, 38);
    }
  }

  // Small start delay
  setTimeout(tick, 900);
}

// ═══════════════════════════════════════════════════════════════════════════
// ── 16. CARD 3D TILT ON HOVER  [WOW Level 1] ───────────────────────────────
// Gentle perspective tilt on .card-noir elements — desktop only
// ═══════════════════════════════════════════════════════════════════════════
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;       // skip touch
  if (window.matchMedia('(max-width: 767px)').matches) return;  // skip mobile

  const TILT_MAX  = 6;    // degrees
  const LIFT_PX   = 8;    // translateZ pixels
  const SCALE     = 1.02; // subtle scale-up

  document.querySelectorAll('.card-noir').forEach(card => {
    card.style.willChange    = 'transform';
    card.style.transition    = 'transform 0.12s ease, box-shadow 0.25s ease';

    card.addEventListener('mousemove', e => {
      const r    = card.getBoundingClientRect();
      const relX = (e.clientX - r.left) / r.width  - 0.5;  // −0.5 … +0.5
      const relY = (e.clientY - r.top)  / r.height - 0.5;

      const rotX = (-relY * TILT_MAX).toFixed(2);  // invert Y for natural feel
      const rotY = ( relX * TILT_MAX).toFixed(2);

      card.style.transform = `
        perspective(800px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        translateZ(${LIFT_PX}px)
        scale(${SCALE})
      `;
      card.style.boxShadow = `
        0 ${8 + Math.abs(relY) * 16}px ${32 + Math.abs(relY) * 24}px rgba(201,169,110,0.18),
        ${relX * 6}px ${relY * 6}px 20px rgba(201,169,110,0.08)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
      card.style.boxShadow  = '';
      // Smooth spring-back
      setTimeout(() => { card.style.transform = ''; }, 300);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// ── 17. PAGE TRANSITION FADE  [WOW Level 1] ────────────────────────────────
// Fades page out when navigating to internal links, fades in on load
// ═══════════════════════════════════════════════════════════════════════════
function initPageTransition() {
  // Create overlay div
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  overlay.style.cssText = [
    'position:fixed', 'inset:0',
    'background-color:#0C0B09',
    'z-index:9999',
    'pointer-events:none',
    'opacity:1',
    'transition:opacity 0.45s cubic-bezier(0.4,0,0.2,1)'
  ].join(';');
  document.body.appendChild(overlay);

  // Fade IN (reveal page after load)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = '0';
    });
  });

  // Fade OUT on internal link clicks
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');

    // Skip: anchor-only, external, blank, data
    if (!href) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('http') || href.startsWith('//')) return;
    if (link.target === '_blank') return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();
    overlay.style.opacity = '1';

    setTimeout(() => {
      window.location.href = href;
    }, 420);
  });
}
