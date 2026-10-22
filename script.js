(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Contact details from the commented block in index.html
  var cfg = document.getElementById('contact-config');
  if (cfg) {
    var email = cfg.dataset.email;
    var phoneDisplay = cfg.dataset.phoneDisplay;
    var phoneLink = cfg.dataset.phoneLink;
    var subject = encodeURIComponent(cfg.dataset.reviewSubject || 'Free Billing Review Request');

    document.querySelectorAll('[data-contact="email"]').forEach(function (a) {
      a.href = 'mailto:' + email;
      var label = a.querySelector('span');
      if (label) label.textContent = email;
    });
    document.querySelectorAll('[data-contact="phone"]').forEach(function (a) {
      a.href = 'tel:' + phoneLink;
      var label = a.querySelector('span');
      if (label) label.textContent = phoneDisplay;
    });
    document.querySelectorAll('.js-review').forEach(function (a) {
      a.href = 'mailto:' + email + '?subject=' + subject;
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
