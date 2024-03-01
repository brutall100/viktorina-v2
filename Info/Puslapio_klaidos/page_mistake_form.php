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
    
    $stmt = $conn->prepare("INSERT INTO page_mistakes (name, level, user_id, mistake_text) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $reported_name, $reported_level, $user_id, $mistakes);

    if ($stmt->execute()) {
        echo "<style>
             body { background: url('/viktorina.live/images/background/dark2.png') center center/cover; }

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
        echo "<p>Ačiū už pastebėtą ir pateiktą klaidą! Mes patys būtume ją pastebėję, bet Jūs sutaupėte mums laiko 🕰️.</p>";
        echo "<p></p>";
        echo "</div>";
        echo "</div>";
        echo "<script>setTimeout(function() { window.history.go(-1); }, 500000);</script>";
    } else {
        echo "<p>Oops! Something went wrong. Please try again later.</p>";
    }

    $stmt->close();
    $conn->close();
}
?>
