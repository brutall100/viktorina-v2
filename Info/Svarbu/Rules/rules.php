<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_set_cookie_params(['SameSite' => 'none', 'httponly' => true, 'Secure' => true]);

session_start();

$name = $_SESSION['nick_name'] ?? "";
?>

<!DOCTYPE html>
<html lang="lt">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Rules</title>
    <link rel="stylesheet" href="rules.css">
</head>

<body>
    <div class="header-wrapper">
        <?php include '../../..//Header/header.php'; ?>
    </div>

    <main>
        <section id="site-rules-section" class="site-rules-section">
            <h1>Site Rules</h1>
            <div class="site-rules">
                <h2>Rule 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div class="site-rules">
                <h2>Rule 2</h2>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
            </div>
        </section>

        <section id="general-rules-section" class="site-rules-section">
            <h1>General Rules</h1>
            <div class="general-rules">
                <h2>Rule A</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div class="general-rules">
                <h2>Rule B</h2>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
            </div>
        </section>
    </main>

    <footer>
        <div class='footer'></div>
    </footer>
</body>


<script src="rules.js"></script>

</html>
