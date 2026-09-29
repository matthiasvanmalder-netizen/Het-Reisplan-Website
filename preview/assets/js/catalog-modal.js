document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('cruise-modal');
  if (!overlay) return;

  var imgEl = document.getElementById('cruise-modal-img');
  var imgWrapEl = document.getElementById('cruise-modal-img-wrap');
  var taglineEl = document.getElementById('cruise-modal-tagline');
  var titleEl = document.getElementById('cruise-modal-title');
  var descEl = document.getElementById('cruise-modal-desc');
  var signatureWrapEl = document.getElementById('cruise-modal-signature-wrap');
  var signatureEl = document.getElementById('cruise-modal-signature');
  var idealforWrapEl = document.getElementById('cruise-modal-idealfor-wrap');
  var idealforEl = document.getElementById('cruise-modal-idealfor');
  var ctaEl = document.getElementById('cruise-modal-cta');
  var closeBtn = document.getElementById('cruise-modal-close');
  var triggers = document.querySelectorAll('.line-card, .mini-dest-card, [data-line]');

  function fillFact(wrapEl, textEl, value) {
    if (!wrapEl || !textEl) return;
    if (value) {
      textEl.textContent = value;
      wrapEl.style.display = '';
    } else {
      wrapEl.style.display = 'none';
    }
  }

  function open(card) {
    // Een rederij kan onder meerdere cruisetypes staan; haar gegevens staan
    // dan een keer in #cruise-line-data en de knop verwijst ernaar via data-line.
    var ref = card.getAttribute('data-line');
    var src = ref ? document.querySelector('[data-line-id="' + ref + '"]') : card;
    if (!src) return;
    var name = src.getAttribute('data-name') || '';
    var tagline = src.getAttribute('data-tagline') || '';
    var desc = src.getAttribute('data-desc') || '';
    var signature = src.getAttribute('data-signature') || '';
    var idealFor = src.getAttribute('data-ideal-for') || '';
    var img = src.getAttribute('data-img') || '';

    titleEl.textContent = name;
    descEl.textContent = desc;
    fillFact(signatureWrapEl, signatureEl, signature);
    fillFact(idealforWrapEl, idealforEl, idealFor);

    if (tagline) {
      taglineEl.textContent = tagline;
      taglineEl.style.display = '';
    } else {
      taglineEl.style.display = 'none';
    }

    if (img) {
      imgEl.src = img;
      imgEl.alt = name;
      imgEl.style.display = '';
      imgEl.style.filter = src.getAttribute('data-invert') === 'true' ? 'invert(1)' : '';
      if (imgWrapEl) {
        imgWrapEl.style.display = '';
        // .line-card wordt hergebruikt voor twee dingen: rederijlogo's
        // (transparante achtergrond, plain .line-grid) en reistype-
        // kaarten met een echte foto (.line-grid--thumbs). Enkel de
        // logo's hebben de lichte achtergrond nodig.
        var isLogo = !!ref || (card.classList.contains('line-card') && !card.closest('.line-grid--thumbs'));
        imgWrapEl.classList.toggle('modal-card__img-wrap--logo', isLogo);
      }
    } else if (imgWrapEl) {
      imgWrapEl.style.display = 'none';
    } else {
      imgEl.style.display = 'none';
    }

    ctaEl.href = 'contact.html?interesse=' + encodeURIComponent(name);

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  triggers.forEach(function (card) {
    card.addEventListener('click', function () { open(card); });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
});
