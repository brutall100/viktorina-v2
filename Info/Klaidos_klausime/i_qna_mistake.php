<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
$name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
                        <p class="modal-text">Pranešti apie klaidą galima nuo 2 lygio. </p>
                        <p class="modal-text">Taisyti ar atnaujinti klausimus gali vartotojai nuo 4 lygio. </p>
                        <p class="modal-text">Būtina nurodyti teisingą Id.</p>
                        <p class="modal-text">Klausimai ir atsakymai turi būti idealiai tvarkingi, nes be patikros bus keliami į duomenų bazę.</p>
                    </div>
                </div>

                <form action="i_qna_mistake_form.php" method="POST">
                    <div class="input-group-inline">
                        <label for="name"><i class="fas fa-user"></i></label>
                        <input type="text" id="name" name="name" value="<?php echo $name; ?>" readonly>

                        <label for="user_id"><i class="far fa-id-card"></i></label>
                        <input type="text" id="user_id" name="user_id" value="<?php echo $user_id; ?>" readonly>

                        <label for="user_level"><i class="fas fa-level-up-alt"></i></label>
                        <input type="text" id="user_level" name="user_level" value="<?php echo $level; ?>" readonly>
                    </div>
                    <div class="input-group-block">
                        <div class="input-group-block-main">
                            <?php
                            if ($level <= 2) {
                                $disabled = "disabled";
                            } else {
                                $disabled = "";
                            }
                            ?>
                            <label for="question_id"><i class="fas fa-sort-numeric-up"></i> Klausimo ID:</label>
                            <input type="number" id="question_id" name="question_id" required placeholder="0" min="1"><br>

                            <label for="klausimas"><i class="fas fa-question-circle"></i>Atnaujintas klausimas:</label><br>
                            <input type="text" id="klausimas" name="klausimas" placeholder="Įveskite naują klausimą" <?php echo $disabled; ?>><br>

                            <label for="atsakymas"><i class="fas fa-exclamation-circle"></i> Atnaujintas atsakymas:</label><br>
                            <input type="text" id="atsakymas" name="atsakymas" placeholder="Įveskite naują atsakymą" <?php echo $disabled; ?>><br>
                        </div>

                        <label for="mistake_description"><i class="fas fa-comment"></i> Klaidos aprašymas:</label><br>
                        <textarea id="mistake_description" name="mistake_description" rows="6" cols="50" required placeholder="Įveskite klaidos aprašymą"></textarea><br>

                        <label for="additional_comment"><i class="fas fa-comment"></i> Papildomas komentaras:</label><br>
                        <input type="text" id="additional_comment" name="additional_comment" placeholder="Įveskite papildomą komentarą"><br>
                    </div>
                        
                    <button type="submit"><i class="fas fa-paper-plane"></i> Siųsti</button>
                </form>
            </div>
        </div>
        <?php if ($level == 4 || $level == 5): ?>
            <div class="container-b" id="container-b">
                <!-- Content of container B will be loaded dynamically here -->
            </div>
        <?php endif; ?>


    </main>
    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
<script type="text/javascript" src="i_qna_mistake.js" defer></script>
</html>
