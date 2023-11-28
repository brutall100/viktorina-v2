<?php
session_start();
$name = $_SESSION['nick_name'] ?? "";
$level = $_SESSION['user_lvl'] ?? "";
$points = $_SESSION['points'] ?? "";
$user_id = $_SESSION['user_id'] ?? "";
?>

<!DOCTYPE html>
<html lang="lt">
<head>
    <title>Forumas</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" type="text/css" href="forumas.css">
       <link rel="stylesheet" type="text/css" href="../a_style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="header-wrapper">
    <?php include '../Header/header.php'; ?>
    </div>

    <div><h1>Reikia nuspresti ant ko kurti foruma!</h1></div>

    <?php
    $message = "Forumas!";
    echo "<p>$message</p>";
    ?>

<h1>PHP</h1>
<p>1.phpBB:

Description: phpBB is an open-source, feature-rich forum software written in PHP. It has been around for a long time and is known for its ease of installation and customization.
Features: phpBB offers a wide range of features including user authentication, customizable themes, support for multiple languages, moderation tools, private messaging, search functionality, and user groups.
Community: There is an active community around phpBB that develops extensions and styles to enhance its functionality and appearance.
Requirements: phpBB requires a web server with PHP and a MySQL database.

<br>
<hr>
2.Discourse:

Description: Discourse is a modern, open-source forum software built with Ruby on Rails. It takes a different approach to traditional forums, emphasizing real-time discussions and user engagement.
Features: Discourse features a clean and modern interface, real-time updates, support for Markdown formatting, user-friendly mobile experience, badges, private messaging, and gamification features.
Community: Discourse has an active community that contributes to its development and offers plugins and themes.
Requirements: Discourse requires a server running Docker and PostgreSQL, which might make it slightly more complex to set up compared to other options.

<br>
<hr>
3.Vanilla Forums:

Description: Vanilla Forums is a versatile forum software that offers both open-source and hosted versions. It aims to provide a simple and engaging forum experience.
Features: Vanilla Forums provides a clean and modern interface, support for embedding media, social media integration, user reputation system, customizable themes, and a mobile-responsive design.
Community: Vanilla Forums has a community edition that is open source, and there's also a hosted version with additional features and support.
Requirements: Vanilla Forums can be self-hosted and has various requirements, including PHP and a database.</p>

<hr>
<h1>OR</h1>
<hr>


<h1>NODE.js</h1>
<p>Express.js: Express.js is one of the most widely used frameworks for building web applications with Node.js. It's lightweight, flexible, and provides a minimal set of features to get you started quickly. It's often used to build APIs, single-page applications, and even full-fledged websites.
<br>
<hr>
Koa.js: Koa.js is a newer framework that was designed by the same team that created Express.js. It focuses on providing a more modern and streamlined approach to building web applications. Koa emphasizes the use of middleware and async/await patterns.
<br>
<hr>
Sails.js: Sails.js is a full-featured MVC (Model-View-Controller) framework for building web applications and APIs. It comes with built-in features like automatic RESTful routing, WebSocket support, and a data-driven ORM (Object-Relational Mapping) system.
<br>
<hr>
NestJS: NestJS is a framework that takes inspiration from Angular's architecture and applies it to backend development. It uses TypeScript by default and provides a modular and structured way to build scalable and maintainable applications.
<br>
<hr>
Meteor: While Meteor is often associated with full-stack JavaScript development, it can be used to build real-time web applications including forums. Meteor offers an integrated stack that includes both front-end and back-end components.
<br>
<hr>
Total.js: Total.js is a modern web framework that focuses on simplicity and speed. It provides various features like real-time communication, isomorphic rendering, and a NoSQL database system.




<div class = "footer-wrapper">
    <?php include '../Footer/footer.php'; ?>
</div>
</body>
</html>


