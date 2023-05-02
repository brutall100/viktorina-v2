<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/Games/gameStyle3.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Papildomas Klausimas</title>
  </head>
<body>
  <!-- <div id="greeting"></div> -->
    <?php
      session_start();
      $name = $_GET['name'];
      echo "<div> Labas $name, Jūs gavote progą atsakyti į papildomą klausimą.</div>";
    ?>



    <div id="question"></div>
    <div id="answer"></div>
    <div id="id"></div>


    <script>
      $(document).ready(() => {
        $.get('http://localhost:7000/game3_server', data => {
          $('#question').text(`Question: ${data.question}`);
          $('#answer').text(`Answer: ${data.answer}`);
          $('#id').text(`ID: ${data.id}`);
        });
      });
    </script>





  <div class="container"> 
    <h2>Šiame žaidime gali laimėti nuo 5 minučių BAN iki +300 litų.</h2>
    
  </div>
  


</body>
</html>
<!-- Nu arba papildomo klausimo game random +300 ir ban  -100 ir ban 5minutem  -->