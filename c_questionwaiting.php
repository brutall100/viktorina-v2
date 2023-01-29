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
              <li><a href="http://localhost/aldas/Viktorina.live/a_index.php">Viktorina</a></li>
              <li><a href="http://localhost/aldas/Viktorina.live/c_questionwaiting.php">Naujienos</a></li>
              <li><a href="http://localhost/aldas/Viktorina.live/b_newquestionindex.php">Irašyti klausimą</a></li>
            </div> 
            <div>
              <?php
                if(isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true && isset($_SESSION['username'])) {
                  echo "Welcome, " . $_SESSION['username'];
                }else{
                  echo "Esate neprisijunges";
                }
              ?>
            </div>  
          </ul>
    </header>


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

