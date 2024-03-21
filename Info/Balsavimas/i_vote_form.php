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
        $query = "SELECT litai_sum AS points FROM super_users WHERE user_id = ?";
        $statement = $conn->prepare($query);
        $statement->bind_param("i", $userid);
        $statement->execute();
        $result = $statement->get_result();
        $row = $result->fetch_assoc();
        $userPoints = $row['points'];

        echo "User Points: " . $userPoints . "<br>";

        if ($userPoints >= 100000) {
            // User has 100,000 or more points, proceed with the form submission
            // You can perform additional processing or database operations here
        } else {
            $message = "You need at least 100,000 points to submit a suggestion.";
        }

        // Close the database connection
        $statement->close();
        $conn->close();

        // include '../style.php';
    } else {
        echo "Please fill out all fields.";
    }
} else {
    echo "Form not submitted.";
}
?>

