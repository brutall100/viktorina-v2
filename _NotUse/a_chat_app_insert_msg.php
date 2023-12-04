<?php
include 'a_chat_app.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $message = $data['message'];
    insertMessage($message, 'user');
}
?>
