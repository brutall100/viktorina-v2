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
    <title>Balsavimas</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="i_vote.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="header-wrapper">
         <?php include '../../Header/header.php'; ?>
    </div>

    <main class="main-content">
        <section id="vote-section" class="vote-section">
            <!-- Content related to the ongoing vote -->
            <!-- Include elements to display vote progress, options, etc. -->
        </section>

        <div class="right-sections">
            <section id="vote-suggestions" class="vote-suggestions">
                <!-- Form for users to suggest voting options -->
                <!-- You can have input fields, buttons, etc. -->
                <form action="process_vote_suggestion.php" method="post" class="vote-suggestion-form">
                    <input type="text" name="suggestion" placeholder="Your suggestion" class="suggestion-input">
                    <button type="submit" class="submit-button">Submit</button>
                </form>
            </section>

            <section id="view-suggestions" class="view-suggestions">
                <!-- Display vote suggestions retrieved from the database -->
                <!-- You need to fetch and display suggestions here -->
            </section>
        </div>
    </main>





    <div class = "footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
</html>