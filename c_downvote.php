<?php
  // Connect to the database
  $host = 'localhost';
  $user = 'root';
  $password = '';
  $dbname = 'viktorina';

  $conn = mysqli_connect($host, $user, $password, $dbname);

  // Check connection
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }

  // Check if the id parameter is set
  if(isset($_GET['id'])) {
    $id = $_GET['id'];
    // Update the downvotes column in the database
    $sql = "UPDATE viktorina.question_answer SET vote_count = vote_count - 1 WHERE id = $id";
    if(mysqli_query($conn, $sql)) {
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . mysqli_error($conn);
    }
  } else {
    echo "Error: id not provided";
  }

  // Close the connection
  mysqli_close($conn);
?>