/* Bouwt de voorbeeldreizen op uit trips-data.js:
   - reispagina's:    <div class="trip-selector" data-trip-category="safari"></div>
                      (open- en dichtklappen doet trip-plans.js)
   - Voorbeeldreizen: <div data-trip-gallery> met filters, kaarten en een venster per reis
   - homepage:        <div data-trip-featured="douro,oeganda,..."> met kaarten die doorlinken
   Draait meteen bij het laden (staat onderaan de pagina, vóór trip-plans.js). */
(function () {
  var trips = window.TRIPS || [];
  var cats = window.TRIP_CATEGORIES || {};
  function byId(id) { for (var i = 0; i < trips.length; i++) if (trips[i].id === id) return trips[i]; return null; }

  // het volledige reisplan: route, dagen, uitleg en knop
  function planHtml(t) {
    var days = t.days.map(function (d) {
      return '<li><span class="trip-timeline__day">' + d[0] + '</span><b>' + d[1] + '</b><p>' + d[2] + '</p></li>';
    }).join('');
    return '<div class="trip-route">' +
        '<p class="trip-route__line"><strong>' + t.from + '</strong><span class="trip-route__dash" aria-hidden="true"></span><strong>' + t.to + '</strong></p>' +
        '<p class="trip-route__how">' + t.how + '</p>' +
      '</div>' +
      '<ol class="trip-timeline">' + days + '</ol>' +
      '<p class="trip-card__plan-note">' + t.note + '</p>' +
      '<a class="btn btn--accent" href="' + t.ctaHref + '">' + t.cta + '</a>';
  }

  /* 1. Reispagina's: dezelfde kaarten als voorheen */
  function tripCard(t) {
    var tag = t.placeholder ? ' <span class="tag">placeholder</span>' : '';
    var img = '<img loading="lazy" decoding="async" src="' + t.img + '" alt="' + t.imgAlt + '">';
    return '<div class="trip-card" id="reis-' + t.id + '">' +
      '<button type="button" class="trip-card__summary">' +
        '<span class="trip-card__img">' + img + '</span>' +
        '<span class="trip-card__meta">' +
          '<span class="trip-card__kicker">' + t.kicker + tag + '</span>' +
          '<span class="trip-card__title">' + t.title + '</span>' +
          '<span class="trip-card__desc">' + t.desc + '</span>' +
          '<span class="trip-card__hint">' + (t.placeholder ? 'Bekijk voorbeeldreisplan' : 'Bekijk het reisplan') + '</span>' +
        '</span>' +
      '</button>' +
      '<div class="trip-card__detail">' +
        '<div class="trip-card__detail-img">' + img + '</div>' +
        '<div class="trip-card__detail-body">' +
          '<div class="trip-card__detail-head">' +
            '<div><span class="trip-card__kicker">' + t.kicker + tag + '</span><h3>' + t.title + '</h3></div>' +
            '<button type="button" class="btn btn--ghost btn--sm trip-card__close">Sluiten</button>' +
          '</div>' +
          planHtml(t) +
        '</div>' +
      '</div>' +
    '</div>';
  }
  document.querySelectorAll('[data-trip-category]').forEach(function (el) {
    var cat = el.getAttribute('data-trip-category');
    el.innerHTML = trips.filter(function (t) { return t.category === cat; }).map(tripCard).join('');
  });

  /* Kaart voor het overzicht en de homepage (enkel echte reizen) */
  function tile(t, tagName, attrs) {
    return '<' + tagName + ' class="trip-tile" ' + attrs + ' data-cat="' + t.category + '">' +
      '<span class="trip-tile__img"><img loading="lazy" decoding="async" src="' + t.img + '" alt=""></span>' +
      '<span class="trip-tile__body">' +
        '<span class="trip-tile__cat">' + t.kicker + '</span>' +
        '<span class="trip-tile__title">' + t.title + '</span>' +
        '<span class="trip-tile__desc">' + t.desc + '</span>' +
      '</span>' +
    '</' + tagName + '>';
  }
  var real = trips.filter(function (t) { return !t.placeholder; });

  /* 2. Homepage: een selectie die doorlinkt naar Voorbeeldreizen */
  document.querySelectorAll('[data-trip-featured]').forEach(function (el) {
    el.innerHTML = el.getAttribute('data-trip-featured').split(',').map(byId).filter(function (t) { return t && !t.placeholder; })
      .map(function (t) { return tile(t, 'a', 'href="voorbeeldreizen.html#' + t.id + '"'); }).join('');
    rail(el);
  });

  /* Rij die je met de muis opzij sleept of met het scrollwiel doorloopt.
     Op aanraakschermen gewoon vegen (de browser doet dat zelf). */
  function rail(el) {
    var section = el.closest('section');
    var arrows = section ? section.querySelectorAll('.trip-featured__arrow') : [];
    el.querySelectorAll('img').forEach(function (img) { img.draggable = false; });

    function step() {
      var card = el.querySelector('.trip-tile');
      return card ? card.getBoundingClientRect().width + 20 : 300;
    }
    function update() {
      var max = el.scrollWidth - el.clientWidth - 2;
      el.classList.toggle('is-start', el.scrollLeft <= 2);
      el.classList.toggle('is-end', el.scrollLeft >= max);
      arrows.forEach(function (a) {
        a.disabled = a.getAttribute('data-dir') === '-1' ? el.scrollLeft <= 2 : el.scrollLeft >= max;
      });
    }
    arrows.forEach(function (a) {
      a.addEventListener('click', function () {
        el.scrollBy({ left: step() * Number(a.getAttribute('data-dir')), behavior: 'smooth' });
      });
    });
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // slepen met de muis
    var down = false, moved = false, startX = 0, startLeft = 0;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; el.classList.add('is-dragging'); }
      if (moved) el.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      el.classList.remove('is-dragging');
    });
    // na het slepen geen klik doorlaten (anders opent er per ongeluk een reis)
    el.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    // scrollwiel: verticaal scrollen schuift de rij opzij, tot aan het einde
    el.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      var max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY > 0 && el.scrollLeft >= max - 1) || (e.deltaY < 0 && el.scrollLeft <= 1)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }, { passive: false });

    // pijltjestoetsen als de rij focus heeft
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        el.scrollBy({ left: step() * (e.key === 'ArrowRight' ? 1 : -1), behavior: 'smooth' });
      }
    });
  }

  /* 3. Voorbeeldreizen: filters, kaarten en het reisplan in een venster */
  var gallery = document.querySelector('[data-trip-gallery]');
  if (!gallery) return;
  var grid = gallery.querySelector('.trip-gallery__grid');
  var filters = gallery.querySelectorAll('[data-filter]');
  var dialog = document.getElementById('trip-dialog');
  var dialogInner = dialog.querySelector('.trip-dialog__inner');
  var lastTile = null;

  grid.innerHTML = real.map(function (t) { return tile(t, 'button', 'type="button" data-trip="' + t.id + '"'); }).join('');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      grid.querySelectorAll('.trip-tile').forEach(function (el) {
        el.hidden = f !== 'alle' && el.getAttribute('data-cat') !== f;
      });
    });
  });

  function open(id, fromTile) {
    var t = byId(id);
    if (!t || t.placeholder) return;
    dialogInner.innerHTML =
      '<div class="trip-card__detail-img"><img decoding="async" src="' + t.img + '" alt="' + t.imgAlt + '"></div>' +
      '<div class="trip-card__detail-body">' +
        '<div class="trip-card__detail-head">' +
          '<div><span class="trip-card__kicker">' + t.kicker + '</span><h2 id="trip-dialog-title">' + t.title + '</h2></div>' +
          '<button type="button" class="btn btn--ghost btn--sm" data-close>Sluiten</button>' +
        '</div>' +
        planHtml(t) +
      '</div>';
    lastTile = fromTile || grid.querySelector('[data-trip="' + id + '"]');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  }
  function close() { if (dialog.open) dialog.close(); }

  grid.addEventListener('click', function (e) {
    var el = e.target.closest('[data-trip]');
    if (el) open(el.getAttribute('data-trip'), el);
  });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.closest('[data-close]')) close();
  });
  dialog.addEventListener('close', function () {
    if (history.replaceState) history.replaceState(null, '', location.pathname);
    if (lastTile) lastTile.focus();
  });

  // rechtstreeks naar een reis via de homepage (voorbeeldreizen.html#douro)
  if (location.hash.length > 1) open(location.hash.slice(1));
  window.addEventListener('hashchange', function () {
    if (location.hash.length > 1) open(location.hash.slice(1));
  });
})();
