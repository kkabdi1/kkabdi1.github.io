/* ============================================================
   KHALI ABDI — PORTFOLIO
   main.js
   ============================================================ */

/* ── NAV TOGGLE (every page) ──────────────────────────────── */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── LOADER (simple static puzzle grid, fades to reveal the page) ── */
function revealPage() {
  const loader = document.getElementById('loader');
  const page   = document.getElementById('page-body');

  loader.style.opacity = '0';
  page.classList.add('visible');
  setTimeout(() => { loader.style.display = 'none'; }, 800);
  sessionStorage.setItem('introSeen', '1');
}

function runLoaderTick() {
  const bar = document.getElementById('loader-bar');
  const tagline = document.getElementById('loader-tagline');
  let pct = 0;

  function tick() {
    pct = Math.min(pct + (Math.random() * 2.5 + 1.5), 100);
    bar.style.width = pct + '%';
    if (pct > 65) tagline.style.opacity = '1';

    if (pct < 100) {
      setTimeout(tick, 35 + Math.random() * 45);
    } else {
      setTimeout(revealPage, 400);
    }
  }
  setTimeout(tick, 300);
}

function initLoader() {
  const loader = document.getElementById('loader');
  const page   = document.getElementById('page-body');
  if (!loader || !page) return;

  // Only play the intro once per browser session, and skip for reduced motion
  if (sessionStorage.getItem('introSeen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.style.display = 'none';
    page.classList.add('visible');
    sessionStorage.setItem('introSeen', '1');
    return;
  }

  runLoaderTick();
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLoader();
});
