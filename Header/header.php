<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
<link rel="stylesheet" type="text/css" href="/viktorina.live/Header/header.css">

<header class="header">
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <div class="logo-container">
                <img class="logo" src="/viktorina.live/images/icons/VK_new3.png" alt="viktorina-logo"
                    aria-label="Viktorina logotipas, Išpuošta V raidė Simbolizuoja Viktorina.live">
            </div>
            <a class="navbar-brand cs-navbar-brand" href="#">𝕍𝕀𝕂𝕋𝕆ℝ𝕀ℕ𝔸.𝕃𝕀𝕍𝔼</a>
            <button class="navbar-toggler cs-bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav justify-content-center w-100 cs-navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link fs-5 fw-semibold cs-anchor" aria-current="page" href="/viktorina.live/a_index.php">Viktorina</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fs-5 fw-semibold cs-anchor" href="/viktorina.live/c_questionwaiting.php">Balsavimas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fs-5 fw-semibold cs-anchor" href="/viktorina.live/b_newquestionindex.php">Irašyti klausimą</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link fs-5 fw-semibold cs-anchor dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Info
                        </a>
                        <ul class="dropdown-menu mb-2">
                            <li><a class="dropdown-item" href="/viktorina.live/Info/Mano_info/i_myInfo.php">Mano info</a></li>
                            <li><a class="dropdown-item" href="/viktorina.live/Info/Puslapio_klaidos/i_page_mistake.php">Puslapio klaidos</a></li>
                            <li><a class="dropdown-item" href="/viktorina.live/Info/Balsavimas/i_vote.php">Balsavimas</a></li>
                            <li><a class="dropdown-item" href="/viktorina.live/Info/Pasiulymai/i_minds.php">Pasiūlymai</a></li>
                            <li><a class="dropdown-item" href="/viktorina.live/Info/Klaidos_klausime/i_qna_mistake.php">Klaidos klausime</a></li>
                            <li>
                                <div class="dropdown-submenu-svarbu mb-1">
                                    <a href="#" class="dropdown-item ">Svarbu</a>
                                    <ul class="dropdown-menu ">
                                        <li><a class="dropdown-item" href="/viktorina.live/Info/Svarbu/Rules/rules.php">Taisyklės</a></li>
                                        <li><a class="dropdown-item" href="#">Folder X</a></li>
                                        <li><a class="dropdown-item" href="#">Folder Y</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>

                </ul>
                <?php if (isset($name) && !empty($name)) : ?>
                <button class="btn btn-primary cs-bg-warning" id="btn-atsijungti" type="button">Atsijungti</button>
                <?php else : ?>
                <button class="btn btn-primary cs-bg-warning" id="login-button" type="button" onclick="redirectToLogin()">Prisijungti</button>
                <?php endif; ?>
            </div>
        </div>
    </nav>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.dropdown-submenu-svarbu').forEach(function (element) {
                element.addEventListener('mouseover', function (e) {
                    let submenu = this.querySelector('.dropdown-menu');
                    if (submenu) {
                        submenu.classList.add('show');
                    }
                });

                element.addEventListener('mouseout', function (e) {
                    let submenu = this.querySelector('.dropdown-menu');
                    if (submenu) {
                        submenu.classList.remove('show');
                    }
                });
            });
        });
    </script>
</header>
<?php if (isset($name) && !empty($name)) : ?>
<script>
    const logoutButton = document.getElementById('btn-atsijungti');
    const name = "<?php echo $name ?>";
    logoutButton.addEventListener('click', () => {
        window.location.href = `./viktorina.live/Statistica/statistic.php`;
    });
</script>
<?php else : ?>
<script>
    function redirectToLogin() {
        window.location.href = `./viktorina.live/d_regilogi.php`;
    }
</script>

<?php endif; ?>





















