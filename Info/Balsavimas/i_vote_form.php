<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../../x_configDB.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $suggestion = $_POST["suggestion"] ?? "";
    $username = $_POST["username"] ?? "";
    $userlevel = $_POST["userlevel"] ?? "";
    $userid = $_POST["userid"] ?? "";
    $points = $_POST["points"] ?? "";

    if (!empty($suggestion) && !empty($username) && isset($userlevel) && !empty($userid) && isset($points)) {
        //// Retrieve user points and level from database
        $query = "SELECT litai_sum AS points, user_lvl AS user_level FROM super_users WHERE user_id = ?";
        $statement = $conn->prepare($query);
        $statement->bind_param("i", $userid);
        $statement->execute();
        $result = $statement->get_result();
        $row = $result->fetch_assoc();
        $userPoints = $row['points'];
        $userLevel = $row['user_level'];

        //// Check user level
        if ($userLevel >= 3) {
            //// Execute code without checking points or deducting points
            processSuggestion($conn, $userid, $username, $suggestion); 
        } elseif ($userPoints >= 100000) {
            //// Deduct 100,000 points if user level is below 3
            $deduct_query = "UPDATE super_users SET litai_sum = litai_sum - 100000 WHERE user_id = ?";
            $deduct_statement = $conn->prepare($deduct_query);
            $deduct_statement->bind_param("i", $userid);
            $deduct_statement->execute();
            $deduct_statement->close();

            processSuggestion($conn, $userid, $username, $suggestion); 
        } else {
            $message = "Jei jūsų lygis yra žemesnis nei 3, turite turėti bent 100 000 litų, norint pateikti pasiūlymą.";
            include '../style.php';
        }
    } else {
        $message = "Oi nei! Atrodo, kad pamiršote užpildyti kai kuriuos laukus!";
        include '../style.php';
    }
} else {
    $message = "Form not submitted.";
    include '../style.php';
}


function processSuggestion($conn, $userid, $username, $suggestion) {
    //// Check for duplicate suggestion
    $duplicate_query = "SELECT COUNT(*) AS count FROM x_vote_suggestion WHERE usid = ? AND suggestion = ?";
    $duplicate_statement = $conn->prepare($duplicate_query);
    $duplicate_statement->bind_param("is", $userid, $suggestion);
    $duplicate_statement->execute();
    $duplicate_result = $duplicate_statement->get_result();
    $duplicate_count = $duplicate_result->fetch_assoc()['count'];
    $duplicate_statement->close();

    if ($duplicate_count == 0) {
        //// Insert the suggestion into the database
        $insert_query = "INSERT INTO x_vote_suggestion (usname, usid, suggestion) VALUES (?, ?, ?)";
        $insert_statement = $conn->prepare($insert_query);
        $insert_statement->bind_param("sis", $username, $userid, $suggestion);
        $insert_statement->execute();
        $insert_statement->close();

        $message = "Balsavimo pasiūlymas įrašytas.";
    } else {
        $message = "Toks balsavimo siūlymas jau egzistuoja.";
    }
    include '../style.php';
}
?>



