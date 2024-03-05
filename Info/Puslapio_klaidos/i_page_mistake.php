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
    <link href="https://fonts.cdnfonts.com/css/tt-drugs-trial?styles=152889,152886,152891,152890,152888,152887,152885,152884,152883,152882,152899,152892,152901,152900,152898,152897,152896,152895,152894,152893" rel="stylesheet">          
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"  rel="stylesheet">
</head>

<body>
    <div class="header-wrapper">
        <?php include '../../Header/header.php'; ?>
    </div>

    <div class="form-wrapper">
        <h2>Pranešti apie klaidą <img src="/viktorina.live/images/images_/small_info2.png" alt="Info" id="info-icon"></h2>

        <!-- Modal -->
        <div id="modal" class="modal">
            <div class="modal-content">
                <p>Paspaudus ant šio mygtuko bus pranešta apie rasta klaidą, kuri bus peržiūrėta administratorių.</p>
            </div>
        </div>

        <form action="page_mistake_form.php" method="POST">
            <div class="input-group-inline">
                <div class="input-group">
                    <label for="name"><i class="fas fa-user"></i></label>
                    <input type="text" id="name" name="name" value="<?php echo $name; ?>" readonly>
                </div>
                <div class="input-group">
                    <label for="level"><i class="fas fa-level-up-alt"></i></label>
                    <input type="text" id="level" name="level" value="<?php echo $level; ?>" readonly>
                </div>
            </div>

            <div class="input-group">
                <label for="mistakes"><i class="fas fa-exclamation-circle"></i></label>
                <textarea id="mistakes" name="mistakes" rows="8" cols="50" placeholder="Apibūdinkite pastebėtą klaidą"
                    required></textarea>
            </div>
            <button type="submit">Siųsti</button>
        </form>
    </div>

    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
<script type="text/javascript" src="/viktorina.live/Info/Klaidos_klausime/i_page-mistake.js" defer></script>
</html>


