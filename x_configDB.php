<?php

// $dbhost = '***REMOVED***';
// $dbuser = '***REMOVED***';
// $dbpassword = '***REMOVED***';
// $dbname = 'viktorina';
// $dbport = 3306;

// $conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $dbname, $dbport);

// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }

$dbhost = 'localhost';
$dbuser = 'root';
$dbpassword = '';
$dbname = 'viktorina';

$conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>

