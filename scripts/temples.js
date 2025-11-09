// scripts/temples.js

document.addEventListener('DOMContentLoaded', () => {
  // Footer year and last modified
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModified = document.getElementById('lastModified');
  if (lastModified) lastModified.textContent = 'Last modified: ' + document.lastModified;

  // Hamburger navigation toggle (mobile)
  const hambtn = document.getElementById('hambtn');
  const nav = document.getElementById('main-nav');

  if (hambtn && nav) {
    hambtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open'); // toggles .open to show/hide nav
      hambtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // change icon to X when open
      hambtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      // optional: prevent background scroll while menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav on window resize when moving to large screens
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 700 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hambtn.setAttribute('aria-expanded', 'false');
        hambtn.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      }
    });
  }
});
