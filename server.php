<?php 
	session_start(); // starting the session, necessary for using session variables

	// declaring and hoisting the variables
	$username = "";
	$email    = "";
	$errors = array(); 
	$_SESSION['success'] = "";

	// DBMS connection code -> hostname, username, password, database name
	$db = mysqli_connect('localhost', 'root', '', 'viktorina');

	function userExists($username, $email, $db) {
		$query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
		$result = mysqli_query($db, $query);
		$user = mysqli_fetch_assoc($result);
		if ($user) {
			if ($user['username'] === $username ) {
				return 'userExists';
			}elseif ($user['email'] === $email) {
				return 'emailExists';
			}
		}
		return false;
	}

	
	if (isset($_POST['reg_user'])) {
		// Get form data and sanitize inputs
		$username = mysqli_real_escape_string($db, $_POST['username']);
		$email = mysqli_real_escape_string($db, $_POST['email']);
		$password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
		
		// Check if user already exists
		$userExist = userExists($username, $email, $db);
		if($userExist==='userExists'){
			array_push($errors, "Username already exists");
		}elseif($userExist==='emailExists'){
			array_push($errors, "Email already exists");
		}
		else {
			// Ensure that no input fields are left blank
			if (empty($username)) { array_push($errors, "Username is required"); }
			if (empty($email)) { array_push($errors, "Email is required"); }
			if (empty($password_1)) { array_push($errors, "Password is required"); }
	
			// If the form is error-free, then register the user
			if (count($errors) == 0) {
				$password = md5($password_1); // encrypt the password before saving in the database
				$query = "INSERT INTO users (username, email, password) VALUES('$username', '$email', '$password')";
				mysqli_query($db, $query);
	
				// Store the username of the logged in user in the session variable
				$_SESSION['username'] = $username;
				$_SESSION['success'] = "You have registered";
 // Welcome message
			header('location: http://localhost/aldas/Viktorina.live/login_registration_system_LAMP/index.php');
		}
	}
}



	// user login
	if (isset($_POST['login_user'])) {
		//data sanitization to prevent SQL injection
		$username = mysqli_real_escape_string($db, $_POST['username']);
		$password = mysqli_real_escape_string($db, $_POST['password']);

		//error message if the input field is left blank
		if (empty($username)) {
			array_push($errors, "Username is required");
		}
		if (empty($password)) {
			array_push($errors, "Password is required");
		}

		//checking for the errors
		if (count($errors) == 0) {
			$password = md5($password); //password matching
			$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
			$results = mysqli_query($db, $query);

			// $results = 1 means that one user with the entered username exists
			if (mysqli_num_rows($results) == 1) {
				$_SESSION['username'] = $username; //storing username in session variable
				$_SESSION['success'] = "You have logged in!"; //welcome message
				header('location: http://localhost/aldas/Viktorina.live/login_registration_system_LAMP/index.php'); //page on which the user is sent to after logging in
			}else {
				array_push($errors, "Username or password incorrect"); 
				//if the username and password doesn't match
			}
		}
	}

?>