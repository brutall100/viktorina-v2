<?php

$message = '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
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

    if (empty($question) || empty($answer)) {
        $message = "Klaida: ne visi laukai užpildyti. Klausimas ir atsakymas yra būtini.";
    } else {
        // Check if answer contains bad words
        $bad_words_sql = "SELECT curse_words FROM bad_words";
        $bad_words_result = mysqli_query($conn, $bad_words_sql);
        $bad_words_array = array();

        if (mysqli_num_rows($bad_words_result) > 0) {
            while($row = mysqli_fetch_assoc($bad_words_result)) {
                $bad_words_array[] = $row["curse_words"];
            }
        }

        foreach ($bad_words_array as $bad_word) {
            if (strpos($answer, $bad_word) !== false) {
                $message = "Klaida: atsakyme yra nepriimtinų žodžių.";
                echo $message;
                exit();
            }
        }

        // Check if the same question and answer already exist
        $check_sql = "SELECT * FROM question_answer WHERE question = '$question' AND answer = '$answer'";
        $check_result = mysqli_query($conn, $check_sql);

        if (mysqli_num_rows($check_result) > 0) {
            $message = "Toks klausimas jau egzistuoja.";
        } else {
            // Insert the data into the database
            $sql = "INSERT INTO question_answer (user, super_users_id, question, answer, date_inserted, ip) VALUES ('$name', '$user_id', '$question', '$answer', '$date_inserted','$ip')";
            if (mysqli_query($conn, $sql)) {
                $message = "Naujas klausimas sukurtas sėkmingai. Klausimas irašytas į laikinają duomenų bazę. Kur bus apdorojamas. Už įrašytą klausimą jums suteikta 10 LITŲ.";
                $sql = "UPDATE viktorina.super_users SET litai_sum = litai_sum + 10 WHERE nick_name = '$name'";

                if (mysqli_query($conn, $sql)) {
                    // Success
                } else {
                    echo "Error updating litai_sum: " . mysqli_error($conn);
                }
            } else {
                $message = "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
        }
    }

    mysqli_close($conn);
}

echo $message;
?>







    <!-- <p>Jūs esate perkkeliamas atgal. Gal įrašysite dar vieną klausimą?  <span id="countdown">30</span> seconds.</p> -->













