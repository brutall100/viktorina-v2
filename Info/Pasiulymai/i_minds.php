<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";
?>

<!DOCTYPE html>
<html lang="lt">
<head>
    <title>Pasiūlymai</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="i_minds.css"> 
</head>

<body>
    <div class="header-wrapper">
         <?php include '../../Header/header.php'; ?>
    </div>

    <div class="content">
        <h1>Siūlyti Idėją</h1>
        <form action="i_minds_form.php" method="post">
            <div class="user-container">
                <label for="user_name"><i class="fas fa-user"></i> Autorius:</label><br>
                <input type="text" id="user_name" name="user_name" value="<?php echo $name; ?>" readonly><br><br>

                <input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
            </div>
            
            <label for="idea_title"><i class="fas fa-lightbulb"></i> Pavadinimas:</label><br>
            <input type="text" id="idea_title" name="idea_title" required><br><br>

            <label for="idea_description"><i class="fas fa-comment-alt"></i> Aprašymas:</label><br>
            <textarea id="idea_description" name="idea_description" rows="4" required></textarea><br><br>

            <input type="submit" value="Siūsti">
        </form>
    </div>

    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
    
    <script src="script.js" defer></script>
</body>
</html>
