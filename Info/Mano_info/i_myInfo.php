<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$user_id = $_SESSION['user_id'] ?? ""; // Original user_id from the session

// Connect to your database using the config.php file
require_once('config.php');

$host = $config['host'];
$username = $config['username'];
$password = $config['password'];
$database = $config['database'];

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Query to retrieve user information from the "super_users" table
$sql = "SELECT 
            user_lvl,
            litai_sum,
            litai_sum_today,
            litai_sum_week,
            litai_sum_month,
            gender_super,
            user_email
        FROM super_users
        WHERE nick_name = '$name'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    $level = $row['user_lvl'];
    $points = $row['litai_sum'];

    // Check if 'user_id' exists in the result before overwriting it
    if (isset($row['user_id'])) {
        $user_id = $row['user_id'];
    }

    // Additional fields from the query
    $litai_sum_today = $row['litai_sum_today'];
    $litai_sum_week = $row['litai_sum_week'];
    $litai_sum_month = $row['litai_sum_month'];
    $gender_super = $row['gender_super'];
    $user_email = $row['user_email'];
} else {
    // Handle the case when no data is found
    $level = "N/A";
    $points = "N/A";
    $litai_sum_today = "N/A";
    $litai_sum_week = "N/A";
    $litai_sum_month = "N/A";
    $gender_super = "N/A";
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
            <p>Vartotojo vardas: <?php echo $name; ?></p>
            <p>Lygis: <?php echo $level; ?></p>
            <p>Litai: <?php echo $points; ?></p>
            <p>Id: <?php echo $user_id; ?></p>
            <!-- Display additional information from the database -->
            <!-- <p>Papildoma informacija: <?php echo $additional_info; ?></p> -->
        </div>
    </div>
    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>
</body>
</html>
