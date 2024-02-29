<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";
?>

<!DOCTYPE html>
<html lang="lt">
<head>
    <title>Puslapio klaidos</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="i_page_mistake.css">
</head>
<body>
    <div class="header-wrapper">
        <?php include '../../Header/header.php'; ?>
    </div>

    <div class="form-wrapper">
        <h2>Pranešti apie klaidą</h2>
        <form action="page_mistake_form.php" method="POST">
            <label for="name">Vardas:</label>
            <input type="text" id="name" name="name" value="<?php echo $name; ?>" readonly><br><br>
            
            <label for="level">Lygis:</label>
            <input type="text" id="level" name="level" value="<?php echo $level; ?>" readonly><br><br>
            
            <label for="mistakes">Klaida:</label><br>
            <textarea id="mistakes" name="mistakes" rows="8" cols="50" required></textarea><br><br>
            
            <button type="submit">Siųsti</button>
        </form>
    </div>

    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
<script src="script.js" defer></script>
</html>

