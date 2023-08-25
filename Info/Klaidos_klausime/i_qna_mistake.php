<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
$points = $_SESSION['points'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";
?>

<!DOCTYPE html>
<html lang="lt">
<head>
    <title>Klaidos rastos klausimuose ir atsakymuose</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="i_qna_mistake.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="header-wrapper">
    <?php include '../../Header/header.php'; ?>
    </div>

    <div><h1>Welcome to My Simple PHP Page</h1></div>

    <?php
    $message = "Klaidos rastos klausimuose ir atsakymuose!";
    echo "<p>$message</p>";
    ?>

    <p>This is a basic example of a PHP page.</p>

    <div class = "footer-wrapper">
        <?php include './../Footer/footer.php'; ?>
    </div>
</body>
</html>