<?php

// $dbhost = '***REMOVED***';
// $dbuser = '***REMOVED***';
// $dbpassword = '***REMOVED***';
// $dbname = 'viktorina';
// $port = 3306;

// $conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $dbname, $port);

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
<<<<<<< Updated upstream

?>
=======
?>
>>>>>>> Stashed changes
