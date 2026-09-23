// "Litų lietus" – live background: falling banknotes, spinning coins and
// floating question marks over a slowly turning guilloche rosette.
// Only transform and opacity are animated; everything is pointer-events: none.
(function () {
  var bg = document.getElementById("live-bg");
  var rosette = document.getElementById("rosette");
  if (!bg) return;

  // Guilloche rosette – the engraved pattern found on real banknotes.
  if (rosette) {
    var paths = "";
    for (var ring = 0; ring < 5; ring++) {
      var d = "";
      var base = 120 + ring * 70;
      var petals = 18 + ring * 6;
      for (var i = 0; i <= 720; i++) {
        var t = (i / 720) * Math.PI * 2;
        var r = base + 26 * Math.sin(petals * t) + 10 * Math.sin((petals / 2) * t + ring);
        d += (i ? "L" : "M") + (500 + r * Math.cos(t)).toFixed(1) + " " + (500 + r * Math.sin(t)).toFixed(1);
      }
      paths += '<path d="' + d + 'Z"/>';
    }
    rosette.innerHTML =
      '<svg viewBox="0 0 1000 1000" fill="none" stroke="currentColor" stroke-width="1.2">' + paths + "</svg>";
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // keep the static glow only

  var isSmall = window.matchMedia("(max-width: 700px)").matches;
  var count = isSmall ? 11 : 22; // half the particles on phones
  var rand = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var frag = document.createDocumentFragment();
  for (var n = 0; n < count; n++) {
    var roll = Math.random();
    var type = roll < 0.4 ? "note" : roll < 0.8 ? "coin" : "mark";
    var el = document.createElement("span");
    var inner = document.createElement("span");
    el.className = "particle particle--" + type;
    inner.className = "particle__spin";

    var size =
      type === "note" ? rand(34, 64) : type === "coin" ? rand(16, 30) : rand(22, 42);
    if (type === "coin") inner.textContent = "Lt";
    if (type === "mark") inner.textContent = "?";

    el.style.left = rand(-5, 100) + "vw";
    el.style.setProperty("--w", size.toFixed(0) + "px");
    el.style.setProperty("--dur", rand(16, 30).toFixed(1) + "s");
    el.style.setProperty("--delay", (-rand(0, 30)).toFixed(1) + "s");
    el.style.setProperty("--drift", rand(-18, 18).toFixed(1) + "vw");
    el.style.setProperty("--r0", rand(-40, 40).toFixed(0) + "deg");
    el.style.setProperty("--r1", rand(-220, 220).toFixed(0) + "deg");
    el.style.setProperty("--spin", rand(0.9, 2.6).toFixed(2) + "s");

    el.appendChild(inner);
    frag.appendChild(el);
  }
  bg.appendChild(frag);

  // Pause the animation when the tab is hidden – saves battery.
  document.addEventListener("visibilitychange", function () {
    bg.style.display = document.hidden ? "none" : "";
  });
})();
