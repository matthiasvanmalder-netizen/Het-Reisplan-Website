document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.trip-selector').forEach(function (selector) {
    var cards = Array.prototype.slice.call(selector.querySelectorAll('.trip-card'));

    function collapseAll() {
      cards.forEach(function (c) {
        c.classList.remove('is-expanded', 'is-collapsed');
        var btn = c.querySelector('.trip-card__summary');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    function expand(card) {
      cards.forEach(function (c) {
        var isTarget = c === card;
        c.classList.toggle('is-expanded', isTarget);
        c.classList.toggle('is-collapsed', !isTarget);
        var btn = c.querySelector('.trip-card__summary');
        if (btn) btn.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
      });
      window.requestAnimationFrame(function () {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    cards.forEach(function (card) {
      var summaryBtn = card.querySelector('.trip-card__summary');
      var closeBtn = card.querySelector('.trip-card__close');

      if (summaryBtn) {
        summaryBtn.setAttribute('aria-expanded', 'false');
        summaryBtn.addEventListener('click', function () {
          if (card.classList.contains('is-expanded')) {
            collapseAll();
          } else {
            expand(card);
          }
        });
      }
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          collapseAll();
        });
      }
    });
  });
});
