<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'viktorina';

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$name = $_POST['name'];
$user_id = $_POST['user_id'];
$question = $_POST['question'];
$answer = $_POST['answer'];
$date_inserted = date("Y-m-d"); // current date
$ip = $_SERVER['REMOTE_ADDR'];

$message = "Naujas klausimas sukurtas sėkmingai. Klausimas irašytas į laikinają duomenų bazę. Kur bus apdorojamas. Už įrašyta klausimą jums suteikta 10 LITŲ.";
if (empty($question) || empty($answer)) {
    $message = "Klaida: ne visi laukai užpildyti. Klausimas ir atsakymas yra būtini.";
}

// Tikrina ar yra keiksmazodziu zodyje
$bad_words_sql = "SELECT curse_words FROM bad_words";
$bad_words_result = mysqli_query($conn, $bad_words_sql);
$bad_words_array = array();

if (mysqli_num_rows($bad_words_result) > 0) {
    while($row = mysqli_fetch_assoc($bad_words_result)) {
        $bad_words_array[] = $row["curse_words"];
    }
}

foreach ($bad_words_array as $bad_word) {
    if (strpos($question, $bad_word) !== false) {
        $message = "Klaida: klausime yra nepriimtinų žodžių.";
        echo $message;
        exit();
    }
}

foreach ($bad_words_array as $bad_word) {
    if (strpos($answer, $bad_word) !== false) {
        $message = "Klaida: atsakyme yra nepriimtinų žodžių.";
        echo $message;
        exit();
    }
}


// Check if any of the fields are empty
if (empty($question) || empty($answer)) {
    echo $message;
} else {
    // Insert the data into the database
    $sql = "INSERT INTO question_answer (user, super_users_id, question, answer, date_inserted, ip) VALUES ('$name', '$user_id', '$question', '$answer', '$date_inserted','$ip')";
    if (mysqli_query($conn, $sql)) {
        echo $message;
        $sql = "UPDATE viktorina.super_users SET litai_sum = litai_sum + 10 WHERE nick_name = '$name'";

        if (mysqli_query($conn, $sql)) {
            echo "  Jums pervedama 10 LITŲ  ";
        } else {
            echo "Error updating litai_sum: " . mysqli_error($conn);
        }

    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

mysqli_close($conn);

echo "<script>setTimeout(function() { location.href = 'http://localhost/aldas/Viktorina.live/b_newquestionindex.php'; }, 30000);</script>";
// echo $message;
?>












