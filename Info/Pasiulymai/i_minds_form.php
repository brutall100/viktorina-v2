<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_name = $_POST['user_name'] ?? "";
    $user_id = $_POST['user_id'] ?? "";
    $idea_title = $_POST['idea_title'] ?? "";
    $idea_description = $_POST['idea_description'] ?? "";
    include '../../x_configDB.php';

    if (!empty($user_name) && !empty($user_id) && !empty($idea_title) && !empty($idea_description)) {

        $current_date = date("Y-m-d H:i:s");

        $data = "Date: $current_date\n";
        $data .= "User Name: $user_name\n";
        $data .= "User ID: $user_id\n"; 
        $data .= "Idea Title: $idea_title\n";
        $data .= "Idea Description: $idea_description\n\n";

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
                @media screen and (max-width: 600px) {
                    .message-container {
                        align-items: start;
                        margin-top: 5em;
                    }
                }

                .message {
                    text-align: center;
                    background-color: #200306;
                    color: #ffffff;
                    border: 2px solid #ff69b4; /* Pink border */
                    padding: 20px;
                    border-radius: 15px; 
                    box-shadow: 0 0 20px rgba(255, 105, 180, 0.5); /* Pink drop shadow */
                    max-width: 80%;
                    width: 400px;
                    font-size: 2em;
                }

                @media screen and (max-width: 600px) {
                    .message {
                        font-size: 1.5em;
                        width: 80%; 
                    }
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
            echo "<script>setTimeout(function() { window.history.go(-1); }, 3000000);</script>";
            ?>
        </body>
        </html>
        <?php
        exit; 
    } else {
        //// Handle form validation errors
        echo "Please fill out all the required fields.";
        echo "<script>setTimeout(function() { window.history.go(-1); }, 3000);</script>";
    }
}
?>

