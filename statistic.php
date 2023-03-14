<?php
session_start();
if (isset($_GET['name'])) {
  $name = $_GET['name'];
  $conn = mysqli_connect("localhost", "root", "", "viktorina");
  $query = "SELECT user_lvl, litai_sum FROM super_users WHERE nick_name = '$name'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    echo "You are logging out, $name. Your current level is $level and you have $points points.<br>";
  } else {
    echo "User not found!<br>";
  }
  
  // Retrieve statistics
  $query1 = "SELECT COUNT(*) AS question_count FROM question_answer";
  $result1 = mysqli_query($conn, $query1);
  $row1 = mysqli_fetch_assoc($result1);
  $question_count = $row1['question_count'];

  $query2 = "SELECT COUNT(*) AS user_count FROM super_users";
  $result2 = mysqli_query($conn, $query2);
  $row2 = mysqli_fetch_assoc($result2);
  $user_count = $row2['user_count'];

  $query3 = "SELECT nick_name, litai_sum, user_lvl FROM super_users ORDER BY litai_sum DESC LIMIT 10";
  $result3 = mysqli_query($conn, $query3);

  echo "<h1>Statistics</h1>";
  echo "<p>Total number of questions: $question_count</p>";
  echo "<p>Total number of users: $user_count</p>";
  echo "<h2>Top 10 users by litai_sum</h2>";
  echo "<table>";
  echo "<tr><th>Nickname</th><th>Litai Sum</th><th>User Level</th></tr>";
  while ($row3 = mysqli_fetch_assoc($result3)) {
    $nickname = $row3['nick_name'];
    $litai_sum = $row3['litai_sum'];
    $user_lvl = $row3['user_lvl'];
    echo "<tr><td>$nickname</td><td>$litai_sum</td><td>$user_lvl</td></tr>";
  }
  echo "</table>";

  mysqli_close($conn);

  echo "<br><span id='countdown'>15</span> seconds before logging out...";

  // Countdown timer using JavaScript
  echo "<script>";
  echo "var seconds = 15;";
  echo "var countdown = setInterval(function() {";
  echo "  seconds--;";
  echo "  document.getElementById('countdown').textContent = seconds;";
  echo "  if (seconds <= 0) {";
  echo "    clearInterval(countdown);";
  echo "    window.location.href = 'd_regilogi.php';";
  echo "  }";
  echo "}, 1000);";
  echo "</script>";

  // Destroy the session after 15 seconds
  header('Refresh: 15; URL=d_regilogi.php');
  session_destroy();
} else {
  echo "Error: missing nickname parameter.";
}
?>

