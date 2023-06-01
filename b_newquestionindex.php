<?php
    // Include the b_newquestion.php file
    include('b_newquestion.php');
?>

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



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Naujo klausimo įrašymas</title>
  <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/b_newguestion.css" />
</head>
  
<body>
<?php include 'Header/header.php'; ?>
  
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

    <div class="main-info">   <!-- Laikinai main-info.Arba gražiai sutvarkyti -->
      <?php if (!empty($name) && !empty($level) && !empty($points) && !empty($user_id)): ?>
        <p>Autorius: <?php echo $name; ?></p>
        <p>Lygis: <?php echo $level; ?></p>
        <p>Litai: <?php echo $points; ?></p>
        <p>Id: <?php echo $user_id; ?></p>
      <?php endif; ?>
    </div>
  </main>


  <div><?php echo $message; ?></div>



  <footer class="footer">
    <object
      data="http://localhost/aldas/Viktorina.live/Footer/footer.html"
      class="imported-footer">
    </object>
  </footer>

</body>

<script type="text/javascript" src="http://localhost/aldas/Viktorina.live/b_newquestion.js"></script>    
</html>
          
<script>
    // Funkcija tikrinanti Varotojo levely
    if ('<?php echo isset($_SESSION['level']) ? "true" : "false"; ?>' === 'true') {
      // Get the value of the level variable from the session
      var level = '<?php echo $_SESSION['level']; ?>';
      // Do something with the level variable
      console.log("User levell: " + level);
    } else {
      // Session variable not set, do something else
      console.log("Session variable not set");
    }

    const userLevel = '<?php echo $_SESSION['level'] ?? 0; ?>';
    const isUserLevelValid = userLevel !== undefined && userLevel !== null && userLevel !== '' && userLevel !== 'unknown' && parseInt(userLevel) >= 2;

    if (!isUserLevelValid) {
      // Disable the input fields if the user's level is invalid or less than 2
      document.getElementById("question").disabled = true;
      document.getElementById("answer").disabled = true;
    }
</script>





