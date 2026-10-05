document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('cruise-modal');
  if (!overlay) return;

  var dialog = overlay.querySelector('.modal-card');
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
  // rederijknoppen; hun gegevens staan een keer in #cruise-line-data
  var triggers = document.querySelectorAll('[data-line]');
  var lastTrigger = null;

  function fillFact(wrapEl, textEl, value) {
    if (!wrapEl || !textEl) return;
    if (value) {
      textEl.textContent = value;
      wrapEl.style.display = '';
    } else {
      wrapEl.style.display = 'none';
    }
  }

  function open(trigger) {
    var src = document.querySelector('[data-line-id="' + trigger.getAttribute('data-line') + '"]');
    if (!src) return;
    var name = src.getAttribute('data-name') || '';
    var tagline = src.getAttribute('data-tagline') || '';
    var img = src.getAttribute('data-img') || '';

    titleEl.textContent = name;
    descEl.textContent = src.getAttribute('data-desc') || '';
    fillFact(signatureWrapEl, signatureEl, src.getAttribute('data-signature') || '');
    fillFact(idealforWrapEl, idealforEl, src.getAttribute('data-ideal-for') || '');

    taglineEl.textContent = tagline;
    taglineEl.style.display = tagline ? '' : 'none';

    if (img) {
      imgEl.src = img;
      imgEl.alt = name;
      imgEl.style.display = '';
      imgEl.style.filter = src.getAttribute('data-invert') === 'true' ? 'invert(1)' : '';
      // logo's zijn voor een witte ondergrond gemaakt
      imgWrapEl.classList.add('modal-card__img-wrap--logo');
      imgWrapEl.style.display = '';
    } else {
      imgWrapEl.style.display = 'none';
    }

    ctaEl.href = 'contact.html?interesse=' + encodeURIComponent(name);

    lastTrigger = trigger;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    if (!overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    // terug naar de knop waarmee de uitleg werd geopend
    if (lastTrigger) lastTrigger.focus();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () { open(trigger); });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    // Tab blijft binnen het venster zolang het open is
    if (e.key === 'Tab') {
      var focusables = dialog.querySelectorAll('button, a[href]');
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
});
