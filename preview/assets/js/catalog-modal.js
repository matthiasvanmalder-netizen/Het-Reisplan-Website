document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('cruise-modal');
  if (!overlay) return;

  var imgEl = document.getElementById('cruise-modal-img');
  var taglineEl = document.getElementById('cruise-modal-tagline');
  var titleEl = document.getElementById('cruise-modal-title');
  var descEl = document.getElementById('cruise-modal-desc');
  var ctaEl = document.getElementById('cruise-modal-cta');
  var closeBtn = document.getElementById('cruise-modal-close');
  var triggers = document.querySelectorAll('.line-card, .mini-dest-card');

  function open(card) {
    var name = card.getAttribute('data-name') || '';
    var tagline = card.getAttribute('data-tagline') || '';
    var desc = card.getAttribute('data-desc') || '';
    var img = card.getAttribute('data-img') || '';

    titleEl.textContent = name;
    descEl.textContent = desc;

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
