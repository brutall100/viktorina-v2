<!DOCTYPE html>
<html lang="en">
<head>
    <title>Viktorina.live</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="http://localhost/aldas/Viktorina.live/Header/header.css" />
</head>

<body>
  <header class="header">
    <ul>
      <img class="logo" src="http://localhost/aldas/Viktorina.live/images/icons/viktorina_logo.png" />
      <div>
        <li><a href="http://localhost/aldas/Viktorina.live/a_index.php?name=<?php echo $name ?>&level=<?php echo $level ?>&points=<?php echo $points ?>&user_id=<?php echo $user_id ?>">Viktorina</a></li>
        <li><a href="http://localhost/aldas/Viktorina.live/c_questionwaiting.php?name=<?php echo $name ?>&level=<?php echo $level ?>&points=<?php echo $points ?>&user_id=<?php echo $user_id ?>">Naujienos</a></li>
        <li><a href="http://localhost/aldas/Viktorina.live/b_newquestionindex.php?name=<?php echo $name ?>&level=<?php echo $level ?>&points=<?php echo $points ?>&user_id=<?php echo $user_id ?>">Irašyti klausimą</a></li>
      </div> 
      <div>
        <button id="btn-atsijungti">Atsijungti</button>
      </div>  
    </ul>
  </header>
</body>
</html>

<?php if (isset($name)) { ?>
  <script>
    const logoutButton = document.getElementById('btn-atsijungti');
    const name = "<?php echo $name ?>";
    logoutButton.addEventListener('click', () => {
      window.location.href = `http://localhost/aldas/Viktorina.live/Statistica/statistic.php?name=${name}`;
    });
  </script>
<?php } ?>

