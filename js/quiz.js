// Demo quiz – runs fully in the browser (no server needed on GitHub Pages).
(function () {
  var questions = window.VIKTORINA_QUESTIONS || [];
  var $ = function (id) {
    return document.getElementById(id);
  };
  var els = {
    serial: $("serial"),
    progress: $("progress"),
    question: $("question"),
    options: $("options"),
    feedback: $("feedback"),
    next: $("next-btn"),
    body: $("quiz-body"),
    result: $("result"),
    restart: $("restart-btn"),
    wallet: $("wallet"),
    walletSum: $("wallet-sum"),
    prizeValue: $("prize-value"),
    prizeImg: $("prize-img"),
    resultSum: $("result-sum"),
    resultCorrect: $("result-correct")
  };
  if (!els.question || !questions.length) return;

  // Which banknote picture matches the value (like the original game).
  var notes = {
    1: { src: "images/litai/1-lt.webp", w: 360, h: 173, alt: "Vieno lito banknotas" },
    2: { src: "images/litai/2-lt.webp", w: 360, h: 173, alt: "Dviejų litų banknotas" },
    3: { src: "images/litai/2-lt.webp", w: 360, h: 173, alt: "Dviejų litų banknotas ir litas" },
    4: { src: "images/litai/2-lt.webp", w: 360, h: 173, alt: "Du dviejų litų banknotai" },
    5: { src: "images/litai/5-lt.webp", w: 360, h: 172, alt: "Penkių litų banknotas" }
  };
  var keys = ["A", "B", "C", "D"];
  var state;

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function start() {
    state = { order: shuffle(questions), index: 0, sum: 0, correct: 0, value: 0 };
    els.walletSum.textContent = "0";
    els.result.hidden = true;
    els.body.hidden = false;
    render();
  }

  function render() {
    var q = state.order[state.index];
    var number = state.index + 1;
    state.value = 1 + Math.floor(Math.random() * 5);

    els.serial.textContent = "Nr. VK-" + String(number).padStart(2, "0") + " / " + state.order.length;
    els.progress.style.transform = "scaleX(" + state.index / state.order.length + ")";
    els.question.textContent = q.question;
    els.feedback.textContent = "";
    els.feedback.className = "feedback";
    els.next.disabled = true;
    els.next.firstChild.textContent =
      number === state.order.length ? "Rezultatas " : "Kitas klausimas ";

    var note = notes[state.value];
    els.prizeValue.textContent = state.value;
    els.prizeImg.src = note.src;
    els.prizeImg.width = note.w;
    els.prizeImg.height = note.h;
    els.prizeImg.alt = note.alt;
    els.prizeImg.classList.remove("is-new");
    void els.prizeImg.offsetWidth; // restart the animation
    els.prizeImg.classList.add("is-new");

    els.options.innerHTML = "";
    q.options.forEach(function (text, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.dataset.index = i;
      btn.innerHTML = '<span class="option__key" aria-hidden="true">' + keys[i] + "</span>";
      btn.appendChild(document.createTextNode(text));
      btn.addEventListener("click", choose);
      li.appendChild(btn);
      els.options.appendChild(li);
    });
  }

  function choose(event) {
    var btn = event.currentTarget;
    var q = state.order[state.index];
    var picked = Number(btn.dataset.index);
    var buttons = els.options.querySelectorAll(".option");

    buttons.forEach(function (b) {
      b.disabled = true;
      if (Number(b.dataset.index) === q.answer) b.classList.add("is-correct");
    });

    if (picked === q.answer) {
      state.sum += state.value;
      state.correct += 1;
      els.feedback.textContent = "Teisingai! +" + state.value + " Lt į piniginę.";
      els.feedback.className = "feedback is-ok";
      flyCoins(btn, state.value);
      setTimeout(function () {
        els.walletSum.textContent = state.sum;
        els.wallet.classList.remove("is-bump");
        void els.wallet.offsetWidth;
        els.wallet.classList.add("is-bump");
      }, 650);
    } else {
      btn.classList.add("is-wrong");
      els.feedback.textContent = "Deja, ne. Teisingas atsakymas: " + q.options[q.answer] + ".";
      els.feedback.className = "feedback is-bad";
    }
    els.next.disabled = false;
    els.next.focus({ preventScroll: true });
  }

  // Micro-effect: coins fly from the answer into the wallet.
  function flyCoins(from, amount) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var a = from.getBoundingClientRect();
    var b = els.wallet.getBoundingClientRect();
    for (var i = 0; i < amount; i++) {
      var coin = document.createElement("span");
      coin.className = "fly-coin";
      coin.textContent = "Lt";
      coin.setAttribute("aria-hidden", "true");
      var x = a.left + a.width / 2 + (Math.random() - 0.5) * 60;
      var y = a.top + a.height / 2;
      coin.style.left = x + "px";
      coin.style.top = y + "px";
      coin.style.setProperty("--tx", b.left + 18 - x + "px");
      coin.style.setProperty("--ty", b.top + b.height / 2 - y + "px");
      coin.style.animationDelay = i * 70 + "ms";
      document.body.appendChild(coin);
      setTimeout(coin.remove.bind(coin), 1000 + i * 70);
    }
  }

  function next() {
    state.index += 1;
    if (state.index >= state.order.length) {
      finish();
      return;
    }
    render();
    els.question.focus({ preventScroll: true });
  }

  function finish() {
    els.progress.style.transform = "scaleX(1)";
    els.serial.textContent = "Nr. VK-" + state.order.length + " / " + state.order.length;
    els.body.hidden = true;
    els.result.hidden = false;
    els.resultCorrect.textContent = state.correct;
    if (window.viktorinaCountUp) {
      window.viktorinaCountUp(els.resultSum, state.sum);
    } else {
      els.resultSum.textContent = state.sum;
    }
    els.restart.focus({ preventScroll: true });
  }

  els.next.addEventListener("click", next);
  els.restart.addEventListener("click", start);
  start();
})();
