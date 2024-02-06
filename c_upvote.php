<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function hasUserVoted($conn, $userId, $questionId) {
    $sql = "SELECT * FROM user_votes WHERE user_id = ? AND question_id = ? AND plius = 1"; 
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ii", $userId, $questionId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return (mysqli_num_rows($result) > 0);
}

include 'x_configDB.php';

$id = $_GET['id'];
$userId = $_GET['user_id'];

if (!hasUserVoted($conn, $userId, $id)) {
    $sql = "UPDATE question_answer SET vote_count = vote_count + 1 WHERE id = ?";
    $plusValue = 1; // Set the value to be inserted in the plius field
} else {
    $sql = "UPDATE question_answer SET vote_count = vote_count - 1 WHERE id = ?";
    $plusValue = 0; // Set the value to be inserted in the plius field
}

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {
    if (!hasUserVoted($conn, $userId, $id)) {
        $sql = "INSERT INTO user_votes (user_id, question_id, plius) VALUES (?, ?, ?)";
    } else {
        $sql = "DELETE FROM user_votes WHERE user_id = ? AND question_id = ?";
    }

    $stmt = mysqli_prepare($conn, $sql);
    if ($sql === "INSERT INTO user_votes (user_id, question_id, plius) VALUES (?, ?, ?)") {
        mysqli_stmt_bind_param($stmt, "iii", $userId, $id, $plusValue);
    } else {
        mysqli_stmt_bind_param($stmt, "ii", $userId, $id);
    }
    
    mysqli_stmt_execute($stmt);

    echo "Success";
} else {
    echo "Error";
}

mysqli_close($conn);
?>


