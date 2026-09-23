// Runs before the page paints: applies the saved theme so the page never flashes.
(function () {
  try {
    var saved = localStorage.getItem("viktorina-theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (e) {
    /* storage blocked – follow the system theme */
  }
})();
