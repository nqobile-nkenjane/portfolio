document.addEventListener('DOMContentLoaded', function () {
  // Mark active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Mobile nav toggle
  var toggle = document.getElementById('navtoggle');
  var navlinks = document.querySelector('.navlinks');
  if (toggle && navlinks) {
    toggle.addEventListener('click', function () {
      navlinks.classList.toggle('open');
    });
    navlinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navlinks.classList.remove('open'); });
    });
  }

  // Animated stat counters
  var stats = document.querySelectorAll('.stat .num');
  if (stats.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var current = 0;
          var step = Math.max(1, Math.ceil(target / 30));
          var timer = setInterval(function () {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current;
          }, 30);
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { statObserver.observe(el); });
  }

  // Animated proficiency bars
  var tracks = document.querySelectorAll('.prof-track');
  if (tracks.length) {
    var profObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          profObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    tracks.forEach(function (el) { profObserver.observe(el); });
  }

  // 3D tilt effect for project cards
  var cards = document.querySelectorAll('.tilt-card');
  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rotateY = ((x - cx) / cx) * 6;
      var rotateX = -((y - cy) / cy) * 6;
      card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
});
