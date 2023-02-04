<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "viktorina";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, question, answer FROM question_answer ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = array("id"=> $row["id"], "question" => $row["question"], "answer" => $row["answer"]);
    }
} 
echo json_encode($data);
$conn->close();
?>

