<?php
if (isset($_GET['get_top_players'])) {

  $dbhost = '***REMOVED***'; // localhost:3306 or localhost
  $dbuser = '***REMOVED***';
  $dbpassword = '***REMOVED***';
  $dbname = 'viktorina';
  $port = 3306;
  $conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $dbname, $port);

  // $dbhost = 'localhost';
  // $dbuser = 'root';
  // $dbpassword = '';
  // $dbname = 'viktorina';
  // $conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $dbname);

  $query = "SELECT nick_name, litai_sum_today FROM super_users WHERE litai_sum_today != 0 ORDER BY litai_sum_today DESC LIMIT 10";
  $result = mysqli_query($conn, $query);

  if (mysqli_num_rows($result) > 0) {
    // echo "<h3>Today's top 10 players:</h3>";
    echo "<ol class='today-top-list'>";
    $i = 1;
    while ($row = mysqli_fetch_assoc($result)) {
      $name = $row['nick_name'];
      $points_today = $row['litai_sum_today'];
      echo "<li class='today-top-list-li'>Top $i: $name $points_today Litai</li>";
      $i++;
    }
    echo "</ol>";
  } else {
    echo "No players found!";
  }
  
  mysqli_close($conn);
}
?>




<!-- PHP funkcija     a_top_players.php    paiima is DuomenuBazes  litai_sum_today  -->