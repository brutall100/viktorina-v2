<?php
  session_start();
  $name = $_GET['name'];
  echo "Hello $name, You will play game 2";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/Games/gameStyle.css" />
  <title>Įrašyk teisingą atsakymą</title>
</head>
<body>
    <h2>Šiame žaidime gali laimėti nuo -200 iki +200 litų.</h2>
    <p id="question" ></p>
    <input type="number" id="answer" maxlength="3" />
    <button onclick="checkAnswer()">Atsakymas</button>
    <p id="timer"></p>


    <script>
    const answerInput = document.getElementById('answer');
    answerInput.addEventListener('input', function() {
        if (this.value.length > 3 || this.value > 200) {
            this.value = 200;
        }
    });


    window.onload = function() {
        document.getElementById("answer").focus();
    };

    // Set the timer
    let seconds = 20;
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
        }
        else {
            document.getElementById("timer").innerHTML = seconds + " seconds left";
        }
    }, 1000);

    // Generate a random number
    const num1 = Math.floor(Math.random() * 101);
    const num2 = Math.floor(Math.random() * 101);
    const result = num1 + num2;
    console.log(result);

    document.getElementById("question").innerHTML = "What is " + num1 + " + " + num2 + "?";

    function getCurrencyWord(result) {
    console.log(result); // Neveikia if and else.  Veikia tik paskutinis else, kolkas palieku
    if (result === 1) {
        return "Litą";
    } else if (result >= 2 && result <= 4) {
        return "Litus";
    } else if (result >= 5 && result <= 9) {
        return "litų";
    } else {
        return "Lt";
    }
    }



    // Check the answer
    function checkAnswer() {
        
        const answer = document.getElementById("answer").value;
        let points = 0;
        if (answer == result) {
            
            clearInterval(timer);
            points = result;
            const currency = getCurrencyWord(result);
            const message = document.createElement('h2');
            message.textContent = "Teisingai! Uždirbai " + result + " " + currency + ".";
            document.body.appendChild(message);

        }
        else {
            
            clearInterval(timer);
            points = -(answer - result);
            const currency2 = getCurrencyWord(result);
            const message = document.createElement('h2');
            message.textContent = "Deje NE. Atsakymas buvo " + result + " Uždirbai -" + answer + " " + currency2;
            document.body.appendChild(message);

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

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Uždaryti';
    closeButton.addEventListener('click', () => {
        window.close();
    });
    document.body.appendChild(closeButton);
</script>

    
</body>
</html>
