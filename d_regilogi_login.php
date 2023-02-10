<?php
session_start();

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'viktorina';

$conn = mysqli_connect($host, $user, $password, $dbname);

// Check if the login form was submitted
if (isset($_POST['submit'])) {
    // Get the email and password entered by the user
    $nick_name = mysqli_real_escape_string($conn, $_POST['nick_name']);
    $password = mysqli_real_escape_string($conn, $_POST['user_password']);

    // Query the database to see if the user's credentials are valid
    $query = "SELECT * FROM viktorina.super_users WHERE nick_name = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $query)) {
        echo "SQL Error";
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $nick_name);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $hashed_password = $row['user_password'];
            if (password_verify($password, $hashed_password)) {
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $row['nick_name'];
                echo "<script>window.location.href='http://localhost/aldas/Viktorina.live/a_index.php'</script>";
                die();
            } else {
                $error = "Invalid email or password";
                echo "<script>alert('".$error."');</script>";
            }


}}}
mysqli_close($conn);
?>
