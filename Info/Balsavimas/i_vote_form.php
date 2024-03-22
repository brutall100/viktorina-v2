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

    if (!empty($suggestion) && !empty($username) && !empty($userlevel) && !empty($userid) && !empty($points)) {
        //// Check if the user has 100,000 points and level 3 or above
        $query = "SELECT litai_sum AS points, user_lvl AS user_level FROM super_users WHERE user_id = ?";
        $statement = $conn->prepare($query);
        $statement->bind_param("i", $userid);
        $statement->execute();
        $result = $statement->get_result();
        $row = $result->fetch_assoc();
        $userPoints = $row['points'];
        $userLevel = $row['user_level'];

        if ($userPoints >= 100000 && $userLevel >= 3) {
            $insert_query = "INSERT INTO x_vote (usname, usid, suggestion) VALUES (?, ?, ?)";
            $insert_statement = $conn->prepare($insert_query);
            $insert_statement->bind_param("sis", $username, $userid, $suggestion);
            $insert_statement->execute();
            $insert_statement->close();

            $message = "Balsavimo pasiūlymas įrašytas.";
        } else {
            $message = "You need at least 100,000 points and level 3 or above to submit a suggestion.";
        }

        include '../style.php';

        $statement->close();
        $conn->close();
    } else {
        $message = "Please fill out all fields.";
    }
} else {
    $message = "Form not submitted.";
}
echo $message;
?>
