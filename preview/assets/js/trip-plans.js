document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var canTransition = typeof document.startViewTransition === 'function';

  document.querySelectorAll('.trip-selector').forEach(function (selector, s) {
    var cards = Array.prototype.slice.call(selector.querySelectorAll('.trip-card'));
    if (canTransition) {
      selector.classList.add('has-vt');
      selector.style.viewTransitionName = 'trip-selector-' + s;
      cards.forEach(function (c, i) {
        c.style.viewTransitionName = 'trip-card-' + s + '-' + i;
        // kaartfoto en bannerfoto delen een naam; er is er telkens maar één zichtbaar
        c.querySelectorAll('.trip-card__img, .trip-card__detail-img').forEach(function (el) {
          el.style.viewTransitionName = 'trip-img-' + s + '-' + i;
        });
      });
    }

    // Eerst morphen de kaarten naar hun nieuwe vorm; pas daarna zakken de
    // dichtgeklapte kaarten zacht weg (is-focused), zodat beide bewegingen
    // elkaar niet kruisen.
    function settle() {
      selector.classList.toggle('is-focused', !!selector.querySelector('.trip-card.is-expanded'));
    }

    function animate(update) {
      selector.classList.remove('is-focused');
      if (canTransition && !reduceMotion.matches) {
        document.startViewTransition(update).finished.then(settle, settle);
      } else {
        update();
        settle();
      }
    }

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
    }

    cards.forEach(function (card) {
      var summaryBtn = card.querySelector('.trip-card__summary');
      var closeBtn = card.querySelector('.trip-card__close');

      if (summaryBtn) {
        summaryBtn.setAttribute('aria-expanded', 'false');
        summaryBtn.addEventListener('click', function () {
          animate(function () {
            if (card.classList.contains('is-expanded')) collapseAll();
            else expand(card);
          });
        });
      }
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          animate(collapseAll);
        });
      }
    });
  });
});
