<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'x_configDB.php';  // Include the database connection file

function trackAndMoveData() {
    global $conn;  // Use the existing connection

    $query = "SELECT id, question, answer FROM question_answer WHERE vote_count > 15";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $checkDuplicate = "SELECT COUNT(*) as duplicate_count FROM main_database WHERE question = ?";
            $checkStmt = $conn->prepare($checkDuplicate);
            $checkStmt->bind_param("s", $row["question"]);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();
            $checkRow = $checkResult->fetch_assoc();

            if ($checkRow["duplicate_count"] == 0) {
                $insertQuery = "INSERT INTO main_database(id_of_qna, question, answer) VALUES (?, ?, ?)";
                $stmt = $conn->prepare($insertQuery);
                $stmt->bind_param("iss", $row["id"], $row["question"], $row["answer"]);
                $stmt->execute();
            }

            // Remove the record from the viktorina database
            $deleteQuery = "DELETE FROM question_answer WHERE id = ?";
            $deleteStmt = $conn->prepare($deleteQuery);
            $deleteStmt->bind_param("i", $row["id"]);
            $deleteStmt->execute();
        }
    }
}

trackAndMoveData();

$conn->close(); 
?>


