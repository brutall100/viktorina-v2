<?php
//? It goes from a_index.php > a_index.js > submit_email.php[Here]

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'], $_POST['user_id'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $user_id = filter_var($_POST['user_id'], FILTER_SANITIZE_NUMBER_INT);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }

    if (!$user_id) {
        echo json_encode(['success' => false, 'error' => 'Invalid user ID']);
        exit;
    }

    include 'x_configDB.php'; 

    // Attempt to update the user's email in the database
    $query = "UPDATE users SET email = ? WHERE user_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "si", $email, $user_id);
        mysqli_stmt_execute($stmt);
        if (mysqli_stmt_affected_rows($stmt) > 0) {
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            
            // If update is successful, send a confirmation email
            if (sendConfirmationEmail($email)) {
                $_SESSION['email'] = $email; // Store email in session
                echo json_encode(['success' => true, 'message' => 'Email updated and confirmation sent']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to send confirmation email']);
            }
        } else {
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            echo json_encode(['success' => false, 'error' => 'No update performed']);
        }
    } else {
        mysqli_close($conn);
        echo json_encode(['success' => false, 'error' => 'Database query preparation failed']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}

function sendConfirmationEmail($email) {
    $verificationCode = bin2hex(random_bytes(16)); // Generate a random verification code
    $verificationLink = "https://yourdomain.com/verify_email.php?code=$verificationCode";

    $subject = 'Confirm your email';
    $message = "Please click on this link to confirm your email: $verificationLink";
    $headers = 'From: noreply@yourdomain.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    return mail($email, $subject, $message, $headers);
}
?>


