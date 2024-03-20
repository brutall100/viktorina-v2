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
            $message = "<h2>Ačiū!</h2>
                        <p>Už Jūsų mintis ir idėjas.</p>
                        <p>Jūsų idėja įrašyta. Netrukus ji bus aptarta.</p>";
        } else {
            $message = "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        
        include '../style.php';

        exit; 
    } else {
        $message = "Please fill out all the required fields.";
    }
}
echo $message;
?>


