<?php
session_set_cookie_params(['SameSite' => 'none', 'httponly' => true, 'Secure' => true]);

session_start();

include 'config-db.php';

$name = htmlspecialchars($_SESSION['nick_name'] ?? "", ENT_QUOTES, 'UTF-8');
$level = htmlspecialchars($_SESSION['user_lvl'] ?? "", ENT_QUOTES, 'UTF-8');
$points = htmlspecialchars($_SESSION['points'] ?? "", ENT_QUOTES, 'UTF-8');
$user_id = htmlspecialchars($_SESSION['user_id'] ?? "", ENT_QUOTES, 'UTF-8');
$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {


    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $user_id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
    $question = htmlspecialchars($_POST['question'] ?? "", ENT_QUOTES, 'UTF-8');
    $answer = htmlspecialchars($_POST['answer'] ?? "", ENT_QUOTES, 'UTF-8');
    $date_inserted = date("Y-m-d"); // current date
    $ip = $_SERVER['REMOTE_ADDR'];

    if (empty($name)) {
        $message = '<span class="empty-fields">Klaida:</br> Turite prisijungti.</span>';
    } elseif (empty($question) || empty($answer)) {
        $message = '<span class="empty-fields">Klaida:</br> Ne visi laukai užpildyti. Klausimas ir atsakymas yra būtini.</span>';
    } else {
        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare("SELECT curse_words FROM bad_words");
        $stmt->execute();
        $bad_words_result = $stmt->get_result();
        $bad_words_array = array();

        while ($row = $bad_words_result->fetch_assoc()) {
            $bad_words_array[] = $row["curse_words"];
        }

        foreach ($bad_words_array as $bad_word) {
            if (strpos($question, $bad_word) !== false || strpos($answer, $bad_word) !== false) {
                $message = '<span class="bad-word-message">Klaida:</br> Klausime arba atsakyme yra nepriimtinų žodžių.</span>';
                break;
            }

            // Check for three or more consecutive same letters in question or answer
            if (preg_match('/(.)\1{2,}/', $question) || preg_match('/(.)\1{2,}/', $answer)) {
                $message = '<span class="consecutive-letters-message">Klaida:</br> Klausime arba atsakyme yra trys ar daugiau iš eilės einančios tokios pačios raidės.</span>';
                break;
            }

            // Check if any word has more than 21 letters in question or answer
            $words = preg_split('/\s+/', $question);
            $words = array_merge($words, preg_split('/\s+/', $answer));

            foreach ($words as $word) {
                if (mb_strlen($word, 'UTF-8') > 21) {
                    $message = '<span class="long-word-message">Klaida:</br> Klausime arba atsakyme yra žodis, turintis daugiau nei 21 raidę.</span>';
                    break 2;
                }
            }
        }

        if (empty($message)) {
            // Check user level
            $stmt = $conn->prepare("SELECT user_lvl FROM super_users WHERE user_id = ?");
            $stmt->bind_param("s", $user_id);
            $stmt->execute();
            $check_level_result = $stmt->get_result();

            if ($check_level_result->num_rows > 0) {
                $row = $check_level_result->fetch_assoc();
                $user_lvl = $row['user_lvl'];

                if ($user_lvl <= 1) {
                    $message = '<span class="user-level-error">Klaida:</br> Jūs neturite leidimo įrašyti klausimo ir atsakymo į duomenų bazę.</span>';
                } else {
                    // Use prepared statement to prevent SQL injection
                    $stmt = $conn->prepare("SELECT * FROM question_answer WHERE question = ? AND answer = ?");
                    $stmt->bind_param("ss", $question, $answer);
                    $stmt->execute();
                    $check_result = $stmt->get_result();

                    if ($check_result->num_rows > 0) {
                        $message = "Toks klausimas jau egzistuoja.";
                    } else {
                        // Insert the data into the database
                        $stmt = $conn->prepare("INSERT INTO question_answer (user, super_users_id, question, answer, date_inserted, ip) VALUES (?, ?, ?, ?, ?, ?)");
                        $stmt->bind_param("ssssss", $name, $user_id, $question, $answer, $date_inserted, $ip);

                        if ($stmt->execute()) {
                            $message = '<span class="good-question">Naujas klausimas sukurtas sėkmingai. Klausimas irašytas į laikinają duomenų bazę. Kur bus balsuojama. Už įrašytą klausimą jums bus suteikta 10 LITŲ.</span>';
                            $stmt = $conn->prepare("UPDATE super_users SET litai_sum = litai_sum + 10, timestamp_icon = CURRENT_TIMESTAMP WHERE nick_name = ?");
                            $stmt->bind_param("s", $name);

                            if ($stmt->execute()) {
                            } else {
                                $message = "Error updating litai_sum: " . $stmt->error;
                            }
                        } else {
                            $message = "Error: " . $stmt->error;
                        }
                    }
                }
            } else {
                $message = "Nepavyko gauti naudotojo lygio informacijos.";
            }
        }
    }

    $stmt->close();
    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="lt">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naujo klausimo įrašymas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="new-question.css">
  <link rel="shortcut icon" href="/viktorina-v2/favicon.svg" type="image/svg+xml">
</head>  
 <body>
<div class="header-wrapper">
  <?php include 'header/header.php';
 ?>
</div>
  <main class="main">
    <div class="main-form">
      <form class="main-form-forma" method="post">
        <div>
          <input type="text" id="name" name="name" value="<?php echo $name; ?>" readonly>
          <div id="info-icon" onmouseover="showInfoText()" onmouseout="hideInfoText()">
            <img src="/viktorina-v2/images/icons/info.webp" alt="Klausimus gali rašyti vartotojai nuo 2 lygio. Už kiekvieną įrašyta klausimą tau bus pervesta 10 litų .Klausimo ilgis neribojamas. Atsakymo ilgis maksimalus 50 simbolių.">
            <div id="info-text" style="display:none">
              <p>Klausimus gali rašyti vartotojai nuo 2 lygio. Už kiekvieną įrašyta klausimą tau bus pervesta <span class="litai-text-color">10 litų</span>.Klausimo ilgis neribojamas. Atsakymo ilgis maksimalus 50 simbolių. </p>
            </div>
          </div>
        </div>

        <label for="question">Klausimas:</label>
        <textarea id="question" name="question" class="question-resizable"></textarea>
        
        <label for="answer">Atsakymas:</label>
        <input type="text" id="answer" name="answer" class="answer-not-resizable" maxlength="60">
        
        <input type="hidden" id="user_id" name="user_id" value="<?php echo $user_id; ?>">
        <input type="submit" value="Įrašyti">
      </form>
    </div>
    
    <div class="main-info">
        <?php if (!empty($name) && !empty($level) && !empty($points) && !empty($user_id)): ?>
            <?php
            // // Conection from Include
            include 'config-db.php';

            $stmt = $conn->prepare("SELECT timestamp_icon FROM super_users WHERE user_id = ?");
            $stmt->bind_param("s", $user_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $timestamp_icon = strtotime($row['timestamp_icon']); // Convert timestamp to UNIX timestamp
            } else {
                $timestamp_icon = 0; // If no timestamp is found, assign a default value
            }

            $oneWeekAgo = strtotime('-1 week'); // Calculate the timestamp 1 week ago
            $iconAddress = "/viktorina-v2/images/icons/logo.webp";
            // Check if the timestamp is within the last 1 week
            if ($timestamp_icon > $oneWeekAgo) {
                echo '<p>Autorius: ' . $name . ' <img src="' . $iconAddress . '" alt="icon" width="21" height="21" class="question_master_icon"></p>';
            } else {
                echo '<p>Autorius: ' . $name . '</p>';
            }

            $stmt->close();
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

  <div class = "footer-wrapper">
      <?php include 'footer/footer.php'; ?>
  </div> 
  
<script src="new-question.js"></script>
<script>                     <!-- Cia dar neaisku kaip turi buti, pirmai buvo klaida level undefined -->
    if ('<?php echo !empty($level) ? "true" : "false"; ?>' === 'true') {
      var level = '<?php echo $level; ?>';
      console.log("User level: " + level);
    } else { console.log("Session variable not set");   }

    const userLevel = '<?php echo $level ?? 0; ?>';
    const isUserLevelValid = userLevel !== undefined && userLevel !== null && userLevel !== '' && userLevel !== 'unknown' && parseInt(userLevel) >= 2;
    if (!isUserLevelValid) {
      document.getElementById("question").disabled = true;
      document.getElementById("answer").disabled = true;
    }
</script>   
</body>
</html>


<!-- <p>Jūs esate perkkeliamas atgal. Gal įrašysite dar vieną klausimą?  <span id="countdown">30</span> seconds.</p> -->
