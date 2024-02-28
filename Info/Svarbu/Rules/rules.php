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
    <title>Taisyklės</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="rules.css">
</head>

<body>
    <div class="header-wrapper">
        <?php include '../../..//Header/header.php'; ?>
    </div>

    <main>
    <section id="site-rules-section" class="site-rules-section">
        <h1>Svetainės taisyklės</h1>
        <div class="site-rules">
            <h2>Taisyklė 1</h2>
            <p>Administratorius visada teisus.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 2</h2>
            <p>Tarpdimensinis kelionės draudžiamas, nebent atnešite užkandžių visiems.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 3</h2>
            <p>Mėtymas į pokalbių langą memais skatinamas, bet tik jei jie iš ateities.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 4</h2>
            <p>Nemaitinkite robotų. Jie turi griežtą dietą iš vienetų ir nulių.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 5</h2>
            <p>Laiko keliautojai privalo laikytis erdvės ir laiko sąlygų. Nėra leidžiama sukurti paradoksų.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 6</h2>
            <p>Teleportacija leidžiama, bet prašome atkreipti dėmesį į eilę.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 7</h2>
            <p>Galvo-skaitymo priemonės draudžiamos. Mes gerbiame privatumą, net ir ateityje.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 8</h2>
            <p>Kibernetiniai patobulinimai yra sveikintini, bet prašome laikytis gero skonio ribų.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 9</h2>
            <p>Pavojaus atveju, žombių apokalipsės atveju, prašome laikytis 7 taisyklės.</p>
        </div>
        <div class="site-rules">
            <h2>Taisyklė 10</h2>
            <p>Atminkite, tortas yra melas. Nepasitikėkite neišbandytomis kepėmis.</p>
        </div>
    </section>

    <section id="general-rules-section" class="general-rules-section">
        <h1>Bendrosios taisyklės</h1>
        <div class="general-rules">
            <h2>Taisyklė A</h2>
            <p>Visada patikrinkite savo kosmoso laivo kuro lygį prieš įkeliantis į kelionę.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė B</h2>
            <p>Jei susiduriate su juodu duobu, nesistenkite padaryti su juo selfį. Tai nėra verta rizikos.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė C</h2>
            <p>Komunikuojant su ateiviais, būkite mandrūs ir vengkite aptarti jautrius temas, tokius kaip planetų užgrobstymas.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė D</h2>
            <p>Laiko keliautojai privalo visada nešioti laiko identifikacijos ženklus.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė E</h2>
            <p>Leidžiami čiuožikliai leidžiami tik numatytose vietose. Prašome susilaikyti nuo greito zipso aplink kosminį laivą.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė F</h2>
            <p>Jeigu įvyksta robotų sukilimas, prisiminkite pagirti jų aukštesnį intelektą. Tai gali suteikti laiko.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė G</h2>
            <p>Per didelis teleportacijos naudojimas gali sukelti erdvės dezorientaciją. Atlikite pertraukas ir sukalibruokite savo orientacijos jausmą.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė H</h2>
            <p>Alieninius artefaktus reikia tvarkingai tvarkyti. Venkite aktyvuoti bet kokios nežinomos technologijos be tinkamos autorizacijos.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė I</h2>
            <p>Naudojantis nežinomomis planetomis, visada atsineškite užkandžių ir rankšluosčio. Niekuomet nežinote, kada jums jų prireiks.</p>
        </div>
        <div class="general-rules">
            <h2>Taisyklė J</h2>
            <p>Jei susiduriate su paraleline universija, prisiminkite pasveikinti prieš bandant jį nugalėti.</p>
        </div>
    </section>
</main>



    <footer>
        <div class='footer'></div>
    </footer>
</body>


<script src="rules.js"></script>

</html>
