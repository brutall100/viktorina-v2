<?php 
	session_start(); //starting the session, to use and store data in session variable

	//if the session variable is empty, this means the user is yet to login
	//user will be sent to 'login.php' page to allow the user to login
	if (!isset($_SESSION['username'])) {
		$_SESSION['msg'] = "You have to log in first";
		header('location: http://localhost/aldas/Viktorina.live/d_regilogi.php');
	}

	// logout button will destroy the session, and will unset the session variables
	//user will be headed to 'login.php' after loggin out
	if (isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['username']);
		header("location: http://localhost/aldas/Viktorina.live/d_regilogi.php");
	}

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Viktorina.live</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/a_style.css" />
    <link rel="stylesheet" href="http://localhost/aldas/Viktorina.live/aa_headerstyle.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />  
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
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
    <!-- bandymas -->
<div class="content">

<!-- creating notification when the user logs in -->
<!-- accessible only to the users that have logged in already -->
<?php if (isset($_SESSION['success'])) : ?>
  <div class="error success" >
    <h3>
      <?php 
        echo $_SESSION['success']; 
        unset($_SESSION['success']);
      ?>
    </h3>
  </div>
<?php endif ?>

<!-- information of the user logged in -->
<!-- welcome message for the logged in user -->
<?php  if (isset($_SESSION['username'])) : ?>
  <p>Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>
  <p> <a href="a_index.php?logout='1'" style="color: blue;">Click here to LLogout</a> </p>
<?php endif ?>
</div>
<!-- bandymas -->


<!-- bandymas -->
<div id="dataContainer"></div>
<div id="lita"></div>
<div id="lita-bonus"></div>
<!-- bandymas -->
    <section>
      <div class="litas-container">
        <div class="litas-container-img" id="litai-img-bonus"></div>
        <div class="litas-container-img" id="litai-img"></div>
      </div>
    </section>

    <main class="super-container">
      <div class="points-container">
        <div class="super" id="points"></div>
        <div class="super" id="bonus-points"></div>
      </div>
      <div class="super" id="question"></div>
      <div class="super" id="answer"></div>
      <div class="" id="dot-answer"></div>
      <div class="" id="dot-answer-lenght"></div>

      <form action="" id="answer-form" method="post">
        <label for="answer-input">Atsakymas:</label>
        <input type="text" id="answer-input" name="answer-input" />
        <button class="submit-btn" type="submit-answer">Submit</button>
      </form>
    </main>

    <!-- <div id="chat-container">
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Enter a message...">
        <button id="chat-button">Send</button>
      </div> -->

      <!-- <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> -->
      <!-- <script type="text/javascript" src="http://localhost/aldas/Viktorina.live/a_index.js"></script> -->
    <script type="text/javascript" src="http://localhost/aldas/Viktorina.live/a_index.js"></script>
    <footer class="footer">
      <object
        data="http://localhost/aldas/Viktorina.live/Footer/footer.html"
        class="imported-footer">
      </object>
    </footer>
  </body>
</html>
