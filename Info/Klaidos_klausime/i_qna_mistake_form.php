<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'] ?? "";
    $user_name = $_POST['user_name'] ?? "";
    $question_id = $_POST['question_id'] ?? "";
    $mistake = $_POST['mistake_description'] ?? "";
    $additional_comment = $_POST['additional_comment'] ?? "";
    include '../../x_configDB.php';




    // Prepare SQL statement to insert data into database
 // Prepare SQL statement to insert data into database
$sql = "INSERT INTO x_question_mistakes (user_id, user_name, question_id, mistake, additional_comment) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bind_param("isiss", $user_id, $user_name, $question_id, $mistake, $additional_comment);





// Execute the statement
if ($stmt->execute()) {
    $message = "Ačiū už pastebėtą ir pateiktą klaidą! Mes patys būtume ją pastebėję, bet Jūs sutaupėte mums laiko 🕰️.";
} else {
    $message = "Oops! Kažkas nutiko neteisingai. Bandykite dar kartą vėliau.";
}


    // Close statement and connection
    $stmt->close();

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

?>