<?php
session_start();
if (isset($_SESSION['nick_name'])) {
    $name = $_SESSION['nick_name'];
  
    include('../x_configDB.php'); 

    $query = "SELECT 
        user_lvl,
        litai_sum,
        litai_sum_today,
        litai_sum_week,
        litai_sum_month,
        gender_super,
        user_email
        FROM 
        super_users
        WHERE 
        nick_name = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    $points_today = $row['litai_sum_today'];
    $points_week = $row['litai_sum_week'];
    $points_month = $row['litai_sum_month'];
    $gender = $row['gender_super'];
    $email = $row['user_email'];

    $stmt->close();

    echo "<link rel='stylesheet' type='text/css' href='/viktorina.live/Statistica/statistic.css'>";

    // Calculate user's place in the database
    $query_place = "SELECT COUNT(*) AS user_place FROM super_users WHERE litai_sum > ?";
    $stmt_place = $conn->prepare($query_place);
    $stmt_place->bind_param("i", $points);
    $stmt_place->execute();
    $result_place = $stmt_place->get_result();
    $row_place = $result_place->fetch_assoc();
    $user_place = $row_place['user_place'] + 1; // Add 1 to account for the user's own place

    $stmt_place->close();

    // Retrieve the total number of users
    $query_total_users = "SELECT COUNT(*) AS total_users FROM super_users";
    $result_total_users = mysqli_query($conn, $query_total_users);
    $row_total_users = mysqli_fetch_assoc($result_total_users);
    $total_users = $row_total_users['total_users'];
    
    // Retrieve the total number of users using a prepared statement
    $query_total_users = "SELECT COUNT(*) AS total_users FROM super_users";
    $stmt_total_users = $conn->prepare($query_total_users);
    $stmt_total_users->execute();
    $result_total_users = $stmt_total_users->get_result();
    $row_total_users = $result_total_users->fetch_assoc();
    $total_users = $row_total_users['total_users'];

    $stmt_total_users->close();
    
    // Query 2: Retrieve count of questions waiting for approval
    $query2 = "SELECT COUNT(*) AS question_count_vaiting FROM question_answer";
    $stmt2 = $conn->prepare($query2);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    $row2 = $result2->fetch_assoc();
    $question_count_vaiting = $row2['question_count_vaiting'];
    $stmt2->close();

    // Query 3: Retrieve the total number of users
    $query3 = "SELECT COUNT(*) AS user_count FROM super_users";
    $stmt3 = $conn->prepare($query3);
    $stmt3->execute();
    $result3 = $stmt3->get_result();
    $row3 = $result3->fetch_assoc();
    $user_count = $row3['user_count'];
    $stmt3->close();

    echo "<!DOCTYPE html>
    <html>
    <head>
        <link rel='stylesheet' type='text/css' href='statistic.css'>
    </head>
    <body>
        <div class='main-container'>
            <div id='user-info'>
                <h1>Jūs esate atjungiamas nuo Viktorinos, <span class='name'>$name</span> " . ($gender ? $gender : "") . "</h1> 
                <div class='time-div'>
                  <h2 class='time-left'><span id='countdown'>12</span></h2>
                  <button class='time-stop-btn' onclick='toggleCountdown()'>STOP</button>
                </div>
                <p>Jūsų vieta: <span class='highlight'>$user_place</span> iš <span class='highlight'>$total_users</span></p>
                <p>Šiandien surinkote: <span class='highlight'>$points_today</span> litų.</p>
                <p>Jūsų surinkta litų suma: <span class='highlight'>$points</span></p>
                <p>Jūsų pasiektas lygis: <span class='highlight'>$level</span></p>
                <p>Registravotės su šiuo @: <span class='highlight'>$email</span></p>";

                echo "<div class='statistic-info'>
                <h1>Statistika</h1>
                <p>Registruotų vartotojų: $user_count</p>
                <p>Iš viso klausimų: $question_count_main</p>
                <p>Iš viso laukančių patvirtinimo klausimų: $question_count_vaiting</p>
            </div>";

    echo "<button class='dropdown-btn' onclick='toggleDropdown()'>Konkurentai</button>";

    echo "<div id='dropdown' class='dropdown-content' style='display: none;'>";

   

    $query_all_users = "SELECT nick_name, litai_sum FROM super_users ORDER BY litai_sum DESC";
    $result_all_users = mysqli_query($conn, $query_all_users);

    echo "<h3 class='dropdown-title'>Visi žaidėjai:</h3>";
    echo "<ol class='dropdown-list'>";
    while ($row_all_users = mysqli_fetch_assoc($result_all_users)) {
        $username = $row_all_users['nick_name'];
        $user_points = $row_all_users['litai_sum'];
        echo "<li>$username - $user_points LT</li>";
    }
 
    echo "</ol></div></div></div>";

} else {
    echo "Toks vartotojas nerastas!<br>";
}

  // Destroy session and clear variables after 12 seconds
  session_unset();  
  session_destroy();
  // header('Refresh: 12; URL= d_regilogi.php');


  // Retrieve statistics


  $query4 = "SELECT nick_name, litai_sum, user_lvl FROM super_users ORDER BY litai_sum DESC LIMIT 14";
  $result4 = mysqli_query($conn, $query4);

  $query5 = "SELECT user, COUNT(*) AS question_count FROM question_answer GROUP BY user ORDER BY question_count DESC LIMIT 14";
  $result5 = mysqli_query($conn, $query5);

  $query6 = "SELECT nick_name, litai_sum_today FROM super_users ORDER BY litai_sum_today DESC LIMIT 14";
  $result6 = mysqli_query($conn, $query6);
  
  $query7 = "SELECT nick_name, litai_sum_week FROM super_users ORDER BY litai_sum_week DESC LIMIT 14";
  $result7 = mysqli_query($conn, $query7);

  $query8 = "SELECT nick_name, litai_sum_month FROM super_users ORDER BY litai_sum_month DESC LIMIT 14";
  $result8 = mysqli_query($conn, $query8);


  echo "<div class='main-container'>";
    echo "<h2>Top Geriausi</h2>";
    echo "<table class='statistic-table'>";
    echo "<tr>
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
              <td class='center-numbers'>$user_lvl</td>
            </tr>";
    }
    echo "</table>";
  echo "</div>";


    echo "<div class='main-container'>";
    echo "<h2>Top šiandien</h2>";
    echo "<table class='statistic-table'>";
    echo "<tr>
            <th>Vardas</th>
            <th>Litai šiandien</th>
          </tr>";
    while ($row6 = mysqli_fetch_assoc($result6)) {
      $nickname = $row6['nick_name'];
      $litai_sum_today = $row6['litai_sum_today'];
      echo "<tr>
              <td>$nickname</td>
              <td class='center-numbers'>$litai_sum_today</td>
            </tr>";
    }
    echo "</table>";
  echo "</div>";

  echo "<div class='main-container'>";
    echo "<h2>Šios savaitės TOP</h2>";
    echo "<table class='statistic-table'>";
    echo "<tr>
            <th>Vardas</th>
            <th>Litai šią savaitę</th>
          </tr>";
    while ($row7 = mysqli_fetch_assoc($result7)) {
        $nickname = $row7['nick_name'];
        $litai_sum_week = $row7['litai_sum_week'];
        echo "<tr>
                <td>$nickname</td>
                <td class='center-numbers'>$litai_sum_week</td>
              </tr>";
    }
    echo "</table>";
    echo "</div>";

    echo "<div class='main-container'>";
    echo "<h2>Šio mėnesio TOP</h2>";
    echo "<table class='statistic-table'>";
    echo "<tr>
            <th>Vardas</th>
            <th>Litai šį mėnesį</th>
          </tr>";
    while ($row8 = mysqli_fetch_assoc($result8)) {
        $nickname = $row8['nick_name'];
        $litai_sum_month = $row8['litai_sum_month'];
        echo "<tr>
                <td>$nickname</td>
                <td class='center-numbers'>$litai_sum_month</td>
              </tr>";
    }
    echo "</table>";
    echo "</div>";

    



  echo "<div class='main-container'>";
    echo "<h2>Top klausimų kūrėjų</h2>";
    echo "<table class='statistic-table'>";
    echo "<tr>
            <th>Vardas</th>
            <th>Kiekis</th>
          </tr>";
    while ($row5 = mysqli_fetch_assoc($result5)) {
      $question_writer = $row5['user'];
      $question_count = $row5['question_count'];
      echo "<tr>
              <td>$question_writer</td>
              <td class='center-numbers'>$question_count</td>
            </tr>";
    }
    echo "</table>";
  echo "</div>";



 
  echo "</div></div></body></html>";

  mysqli_close($conn);

  // Countdown timer using JavaScript
  echo "<script>
  var seconds = 12; 
  var countdown;

  function updateCountdown() {
    seconds--;
    document.getElementById('countdown').textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdown);
      window.location.href = `/viktorina.live/d_regilogi.php`;
    }
  }

  countdown = setInterval(updateCountdown, 1000);

  function toggleCountdown() {
    var button = document.querySelector('.time-stop-btn');
    if (countdown) {
      // If countdown is running, stop it
      clearInterval(countdown);
      countdown = null;
      button.textContent = 'IŠEITI';
    } else {
      // If countdown is not running, start it
      countdown = setInterval(updateCountdown, 1000);
      button.textContent = 'STOP';
    }
  }
</script>";
} else {
  echo "<script>window.location.href = '/viktorina.live/d_regilogi.php';</script>";
}

echo "<script>
      function toggleDropdown() {
        var dropdown = document.getElementById('dropdown');
        if (dropdown.style.display === 'none') {
          dropdown.style.display = 'block';
        } else {
          dropdown.style.display = 'none';
        }
      }
      </script>";

?>