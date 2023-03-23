<?php
function hasUserVoted($conn, $userId, $questionId) {
    $sql = "SELECT * FROM user_votes WHERE user_id = $userId AND question_id = $questionId";
    $result = mysqli_query($conn, $sql);

    return (mysqli_num_rows($result) > 0);
}

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'viktorina';
$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the question id and user id from the URL
$id = $_GET['id'];
$userId = $_GET['user_id'];

if (!hasUserVoted($conn, $userId, $id)) {
    // Create the SQL query
    $sql = "UPDATE question_answer SET vote_count = vote_count + 1 WHERE id = $id";

    // Execute the query
    if (mysqli_query($conn, $sql)) {
        // Insert user vote record
        $sql = "INSERT INTO user_votes (user_id, question_id) VALUES ($userId, $id)";
        mysqli_query($conn, $sql);
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


