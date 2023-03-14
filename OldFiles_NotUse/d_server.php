<?php
session_start();

// database configuration
$db = mysqli_connect('localhost', 'root', '', 'viktorina');

// initialize variables
$username = "";
$email = "";
$password = "";
$errors = array(); 

// register user
if (isset($_POST['reg_user'])) {
  // receive input values from the form
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  // form validation
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($password)) { array_push($errors, "Password is required"); }

  // check if user exists with same email
  $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['username'] === $username) {
      array_push($errors, "Username already exists");
    }

    if ($user['email'] === $email) {
      array_push($errors, "Email already exists");
    }
  }

  // register user if no errors
  if (count($errors) == 0) {
    $password = md5($password); // encrypt password before storing in database

    $query = "INSERT INTO users (username, email, password) 
          VALUES('$username', '$email', '$password')";
    mysqli_query($db, $query);
    $_SESSION['username'] = $username;
    $_SESSION['success'] = "You are now logged in";
    header('location: http://localhost/aldas/Viktorina.live/a_index.php');
  }
}

// login user
if (isset($_POST['login_user'])) {
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    
    // form validation
    if (empty($username)) { array_push($errors, "Username is required"); }
    if (empty($password)) { array_push($errors, "Password is required"); }
    
    // attempt login if no errors on form
    if (count($errors) == 0) {
    $password = md5($password); // encrypt password before comparing with the database

    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($db, $query);
    if (mysqli_num_rows($result) == 1) {
      // login user
      $_SESSION['username'] = $username;
      $_SESSION['success'] = "You are now logged in";
      header('location: http://localhost/aldas/Viktorina.live/a_index.php');
    } else {
      array_push($errors, "Wrong username/password combination");
    }
    }
}
?>    
