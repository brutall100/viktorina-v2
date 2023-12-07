<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'viktorina';

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$user_id_name = $_POST['user_id_name'];
$newPoints = $_POST['points'];

error_log("user_id_name: $user_id_name");
error_log("points: $newPoints");


// Prepare the SQL statement
$sql = 'UPDATE viktorina.super_users SET litai_sum = ? WHERE nick_name  = ?';
$stmt = mysqli_prepare($conn, $sql);

// Bind the parameters
mysqli_stmt_bind_param($stmt, 'is', $newPoints, $user_id_name);

// Execute the statement
mysqli_stmt_execute($stmt);

// Check if the update was successful
if (mysqli_stmt_affected_rows($stmt) > 0) {
    echo 'Points updated successfully.';
} else {
    echo 'Failed to update points.';
}

// Close the statement and the connection
mysqli_stmt_close($stmt);
mysqli_close($conn);

?>



