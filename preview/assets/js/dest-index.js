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

  items.forEach(function (el, i) {
    el.addEventListener('mouseenter', function () { activate(i); });
    el.addEventListener('focus', function () { activate(i); });
  });
})();
