<?php
session_start();

$name = $_POST['name'];
$box = $_POST['box'];

// Calculate points earned
$points = rand(-100, 500);
if ($box == 'box1') {
  $points *= 2;
} elseif ($box == 'box2') {
  $points /= 2;
}

// Update player's total points
if (!isset($_SESSION[$name])) {
  $_SESSION[$name] = 0;
}
$_SESSION[$name] += $points;

// Redirect to game1.php with updated total points
header("Location: game1.php?name=$name&points=$points");
exit();
?>
