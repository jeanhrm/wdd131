document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModified = document.getElementById('lastModified');
  if (lastModified) lastModified.textContent = 'Last modified: ' + document.lastModified;

  const hambtn = document.getElementById('hambtn');
  const nav = document.getElementById('main-nav');

  if (hambtn && nav) {
    hambtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hambtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hambtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

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
