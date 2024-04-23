<?php
// It goes from a_index.php > a_index.js > submit_email.php[Here]
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// Verify the method and required fields
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'], $_POST['user_id'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $user_id = filter_var($_POST['user_id'], FILTER_SANITIZE_NUMBER_INT); // Assuming user_id should be an integer

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }

    // Optionally, validate the user ID if needed
    if (!$user_id) {
        echo json_encode(['success' => false, 'error' => 'Invalid user ID']);
        exit;
    }

    // Process the email (store in database, send confirmation, etc.)
    // Note: Here you would typically:
    // 1. Store the email in your database linked to the user_id
    // 2. Send a confirmation email with a unique link the user can click to verify

    // Mock response to simulate email processing
    // Uncomment and modify this section according to your actual database handling
    /*
    try {
        // $pdo = new PDO('mysql:host=your_host;dbname=your_db', 'username', 'password');
        // $stmt = $pdo->prepare("UPDATE users SET email = :email WHERE user_id = :user_id");
        // $stmt->execute(['email' => $email, 'user_id' => $user_id]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        // Handle any errors such as database connection issues
        error_log('Database error: ' . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
        exit;
    }
    */

    $_SESSION['email'] = $email; // Store email in session or use it as needed

    // Temporary response for demonstration
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
?>

