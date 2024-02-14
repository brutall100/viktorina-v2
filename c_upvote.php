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
    if ($existingVote['plius'] == 1) {
        //// User already upvoted, so remove the upvote
        $sql = "UPDATE question_answer SET vote_count = vote_count 0 WHERE id = ?";
        $sql2 = "DELETE FROM user_votes WHERE user_id = ? AND question_id = ?";
    } else {
        //// User previously downvoted, now changing to upvote
        $sql = "UPDATE question_answer SET vote_count = vote_count + 1 WHERE id = ?";
        $sql2 = "DELETE FROM user_votes WHERE user_id = ? AND question_id = ?";
    }
} else {
    //// User has not voted yet, so upvote
    $sql = "UPDATE question_answer SET vote_count = vote_count + 1 WHERE id = ?";
    $sql2 = "INSERT INTO user_votes (user_id, question_id, plius, vote_lock_time) VALUES (?, ?, 1, NOW())";
}

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

$stmt2 = mysqli_prepare($conn, $sql2);
mysqli_stmt_bind_param($stmt2, "ii", $userId, $id);
$result = mysqli_stmt_execute($stmt2);

if (!$result) {
    echo "Error occurred while updating user_votes table. Operation aborted.";
    mysqli_close($conn);
    exit();
}

echo "Success";

mysqli_close($conn);
?>



