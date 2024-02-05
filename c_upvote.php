<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function hasUserVoted($conn, $userId, $questionId) {
    $sql = "SELECT * FROM user_votes WHERE user_id = ? AND question_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ii", $userId, $questionId);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    return (mysqli_num_rows($result) > 0);
}

//// Connection from Include
include 'x_configDB.php';

// Get the question id and user id from the URL
$id = $_GET['id'];
$userId = $_GET['user_id'];

if (!hasUserVoted($conn, $userId, $id)) {
    // Create the SQL query
    $sql = "UPDATE question_answer SET vote_count = vote_count + 1 WHERE id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);

    // Execute the query
    if (mysqli_stmt_execute($stmt)) {
        // Insert user vote record
        $sql = "INSERT INTO user_votes (user_id, question_id) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ii", $userId, $id);
        
        mysqli_stmt_execute($stmt);

        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
} else {
    echo "User has already voted";
}

// Close the connection
mysqli_close($conn);
?>

