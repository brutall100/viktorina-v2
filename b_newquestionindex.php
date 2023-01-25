<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- <base href="/aldas/Viktorina.live/NewQuestionInsert/"> -->
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
    <!-- Registered user fiils automatic , not registered ip or useful info-->

    <main class="main">
      <div class="main-form">
        <form action="http://localhost/aldas/Viktorina.live/b_newquestion.php" method="post">
          <label for="name">Autorius:</label>
          <input type="text" id="name" name="name" />
          
          <label for="question">Klausimas:</label>
          <input type="text" id="question" name="question" />
          
          <label for="answer">Atsakymas:</label>
          <input type="text" id="answer" name="answer" />
          

          <input type="submit" value="Įrašyti" />
        </form>
      </div>
    </main>

    <footer class="footer">
      <object
        data="/Footer/footer.html"
        class="imported-footer"></object>
    </footer>
  </body>
</html>
