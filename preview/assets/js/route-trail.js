/* Gouden reisstippellijn die de muis volgt in de hero van de homepagina.
   Een volgpunt loopt de muis zacht achterna (de "lag"), laat een stippelspoor
   achter en dat spoor vervaagt na ongeveer een seconde.
   Enkel met een echte muis, niet bij "minder beweging", en niet boven knoppen. */
(function () {
  var hero = document.querySelector('.hero-full');
  if (!hero || !window.matchMedia) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'route-trail';
  canvas.setAttribute('aria-hidden', 'true');
  hero.insertBefore(canvas, hero.querySelector('.hero-full__content'));
  var ctx = canvas.getContext('2d');

  var LIFE = 1400;        // hoe lang een stukje lijn zichtbaar blijft (ms)
  var FOLLOW = 0.14;      // hoe snel het volgpunt de muis inhaalt (lager = meer lag)
  var STEP = 3;           // minimale afstand tussen twee punten (px)
  var GOLD = '201,162,78';

  var dpr = 1, w = 0, h = 0;
  var target = null, head = null, points = [], running = false, visible = true;

  function resize() {
    var r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function start() { if (!running && visible) { running = true; requestAnimationFrame(frame); } }

  function frame(now) {
    if (target && head) {
      head.x += (target.x - head.x) * FOLLOW;
      head.y += (target.y - head.y) * FOLLOW;
      var last = points[points.length - 1];
      if (!last || Math.hypot(head.x - last.x, head.y - last.y) >= STEP) {
        points.push({ x: head.x, y: head.y, t: now });
      }
    }
    while (points.length && now - points[0].t > LIFE) points.shift();

    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    // zachte schaduw zodat het goud ook op lichte foto's leesbaar blijft
    ctx.shadowColor = 'rgba(15,23,43,.55)';
    ctx.shadowBlur = 4;
    ctx.lineWidth = 3.4;
    ctx.setLineDash([0.1, 11]);
    var dist = 0;
    for (var i = 1; i < points.length; i++) {
      var a = points[i - 1], b = points[i];
      var fade = 1 - (now - b.t) / LIFE;
      ctx.lineDashOffset = -dist;
      ctx.strokeStyle = 'rgba(' + GOLD + ',' + (Math.pow(fade, 1.5) * 0.95).toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      dist += Math.hypot(b.x - a.x, b.y - a.y);
    }
    // klein bolletje aan de kop van de lijn, zoals een punt op de kaart
    if (target && head) {
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(' + GOLD + ',.95)';
      ctx.beginPath(); ctx.arc(head.x, head.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(' + GOLD + ',.35)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(head.x, head.y, 9, 0, Math.PI * 2); ctx.stroke();
    }

    var settled = !target || (head && Math.hypot(target.x - head.x, target.y - head.y) < 0.5);
    if (points.length || !settled) { requestAnimationFrame(frame); } else { running = false; ctx.clearRect(0, 0, w, h); }
  }

  hero.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    // boven tekst-knoppen en links geen lijn, zodat klikken rustig blijft
    if (e.target.closest('a, button')) { target = null; head = null; return; }
    var r = hero.getBoundingClientRect();
    var p = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!head) head = { x: p.x, y: p.y };
    target = p;
    start();
  });
  hero.addEventListener('pointerleave', function () { target = null; head = null; });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (!visible) { target = null; head = null; points = []; ctx.clearRect(0, 0, w, h); }
    }).observe(hero);
  }
  if ('ResizeObserver' in window) { new ResizeObserver(resize).observe(hero); } else { addEventListener('resize', resize); }
  resize();
})();
