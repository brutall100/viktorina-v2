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
        echo "<p>Ačiū už pastebėtą ir pateiktą klaidą! Mes patys būtume ją pastebėję, bet mūsų klaidų aptikimo algoritmas pats pradėjo darbą nuo savęs.</p>";
    } else {
        echo "<p>Oops! Something went wrong. Please try again later.</p>";
    }

    $stmt->close();
    $conn->close();
}
?>