<link rel="stylesheet" type="text/css" href="Header/header.css">
    <header class="header">
        <div class="logo-container">
            <img class="logo" src="/images/icons/vk9.jpg" alt="viktorina-logo" aria-label="Viktorina logotipas, kvadratas su išdėstytomis figūromis">
        </div>
        <nav class="menu-container">
          <ul>
              <li><a href="a_index.php">Viktorina</a></li>
              <!--<li><a href="/Forumas/forumas.php">Forumas</a></li>-->
              <li><a href="c_questionwaiting.php">Balsavimas</a></li>
              <li><a href="b_newquestionindex.php">Irašyti klausimą</a></li>
              <li class="dropdown">
                  <a href="#" class="dropbtn">Info</a>
                  <div class="dropdown-content">
                      <a href="Info/Mano_info/i_myInfo.php">Mano info</a>
                      <a href="Info/Puslapio_klaidos/i_page_mistake.php">Puslapio klaidos</a>
                      <a href="Info/Balsavimas/i_vote.php">Balsavimas</a>
                      <a href="Info/Pasiulymai/i_minds.php">Pasiūlymai</a>
                      <a href="Info/Klaidos_klausime/i_qna_mistake.php">Klaidos klausime</a>
                  </div>
              </li>
          </ul>
      </nav>

        <div id="login-container">
            <?php if (isset($name) && !empty($name)) : ?>
                <button id="btn-atsijungti">Atsijungti</button>
            <?php else : ?>
                <button id="login-button" onclick="redirectToLogin()">Prisijungti</button>
            <?php endif; ?>
        </div>
    </header>

    <?php if (isset($name) && !empty($name)) : ?>
        <script>
            const logoutButton = document.getElementById('btn-atsijungti');
            const name = "<?php echo $name ?>";
            logoutButton.addEventListener('click', () => {
                window.location.href = `../statistic.php`;
            });
        </script>
    <?php else : ?>
        <script>
            function redirectToLogin() {
                window.location.href = "../d_regilogi.php";
            }
        </script>
    <?php endif; ?>
