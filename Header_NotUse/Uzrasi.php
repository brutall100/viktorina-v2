<?php
  // Connect to the database
  $host = 'localhost';
  $user = 'root';
  $password = '';
  $dbname = 'viktorina';

  $conn = mysqli_connect($host, $user, $password, $dbname);

  // Check connection
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }

  // Select the data from the database
  $sql = "SELECT id, user, question, answer, vote_count, date FROM viktorina.question_answer";
  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
      // Output the data
      while($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['user'] . "</td>";
        echo "<td>" . $row['question'] . "</td>";
        echo "<td>" . $row['answer'] . "</td>";
        echo "<td>
        <button class='upvote' data-id='". $row['id'] ."'>Upvote</button>
        </td>";
        echo "<td>
        <button class='downvote' data-id='". $row['id'] ."'>Downvote</button>
        </td>";
        echo "<td class='vote_count " . ($row['vote_count'] >= 0 ? 'positive' : 'negative') . "'>" . $row['vote_count'] . "</td>";

        // Check if the question is older than a week and has a positive vote count
        $date = new DateTime($row['date']);
        $now = new DateTime();
        $interval = $now->diff($date);
        if($interval->days >= 7 && $row['vote_count'] > 0) {
          // Insert the question into the super_database
          $sql = "INSERT INTO viktorina.super_database (id, question, answer) VALUES ('".$row['id']."','".$row['question']."','".$row['answer']."')";
          mysqli_query($conn, $sql);
          // Delete the question from the question_answer table
          $sql = "DELETE FROM viktorina.question_answer WHERE id = '".$row['id']."'";
          mysqli_query($conn, $sql);
        }
        // Check if the question is older than a week and has a negative vote count
        if($interval->days >= 7 && $row['vote_count'] < 0) {
          // Delete the question from the question_answer table
          $sql = "DELETE FROM viktorina.question_answer WHERE id = '".$row['id']."'";
          mysqli_query($conn, $sql);
        }
    }
        
  } else {
    echo "0 results";
}

// Close the connection
mysqli_close($conn);
?>



<!-- Recapha    apsauga -->
reCAPTCHA is a free service from Google that helps protect websites from spam and abuse. It uses advanced risk analysis techniques to tell humans and bots apart. With the new API, a significant number of your valid human users will pass the reCAPTCHA challenge without having to solve a CAPTCHA. reCAPTCHA offers more than just spam protection. It can also be used for security purposes like to prevent bots from trying to login to your site.

You can add a reCAPTCHA to your form by following these steps:

Go to the reCAPTCHA website (https://www.google.com/recaptcha/) and sign up for an API key pair for your site.

In the HTML form, add the reCAPTCHA widget by including the reCAPTCHA JavaScript API in the head of your HTML file.

Copy code
<head>
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
In the form, add the reCAPTCHA widget by adding the following HTML element where you want the widget to appear.
Copy code
<div class="g-recaptcha" data-sitekey="your_site_key"></div>
Replace 'your_site_key' with the Site key that you obtained from the reCAPTCHA website.

In your PHP script, you will need to verify the reCAPTCHA response by making a request to the reCAPTCHA server. You can use the file_get_contents() function to get the response.

Copy code
$response = $_POST["g-recaptcha-response"];
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => 'your_secret_key',
    'response' => $response
);
$options = array(
    'http' => array (
        'method' => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success=json_decode($verify);
if ($captcha_success->success==false) {
    // code for when the CAPTCHA fails
} else if ($captcha_success->success==true) {
    // code for when the CAPTCHA passes
}
You need to replace 'your_secret_key' with the Secret key that you obtained from the reCAPTCHA website.

This is just a basic example of how to add a reCAPTCHA to your form, you can customize it according to your requirements.

<!-- / -->
<!-- // -->