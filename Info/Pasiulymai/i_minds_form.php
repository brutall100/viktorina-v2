<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_name = $_POST['user_name'] ?? "";
    $user_id = $_POST['user_id'] ?? "";
    $idea_title = $_POST['idea_title'] ?? "";
    $idea_description = $_POST['idea_description'] ?? "";

    if (!empty($user_name) && !empty($user_id) && !empty($idea_title) && !empty($idea_description)) {

        // Get current date and time
        $current_date = date("Y-m-d H:i:s");

        // Prepare data with date
        $data = "Date: $current_date\n";
        $data .= "User Name: $user_name\n";
        $data .= "User ID: $user_id\n"; 
        $data .= "Idea Title: $idea_title\n";
        $data .= "Idea Description: $idea_description\n\n";

        // File path
        $file = 'ideas.txt';

        // Save data to file
        file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

        // Display Thank You message
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: url('/viktorina.live/images/background/dark2.png') center center/cover;
                    background-color: coral;
                    text-align: center;
                    padding: 50px;
                }
                .message {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="message">
                <h2>Thank You!</h2>
                <p>Your idea has been submitted successfully.</p>
            </div>
            <?php
            echo "<script>setTimeout(function() { window.history.go(-1); }, 3000);</script>";
            ?>
        </body>
        </html>
        <?php
        exit; 
    } else {
        // Handle form validation errors
        echo "Please fill out all the required fields.";
    }
}
?>

