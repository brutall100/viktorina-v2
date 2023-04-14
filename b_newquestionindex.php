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
    <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/aa_headerstyle.css" />
    <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/b_newguestion.css" />
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
          <button id="btn-atsijungti">Atsijungti</button>   <!-- Scriptus 2 reikes isnesti is cia -->
        <script>   
          const logoutButton = document.getElementById('btn-atsijungti');
          logoutButton.addEventListener('click', () => {
            window.location.href = 'http://localhost/aldas/Viktorina.live/statistic.php?name=<?php echo $name ?>';
          });
        </script>

        </div>  
      </ul>
    </header>

    <main class="main">
      <div class="main-form">
        <form class="main-form-forma" action="http://localhost/aldas/Viktorina.live/b_newquestion.php" method="post">
          <div>
            <input type="text" id="name" name="name" value="<?php echo $name; ?>" readonly />
            <span id="info-icon" onmouseover="showInfoText()" onmouseout="hideInfoText()">
              <img src="http://localhost/aldas/Viktorina.live/images/images_/small_info2.png" alt="info icon">
              <div id="info-text" style.display = "none">
                <p>Klausimus gali rašyti vartotojai nuo 2 lygio. Už kiekvieną įrašyta klausimą tau bus pervesta <span class="litai-text-color">10 litų</span>. </p>
              </div>
            </span>
          </div>
          
          <label for="question">Klausimas:</label>
          <textarea id="question" name="question" class="resizable"></textarea>
          
          <label for="answer">Atsakymas:</label>
          <textarea id="answer" name="answer" class="resizable"></textarea>
          
          <input type="hidden" id="user_id" name="user_id" value="<?php echo $user_id; ?>" />
          <input type="submit" value="Įrašyti" />
        </form>
      </div>
      </main>
            
    <div class="main-info">   <!-- Laikinai main-info.Arba gražiai sutvarkyti -->
      <?php if (!empty($name) && !empty($level) && !empty($points) && !empty($user_id)): ?>
        <p>Autorius: <?php echo $name; ?></p>
        <p>Lygis: <?php echo $level; ?></p>
        <p>Litai: <?php echo $points; ?></p>
        <p>Id: <?php echo $user_id; ?></p>
      <?php endif; ?>
    </div>
    
    <footer class="footer">
      <object
        data="http://localhost/aldas/Viktorina.live/Footer/footer.html"
        class="imported-footer">
      </object>
    </footer>
  </body>

        <!-- Scriptus 2 reikes isnesti is cia -->
<script type="text/javascript">
  function showInfoText() {
    document.getElementById("info-text").style.display = "block";
  }

  function hideInfoText() {
    document.getElementById("info-text").style.display = "none";
  }
</script>


</html>
