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
  var triggers = document.querySelectorAll('.line-card, .mini-dest-card');

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
    var name = card.getAttribute('data-name') || '';
    var tagline = card.getAttribute('data-tagline') || '';
    var desc = card.getAttribute('data-desc') || '';
    var signature = card.getAttribute('data-signature') || '';
    var idealFor = card.getAttribute('data-ideal-for') || '';
    var img = card.getAttribute('data-img') || '';

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
      imgEl.style.filter = card.getAttribute('data-invert') === 'true' ? 'invert(1)' : '';
      if (imgWrapEl) {
        imgWrapEl.style.display = '';
        // .line-card wordt hergebruikt voor twee dingen: rederijlogo's
        // (transparante achtergrond, plain .line-grid) en reistype-
        // kaarten met een echte foto (.line-grid--thumbs). Enkel de
        // logo's hebben de lichte achtergrond nodig.
        var isLogo = card.classList.contains('line-card') && !card.closest('.line-grid--thumbs');
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
