<?php

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'viktorina';

$conn = mysqli_connect($host, $user, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the form data
$nick_name = $_POST['nick_name'];
$user_email = $_POST['user_email'];
$user_password = $_POST['user_password'];
$registration_date = date("Y-m-d");

// Validate the form data
if(empty($nick_name) || empty($user_email) || empty($user_password)){
    echo "All fields are required.";
    exit();
}

// Check if user with the same name or email already exists
$sql = "SELECT * FROM viktorina.super_users WHERE nick_name = ? OR user_email = ?";
$stmt = mysqli_stmt_init($conn);

if(!mysqli_stmt_prepare($stmt,$sql)){
    echo "SQL Error";
    exit();
}else{
    mysqli_stmt_bind_param($stmt,"ss",$nick_name,$user_email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if(mysqli_num_rows($result) > 0){
        echo "User with the same name or email already exists.";
        exit();
    }
}

// Hash the password
$hashed_password = password_hash($user_password, PASSWORD_DEFAULT);

// Insert the data into the database
$sql = "INSERT INTO viktorina.super_users (nick_name, user_email, user_password, registration_date) VALUES (?,?,?,?)";
$stmt = mysqli_stmt_init($conn);

if(!mysqli_stmt_prepare($stmt,$sql)){
    echo "SQL Error";
    exit();
}else{
  mysqli_stmt_bind_param($stmt,"ssss",$nick_name,$user_email,$hashed_password,$registration_date);
  mysqli_stmt_execute($stmt);
  echo "<script>alert('Registration Successful');</script>";
  $_SESSION['username'] = $nick_name;
}


// Close the database connection
mysqli_close($conn);

// Start the session
session_start();

// Set the logged_in session variable to true
$_SESSION['logged_in'] = true;

// Redirect the user to the index page
header("Location: http://localhost/aldas/Viktorina.live/a_index.php");
exit();
?>



