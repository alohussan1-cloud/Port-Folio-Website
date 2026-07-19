/* =========================================================
   ALI HASSAN — PORTFOLIO SCRIPT
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- LOADER ---------- */
  var loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 500);
  });

  /* ---------- FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- CURSOR GLOW ---------- */
  var glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('active');
    });
    document.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });
  }

  /* ---------- TYPED.JS ---------- */
  if (typeof Typed !== 'undefined') {
    new Typed('#typed', {
      strings: [
        'Web Developer',
        'Frontend Developer',
        'PHP Developer',
        'JavaScript Enthusiast',
        'Freelancer'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      startDelay: 300,
      loop: true,
      showCursor: false
    });
  }

  /* ---------- NAVBAR SCROLL STATE ---------- */
  var navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);

  /* ---------- HAMBURGER MENU ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  var navLinkItems = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinkItems.length; i++) {
    navLinkItems[i].addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- ACTIVE SECTION HIGHLIGHT ---------- */
  var sections = document.querySelectorAll('main section[id], .hero[id]');
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinkItems.forEach(function (link) {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- SKILL PROGRESS BARS ---------- */
  var progressFills = document.querySelectorAll('.progress-fill');
  var progressObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var percent = el.getAttribute('data-percent');
        el.style.width = percent + '%';
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  progressFills.forEach(function (el) { progressObserver.observe(el); });

  /* ---------- ANIMATED COUNTERS ---------- */
  var statNums = document.querySelectorAll('.stat-num');
  var counterObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) { counterObserver.observe(el); });

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* ---------- TESTIMONIAL SLIDER ---------- */
  var track = document.getElementById('testimonialTrack');
  var dotsContainer = document.getElementById('sliderDots');
  var slides = track.children;
  var currentSlide = 0;
  var slideCount = slides.length;
  var autoSlideTimer;

  for (var s = 0; s < slideCount; s++) {
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (s + 1));
    if (s === 0) dot.classList.add('active');
    (function (index) {
      dot.addEventListener('click', function () {
        goToSlide(index);
        resetAutoSlide();
      });
    })(s);
    dotsContainer.appendChild(dot);
  }
  var dots = dotsContainer.children;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('active', d === index);
    }
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slideCount);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  resetAutoSlide();

  /* ---------- BACK TO TOP ---------- */
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- RIPPLE EFFECT ---------- */
  var rippleButtons = document.querySelectorAll('.ripple');
  rippleButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var circle = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 650);
    });
  });

  /* ---------- CONTACT FORM ---------- */
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formStatus.textContent = 'Thanks! Your message has been sent — I\'ll reply soon.';
    contactForm.reset();
    setTimeout(function () { formStatus.textContent = ''; }, 5000);
  });

});