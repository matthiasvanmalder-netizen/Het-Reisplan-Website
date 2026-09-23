(function () {
  var KEY = 'hrp-theme';

  function apply(theme) {
    if (theme === 'gold') {
      document.documentElement.setAttribute('data-theme', 'gold');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  var urlTheme = new URLSearchParams(window.location.search).get('theme');
  var stored = localStorage.getItem(KEY);
  var theme = urlTheme || stored || 'default';
  apply(theme);
  if (urlTheme) localStorage.setItem(KEY, urlTheme);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';

    function label() {
      return document.documentElement.getAttribute('data-theme') === 'gold'
        ? 'Bekijk: Indigo versie'
        : 'Bekijk: Navy & Goud versie';
    }

    btn.textContent = label();
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'gold' ? 'default' : 'gold';
      apply(next);
      localStorage.setItem(KEY, next);
      btn.textContent = label();
    });
    document.body.appendChild(btn);
  });
})();
