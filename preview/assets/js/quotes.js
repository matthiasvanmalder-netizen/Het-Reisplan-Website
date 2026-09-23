document.addEventListener('DOMContentLoaded', function () {
  var textEl = document.getElementById('quote-text');
  var citeEl = document.getElementById('quote-cite');
  var dotsEl = document.getElementById('quote-dots');
  var card = document.getElementById('quote-card');
  var prevBtn = document.getElementById('quote-prev');
  var nextBtn = document.getElementById('quote-next');
  if (!textEl || !citeEl || !dotsEl || !card) return;

  var quotes = [
    { text: '“De wereld is een boek, en wie niet reist, leest slechts één bladzijde.”', cite: 'toegeschreven aan Augustinus' },
    { text: '“Reizen is het enige dat je koopt dat je rijker maakt.”', cite: '' },
    { text: '“Het leven is kort, en de wereld is groot.”', cite: '' },
    { text: '“Ik ben niet overal geweest, maar het staat op mijn lijstje.”', cite: '' },
    { text: '“Een schip in de haven is veilig, maar daar zijn schepen niet voor gebouwd.”', cite: 'John A. Shedd' },
    { text: '“Het leven is ofwel een dapper avontuur, of het is helemaal niets.”', cite: 'Helen Keller' }
  ];

  var current = 0;
  var timer = null;
  var INTERVAL = 6000;

  quotes.forEach(function (q, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Quote ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', function () {
      show(i);
      restart();
    });
    dotsEl.appendChild(dot);
  });

  function show(index) {
    current = (index + quotes.length) % quotes.length;
    textEl.classList.add('is-fading');
    window.setTimeout(function () {
      textEl.textContent = quotes[current].text;
      citeEl.textContent = quotes[current].cite;
      citeEl.style.display = quotes[current].cite ? '' : 'none';
      textEl.appendChild(citeEl);
      textEl.classList.remove('is-fading');
      Array.prototype.forEach.call(dotsEl.children, function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }, 350);
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function restart() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(next, INTERVAL);
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });

  card.addEventListener('mouseenter', function () { if (timer) window.clearInterval(timer); });
  card.addEventListener('mouseleave', restart);

  restart();
});
