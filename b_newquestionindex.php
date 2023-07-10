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

$message = ""; 


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $dbname = 'viktorina';

    $conn = mysqli_connect($host, $user, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $name = $_POST['name'];
    $user_id = $_POST['user_id'];
    $question = $_POST['question'];
    $answer = $_POST['answer'];
    $date_inserted = date("Y-m-d"); // current date
    $ip = $_SERVER['REMOTE_ADDR'];

    if (empty($question) || empty($answer)) {
        $message = '<span class="empty-fields">Klaida:</br> Ne visi laukai užpildyti. Klausimas ir atsakymas yra būtini.</span>';
    } else {
        // Check if answer contains bad words
        $bad_words_sql = "SELECT curse_words FROM bad_words";
        $bad_words_result = mysqli_query($conn, $bad_words_sql);
        $bad_words_array = array();

        if (mysqli_num_rows($bad_words_result) > 0) {
            while($row = mysqli_fetch_assoc($bad_words_result)) {
                $bad_words_array[] = $row["curse_words"];
            }
        }

        foreach ($bad_words_array as $bad_word) {
          if (strpos($question, $bad_word) !== false || strpos($answer, $bad_word) !== false) {
              $message = '<span class="bad-word-message">Klaida:</br> Klausime arba atsakyme yra nepriimtinų žodžių.</span>';
              break; // Stop the loop after finding the first bad word
          }
      
          // Check for three or more consecutive same letters in question or answer
          if (preg_match('/(.)\1{2,}/', $question) || preg_match('/(.)\1{2,}/', $answer)) {
              $message = '<span class="consecutive-letters-message">Klaida:</br> Klausime arba atsakyme yra trys ar daugiau iš eilės einančios tokios pačios raidės.</span>';
              break; // Stop the loop after finding three or more consecutive same letters
          }
        }

        if (empty($message)) {
            // Check user level
            $check_level_sql = "SELECT user_lvl FROM super_users WHERE user_id = '$user_id'";
            $check_level_result = mysqli_query($conn, $check_level_sql);

            if (mysqli_num_rows($check_level_result) > 0) {
                $row = mysqli_fetch_assoc($check_level_result);
                $user_lvl = $row['user_lvl'];

                if ($user_lvl <= 1) {
                    $message = '<span class="user-level-error">Klaida:</br> Jūs neturite leidimo įrašyti klausimo ir atsakymo į duomenų bazę.</span>';
                } else {
                    // Check if the same question and answer already exist
                    $check_sql = "SELECT * FROM question_answer WHERE question = '$question' AND answer = '$answer'";
                    $check_result = mysqli_query($conn, $check_sql);

                    if (mysqli_num_rows($check_result) > 0) {
                        $message = "Toks klausimas jau egzistuoja.";
                    } else {
                        // Insert the data into the database
                        $sql = "INSERT INTO question_answer (user, super_users_id, question, answer, date_inserted, ip) VALUES ('$name', '$user_id', '$question', '$answer', '$date_inserted','$ip')";
                        if (mysqli_query($conn, $sql)) {
                            $message = '<span class="good-question">Naujas klausimas sukurtas sėkmingai. Klausimas irašytas į laikinają duomenų bazę. Kur bus balsuojama. Už įrašytą klausimą jums bus suteikta 10 LITŲ.</span>';
                            $sql = "UPDATE super_users SET litai_sum = litai_sum + 10, timestamp_icon = CURRENT_TIMESTAMP WHERE nick_name = '$name'";

                            if (mysqli_query($conn, $sql)) {
                                // Success
                            } else {
                                $message = "Error updating litai_sum: " . mysqli_error($conn);
                            }
                        } else {
                            $message = "Error: " . $sql . "<br>" . mysqli_error($conn);
                        }
                    }
                }
            } else {
                $message = "Nepavyko gauti naudotojo lygio informacijos.";
            }
        }
    }

    mysqli_close($conn);
}
?>





<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Naujo klausimo įrašymas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/b_newguestion.css" />
</head>
  
<body>
<div class="header-wrapper">
  <?php include 'Header/header.php'; ?>
</div>
  
  <main class="main">
    <div class="main-form">
      <form class="main-form-forma" method="post">
        <div>
          <input type="text" id="name" name="name" value="<?php echo $name; ?>" readonly />
          <span id="info-icon" onmouseover="showInfoText()" onmouseout="hideInfoText()">
            <img src="http://localhost/aldas/Viktorina.live/images/images_/small_info2.png" alt="Klausimus gali rašyti vartotojai nuo 2 lygio. Už kiekvieną įrašyta klausimą tau bus pervesta 10 litų .Klausimo ilgis neribojamas. Atsakymo ilgis maksimalus 50 simbolių.">
            <div id="info-text" style.display = "none">
              <p>Klausimus gali rašyti vartotojai nuo 2 lygio. Už kiekvieną įrašyta klausimą tau bus pervesta <span class="litai-text-color">10 litų</span>.Klausimo ilgis neribojamas. Atsakymo ilgis maksimalus 50 simbolių. </p>
            </div>
          </span>
        </div>

        <label for="question">Klausimas:</label>
        <textarea id="question" name="question" class="question-resizable"></textarea>
        
        <label for="answer">Atsakymas:</label>
        <input type="text" id="answer" name="answer" class="answer-not-resizable" maxlength="60" />
        
        <input type="hidden" id="user_id" name="user_id" value="<?php echo $user_id; ?>" />
        <input type="submit" value="Įrašyti" />
      </form>
    </div>

    
    <div class="main-info">
      <?php if (!empty($name) && !empty($level) && !empty($points) && !empty($user_id)): ?>
        <?php
        date_default_timezone_set('Europe/Vilnius'); // Set the time zone to "Europe/Vilnius"

        $conn = mysqli_connect("localhost", "root", "", "viktorina");
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        // Get the timestamp from the database
        $sql = "SELECT timestamp_icon FROM super_users WHERE user_id = '$user_id'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $timestamp_icon = strtotime($row['timestamp_icon']); // Convert timestamp to UNIX timestamp
            //echo "Timestamp from database: " . date('Y-m-d H:i:s', $timestamp_icon) . "<br>"; // Debugging statement
            //echo "Current time: " . date('Y-m-d H:i:s') . "<br>"; // Debugging statement
        } else {
            $timestamp_icon = 0; // If no timestamp is found, assign a default value
        }

        $oneWeekAgo = strtotime('-1 week'); // Calculate the timestamp 1 week ago
        $iconAddress = "http://localhost/aldas/Viktorina.live/images/icons/question_master6.jpg";
        // Check if the timestamp is within the last 1 week
        if ($timestamp_icon > $oneWeekAgo) {
            echo '<p>Autorius: ' . $name . ' <img src="' . $iconAddress . '" alt="icon" width="21" height="21" class="question_master_icon"></p>'; 
        } else {
            echo '<p>Autorius: ' . $name . '</p>';
        }

        mysqli_close($conn);
        ?>
        <p>Lygis: <?php echo $level; ?></p>
        <p>Litai: <?php echo $points; ?></p>
        <p>Id: <?php echo $user_id; ?></p>
      <?php endif; ?>
    </div>
  </main>


  <?php if (!empty($message)): ?>
    <div class="message-container">
        <div class="message">
          <?php echo $message; ?>
        </div>
    </div>
  <?php else: ?>
      <div class="message-container">
          <div class="message">
            Klausimai ir atsakymai privalo būti aiškūs, teisingai suformuluoti, su skyrybos ženklais, be keiksmažodžių.
          </div>
      </div>
  <?php endif; ?>


  <footer class="footer">
    <object
      data="http://localhost/aldas/Viktorina.live/Footer/footer.html"
      class="imported-footer">
    </object>
  </footer>

</body>
<script src="http://localhost/aldas/Viktorina.live/b_newquestion.js"></script>
</html>

          
<script>
    if ('<?php echo isset($_SESSION['level']) ? "true" : "false"; ?>' === 'true') {
      var level = '<?php echo $_SESSION['level']; ?>';
      console.log("User levell: " + level);
    } else {
      console.log("Session variable not set");
    }

    const userLevel = '<?php echo $_SESSION['level'] ?? 0; ?>';
    const isUserLevelValid = userLevel !== undefined && userLevel !== null && userLevel !== '' && userLevel !== 'unknown' && parseInt(userLevel) >= 2;

    if (!isUserLevelValid) {
      document.getElementById("question").disabled = true;
      document.getElementById("answer").disabled = true;
    }
</script>





<!-- <p>Jūs esate perkkeliamas atgal. Gal įrašysite dar vieną klausimą?  <span id="countdown">30</span> seconds.</p> -->