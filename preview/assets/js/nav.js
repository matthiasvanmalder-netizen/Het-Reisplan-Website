document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Escape sluit het gsm-menu en zet de focus terug op de menuknop
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // een link kiezen sluit het menu (ook bij een link naar een plek op dezelfde pagina)
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // het uitklapmenu "Reizen" sluit bij een klik ernaast
  var dest = document.querySelector('.nav-dest');
  if (dest) {
    document.addEventListener('click', function (e) {
      if (dest.open && !dest.contains(e.target)) dest.open = false;
    });
  }
});
