
	<link rel="stylesheet" type="text/css" href="http://localhost/Viktorina.live/Header/header.css">
<header class="header">
  <ul>
	<li>
      <img class="logo" src="./images/icons/vk9.jpg" alt="viktorina-logo" aria-label="Viktorina logotipas, kvadratas su išdėstytomis figūromis ">
	</li>
    <div class="menu-container"><!--  NEZINAU KAS GERIAU AR INFO AR FORUMAS AR PALIKTI ABU AR DAR KAS NAUDOJA TUOS FORUMUS.  kA MANAI???? Ir taip ir ne, labiau techniniai egzistuoja, pramoginiai gal ne taip nzn -->
<!-- Sutrumpintos nuorodos, uzejus ant nuorodos apacioj turetu rodyt pilna adresa -->      
	  <li><a href="./a_index.php">Viktorina</a></li>
      <li><a href="#?name=">Forumas</a></li>
      <li><a href="./c_questionwaiting.php">Naujienos</a></li>
      <li><a href="./b_newquestionindex.php">Irašyti klausimą</a></li>
      <div class="dropdown">
        <li class="dropbtn">Info</li>
        <div class="dropdown-content">
          <a href="#">Naujienos</a>
          <a href="#">Pasiūlymai</a>
          <a href="#">Puslapio klaidos</a>
          <a href="#">Pasiūlymai balsuoti</a>
          <a href="#">Balsavimas</a>
          <a href="#">Klaidos klausimuose</a><!-- Jei pastebejote klaida viename is klausimu prasome nurodyti klausimo nr ir priezasti kodel manote jog klausimas neteisingas -->
        </div>
      </div>
    </div>
<!-- Patasisyti prisijungti atsijungti, anksciau tiesiog uzdengdavo vienas kita -->
<div id="login-container" <?php echo (isset($name) && !empty($name)) ? 'style="display: none;"' : ''; ?>>
  <button id="login-button" onclick="redirectToLogin()">Prisijungti</button>
</div>
    <div class="logout-container">
      <?php echo (isset($name) && !empty($name))  ? '<button id="btn-atsijungti">Atsijungti</button>' : ""; ?>
    </div>
  </ul>
</header>

<?php if (isset($name) && !empty($name)) { ?>
  <script>
    const logoutButton = document.getElementById('btn-atsijungti');
    const name = "<?php echo $name ?>";
    logoutButton.addEventListener('click', () => {
      window.location.href = `./Statistica/statistic.php`;
    });
  </script>
<?php } else { ?>
  <script>
   function redirectToLogin() {
    window.location.href = "http://localhost/viktorina.live/d_regilogi.php";
   }
  </script>
<?php } ?>
