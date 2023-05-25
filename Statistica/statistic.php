<?php
session_start();
if (isset($_GET['name'])) {
  $name = $_GET['name'];
  $conn = mysqli_connect("localhost", "root", "", "viktorina");
  $query = "SELECT user_lvl, litai_sum, litai_sum_today, gender_super, user_email FROM super_users WHERE nick_name = '$name'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    $points_today = $row['litai_sum_today'];
    $gender = $row['gender_super'];
    $email = $row['user_email'];

    echo "<link rel='stylesheet' type='text/css' href='statistic.css'>";

    echo "<div>
            Jūsų surinkta litų suma: <span class='highlight'>$points</span><br>
            Jūsų pasiektas lygis: <span class='highlight'>$level</span><br>
            Jūs esate atjungiamas nuo Viktorinos, <span class='name'>$name</span> {$gender}.<br>
            Šiandien surinkote: <span class='highlight'>$points_today</span> litų.<br>
            Registravotės su šiuo @: <span class='highlight'>$email</span>
          </div>";
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
  echo "<tr><th>Vardas</th><th>Litai</th><th>Levelis</th></tr>";
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
  echo "var seconds = 500;";// 10-15 seconds has to be.
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
  header('Refresh: 500; URL=d_regilogi.php');
  session_destroy();
} else {
  echo "Error: missing nickname parameter.";
}
?>

