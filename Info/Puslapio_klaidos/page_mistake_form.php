<?php
session_start();

$name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $reported_name = $_POST['name'] ?? "";
    $reported_level = $_POST['level'] ?? "";
    $mistakes = $_POST['mistakes'] ?? "";
    include '../../x_configDB.php';

    // Check if user's level is 1 or higher
    if ($level >= 1) {
        $stmt = $conn->prepare("SELECT mistake_text FROM x_page_mistakes WHERE mistake_text = ?");
        $stmt->bind_param("s", $mistakes);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            $message = "Klaidą, kurią bandote įrašyti, jau egzistuoja duomenų bazėje.";
        } else {
            $stmt = $conn->prepare("INSERT INTO x_page_mistakes (name, level, user_id, mistake_text) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $reported_name, $reported_level, $user_id, $mistakes);

            if ($stmt->execute()) {
                $message = "Ačiū už pastebėtą ir pateiktą klaidą! Mes patys būtume ją pastebėję, bet Jūs sutaupėte mums laiko 🕰️.";
            } else {
                $message = "Oops! Kažkas nutiko neteisingai. Bandykite dar kartą vėliau.";
            }
        }
        $stmt->close(); // Close statement if it's initialized
    } else {
        $message = "Jūsų lygis per žemas, kad galėtumėte įvesti duomenis.";
    }

    $conn->close();

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
            .message {
                text-align: center;
                background-color: #200306;
                font-size: 2em;
                color: #ffffff;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 80%;
                width: 400px;
            }
        </style>";

    echo "<div class='message-container'>";
    echo "<div class='message'>";
    echo "<p>$message</p>";
    echo "</div>";
    echo "</div>";
    echo "<script>setTimeout(function() { window.history.go(-1); }, 3000);</script>";
}
?>




