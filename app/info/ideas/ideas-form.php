<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_name = $_POST['user_name'] ?? "";
    $user_id = (int) ($_POST['user_id'] ?? 0);
    $idea_title = $_POST['idea_title'] ?? "";
    $idea_description = $_POST['idea_description'] ?? "";
    include '../../config-db.php';

    if (!empty($user_name) && !empty($user_id) && !empty($idea_title) && !empty($idea_description)) {

        $current_date = date("Y-m-d H:i:s");

        $stmt = $conn->prepare("INSERT INTO x_minds (vardas, user_id, idea_title, idea_description, submission_date) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sisss", $user_name, $user_id, $idea_title, $idea_description, $current_date);

        if ($stmt->execute()) {
            $message = "<h2>Ačiū!</h2>
                        <p>Už Jūsų mintis ir idėjas.</p>
                        <p>Jūsų idėja įrašyta. Netrukus ji bus aptarta.</p>";
        } else {
            $message = "Nepavyko išsaugoti idėjos. Bandykite dar kartą.";
        }

        $conn->close();
        
        include '../message.php';

        exit; 
    } else {
        $message = "Please fill out all the required fields.";
    }
}
echo $message;
?>


