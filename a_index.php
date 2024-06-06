<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
  <meta name="description"
    content="Viktorina.live - Testuokite savo žinias ir uždirbkite litus šioje interaktyvioje viktorinoje. Prisijunkite dabar, konkuruokite ir laimėkite!">
  <meta name="keywords"
    content="Viktorina.live, protų žaidimas, interaktyvus, žinios, taškai, konkurencija, litai, protmūšis, lrt, draugas, litas, lt">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="images/icons/vk2.jpg" type="image/x-icon">
  <link rel="stylesheet" href="a_style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <link href="https://fonts.cdnfonts.com/css/neue-metana" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<?php
if (isset($name) & !empty($name)) {
  include 'x_configDB.php';  
// arba require arba include
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
    
    // Echo these PHP variables as JavaScript variables. They are sent to client js
    echo '<script>';
    echo 'var userLevelis = ' . json_encode($level) . ';';
    echo '</script>';
  }
}
?>



<body>
  <div class="continent">
    <div class="header-wrapper">
      <?php include 'Header/header.php'; ?>
    </div>
  
    <!-- Galimai sis bus nereikalingas  -->
    <!-- <div id="login-container" <?php echo isset($name) ? 'style="display: none;"' : ''; ?>>
      <button type="button" id="login-button" onclick="redirectToLogin()">Prisijungti</button>
    </div> -->
  
  
    <div id="user-data" data-name="<?php echo isset($name) ? $name : ''; ?>"
      data-level="<?php echo isset($level) ? $level : ''; ?>" data-points="<?php echo isset($points) ? $points : ''; ?>">
    </div>
  
    <!--  Your current level is $level and you have $points points. Today's points: $points_today. Your id: $user_id -->
    <!-- bandymas -->
    <!-- <div id="dataContainer"></div> -->
  
  
    <div class="containers-abc">  <!--start of  A B C container -->
      <div class="container-a">                                         <!-- Start of A  -->
      <!-- A1 -->
        <div class="user-info-container">
          <?php
          if (isset($name)) {
              include 'x_configDB.php';
  
              $query = "SELECT user_lvl, litai_sum, litai_sum_today, user_id, (SELECT COUNT(*) FROM super_users WHERE litai_sum > su.litai_sum) + 1 AS position FROM super_users su WHERE nick_name = '$name'";
              $result = mysqli_query($conn, $query);
              if (mysqli_num_rows($result) > 0) {
                  $row = mysqli_fetch_assoc($result);
                  $level = $row['user_lvl'];
                  $points = $row['litai_sum'];
                  $points_today = $row['litai_sum_today'];
                  $user_id = $row['user_id'];
                  $position = $row['position'];
                  echo "<div class='user-info'>";
                  echo "<div class='welcome-message'><span id='temp-greeting'>Labas,</span> $name <span id='temp-exclamation'>!</span></div>";
                  echo "<div class='points-info'>Vieta tope <span class='position-highlight'>$position</span></div>";
                  echo "<div class='points-info'>Turite <span class='points-highlight'>$points LT</span></div>";
                  echo "<div class='points-info'>Lygis <span class='level-highlight'>$level</span></div>";
                  echo "</div>";
              }
              mysqli_close($conn);
          } else {
              echo "<div class='user-info'>"; 
              echo "<div class='greeting-message'>
                        Labas! 
                        <img src='images/images_/smile.jpg'
                            alt='Šypsenėlė su tekstu.' 
                            aria-label='Šypsenėlė su tekstu, kuriame sakoma, kad norint žaisti reikia prisijungti.'> 
                        Norėdami pradėti rinkti Litus prisijunkite.
                    </div>";
              echo "</div>";
          }
          ?>
       </div>
       <!-- A2 -->
       <div class="show-money-container">  <!-- Sie 2 conteineriai turi susieiti i viena . Vienas be kito negali-->
          
            <!-- <div id="lita"></div>
            <div id="lita-bonus"></div> -->
  
          <section class="litas-container">
            <div class="litas-container-img" id="litai-img"></div>
            <div class="litas-container-img" id="litai-img-bonus" style="display: none"></div>
          </section>
       </div>
       <!-- A3 -->
       <div id="chat-container-section">
        <div id="chat-container-messages">
          <ul id="chat-messages"></ul>
          <div id="chat-user-data" chat-data-name="<?php echo isset($name) ? $name : ''; ?>"></div>
        </div>
        <div>
          <form id="chat-form">
            <input id="chat-input-msg" name="user_message" autocomplete="off">
            <input type="hidden" id="chat-user-id" name="user_id" value="<?php echo isset($user_id) ? $user_id : ''; ?>">
            <input type="hidden" id="chat-user-name" name="user_name" value="<?php echo isset($name) ? $name : ''; ?>">
            <input type="hidden" id="chat-user-level" name="user_level" value="<?php echo isset($level) ? $level : ''; ?>">
            <button type="submit" id="chat-button">Send</button>
          </form>
        </div>
      </div>
  
     </div>                                                           <!-- END of A -->
  
     <div class="container-b">                                       <!-- Start of B  -->
     <!-- B1 -->
        <main class="super-container">
              <div class="points-container">
                  <div id="points"></div>
                  <div id="bonus-points"></div>
              </div>
  
              <div class="super-container-qna-section">
                  <div id="question"></div>
                  <div id="answer"></div>
              </div>
  
              <div class="form-container">
                  <?php
                  $name = $name ?? "";
                  include 'x_configDB.php';
                  $query = "SELECT email_verified FROM super_users WHERE nick_name = '$name'";
                  $result = mysqli_query($conn, $query);
                  $verify = 0;  // Default to not verified
                  
                  if (mysqli_num_rows($result) > 0) {
                      $row = mysqli_fetch_assoc($result);
                      $verify = $row['email_verified'];
                  }
                  mysqli_close($conn);
                  
                  if (!empty($name) && $verify == 1) { ?>
                      <form action="a_index.php" id="answer-form" method="post">
                          <div class="answer-input">
                              <input type="text" id="answer-input" name="answer-input">
                              <input type="image" src="images/images_/send-btn-icon.png" alt="Submit" class="submit-icon">
                          </div>
                          <div class="answer-section">
                            <div id="answer-msg">
                                <p>Paskutinis teisingai atsakęs: <span id="answerer-name"></span></p>
                                <p>Atsakymas buvo: <span id="answer-content"></span></p>                                  
                            </div>
                          </div>
                      </form>
                  <?php } elseif (!empty($name) && $verify == 0) { ?>
                      <div class="email-confirmation-message">
                        <p>Prašome patikrinti savo el. paštą ir paspausti nuorodą, kad galėtumėte dalyvauti 
                            <span class="email-confirmation-span">Viktorinos</span> žaidime. 
                            <a href="mailto:" class="email-confirmation-link">Jūsų el. paštas</a>
                        </p>
                      </div>
                  <?php } ?>
              </div>
          </main>
     </div>                                                     <!-- END of B -->
  
     <div class="container-c">                                  <!-- Start of C  -->
     <!-- C1 -->
        <section class="today-top">
          <button type="button" class="today-top-btn" id="today-top-btn">Šiandienos TOP 10</button>
        </section>
       <!-- C2  -->
      <div class="old-question-section">
        <div id="old-question"></div>
      </div>
  
    </div> <!-- END of containers-abc -->
  
    
  </div>
  
  <div class="footer-wrapper">
    <?php include './Footer/footer.php'; ?>
  </div>

  <script src="a_index.js"></script>
  <script src="a_chat_client.js"></script>
</body>

</html>