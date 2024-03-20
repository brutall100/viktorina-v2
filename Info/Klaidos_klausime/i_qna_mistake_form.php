<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST['user_id'] ?? "";
    $user_name = $_POST['name'] ?? "";
    $question_id = $_POST['question_id'] ?? "";
    $klausimas = $_POST['klausimas'] ?? "";
    $atsakymas = $_POST['atsakymas'] ?? "";
    $mistake = $_POST['mistake_description'] ?? "";
    $additional_comment = $_POST['additional_comment'] ?? "";
    include '../../x_configDB.php';

    $sql = "INSERT INTO x_question_mistakes (user_id, user_name, question_id, mistake, additional_comment) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isiss", $user_id, $user_name, $question_id, $mistake, $additional_comment);

    if ($stmt->execute()) {
        $message = "Ačiū už pastebėtą ir pateiktą klaidą! Mes patys būtume ją pastebėję, bet Jūs sutaupėte mums laiko 🕰️.";
    } else {
        $message = "Oops! Kažkas nutiko neteisingai. Bandykite dar kartą vėliau.";
    }

    $stmt->close();

    //// updates main database with new QnA if level 4 or 5
    if ($level >= 4) {
        $sql2 = "UPDATE main_database SET question = ?, answer = ?, name = ?, user_id = ? WHERE id = ?";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("sssii", $klausimas, $atsakymas, $name, $user_id, $question_id);
        if ($stmt2->execute()) {
            $message = "Ačiū už atnaujintą ir pataisytą klausimą.";
        } else {
            $message = "Oops! Kažkas nutiko neteisingai. Bandykite dar kartą vėliau.";
        }
        $stmt2->close();
    }

}

echo "<style>
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
            border: 2px solid #ff69b4; /* Pink border */
            padding: 20px;
            border-radius: 15px; 
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5); /* Pink drop shadow */
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
    </style>";

echo "<div class='message-container'>";
echo "<div class='message'>";
echo "<p>$message</p>";
echo "</div>";
echo "</div>";
echo "<script>setTimeout(function() { window.history.go(-1); }, 3000);</script>";

?>
