<?php
session_start();
if (isset($_GET['name'])) {
  $_SESSION['name'] = $_GET['name'];
}
if (isset($_GET['level'])) {
  $_SESSION['level'] = $_GET['level'];
}
if (isset($_GET['points'])) {
  $_SESSION['points'] = $_GET['points'];
}
if (isset($_GET['user_id'])) {
  $_SESSION['user_id'] = $_GET['user_id'];
}

$name = isset($_SESSION['name']) ? $_SESSION['name'] : "";
$level = isset($_SESSION['level']) ? $_SESSION['level'] : "";
$points = isset($_SESSION['points']) ? $_SESSION['points'] : "";
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "";
?>



<html>
<head>
  <title>My Page</title>
  <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/aa_headerstyle.css" />
  <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/b_newguestion.css" />
  <!-- Style laikinai bus perkeltas virsun -->
  
  <style>  
      table {
    width: 50%;
    border-collapse: collapse;
  }

  table, td, th {
    border: 1px solid black;
    padding: 5px;
  }

  th {
    text-align: left;
  }
  .vote_count.positive {
  color: green;

  }
  .vote_count.negative {
  color: red;
}
  </style>


   <!-- Meta refresh kas 5 min -->
<meta http-equiv="refresh" content="300">
</head>
<body>
  <header class="header">
    <ul>
      <img class="logo" src="http://localhost/aldas/Viktorina.live/images/icons/viktorina_logo.png" />
      <div>
        <li><a href="http://localhost/aldas/Viktorina.live/a_index.php?name=<?php echo $name ?>&level=<?php echo $level ?>&points=<?php echo $points ?>&user_id=<?php echo $user_id ?>">Viktorina</a></li>
        <li><a href="http://localhost/aldas/Viktorina.live/c_questionwaiting.php?name=<?php echo $name ?>&level=<?php echo $level ?>&points=<?php echo $points ?>&user_id=<?php echo $user_id ?>">Naujienos</a></li>
        <li><a href="http://localhost/aldas/Viktorina.live/b_newquestionindex.php?name=<?php echo $name ?>&level=<?php echo $level ?>&points=<?php echo $points ?>&user_id=<?php echo $user_id ?>">Irašyti klausimą</a></li>
      </div> 
      <div>
        <button id="btn-atsijungti">Atsijungti</button>
      <script>
        const logoutButton = document.getElementById('btn-atsijungti');
        logoutButton.addEventListener('click', () => {
          window.location.href = 'http://localhost/aldas/Viktorina.live/statistic.php?name=<?php echo $name ?>';
        });
      </script>
      </div>  
    </ul>
  </header>


    <div class="main-info">
        <?php if (!empty($name) && !empty($level) && !empty($points)): ?>
          <p>Autorius: <?php echo $name; ?></p>
          <p>Lygis: <?php echo $level; ?></p>
          <p>Litai: <?php echo $points; ?></p>
        <?php endif; ?>
      </div>


  <table style="margin: 0 auto;">
    <tr>
      <th>Number</th>
      <th>User</th>
      <th>Question</th>
      <th>Answer</th>
      <th>Upvote</th>
      <th>Downvote</th>
      <th>Vote Count</th>
    </tr>
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

      // Select the data from the database
      $sql = "SELECT id, user, question, answer, vote_count FROM viktorina.question_answer";
      $result = mysqli_query($conn, $sql);

      if (mysqli_num_rows($result) > 0) {
          // Output the data
          while($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $row['id'] . "</td>";
            echo "<td>" . $row['user'] . "</td>";
            echo "<td>" . $row['question'] . "</td>";
            echo "<td>" . $row['answer'] . "</td>";
            echo "<td>
            <button class='upvote' data-id='". $row['id'] ."'>Upvote</button>
            </td>";
            echo "<td>
            <button class='downvote' data-id='". $row['id'] ."'>Downvote</button>
            </td>";
            echo "<td class='vote_count " . ($row['vote_count'] >= 0 ? 'positive' : 'negative') . "'>" . $row['vote_count'] . "</td>";
        }
        
      } else {
          echo "0 results";
      }

      // Close the connection
      mysqli_close($conn);
    ?>
  </table>
  <footer class="footer">
      <object
        data="http://localhost/aldas/Viktorina.live/Footer/footer.html"
        class="imported-footer">
      </object>
    </footer>
</body>
</html>

<script>
document.querySelectorAll('.upvote').forEach(function(button) {
  button.addEventListener('click', function() {
    var id = this.dataset.id;
    fetch('c_upvote.php?id=' + id)
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        console.log(text);
        setTimeout(function(){
          location.reload();
        }, 3000);
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  });
});

document.querySelectorAll('.downvote').forEach(function(button) {
  button.addEventListener('click', function() {
    var id = this.dataset.id;
    fetch('c_downvote.php?id=' + id)
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        console.log(text);
        setTimeout(function(){
          location.reload();
        }, 3000);
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  });
});

</script>

