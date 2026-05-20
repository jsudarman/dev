/* BrokerMFG – Main JavaScript */

/* ── Navbar scroll effect ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile nav toggle ── */
const navToggle = document.querySelector('.nav-toggle');
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  document.body.classList.toggle('nav-mobile-open');
});

/* Close mobile nav on link click */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    document.body.classList.remove('nav-mobile-open');
  });
});

/* ── Active nav link ── */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}
setActiveNav();

/* ── Scroll-triggered fade-in ── */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── Animated counter ── */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
  }, 16);
}
const counterObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      counterObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.5 }
);
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ── Capability bar animations ── */
const barObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.cap-bar').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w; }, 200);
      });
      barObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.capability-list').forEach(el => {
  el.querySelectorAll('.cap-bar').forEach(bar => { bar.style.width = '0%'; });
  barObserver.observe(el);
});

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Material tabs ── */
document.querySelectorAll('.mat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;
    document.querySelectorAll('.material-card').forEach(card => {
      card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none';
    });
  });
});

/* ── File upload drag & drop ── */
document.querySelectorAll('.file-upload').forEach(zone => {
  const input = zone.querySelector('input[type="file"]');
  const label = zone.querySelector('p');
  zone.addEventListener('click', () => input?.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--blue-accent)'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.style.borderColor = '';
    const files = e.dataTransfer.files;
    if (files.length && label) label.textContent = `${files.length} file(s) selected: ${files[0].name}`;
  });
  input?.addEventListener('change', () => {
    if (input.files.length && label) label.textContent = `${input.files.length} file(s) selected: ${input.files[0].name}`;
  });
});

/* ── Quote form submission ── */
const quoteForm = document.getElementById('quoteForm');
quoteForm?.addEventListener('submit', e => {
  e.preventDefault();
  showToast('✓ Quote request submitted! We\'ll respond within 24 hours.');
  quoteForm.reset();
});

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  showToast('✓ Message sent! We\'ll be in touch shortly.');
  contactForm.reset();
});

/* ── Newsletter ── */
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ You\'re subscribed to our newsletter!');
    form.reset();
  });
});

/* ── Toast notification ── */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

/* ── Sticky phone pulse ── */
const stickyCta = document.querySelector('.sticky-cta');
setTimeout(() => {
  stickyCta?.style.setProperty('animation', 'none');
  void stickyCta?.offsetWidth;
  stickyCta?.style.removeProperty('animation');
}, 3000);
