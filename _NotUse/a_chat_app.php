<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$servername = "localhost";
$username = "root";
$password = "";
$database = "viktorina"; 

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to insert a new message into the database
function insertMessage($message, $user) {
    global $conn;
    // Validate and sanitize user inputs
    $message = mysqli_real_escape_string($conn, $message);
    $user = mysqli_real_escape_string($conn, $user);
    
    $sql = "INSERT INTO chat_app_db (chat_msg, chat_user) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $message, $user);
    
    if ($stmt->execute()) {
        return true;
    } else {
        // Handle the error
        return false;
    }
}

// Function to retrieve messages from the database and return as JSON
function getMessages() {
    global $conn;
    $sql = "SELECT * FROM chat_app_db";
    $result = $conn->query($sql);
    $messages = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
    }
    // Send messages as JSON response
    header('Content-Type: application/json');
    echo json_encode($messages);
}

// Close the database connection (if needed) after your operations
// $conn->close();
?>



