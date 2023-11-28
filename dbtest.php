<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host="***REMOVED***";
$usr="***REMOVED***";
$passwd="***REMOVED***";
$dbname="viktorina";
// Create connection
$conn = mysqli_connect($host, $usr, $passwd, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: ");
}
echo "Connected successfully";
mysqli_close($conn);
?>