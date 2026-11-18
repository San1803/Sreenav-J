/* PERSONALIZATION: Add your actual public contact details below.
   The resume supplied no email, LinkedIn URL or GitHub URL, so none were invented. */
const PROFILE = {
  email: '',                      // Example: 'hello@yourdomain.com'
  linkedin: '',                   // Example: 'https://www.linkedin.com/in/your-handle/'
  github: ''                      // Example: 'https://github.com/your-handle'
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Show social/contact links only when their real URLs have been configured.
  const email = document.getElementById('email-link');
  const linkedin = document.getElementById('linkedin-link');
  const github = document.getElementById('github-link');
  if (PROFILE.email.trim()) { email.href = `mailto:${PROFILE.email.trim()}`; email.hidden = false; }
  if (/^https:\/\//i.test(PROFILE.linkedin)) { linkedin.href = PROFILE.linkedin; linkedin.hidden = false; }
  if (/^https:\/\//i.test(PROFILE.github)) { github.href = PROFILE.github; github.hidden = false; }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-navigation');
  function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open'); }
  menuButton.addEventListener('click', () => {
    const isOpening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(isOpening));
    menuButton.setAttribute('aria-label', isOpening ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', isOpening);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });

  const buttons = Array.from(document.querySelectorAll('.filter'));
  const cards = Array.from(document.querySelectorAll('.project-card'));
  buttons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    buttons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = selected !== 'all' && !card.dataset.category.split(' ').includes(selected); });
  }));

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } });
    }, { threshold: .09, rootMargin: '0px 0px 30px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(node => revealObserver.observe(node));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(node => node.classList.add('revealed'));
  }
});
