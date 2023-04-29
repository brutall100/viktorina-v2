<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/Games/gameStyle1.css" />
  <title>Pasirink prizą</title>
</head>

<?php
  session_start();
  $name = $_GET['name'];
  echo "$name, laimėjai žaidimą pasirink prizą";
?>

<body>

  <h3>Šiame žaidime gali laimėti iki 500 litų. Prarasti gali iki 100 litų.</h3>
  <div class="box-container">
    <div class="box" id="box1"></div>
    <div class="box" id="box2"></div>
    <div class="box" id="box3"></div>
  </div>

  <div id="message1"></div>
  <div id="message"></div>

<script>
const randomValues = [gameLitai(), gameLitai(), gameLitai()];
let selectedBox = null;
let countdown = 10;   //lango uzdarymo laikas s

function gameLitai() {
  return Math.floor(Math.random() * 601) - 100;
}

function showValues() {
  box1.innerHTML = randomValues[0] + " points";
  box2.innerHTML = randomValues[1] + " points";
  box3.innerHTML = randomValues[2] + " points";
}

function showMessage(boxNumber) {
  let points = parseInt(selectedBox.innerHTML);
  let word;
    if (points % 10 === 1 && points % 100 !== 11) {
    word = "Litą";
  } else if (points % 10 >= 2 && points % 10 <= 9 && (points % 100 < 10 || points % 100 >= 20)) {
    word = "Litus";
  } else {
    word = "Litų";
  }
  if (selectedBox.innerHTML.includes("-")) {
      word = "Lt";
}





  message1.innerHTML = `Jūs pasirinkote ${boxNumber} dėžutę. Radote ${points} ${word}.`;

  // Send data to server
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
}


function startCountdown() {
  countdown--;
  if (countdown > 0) {
    message.innerHTML = `Langas užsidarys po ${countdown} sekundžių.`;
    setTimeout(startCountdown, 1000);
  } else {
    window.close();
  }
}

var box1 = document.getElementById("box1");
var box1ClickHandler = function() {
  selectedBox = box1;
  box1.innerHTML = randomValues[0] + " LITAI";
  box2.innerHTML = randomValues[1] + " LITAI";
  box3.innerHTML = randomValues[2] + " LITAI";
  box2.classList.add('unclickable');
  box3.classList.add('unclickable');
  showMessage(1);
  startCountdown();
};
box1.addEventListener("click", box1ClickHandler);

var box2 = document.getElementById("box2");
var box2ClickHandler = function() {
  selectedBox = box2;
  box2.innerHTML = randomValues[1] + " LITAI";
  box1.innerHTML = randomValues[0] + " LITAI";
  box3.innerHTML = randomValues[2] + " LITAI";
  box1.classList.add('unclickable');
  box3.classList.add('unclickable');
  showMessage(2);
  startCountdown();
};
box2.addEventListener("click", box2ClickHandler);

var box3 = document.getElementById("box3");
var box3ClickHandler = function() {
  selectedBox = box3;
  box3.innerHTML = randomValues[2] + " LITAI";
  box1.innerHTML = randomValues[0] + " LITAI";
  box2.innerHTML = randomValues[1] + " LITAI";
  box1.classList.add('unclickable');
  box2.classList.add('unclickable');
  showMessage(3);
  startCountdown();
};
box3.addEventListener("click", box3ClickHandler);

// Assign initial values to the boxes
box1.innerHTML = "???";
box2.innerHTML = "???";
box3.innerHTML = "???";

</script>
</body>
</html>
