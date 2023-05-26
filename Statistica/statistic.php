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

    echo "<div id='user-info'>
            <p>Jūsų surinkta litų suma: <span class='highlight'>$points</span></p>
            <p>Šiandien surinkote: <span class='highlight'>$points_today</span> litų.</p>
            <p>Jūsų pasiektas lygis: <span class='highlight'>$level</span></p>
            <p>Jūs esate atjungiamas nuo Viktorinos, <span class='name'>$name</span> {$gender}.</p>
            <p>Registravotės su šiuo @: <span class='highlight'>$email</span></p>
          </div>";
  } else {
    echo "User not found!<br>";
  }
  
  // Retrieve statistics
  $query1 = "SELECT COUNT(*) AS question_count_main FROM main_database";
  $result1 = mysqli_query($conn, $query1);
  $row1 = mysqli_fetch_assoc($result1);
  $question_count_main = $row1['question_count_main'];
  
  $query2 = "SELECT COUNT(*) AS question_count_vaiting FROM question_answer";
  $result2 = mysqli_query($conn, $query2);
  $row2 = mysqli_fetch_assoc($result2);
  $question_count_vaiting = $row2['question_count_vaiting'];

  $query3 = "SELECT COUNT(*) AS user_count FROM super_users";
  $result3 = mysqli_query($conn, $query3);
  $row3 = mysqli_fetch_assoc($result3);
  $user_count = $row3['user_count'];

  $query4 = "SELECT nick_name, litai_sum, user_lvl FROM super_users ORDER BY litai_sum DESC LIMIT 10";
  $result4 = mysqli_query($conn, $query4);

  $query5 = "SELECT user, COUNT(*) AS question_count FROM question_answer GROUP BY user ORDER BY question_count DESC LIMIT 10";
  $result5 = mysqli_query($conn, $query5);

  echo "<div class='table-container'>";
  echo "<h2>Top 10 pagal Litus</h2>";
  echo "<table>
          <tr>
            <th>Vardas</th>
            <th>Litai</th>
            <th>Lygis</th>
          </tr>";
  while ($row4 = mysqli_fetch_assoc($result4)) {
    $nickname = $row4['nick_name'];
    $litai_sum = $row4['litai_sum'];
    $user_lvl = $row4['user_lvl'];
    echo "<tr>
            <td>$nickname</td>
            <td>$litai_sum</td>
            <td>$user_lvl</td>
          </tr>";
  }
  echo "</table>";
  echo "</div>";

  echo "<div class='table-container'>";
  echo "<h2>Top 10 klausimų kūrėjų</h2>";
  echo "<table>
          <tr>
            <th>Vardas</th>
            <th>Kiekis</th>
          </tr>";
  while ($row5 = mysqli_fetch_assoc($result5)) {
    $question_writer = $row5['user'];
    $question_count = $row5['question_count'];
    echo "<tr>
            <td>$question_writer</td>
            <td>$question_count</td>
          </tr>";
  }
  echo "</table>";
  echo "</div>";

  mysqli_close($conn);

  echo "<br><span id='countdown'>15</span> seconds before logging out...";

  // Countdown timer using JavaScript
  echo "<script>
          var seconds = 500;
          var countdown = setInterval(function() {
            seconds--;
            document.getElementById('countdown').textContent = seconds;
            if (seconds <= 0) {
              clearInterval(countdown);
              window.location.href = 'd_regilogi.php';
            }
          }, 1000);
        </script>";

  // Destroy the session after 15 seconds
  header('Refresh: 15; URL=d_regilogi.php');
  session_destroy();
} else {
  echo "Error: missing nickname parameter.";
}
?>

