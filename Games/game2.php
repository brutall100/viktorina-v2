<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/Games/gameStyle2.css" />
        <title>Įrašyk teisingą atsakymą</title>
    </head>

    <body>
        <div id="greeting">
            <?php
            session_start();
            $name = $_GET['name'];
            echo "<div> Labas $name, Jūs žaisite žaidimą SUSKAIČIUOK! </div>";
            ?>
        </div>
        
        <div class="container">
            <h2>Šiame žaidime gali laimėti nuo -200 iki +200 litų.</h2>
            <p id="question"></p>
            <input type="number" id="answer" maxlength="3" />
            <button type="button" id="checkBtn">Atsakymas</button>
            <p id="timer"></p>
            <button type="button" id="closeBtn">Pabėgti?</button>
        </div>
    </body>

<script>
const answerInput = document.getElementById('answer');

answerInput.addEventListener('input', () => {
  if (answerInput.value.length > 3 || answerInput.value > 200) {
    answerInput.value = 200;
  }
});

answerInput.addEventListener('keypress', (event) => {
  const keyCode = event.keyCode || event.which;
  const forbiddenKeys = [43, 45, 42, 47]; // Key codes for +, -, *, /

  if (forbiddenKeys.includes(keyCode)) {
    event.preventDefault();
  } else if (keyCode === 13) {
    document.getElementById('checkBtn').click();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  answerInput.focus();
});

document.getElementById('checkBtn').addEventListener('click', () => {
  const answer = answerInput.value;
  let points = 0;

  if (answer == result) {
    clearInterval(timer);
    points = result;
    const currency = getCurrencyWord(result, answer);
    const message = document.createElement('h2');
    message.textContent = `Teisingai! Uždirbai ${result} ${currency}.`;
    message.classList.add('message-style');
    document.body.appendChild(message);
    localStorage.removeItem('seconds');
  } else {
    clearInterval(timer);
    points = -answer;
    const currency2 = getCurrencyWord(result, answer);
    const message = document.createElement('h2');
    message.textContent = `Deje NE. Atsakymas buvo ${result}. Uždirbai -${answer} ${currency2}.`;
    message.classList.add('message-style');
    document.body.appendChild(message);
    localStorage.removeItem('seconds');
  }

  const data = {
    user_id_name: "<?php echo $name; ?>",
    points: points
  };

  fetch('http://localhost:5000/playGame.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });

  answerInput.disabled = true;
  setTimeout(() => {
    window.close();
  }, 3000);
});

let seconds = localStorage.getItem('seconds') ?? 20;

const timer = setInterval(() => {
  seconds--;
  
  if (seconds < 0) {
    clearInterval(timer);
    const message = document.createElement('h2');
    message.textContent = "Laikas baigėsi!";
    message.classList.add('message-style');
    document.body.appendChild(message);
    setTimeout(() => {
      window.close();
    }, 3000);
  } else {
    document.getElementById("timer").innerHTML = `Liko ${seconds} `;
    localStorage.setItem('seconds', seconds);
  }
}, 1000);

setTimeout(() => {
  localStorage.removeItem('seconds');
}, 3000);

const num1 = Math.floor(Math.random() * 100);
const num2 = Math.floor(Math.random() * 100);
const result = num1 + num2;
document.getElementById("question").innerHTML = `Kiek bus? ${num1} + ${num2}?`;

function getCurrencyWord(result, answer) {
        if (answer != result) {
            result = answer;
        }
        if ((result < 0) || (result > 200)) {
            return "Lt";
        } else if ((result % 10 === 1) && (result % 100 !== 11)) {
            return "Litą";
        } else if (((result % 10 >= 2) && (result % 10 <= 9)) || ((result % 100 >= 22) && (result % 100 <= 29))) {
            return "Litus";
        } else {
            return "litų";
        }
 }


 document.getElementById('closeBtn').addEventListener('click', () => {
    window.close();
});
</script>
</html>
