// Theme toggle, button ripples, reveal-on-scroll and number count-up.
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  }

  function syncToggle() {
    var dark = currentTheme() === "dark";
    // Set the attribute so the right icon shows even when following the system
    root.setAttribute("data-theme", currentTheme());
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Įjungti šviesų režimą" : "Įjungti tamsų režimą");
  }

  if (toggle) {
    var hasSaved = false;
    try {
      hasSaved = !!localStorage.getItem("viktorina-theme");
    } catch (e) {}
    syncToggle();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      hasSaved = true;
      try {
        localStorage.setItem("viktorina-theme", next);
      } catch (e) {}
      syncToggle();
    });
    systemDark.addEventListener("change", function () {
      if (hasSaved) return;
      root.removeAttribute("data-theme");
      syncToggle();
    });
  }

  // Ripple on every button
  document.addEventListener("pointerdown", function (event) {
    var btn = event.target.closest(".btn, .option");
    if (!btn || btn.disabled || reduceMotion) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = event.clientX - rect.left - size / 2 + "px";
    ripple.style.top = event.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(ripple.remove.bind(ripple), 650);
  });

  // Count numbers up from 0
  function countUp(el, target) {
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    var startTime = null;
    var duration = 1100;
    function step(now) {
      if (!startTime) startTime = now;
      var p = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  window.viktorinaCountUp = countUp;

  var counters = document.querySelectorAll("[data-count]");
  var reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
    counters.forEach(function (el) {
      el.textContent = el.dataset.count;
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    revealObserver.observe(el);
  });

  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target, Number(entry.target.dataset.count));
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach(function (el) {
    countObserver.observe(el);
  });
})();
