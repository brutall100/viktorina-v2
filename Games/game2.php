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
    <button type="button" onclick="checkAnswer()">Atsakymas</button>
    <p id="timer"></p>
    <button type="button" onclick="closeGame()" class="closeBtn">Pabėgti?</button>
  </div>


    <script>
    const answerInput = document.getElementById('answer');
    answerInput.addEventListener('input', function() {
        if (this.value.length > 3 || this.value > 200) {
            this.value = 200;
        }
    });

    answerInput.addEventListener('keypress', function(event) {
    const keyCode = event.keyCode || event.which;
    const forbiddenKeys = [43, 45, 42, 47]; // Key codes for +, -, *, /
    
        if (forbiddenKeys.includes(keyCode)) {
            event.preventDefault();
        }
    });



    window.onload = function() {
        document.getElementById("answer").focus();
    };

    // Check the answer
    function checkAnswer() {
        const answer = document.getElementById("answer").value;
        let points = 0;
        if (answer == result) {
            clearInterval(timer);
            points = result;
            const currency = getCurrencyWord(result, answer);
            const message = document.createElement('h2');
            message.textContent = "Teisingai! Uždirbai " + result + " " + currency + ".";
            document.body.appendChild(message);
            localStorage.removeItem('seconds') // Nezinau ar veikia
        } else {
            clearInterval(timer);
            points = -answer;  // Galima arba -answer arba -result arba minus -50
            const currency2 = getCurrencyWord(result, answer);
            const message = document.createElement('h2');
            message.textContent = "Deje NE. Atsakymas buvo " + result + " Uždirbai -" + answer + " " + currency2;
            document.body.appendChild(message);
            localStorage.removeItem('seconds') // Nezinau ar veikia
        }

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

        // Lock the input and close the window
        answerInput.disabled = true;
        setTimeout(() => {
            window.close();
        }, 3000);
    }   


    // Set the timer 20 sekundziu   
   // Get the value of seconds from local storage
        let seconds = localStorage.getItem('seconds');
            if (seconds === null) {
            seconds = 20;
        }

        // Set the timer
        const timer = setInterval(function() {
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            const message = document.createElement('h2');
            message.textContent = "Laikas baigėsi!";
            document.body.appendChild(message);
            setTimeout(() => {
            window.close();
            }, 3000);
        } else {
            document.getElementById("timer").innerHTML = seconds + " seconds left";
            // Save the value of seconds to local storage
            localStorage.setItem('seconds', seconds);
        }
        }, 1000);

        // Clear the value of seconds from local storage when the game is over
        setTimeout(() => {
            localStorage.removeItem('seconds');
        }, 3000);


    // Generate a random number
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const result = num1 + num2;
    console.log(result);

    document.getElementById("question").innerHTML = "Kiek bus? " + num1 + " + " + num2 + "?";

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







  

    function closeGame() {
        window.close();
    }


    </script>

    
</body>
</html>
