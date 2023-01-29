<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/a_style.css" />
    <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/aa_headerstyle.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      rel="stylesheet" />
    <title>Viktorina.live</title>
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
         
        </div>  
      </ul>
    </header>

    <section>
      <div class="litas-container">
        <div id="litai-img"></div>
      </div>
    </section>

    <main class="super-container">
      <div class="points-container">
        <div class="super" id="points"></div>
        <div class="super" id="bonus-points"></div>
      </div>
      <div class="super" id="question"></div>
      <div class="super" id="answers"></div>
      <div class="" id="dot-answer"></div>
      <div class="" id="dot-answer-lenght"></div>

      <form id="answer-form">
        <label for="answer-input">Atsakymas:</label>
        <input type="text" id="answer-input" name="answer" />
        <button class="submit-btn" type="submit">Submit</button>
      </form>
    </main>

    <!-- <div id="chat-container">
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Enter a message...">
        <button id="chat-button">Send</button>
      </div> -->

    <footer class="footer">
      <object
        data="http://localhost/aldas/Viktorina.live/Footer/footer.html"
        class="imported-footer">
      </object>
    </footer>

    <script src="http://localhost/aldas/Viktorina.live/a_index.js"></script>
  </body>
</html>
