 <?php
if (session_status()!==2) { session_start();
  foreach ($_POST as $key => $value) {
    ${$key} = $value;
    $_SESSION[$key] = $value;
  }
if (!empty($_SESSION)) {
$name = $_SESSION['nick_name'];
$passwd = $_SESSION['user_password'];
$email = $_SESSION['user_email'] ?? '';
$gender = $_SESSION['gender'] ?? $_['other_gender'] ?? '';
}}
// Siaip pasiziuret "?dev=1" prie adreso
if (isset($_GET['dev']) && $_GET['dev']==1) {
echo "<b>Sesijos ID: ".session_id()."<br>";
echo session_name()."<br>";
        echo '<pre>';
        print_r($_SESSION);
        echo  '</pre>';
echo '<br>Request method: '. $_SERVER['REQUEST_METHOD']."</b><br>";
}
?>
<!DOCTYPE html>
<html lang="lt">
  <head>
    <title>Viktorina.live</title>
    <meta name="description" content="Viktorina.live - Testuokite savo žinias ir uždirbkite litus šioje interaktyvioje viktorinoje. Prisijunkite dabar, konkuruokite ir laimėkite!">
    <meta name="keywords" content="Viktorina.live, protų žaidimas, interaktyvus, žinios, taškai, konkurencija, litai, protmūšis, lrt, draugas, litas, lt">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost/Viktorina.live/a_style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"> 

    <link href="https://fonts.cdnfonts.com/css/neue-metana" rel="stylesheet"> 
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  </head>

  <?php
if (isset($name) & !empty($name)) {
  $conn = mysqli_connect("localhost", "root", "", "viktorina");
  $query = "SELECT user_lvl, litai_sum, user_id FROM super_users WHERE nick_name = '$name'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    $user_id = $row['user_id'];
    mysqli_close($conn);
    $_SESSION['user_id'] = $user_id;
	$_SESSION['points'] = $points;
	$_SESSION['user_lvl'] = $level;
  }
}
?>  

<body>
<div class="header-wrapper">
  <?php include 'Header/header.php'; ?>
</div>


<div id="login-container" <?php echo isset($name) ? 'style="display: none;"' : ''; ?>>
  <button id="login-button" onclick="redirectToLogin()">Prisijungti</button>
</div>
<div id="user-data" data-name="<?php echo isset($name) ? $name : ''; ?>" data-level="<?php echo isset($level) ? $level : ''; ?>" data-points="<?php echo isset($points) ? $points : ''; ?>"></div>


  <!--  Your current level is $level and you have $points points. Today's points: $points_today. Your id: $user_id -->
    <!-- bandymas -->
    <div id="dataContainer"></div>
    <div id="lita"></div>
    <div id="lita-bonus"></div>

    <?php
if (isset($name)) {
  $conn = mysqli_connect("localhost", "root", "", "viktorina");
  $query = "SELECT user_lvl, litai_sum, litai_sum_today, user_id, (SELECT COUNT(*) FROM super_users WHERE litai_sum > su.litai_sum) + 1 AS position FROM super_users su WHERE nick_name = '$name'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    $points_today = $row['litai_sum_today'];
    $user_id = $row['user_id'];
    $position = $row['position'];
      echo "Welcome, $name! Your level is $level. You have $points points. Your position in the database is $position.";
    }
  mysqli_close($conn);
} else {
    echo "Labas! <img src='http://localhost/Viktorina.live/images/images_/smile.jpg' alt='Image description' style='width: 50px; height: auto;'> Norėdami pradėti rinkti Litus prisijunkite.";
}
?>

    <section class="today-top">
      <button class="today-top-btn" id="today-top-btn" >Šiandienos TOP 10</button>
    </section>

    <section class="litas-container">
      <div class="litas-container-img" id="litai-img-bonus"></div>
      <div class="litas-container-img" id="litai-img"></div>
    </section>


    <main class="super-container">
      <div class="points-container">
        <div id="points"></div>
        <div id="bonus-points"></div>
      </div>

      <div class="super-container-qna-section">
        <div id="question"></div>
        <div id="answer"></div>
        <div class="answer-section">
          <div id="answer-msg"></div>
        </div>  
      </div>
      <div class="form-container">
        <?php
  $name = $name ?? "";
  $conn = mysqli_connect("localhost", "root", "", "viktorina");
  $query = "SELECT email_verified FROM super_users WHERE nick_name = '$name'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $verify = $row['email_verified'];
   mysqli_close($conn); 
}
$verify = $verify ?? 0;
        if (isset($name) && !empty($name) && !isset($error) && $verify==1) { ?>
          <form action="a_index.php" id="answer-form" method="post">
            <div class="answer-input">
              <input type="text" id="answer-input" name="answer-input">
              <input type="image" src="http://localhost/Viktorina.live/images/images_/send-btn-icon.png" alt="Submit" class="submit-icon">
            </div>
          </form>
        <?php }
	elseif(isset($name) && !empty($name) && !isset($error) && $verify==0)  echo "Patvirtinkite el.paštą :)";// Cia reikes padirbeti
 ?>
      </div>     
    </main>
    <section class="old-question-section">
      <div id="old-question"></div>
    </section>

    <script type="text/javascript" src="http://localhost/Viktorina.live/a_index.js"></script>
    <div class = "footer-wrapper">
        <?php include './Footer/footer.php'; ?>
    </div>
  </body>
</html>
