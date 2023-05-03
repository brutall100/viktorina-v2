<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/Games/gameStyle3.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Papildomas Klausimas</title>
  </head>

  <?php
    session_start();
    $name = $_GET['name'];
    echo "<div> Labas $name, Jūs gavote progą atsakyti į papildomą klausimą.</div>";
  ?>

  <body>
    <div class="container"> 
      <header>
        <h2>Šiame žaidime gali laimėti nuo 5 minučių BAN iki +300 litų.</h2>
      </header>



      <main>
        <div id="question-container">
          <div id="question"></div>
          <div id="answer-asteriks"></div>
        </div>
  
        <div id="answer-container">
          <label for="answer-input">Answer:</label>
          <input type="text" id="answer-input" maxlength="50">
          <button id="submit-answer">Submit</button>
        </div>
      </main>

      

      <footer>
        <div id="winning-message"></div>
        <div id="closeMessage" class="message-close"></div>
      </footer>
    </div>
    


    <script>
$(document).ready(() => {
  $.get('http://localhost:7000/game3_server', data => {
    const actualAnswer = data.answer
    const serverAnswer = data.answer.toLowerCase();
    const words = serverAnswer.split(' ');
    let hiddenAnswer = '';
    for (let i = 0; i < words.length; i++) {
      hiddenAnswer += `${'*'.repeat(words[i].length)} `;
    }
    $('#question').text(`Klausimas: ${data.question}`);
    $('#answer-asteriks').text(hiddenAnswer.trim());
    $('#submit-answer').click(() => {
      const userAnswer = $('#answer-input').val().toLowerCase();
      // Compare user's answer to the actual answer here
      if (checkLettersAndCompare(userAnswer, serverAnswer)) {
        $('#winning-message').text(`Atsakymas teisingas! ${actualAnswer} Jūs laimėjote 300 litų.`);
        $('#answer-input').prop('disabled', true);
        $('#submit-answer').prop('disabled', true);
      } else {
        $('#winning-message').text(`Atsakymas ${userAnswer} yra neteisingas! Bandykite kitą kartą. Atsakymas buvo ${actualAnswer}.`);
        $('#answer-input').val('');
      }
    });
  });
});

function checkLettersAndCompare(str1, str2) {
  const letterMap = {
    ą: "a",
    č: "c",
    ę: "e",
    ė: "e",
    į: "i",
    š: "s",
    ų: "u",
    ū: "u",
    ž: "z"
  }
  // Replace accented letters with their ASCII equivalents
  const cleanStr1 = str1.replace(/[ąčęėįšųž]/gi, (match) => letterMap[match.toLowerCase()])
  const cleanStr2 = str2.replace(/[ąčęėįšųž]/gi, (match) => letterMap[match.toLowerCase()])

  return cleanStr1 === cleanStr2
}




      





      function startClosePage() {
        let pageCloseCountdown = 200;  // Lango uzdarymo laikas
        function countdown() {
          pageCloseCountdown--;
          if (pageCloseCountdown > 0) {
            closeMessage.innerHTML = `Likęs laikas atsakymui ${pageCloseCountdown} sekundžių.`;
            setTimeout(countdown, 1000);
          } else {
            window.close();
          }
        }
        countdown();
      }
      startClosePage();

    </script>
  </body>
</html>
<!-- Nu arba papildomo klausimo game random +300 ir ban  -100 ir ban 5minutem  -->



<!-- function checkLettersAndCompare(str1, str2) {
  const letterMap = {
    ą: "a",
    č: "c",
    ę: "e",
    ė: "e",
    į: "i",
    š: "s",
    ų: "u",
    ū: "u",
    ž: "z"
  }
  // Replace accented letters with their ASCII equivalents
  const cleanStr1 = str1.replace(/[ąčęėįšųž]/gi, (match) => letterMap[match.toLowerCase()])
  const cleanStr2 = str2.replace(/[ąčęėįšųž]/gi, (match) => letterMap[match.toLowerCase()])

  return cleanStr1.toLowerCase() === cleanStr2.toLowerCase()
} -->