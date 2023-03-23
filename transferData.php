<?php
    $connection1 = new mysqli("127.0.0.1", "root", "", "viktorina");
    $connection2 = new mysqli("127.0.0.1", "root", "", "test");

    if ($connection1->connect_error || $connection2->connect_error) {
        die("Error connecting to the databases: " . $connection1->connect_error . $connection2->connect_error);
    }

    function trackAndMoveData() {
        global $connection1, $connection2;
        $query = "SELECT id, question, answer FROM question_answer WHERE vote_count > 5";
        $result = $connection1->query($query);
        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            $checkDuplicate = "SELECT COUNT(*) as duplicate_count FROM testukas WHERE klausimas = ?";
            $checkStmt = $connection2->prepare($checkDuplicate);
            $checkStmt->bind_param("s", $row["question"]);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();
            $checkRow = $checkResult->fetch_assoc();
            if ($checkRow["duplicate_count"] == 0) {
              $insertQuery = "INSERT INTO testukas(qna_id, klausimas, atsakymas) VALUES (?, ?, ?)";
              $stmt = $connection2->prepare($insertQuery);
              $stmt->bind_param("iss", $row["id"], $row["question"], $row["answer"]);
              $stmt->execute();
            }
            // Remove the record from the viktorina database
            $deleteQuery = "DELETE FROM question_answer WHERE id = ?";
            $deleteStmt = $connection1->prepare($deleteQuery);
            $deleteStmt->bind_param("i", $row["id"]);
            $deleteStmt->execute();
          }
        }
    }
      
      trackAndMoveData();
      

    $connection1->close();
    $connection2->close();

?>

