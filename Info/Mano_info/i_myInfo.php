<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$user_id = $_SESSION['user_id'] ?? ""; 

include('../../x_configDB.php'); 

$sql = "SELECT 
        u.user_lvl,
        u.litai_sum,
        u.litai_sum_today,
        u.litai_sum_week,
        u.litai_sum_month,
        u.gender_super,
        u.user_email,
        (SELECT COUNT(*) + 1 FROM super_users WHERE litai_sum > u.litai_sum) AS rank
        FROM super_users u
        WHERE u.nick_name = ? AND u.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $name, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $level = $row['user_lvl'];
    $points = $row['litai_sum'];
    $litai_sum_today = $row['litai_sum_today'];
    $litai_sum_week = $row['litai_sum_week'];
    $litai_sum_month = $row['litai_sum_month'];
    $gender_super = ($row['gender_super'] == 0) ? "Žmogus" : $row['gender_super'];
    $user_email = $row['user_email'];
    $user_rank = $row['rank'];
} else {
    $level = "N/A";
    $points = "N/A";
    $litai_sum_today = "N/A";
    $litai_sum_week = "N/A";
    $litai_sum_month = "N/A";
    $gender_super = "Žmogus";
    $user_email = "N/A";
    $user_rank = "N/A";
}

$sql2 = "SELECT COUNT(*) AS question_count 
         FROM question_answer 
         WHERE super_users_id = ?";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$result2 = $stmt2->get_result();

if ($result2 && $result2->num_rows > 0) {
    $row2 = $result2->fetch_assoc();
    $question_count = $row2['question_count'];
} else {
    $question_count = "N/A";
}

$stmt->close();
$stmt2->close();

mysqli_close($conn);
?>


<!DOCTYPE html>
<html lang="lt">

<head>
    <title>Mano info</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Tai yra interaktyvi viktorina, kurioje dalyviai atsako į įvairius klausimus ir gauna virtualius litus kaip atlygį. Ši viktorina yra unikali tuo, kad leidžia vartotojams ne tik atsakinėti į klausimus, bet ir kurti juos.">
    <meta name="keywords" content="viktorina, litai, bendravimas, mokymasis, smagumas ">
    <link rel="stylesheet" type="text/css" href="i_myInfo.css">
    <script src="https://kit.fontawesome.com/98ec1a4ef1.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="header-wrapper">
        <?php include '../../Header/header.php'; ?>
    </div>

    <nav class="user-header-ctn">
        <div class="user-header-btn">
            <button id="name-button" class="btn">Keisti Vardą <i class="fa-regular fa-user"></i></button>
        </div>
        <div class="user-header-btn">
            <button id="gender-button" class="btn">Keisti Lytį <i class="fa-solid fa-person-half-dress"></i></button>
        </div>        
        <div class="user-header-btn">
            <button id="email-button" class="btn">Keisti Email <i class="fa-regular fa-envelope"></i></button>
        </div>
        <div class="user-header-btn">
            <button id="level-button" class="btn">Keisti Lygį <i class="fa-solid fa-up-right-from-square"></i></button>
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
                        <span class="first-span">Vieta TOPe:</span>
                        <span class="middle-span"><?php echo $user_rank; ?></span>
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
                <div class="content-row">
                    <p>
                        <span class="first-span">Įrašytą klausimų:</span>
                        <span class="middle-span"><?php echo $question_count; ?></span>
                        <span class="last-span"></span>
                    </p>
                </div>
            </div>
        </div>

        <div id="updateDiv" class="content-response-ctn">
            <h1>Keitimo Info</h1>
            <div class="content-response-div">
                <p class="pargraph_1">A</p>
                <p class="pargraph_2">B</p>
                <button class="change-btn">C</button>  
            </div>  
        </div>
    </div>

    <div class="footer-wrapper">
        <?php include '../../Footer/footer.php'; ?>
    </div>

    <script>
        var userName = <?php echo json_encode($name); ?>;
        var userId = <?php echo json_encode($user_id); ?>;
        var userLitai = <?php echo json_encode($points); ?>;
        var userGender = <?php echo json_encode($gender_super); ?>;
        var userEmail = <?php echo json_encode($user_email); ?>;
        var userLevel = <?php echo json_encode($level); ?>;
    </script>

    <script type="text/javascript" src="i_myInfo.js"></script>
</body>

</html>
