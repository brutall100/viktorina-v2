<?php
// Siaip pasiziuret sesijos bukle kokie kintamieji perduodami ar nepraleistas koks "?dev=1" prie adreso
if (isset($_GET['dev']) && $_GET['dev']==1) {

echo "<b>Sesijos busena: ".session_status()." | Sesijos ID: ".session_id(). "<br>";
echo session_name()." | Request method: ". $_SERVER['REQUEST_METHOD']."<br>";
  echo '<pre><h3>';
   print_r($_SESSION);
  echo  '</h3></pre>';
  if (!empty($_POST)) { echo '<pre><h3>';
    print_r($_POST);
  echo  '</h3></pre>'; }
}
?>