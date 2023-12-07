<?php
session_start();

// Set the logged_in session variable to true
$_SESSION['logged_in'] = true;

// Include the database connection file
require_once 'db_connect.php';

// Get the form data
$nick_name = $_POST['nick_name'] ?? '';
$user_email = $_POST['user_email'] ?? '';
$user_password = $_POST['user_password'] ?? '';
$registration_date = date("Y-m-d");

// Validate the form data
if(empty($nick_name) || empty($user_email) || empty($user_password)){
    echo "All fields are required.";
    return;
}

// Check if user with the same name or email already exists
$stmt = $conn->prepare("SELECT * FROM viktorina.super_users WHERE nick_name = ? OR user_email = ?");
$stmt->bind_param("ss", $nick_name, $user_email);

if($stmt->execute()){
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        echo "User with the same name or email already exists.";
        return;
    }
}else{
    echo "SQL Error";
    return;
}

// Insert the data into the database
$stmt = $conn->prepare("INSERT INTO viktorina.super_users (nick_name, user_email, user_password, registration_date) VALUES (?,?,?,?)");
$stmt->bind_param("ssss", $nick_name, $user_email, $user_password, $registration_date);

if($stmt->execute()){
    echo "Registration Successful";
    $_SESSION['username'] = $nick_name;
    header("Location: http://localhost/aldas/Viktorina.live/a_index.php");
}else{
    echo "SQL Error";
    return;
}

// Close the database connection
$conn->close();




