<?php
session_start();

require_once 'db_connect.php';

// Check if the login form was submitted
if (isset($_POST['submit'])) {
    // Validate the input fields
    $nick_name = filter_var($_POST['nick_name'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['user_password'], FILTER_SANITIZE_STRING);
    
    // Prepare the SQL statement
    $query = "SELECT * FROM viktorina.super_users WHERE nick_name = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $query)) {
        // Log the error message
        error_log("SQL Error: " . mysqli_error($conn));
        
        // Provide a user-friendly error message
        echo "An error occurred. Please try again later.";
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $nick_name);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $_SESSION['logged_in'] = true;
            $_SESSION['username'] = $row['nick_name'];
            echo "<script>window.location.href='http://localhost/aldas/Viktorina.live/a_index.php'</script>";
            die();
        } else {
            $error = "Invalid email or password";
            echo "<script>alert('".$error."');</script>";
        }
    }
}

mysqli_close($conn);
?>


