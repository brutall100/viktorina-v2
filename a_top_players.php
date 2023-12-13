<?php
include 'x_configDB.php'; // or use require 'x_configDB.php';

if (isset($_GET['get_top_players'])) {

  $query = "SELECT nick_name, litai_sum_today FROM super_users WHERE litai_sum_today != 0 ORDER BY litai_sum_today DESC LIMIT 10";
  $result = mysqli_query($conn, $query);

  if (mysqli_num_rows($result) > 0) {
    echo "<ol class='php-today-top-list'>";
    $i = 1;
    while ($row = mysqli_fetch_assoc($result)) {
      $name = $row['nick_name'];
      $points_today = $row['litai_sum_today'];
      echo "<li class='php-today-top-list-li'>Top $i: $name $points_today Litai</li>";
      $i++;
    }
    echo "</ol>";
  } else {
    $allTimeBestQuery = "SELECT nick_name, MAX(litai_sum) AS max_points FROM super_users";
    $bestResult = mysqli_query($conn, $allTimeBestQuery);
    if ($row = mysqli_fetch_assoc($bestResult)) {
      $bestName = $row['nick_name'];
      $bestPoints = $row['max_points'];
      echo "<div class='best-player-php'>Best of all: <span class='player-name-hp'>$bestName</span> <span class='player-points-hp'>$bestPoints Litai</span></div>";
    } else {
      echo "No players found!";
    }
  }
  
  mysqli_close($conn);
}
?>





<!-- PHP funkcija     a_top_players.php    paiima is DuomenuBazes  litai_sum_today  -->