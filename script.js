document.addEventListener('DOMContentLoaded', function () {
  // Mark active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

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
