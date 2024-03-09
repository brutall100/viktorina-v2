<?php
session_start();
$user_name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
$points = $_SESSION['points'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";
?>

<!DOCTYPE html>
<html lang="lt">

<head>
    <title>Klaidos klausimuose ir atsakymuose</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="viktorina.live">
    <meta name="keywords" content="">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="i_qna_mistake.css">
    <script src="script.js" defer></script>
</head>

<body>
    <div class="header-wrapper">
        <?php include '../../Header/header.php'; ?>
    </div>
    <main>
        <div class="container-a">
            <div class="form-wrapper">
                <h2>Pranešti apie klaidą klausime <img src="/viktorina.live/images/images_/small_info2.png" alt="Info"
                        id="info-icon"></h2>
                <div id="modal" class="modal">
                    <div class="modal-content">
                        <h1 class="modal-title">Radote klaidą?</h1>
                        <p class="modal-text">pasaka.</p>
                        <p class="modal-text">TV.</p>
                        <p class="modal-text">Nurody klausimo id.</p>
                    </div>
                </div>

                <form action="i_qna_mistake_form.php" method="POST">
                    <div class="input-group-inline">
                        <label for="user_name"><i class="fas fa-user"></i></label>
                        <input type="text" id="user_name" name="user_name" value="<?php echo $user_name; ?>" readonly>

                        <label for="user_id"><i class="far fa-id-card"></i></label>
                        <input type="text" id="user_id" name="user_id" value="<?php echo $user_id; ?>" readonly>

                        <label for="user_level"><i class="fas fa-level-up-alt"></i></label>
                        <input type="text" id="user_level" name="user_level" value="<?php echo $level; ?>" readonly>
                    </div>
                    <div class="input-group-block">
                        <label for="question_id"><i class="fas fa-question-circle"></i> Klausimo ID:</label>
                        <input type="number" id="question_id" name="question_id" required><br>

                        <label for="mistake_description"><i class="fas fa-exclamation-circle"></i> Klaidos
                            aprašymas:</label><br>
                        <textarea id="mistake_description" name="mistake_description" rows="6" cols="50"
                            required></textarea><br>

                        <label for="additional_comment"><i class="fas fa-comment"></i> Papildomas
                            komentaras:</label><br>
                        <input type="text" id="additional_comment" name="additional_comment"><br>
                    </div>

                    <button type="submit"><i class="fas fa-paper-plane"></i> Siųsti</button>
                </form>
            </div>
        </div>
        <div class="container-b">
    <div class="imported-questions">
        <div class="question">
            <label for="question1">Question 1:</label>
            <input type="text" id="question1" name="question1_answer">
        </div>
        <div class="question">
            <label for="question2">Question 2:</label>
            <input type="text" id="question2" name="question2_answer">
        </div>

    </div>
</div>

    </main>
    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
<script type="text/javascript" src="i_qna_mistake.js" defer></script>
</html>
