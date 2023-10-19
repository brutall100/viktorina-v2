<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$user_id = $_SESSION['user_id'] ?? ""; 

require_once('config.php'); //Reiks bandyt perkelti kitur

$host = $config['host'];
$username = $config['username'];
$password = $config['password'];
$database = $config['database'];

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT 
            user_lvl,
            litai_sum,
            litai_sum_today,
            litai_sum_week,
            litai_sum_month,
            gender_super,
            user_email
        FROM super_users
        WHERE nick_name = '$name' AND user_id = '$user_id'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    $litai_sum_today = $row['litai_sum_today'];
    $litai_sum_week = $row['litai_sum_week'];
    $litai_sum_month = $row['litai_sum_month'];
    $gender_super = ($row['gender_super'] == 0) ? "Žmogus" : $row['gender_super'];
    $user_email = $row['user_email'];
} else {
    // Handle the case when no matching data is found
    $level = "N/A";
    $points = "N/A";
    $litai_sum_today = "N/A";
    $litai_sum_week = "N/A";
    $litai_sum_month = "N/A";
    $gender_super = "Žmogus";
    $user_email = "N/A";
}

mysqli_close($conn);
?>




<!DOCTYPE html>
<html lang="lt">
<head>
    <title>Mano info</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="i_myInfo.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="header-wrapper">
        <?php include '../../Header/header.php'; ?>
    </div>
    <div class="main-content">
        <div class="content">
            <h1>Mano Informacija</h1>
            <p>Vartotojo vardas: <?php echo $name; ?> <button id="changeGender">Keisti Vardą</button></p>
            <p>Lytis: <?php echo $gender_super; ?> <button id="changeGender">Keisti Lytį</button></p>
            <p>mail: <?php echo $user_email ; ?></p>
            <p>Lygis: <?php echo $level; ?> <button id="changeGender">Keisti Lvl</button></p> 
            <p>Id: <?php echo $user_id; ?></p>
            <p>Litai: <?php echo $points; ?></p>
            <p>Litai snd: <?php echo $litai_sum_today; ?></p>
            <p>Litai savai: <?php echo $litai_sum_week; ?></p>
            <p>Litai menesio: <?php echo $litai_sum_month; ?></p>
        </div>
    </div>

    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
</html>


<!-- KIek klausimu irases vartotojas, Kiek is ju patvirtinta, xxx -->