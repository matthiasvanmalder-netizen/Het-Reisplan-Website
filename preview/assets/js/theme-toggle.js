(function () {
  var KEY = 'hrp-theme';

  function apply(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
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
      return document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'Bekijk: Lichte versie'
        : 'Bekijk: Donkere versie';
    }

    btn.textContent = label();
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'default' : 'dark';
      apply(next);
      localStorage.setItem(KEY, next);
      btn.textContent = label();
    });
    document.body.appendChild(btn);
  });
})();
