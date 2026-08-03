/* =========================================================
   ALI HASSAN — PORTFOLIO SCRIPT
   Written in plain, beginner-friendly JavaScript.
   No advanced tricks — just functions, if/else, and loops.
========================================================= */

/* Wait until the whole page (all HTML) has loaded before
   running any of this code. This way, we know every element
   we try to grab with getElementById/querySelector actually
   exists on the page. */
document.addEventListener('DOMContentLoaded', function () {


  /* =========================================================
     1. LOADING SCREEN
     Hides the loading screen shortly after the page finishes
     loading everything (images, fonts, etc).
  ========================================================= */
  var loader = document.getElementById('loader');

  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 500); // wait half a second before hiding it
  });


  /* =========================================================
     2. FOOTER YEAR
  ========================================================= */
  var yearSpan = document.getElementById('year');
  var today = new Date();
  yearSpan.textContent = today.getFullYear();


  /* =========================================================
     3. CURSOR GLOW
     A soft glowing circle that follows the mouse around.
     Only runs on devices with a real mouse (skips phones/tablets).
  ========================================================= */
  var glow = document.getElementById('cursorGlow');
  var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (hasMouse) {
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('active');
    });

    document.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });
  }


  /* =========================================================
     4. TYPED.JS — rotating text in the hero section
  ========================================================= */
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


  /* =========================================================
     5. NAVBAR BACKGROUND ON SCROLL
     Adds a "scrolled" class once the user scrolls down a bit,
     which turns the transparent navbar into a glass background.
  ========================================================= */
  var navbar = document.getElementById('navbar');

  function updateNavbarBackground() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbarBackground(); // run once immediately on page load
  window.addEventListener('scroll', updateNavbarBackground);


  /* =========================================================
     6. MOBILE HAMBURGER MENU
     Opens/closes the mobile nav when the hamburger icon is clicked,
     and closes it again whenever a nav link is clicked.
  ========================================================= */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);

    if (isOpen) {
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  var navLinkItems = document.querySelectorAll('.nav-link');

  for (var i = 0; i < navLinkItems.length; i++) {
    navLinkItems[i].addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  }


  /* =========================================================
     7. SCROLL-BASED EFFECTS
     Everything below (active nav link, fade-in animations,
     skill bar fill, counters) depends on knowing where the
     user has scrolled to. Instead of a separate complicated
     tool for each one, we use ONE simple helper function that
     checks: "has this element scrolled into view yet?"
  ========================================================= */

  function isElementVisible(element) {
    var box = element.getBoundingClientRect();
    // "box.top" is how far the element is from the top of the screen.
    // If that number is less than 85% of the window height,
    // the element has scrolled far enough up to be visible.
    var triggerLine = window.innerHeight * 0.85;
    return box.top < triggerLine;
  }


  /* ---- 7a. Highlight the active link in the navbar ---- */
  var sections = document.querySelectorAll('main section[id], .hero[id]');

  function updateActiveNavLink() {
    var scrollPosition = window.scrollY + 150; // 150px offset for navbar height
    var currentSectionId = '';

    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    }

    for (var n = 0; n < navLinkItems.length; n++) {
      var link = navLinkItems[n];
      if (link.getAttribute('data-section') === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }


  /* ---- 7b. Fade/slide elements into view ---- */
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  function updateRevealElements() {
    for (var r = 0; r < revealEls.length; r++) {
      var el = revealEls[r];
      // Skip elements we've already revealed, so we don't redo work.
      if (el.classList.contains('in-view')) {
        continue;
      }
      if (isElementVisible(el)) {
        el.classList.add('in-view');
      }
    }
  }


  /* ---- 7c. Fill in the skill progress bars ---- */
  var progressFills = document.querySelectorAll('.progress-fill');

  function updateProgressBars() {
    for (var p = 0; p < progressFills.length; p++) {
      var bar = progressFills[p];
      if (bar.classList.contains('filled')) {
        continue;
      }
      if (isElementVisible(bar)) {
        var percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
        bar.classList.add('filled');
      }
    }
  }


  /* ---- 7d. Animate the stats counters (0 to target number) ---- */
  var statNums = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var current = 0;
    var steps = 50;               // how many times we update the number
    var stepAmount = target / steps;
    var stepSpeed = 1600 / steps; // spread the counting over 1.6 seconds

    var timer = setInterval(function () {
      current = current + stepAmount;

      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepSpeed);
  }

  function updateCounters() {
    for (var c = 0; c < statNums.length; c++) {
      var el = statNums[c];
      if (el.classList.contains('counted')) {
        continue;
      }
      if (isElementVisible(el)) {
        el.classList.add('counted');
        animateCounter(el);
      }
    }
  }


  /* ---- 7e. Run all scroll checks together ---- */
  function handleScrollEffects() {
    updateActiveNavLink();
    updateRevealElements();
    updateProgressBars();
    updateCounters();
  }

  handleScrollEffects(); // run once on page load, in case content is already visible
  window.addEventListener('scroll', handleScrollEffects);


  /* =========================================================
     8. TESTIMONIAL SLIDER
     A simple auto-sliding carousel with clickable dots.
  ========================================================= */
  var track = document.getElementById('testimonialTrack');
  var dotsContainer = document.getElementById('sliderDots');
  var slides = track.children;
  var slideCount = slides.length;
  var currentSlide = 0;
  var autoSlideTimer;

  // Create one dot button per slide.
  for (var sl = 0; sl < slideCount; sl++) {
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (sl + 1));
    dot.setAttribute('data-index', sl); // remember which slide this dot belongs to

    if (sl === 0) {
      dot.classList.add('active');
    }

    dotsContainer.appendChild(dot);
  }

  var dots = dotsContainer.children;

  // Give each dot a click listener that reads its own data-index attribute.
  for (var d = 0; d < dots.length; d++) {
    dots[d].addEventListener('click', function (e) {
      var clickedIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      goToSlide(clickedIndex);
      resetAutoSlide();
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';

    for (var dd = 0; dd < dots.length; dd++) {
      if (dd === index) {
        dots[dd].classList.add('active');
      } else {
        dots[dd].classList.remove('active');
      }
    }
  }

  function nextSlide() {
    var nextIndex = currentSlide + 1;
    if (nextIndex >= slideCount) {
      nextIndex = 0; // loop back to the first slide
    }
    goToSlide(nextIndex);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  resetAutoSlide();


  /* =========================================================
     9. BACK TO TOP BUTTON
  ========================================================= */
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* =========================================================
     10. BUTTON RIPPLE EFFECT
     Creates a small circle animation on click, starting from
     wherever the mouse clicked inside the button.
  ========================================================= */
  var rippleButtons = document.querySelectorAll('.ripple');

  for (var rb = 0; rb < rippleButtons.length; rb++) {
    rippleButtons[rb].addEventListener('click', function (e) {
      var btn = e.currentTarget;
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);

      var circle = document.createElement('span');
      circle.className = 'ripple-circle';
      circle.style.width = size + 'px';
      circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(circle);

      setTimeout(function () {
        circle.remove();
      }, 650);
    });
  }


  /* =========================================================
     11. CONTACT FORM
     Currently just shows a confirmation message. To actually
     send emails, this needs to be connected to a backend
     service (like PHP mail(), or Google Apps Script).
  ========================================================= */
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // stop the page from reloading

    formStatus.textContent = 'Thanks! Your message has been sent — I\'ll reply soon.';
    contactForm.reset();

    setTimeout(function () {
      formStatus.textContent = '';
    }, 5000);
  });

});