<!DOCTYPE html>
<html lang="lt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ačiū</title>
    <style>
        body {
            background: url('/viktorina.live/images/background/dark2.png') center center/cover;
            background-color: coral;
        }

        .message-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        @media screen and (max-width: 600px) {
            .message-container {
                align-items: start;
                margin-top: 5em;
            }
        }

        .message {
            text-align: center;
            background-color: #200306;
            color: #ffffff;
            border: 2px solid #f6eec4;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
            max-width: 80%;
            width: 400px;
            font-size: 2em;
        }

        @media screen and (max-width: 600px) {
            .message {
                font-size: 1.5em;
                width: 80%;
            }
        }

        .timer {
            position: fixed;
            top: 2em; 
            right: 2em; 
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 16px;
        }
    </style>
</head>

<body>
    <div class="message-container">
        <div class="message">
            <?php echo isset($message) ? $message : "Ši žinutė pasirodo tada, kai įvyko rimtesnė klaida. Prašome pranešti kokiomis aplinkybėmis ji pasirodė. viktorina.live@gmail.com"; ?>
        </div>
    </div>
    <?php
       echo "<div class='timer'>Grįžtama atgal <span id='countdown'>4</span></div>";
       echo "<script>
                var seconds = 4;
                var countdownElement = document.getElementById('countdown');
                var countdownInterval = setInterval(function() {
                    seconds--;
                    countdownElement.textContent = seconds;
                    if (seconds <= 0) {
                        clearInterval(countdownInterval);
                        window.history.go(-1);
                    }
                }, 1000);
             </script>";
    ?>
</body>

</html>


