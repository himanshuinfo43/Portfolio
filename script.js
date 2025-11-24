/* Himanshu Portfolio JavaScript */
// Theme toggle, nav menu, form validation, scroll reveal

(function() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const yearSpan = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const copyEmailBtn = document.getElementById('copyEmail');
  const emailLink = document.getElementById('emailLink');
  const copyStatus = document.getElementById('copyStatus');

  // ---- Year ----
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ---- Theme ----
  function applyTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.textContent = '🌙';
    } else {
      document.body.classList.remove('light-theme');
      themeToggle.textContent = '☀️';
    }
  }

  function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) {
      applyTheme(stored);
    } else {
      applyTheme(prefersDark.matches ? 'dark' : 'light');
    }
  }

  themeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    const next = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  initTheme();

  // ---- Navigation ----
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.dataset.state = expanded ? 'closed' : 'open';
  });

  // Close menu on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 820 && navMenu?.dataset.state === 'open') {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.dataset.state = 'closed';
      }
    }
  });

  // Smooth scroll + close menu
  navMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 820) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.dataset.state = 'closed';
      }
    });
  });

  // ---- Scroll Reveal ----
  const revealItems = Array.from(document.querySelectorAll('.section, .project-card, .highlight-card, .timeline-item'));
  revealItems.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  revealItems.forEach(el => observer.observe(el));

  // ---- Form Validation ----
  function setError(field, message) {
    const errorSpan = contactForm.querySelector(`[data-error-for="${field.name}"]`);
    if (errorSpan) errorSpan.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      setError(field, 'Required');
      return false;
    }
    if (field.type === 'email') {
      const ok = /.+@.+\..+/.test(field.value);
      if (!ok) { setError(field, 'Invalid email'); return false; }
    }
    setError(field, '');
    return true;
  }

  contactForm?.addEventListener('input', (e) => {
    if (e.target instanceof HTMLElement && 'name' in e.target) {
      validateField(e.target);
    }
  });

  contactForm?.addEventListener('submit', (e) => {
    const status = contactForm.querySelector('.form-status');
    const fields = ['name','email','message'].map(n => contactForm.querySelector(`[name="${n}"]`));
    let allValid = true;
    fields.forEach(f => { if (f) { const v = validateField(f); if (!v) allValid = false; } });
    if (!allValid) {
      e.preventDefault();
      status.textContent = 'Please fix validation errors.';
      status.style.color = 'var(--color-danger)';
      return;
    }
    status.textContent = 'Sending...';
    status.style.color = 'var(--color-text-soft)';
  });

  // ---- Accessibility: Focus ring for keyboard users ----
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // ---- Scroll Progress & Back To Top ----
  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
    if (backToTop) {
      if (scrollTop > window.innerHeight * 0.4) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();
  backToTop?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // ---- Project Filters ----
  function applyFilter(category) {
    projectCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
        card.classList.add('visible');
      } else {
        card.style.display = 'none';
      }
    });
  }
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // ---- Copy Email ----
  copyEmailBtn?.addEventListener('click', async () => {
    if (!emailLink) return;
    try {
      await navigator.clipboard.writeText(emailLink.textContent.trim());
      if (copyStatus) {
        copyStatus.textContent = 'Copied!';
        setTimeout(() => copyStatus.textContent = '', 2000);
      }
    } catch (err) {
      if (copyStatus) copyStatus.textContent = 'Failed';
    }
  });
})();
