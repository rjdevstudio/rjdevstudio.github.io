(function () {
  document.documentElement.classList.add('js');
  var year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
