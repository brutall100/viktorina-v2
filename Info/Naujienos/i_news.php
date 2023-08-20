<!DOCTYPE html>
<html lang="lt">
<head>
    <title>Naujienos</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="header-wrapper">
    <?php include '../../Header/header.php'; ?>
    </div>

    <h1>Welcome to My Simple PHP Page</h1>

    <?php
    $message = "Naujienos!";
    echo "<p>$message</p>";
    ?>

    <p>This is a basic example of a PHP page.</p>
</body>
</html>