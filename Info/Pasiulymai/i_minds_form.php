<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_name = $_POST['user_name'] ?? "";
    $user_id = $_POST['user_id'] ?? "";
    $idea_title = $_POST['idea_title'] ?? "";
    $idea_description = $_POST['idea_description'] ?? "";
    include '../../x_configDB.php';

    if (!empty($user_name) && !empty($user_id) && !empty($idea_title) && !empty($idea_description)) {

        // Get current date and time
        $current_date = date("Y-m-d H:i:s");

        // Prepare data with date
        $data = "Date: $current_date\n";
        $data .= "User Name: $user_name\n";
        $data .= "User ID: $user_id\n"; 
        $data .= "Idea Title: $idea_title\n";
        $data .= "Idea Description: $idea_description\n\n";

        // Save data to file
        $file = 'ideas.txt';
        file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

        $sql = "INSERT INTO x_minds (vardas, user_id, idea_title, idea_description, submission_date)
                VALUES ('$user_name', '$user_id', '$idea_title', '$idea_description', '$current_date')";

        if ($conn->query($sql) === TRUE) {
            // echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        ?>
        <!DOCTYPE html>
        <html lang="lt">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ačiū už idėją</title>
            <style>
                 body {
                    background: url('/viktorina.live/images/background/dark2.png') center center/cover;
                    background-color: coral;
                }

                .message-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .message {
                    text-align: center;
                    background-color: #200306;
                    font-size: 2em;
                    color: #ffffff;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 80%;
                    width: 400px;
                }
            </style>
        </head>
        <body>
            <div class="message-container">
                <div class="message">
                    <h2>Ačiū!</h2>
                    <p>Už Jūsų mintis ir idėjas.</p>
                    <p>Jūsų idėja įrašyta. Netrukus ji bus aptarta.</p>
                </div>
            </div>
            <?php
            echo "<script>setTimeout(function() { window.history.go(-1); }, 30000);</script>";
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

