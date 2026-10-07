/* Reisinhoudstafel op de homepagina: de aangewezen reisvorm wordt actief
   en de grote foto rechts vloeit over naar die reisvorm. */
(function () {
  var root = document.querySelector('.dest-index');
  if (!root) return;
  var items = Array.prototype.slice.call(root.querySelectorAll('.dest-index__item'));
  var images = Array.prototype.slice.call(root.querySelectorAll('.dest-index__visual img'));

  function activate(i) {
    items.forEach(function (el, n) { el.classList.toggle('is-active', n === i); });
    images.forEach(function (el, n) { el.classList.toggle('is-active', n === i); });
  }

  // Elke omschrijving krijgt de hoogte van de langste, zodat de lijst (en dus
  // de foto ernaast) even hoog blijft, welke reisvorm ook open staat.
  var list = root.querySelector('.dest-index__list');
  var lines = Array.prototype.slice.call(root.querySelectorAll('.dest-index__line'));
  function sizeLines() {
    list.style.removeProperty('--line-h');
    var w = items[0].clientWidth;
    var h = 0;
    lines.forEach(function (el) {
      el.style.width = w + 'px';
      h = Math.max(h, el.scrollHeight);
      el.style.width = '';
    });
    if (h) list.style.setProperty('--line-h', h + 'px');
  }
  sizeLines();
  window.addEventListener('resize', sizeLines);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeLines);

  items.forEach(function (el, i) {
    el.addEventListener('mouseenter', function () { activate(i); });
    el.addEventListener('focus', function () { activate(i); });
  });
})();
