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

    // Dichtgeklapte kaarten stappen terug (is-focused). Tijdens de overgang
    // gebeurt dat via de overgangslagen zelf, zodat het vervagen tegelijk met
    // het verschuiven start; daarna neemt de gewone CSS-klasse het over.
    var DIM = 0.42, FADE = 900;
    function dimmedNow(c) { return selector.classList.contains('is-focused') && c.classList.contains('is-collapsed'); }
    function settle() {
      selector.classList.toggle('is-focused', !!selector.querySelector('.trip-card.is-expanded'));
    }

    function animate(update) {
      if (!(canTransition && !reduceMotion.matches)) { update(); settle(); return; }
      var before = cards.map(function (c) { return dimmedNow(c) ? DIM : 1; });
      var vt = document.startViewTransition(function () {
        selector.classList.remove('is-focused');
        update();
      });
      vt.ready.then(function () {
        var anyOpen = cards.some(function (c) { return c.classList.contains('is-expanded'); });
        cards.forEach(function (c, i) {
          var to = anyOpen && c.classList.contains('is-collapsed') ? DIM : 1;
          if (before[i] === 1 && to === 1) return;
          ['trip-card-', 'trip-img-'].forEach(function (prefix) {
            document.documentElement.animate({ opacity: [before[i], to] }, {
              duration: FADE, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards',
              pseudoElement: '::view-transition-group(' + prefix + s + '-' + i + ')'
            });
          });
        });
      }).catch(function () {});
      vt.finished.then(function () {
        // eindtoestand zonder nog eens te animeren
        selector.classList.add('no-fade');
        settle();
        void selector.offsetWidth;
        selector.classList.remove('no-fade');
      });
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
