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
    return mysqli_fetch_assoc($result);
}

include 'x_configDB.php';

$id = $_GET['id'];
$userId = $_GET['user_id'];

$existingVote = hasUserVoted($conn, $userId, $id);

if ($existingVote) {
    if ($existingVote['minus'] == 1) {
        // User previously upvoted, now changing to downvote
        $sql = "UPDATE question_answer SET vote_count = vote_count + 1 WHERE id = ?";
        $sql2 = "UPDATE user_votes SET minus = 0 WHERE user_id = ? AND question_id = ?";
    } else {
        // User already downvoted, so remove the downvote
        $sql = "UPDATE question_answer SET vote_count = vote_count - 2 WHERE id = ?";
        $sql2 = "DELETE FROM user_votes WHERE user_id = ? AND question_id = ?";
    }
} else {
    // User has not voted yet, so downvote
    $sql = "UPDATE question_answer SET vote_count = vote_count - 1 WHERE id = ?";
    $sql2 = "INSERT INTO user_votes (user_id, question_id, minus) VALUES (?, ?, 1)";
}

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

$stmt2 = mysqli_prepare($conn, $sql2);
mysqli_stmt_bind_param($stmt2, "ii", $userId, $id);
mysqli_stmt_execute($stmt2);

echo "Success";

mysqli_close($conn);
?>



