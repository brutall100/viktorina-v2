<?php
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
    $sql = "INSERT INTO chat_app_db (chat_msg, chat_user) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $message, $user);
    $stmt->execute();
    $stmt->close();
}

// Function to retrieve messages from the database
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
    return $messages;
}
?>
