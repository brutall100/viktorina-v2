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
    <script src="https://kit.fontawesome.com/98ec1a4ef1.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="header-wrapper">
        <?php include '../../Header/header.php'; ?>
    </div>

    <nav class="user-header">
        <div class="user-header-btn">
            <button class="btn" data-target="name">Keisti Vardą <i class="fa-regular fa-user"></i></button>
        </div>
        <div class="user-header-btn">
            <button class="btn" data-target="gender">Keisti Lytį <i class="fa-solid fa-person-half-dress"></i></button>
        </div>        
        <div class="user-header-btn">
            <button class="btn" data-target="email">Keisti Email <i class="fa-regular fa-envelope"></i></button>
        </div>
        <div class="user-header-btn">
            <button class="btn" data-target="level">Keisti Lygį <i class="fa-solid fa-up-right-from-square"></i></button>
        </div>
    </nav>

    <div class="conatainer">
        <div class="content-user">
            <h1>Mano Informacija</h1>
            <div class="content-p">
                <div class="content-row">
                    <p>
                        <span class="first-span">Dalyvis:</span>
                        <span class="middle-span"><?php echo $name; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Lytis:</span>
                        <span class="middle-span"><?php echo $gender_super; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Email:</span>
                        <span class="middle-span"><?php echo $user_email; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Lygis:</span>
                        <span class="middle-span"><?php echo $level; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Id:</span>
                        <span class="middle-span"><?php echo $user_id; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Litai:</span>
                        <span class="middle-span"><?php echo $points; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Litai šiandien:</span>
                        <span class="middle-span"><?php echo $litai_sum_today; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Litai savaitės:</span>
                        <span class="middle-span"><?php echo $litai_sum_week; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
                <div class="content-row">
                    <p>
                        <span class="first-span">Litai mėnesio:</span>
                        <span class="middle-span"><?php echo $litai_sum_month; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
            </div>



        </div>

        <div class="content-response">
            <h1>Keitimo info</h1>
            <div>
                <p></p>
                <p></p>
            </div>  
        </div>
    </div>

    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
    <script type="text/javascript" src="http://localhost/Viktorina.live/Info/Mano_info/i_myInfo.js"></script>
</body>

</html>

<!-- KIek klausimu irases vartotojas, Kiek is ju patvirtinta, kokia vieta TOPe, xxx -->