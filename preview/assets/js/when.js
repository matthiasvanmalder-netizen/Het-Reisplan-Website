document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('.when');
  if (!root) return;

  var MONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli',
    'augustus', 'september', 'oktober', 'november', 'december'];
  var LABELS = { b: 'Ideaal', g: 'Goed', l: 'Minder geschikt' };
  var rows = Array.prototype.slice.call(root.querySelectorAll('.when-row'));
  var monthBtns = Array.prototype.slice.call(root.querySelectorAll('.when__months button'));
  var detail = root.querySelector('.when__detail');
  var status = root.querySelector('.when__status');
  var mobile = window.matchMedia('(max-width: 860px)');
  var activeMonth = null;

  // Aaneengesloten maanden als leesbare tekst, ook over de jaarwissel heen (bv. "november tot maart")
  function monthsText(code, level) {
    var set = {};
    var count = 0;
    for (var i = 0; i < 12; i++) if (code[i] === level) { set[i] = true; count++; }
    if (!count) return '';
    if (count === 12) return 'het hele jaar';
    var parts = [];
    for (var m = 0; m < 12; m++) {
      if (!set[m] || set[(m + 11) % 12]) continue;
      var end = m, len = 1;
      while (set[(end + 1) % 12]) { end = (end + 1) % 12; len++; }
      parts.push({ start: m, text: len === 1 ? MONTHS[m] : len === 2 ? MONTHS[m] + ' en ' + MONTHS[end] : MONTHS[m] + ' tot ' + MONTHS[end] });
    }
    parts = parts.map(function (p) { return p.text; });
    if (parts.length === 1) return parts[0];
    var last = parts.pop();
    return parts.join(', ') + (last.indexOf(' en ') > -1 ? ', ' : ' en ') + last;
  }

  function nameOf(row) { return row.querySelector('.when-row__name').textContent; }
  function panelOf(row) { return document.getElementById(row.getAttribute('aria-controls')); }

  rows.forEach(function (row) {
    var code = row.dataset.months;
    var cells = row.querySelector('.when-row__months');
    cells.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 12; i++) {
      var c = document.createElement('span');
      c.className = 'when-cell when-cell--' + code[i];
      cells.appendChild(c);
    }
    var sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = ['b', 'g'].map(function (l) {
      var t = monthsText(code, l);
      return t ? LABELS[l] + ': ' + t : '';
    }).filter(Boolean).join('. ') + '.';
    cells.after(sr);

    var best = panelOf(row).querySelector('[data-best]');
    if (best) {
      var t = monthsText(code, 'b');
      best.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    }
  });

  function place(panel, row) {
    if (mobile.matches) row.after(panel);
    else if (panel.parentNode !== detail) detail.appendChild(panel);
  }

  function select(row) {
    var open = row.getAttribute('aria-expanded') === 'true';
    // op mobiel werkt een rij als uitklapper: tweede tik sluit het paneel weer
    if (open && mobile.matches) {
      row.setAttribute('aria-expanded', 'false');
      panelOf(row).hidden = true;
      return;
    }
    rows.forEach(function (r) {
      var active = r === row;
      r.setAttribute('aria-expanded', active ? 'true' : 'false');
      panelOf(r).hidden = !active;
    });
    place(panelOf(row), row);
  }

  function setMonth(m) {
    activeMonth = activeMonth === m ? null : m;
    monthBtns.forEach(function (b, i) { b.setAttribute('aria-pressed', i === activeMonth ? 'true' : 'false'); });
    rows.forEach(function (r) {
      var level = activeMonth === null ? null : r.dataset.months[activeMonth];
      r.classList.toggle('is-dim', level === 'l');
      Array.prototype.forEach.call(r.querySelectorAll('.when-cell'), function (c, i) {
        c.classList.toggle('is-col', i === activeMonth);
      });
    });
    if (activeMonth === null) { status.textContent = ''; return; }
    var ideal = rows.filter(function (r) { return r.dataset.months[activeMonth] === 'b'; }).map(nameOf);
    var good = rows.filter(function (r) { return r.dataset.months[activeMonth] === 'g'; }).map(nameOf);
    var text = 'In ' + MONTHS[activeMonth] + ': ';
    text += ideal.length ? 'ideaal voor ' + ideal.join(', ') : 'geen bestemming op haar best';
    if (good.length) text += '. Ook goed: ' + good.join(', ');
    status.textContent = text + '.';
  }

  rows.forEach(function (row) { row.addEventListener('click', function () { select(row); }); });
  monthBtns.forEach(function (b, i) { b.addEventListener('click', function () { setMonth(i); }); });

  mobile.addEventListener('change', function () {
    rows.forEach(function (r) {
      var p = panelOf(r);
      if (mobile.matches && r.getAttribute('aria-expanded') === 'true') r.after(p);
      else if (!mobile.matches && p.parentNode !== detail) detail.appendChild(p);
    });
  });
});
