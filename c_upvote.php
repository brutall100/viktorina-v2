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

  // Get the question id from the URL
  $id = $_GET['id'];

  // Create the SQL query
  $sql = "UPDATE viktorina.question_answer SET vote_count = vote_count + 1 WHERE id = $id";

  // Execute the query
  if (mysqli_query($conn, $sql)) {
      echo "Record updated successfully";
  } else {
      echo "Error updating record: " . mysqli_error($conn);
  }

  // Close the connection
  mysqli_close($conn);
?>
