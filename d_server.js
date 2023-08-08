const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const path = require("path"); // Import the "path" module

const { sendWelcomeEmail } = require("./d_mail");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the directory for views/templates
app.set("views", path.join(__dirname, "views")); // Make sure you have a "views" directory in your project

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database Viktorina");
});

app.post("/login", (req, res) => {
  const { nick_name, user_password } = req.body
  const sql = `SELECT * FROM super_users WHERE nick_name = ?`
  connection.query(sql, [nick_name], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      const { user_password: hashedPassword, user_email, user_lvl } = result[0] // get user_lvl from result
      bcrypt.compare(user_password, hashedPassword, (err, match) => {
        if (err) throw err
        if (match) {
          res.redirect(`http://localhost/aldas/Viktorina.live/a_index.php?name=${nick_name}&email=${user_email}&level=${user_lvl}`)
        } else {
          res.send("Invalid username or password")
        }
      })
    } else {
      res.send("Invalid username or password")
    }
  })
})

app.post("/register", (req, res) => {
  const { nick_name, user_email, user_password, gender, other_gender } = req.body;

  bcrypt.hash(user_password, 10, (err, hashedPassword) => {
    if (err) throw err;

    const currentDate = new Date().toISOString().slice(0, 20); // Get the current date in YYYY-MM-DD format

    let genderValue = "";
    if (gender === "Other") {
      genderValue = other_gender;
    } else {
      genderValue = gender;
    }

    const uuid = uuidv4();

    const sql = `INSERT INTO super_users (nick_name, user_email, user_password, registration_date, user_lvl, gender_super, uuid) VALUES (?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 0, ?, ?)`;

    connection.query(sql, [nick_name, user_email, hashedPassword, genderValue, uuid], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // handle duplicate entry error
          res.send("User already exists");
        } else {
          // handle other errors
          throw err;
        }
      } else {
     
        sendWelcomeEmail(nick_name, user_email, uuid);

        const user_lvl = 0; // set the user_lvl variable to 0
        res.redirect(`http://localhost/aldas/Viktorina.live/a_index.php?name=${nick_name}&email=${user_email}&level=${user_lvl}`);
      }
    });
  });
});

// Generate a random token
function generateResetToken() {
  return uuidv4();
}

// Send password reset email using Nodemailer
function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "viktorina.live@gmail.com",
    to: "viktorina.live@gmail.com",
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: http://localhost:${PORT}/reset/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.post("/reset-password", (req, res) => { // Handle password reset request
  try {
    const userEmail = req.body.user_email;

    const resetToken = generateResetToken();
    console.log("Generated reset token:", resetToken);

    const expires = new Date(Date.now() + 86400000); // Set expiration time 24H.
    const updateQuery =
      "UPDATE super_users SET reset_token = ?, reset_token_expires = ? WHERE user_email = ?";

    connection.query(
      updateQuery,
      [resetToken, expires, userEmail],
      (error, results) => {
        if (error) {
          console.error("Error updating database:", error);
          res.status(500).send("An error occurred.");
        } else {
          sendResetEmail(userEmail, resetToken);
          res.send(
            "Password reset process initiated. Check your email for instructions."
          );
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});




app.get("/reset/:token", (req, res) => {
  const resetToken = req.params.token;

  // Query the database to find a user with the matching reset token
  const findUserQuery = "SELECT * FROM super_users WHERE reset_token = ?";
  connection.query(findUserQuery, [resetToken], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      return res.status(500).send("An error occurred.");
    }

    if (results.length === 0) {
      // No user found with the given reset token
      return res.status(400).send("Invalid reset token.");
    }

    const user = results[0];
    const resetTokenExpires = user.reset_token_expires;

    // Check if the reset token has expired
    const now = new Date();
    if (resetTokenExpires < now) {
      // Token has expired
      return res.status(400).send("Reset token has expired.");
    }

    // Render the password reset form with the reset token
    res.render("reset-form", { token: resetToken });
  });
});


// // New endpoint to handle password reset link
// app.post("/reset/:token", (req, res) => {
//   const resetToken = req.params.token;
//   const newPassword = req.body.password;

//   // Query the database to find a user with the matching reset token
//   const findUserQuery = "SELECT * FROM super_users WHERE reset_token = ?";
//   connection.query(findUserQuery, [resetToken], (error, results) => {
//     if (error) {
//       console.error("Error querying database:", error);
//       return res.status(500).send("An error occurred.");
//     }

//     if (results.length === 0) {
//       // No user found with the given reset token
//       return res.status(400).send("Invalid reset token.");
//     }

//     const user = results[0];
//     const resetTokenExpires = user.reset_token_expires;

//     // Check if the reset token has expired
//     const now = new Date();
//     if (resetTokenExpires < now) {
//       // Token has expired
//       return res.status(400).send("Reset token has expired.");
//     }

   
//   });
// });

// // New endpoint to handle password reset link
// app.get("/reset/:token", (req, res) => {
//   const resetToken = req.params.token;

//   // Query the database to find a user with the matching reset token
//   const findUserQuery = "SELECT * FROM super_users WHERE reset_token = ?";
//   connection.query(findUserQuery, [resetToken], (error, results) => {
//     if (error) {
//       console.error("Error querying database:", error);
//       return res.status(500).send("An error occurred.");
//     }

//     if (results.length === 0) {
//       // No user found with the given reset token
//       return res.status(400).send("Invalid reset token.");
//     }

//     const user = results[0];
//     const resetTokenExpires = user.reset_token_expires;

//     // Check if the reset token has expired
//     const now = new Date();
//     if (resetTokenExpires < now) {
//       // Token has expired
//       return res.status(400).send("Reset token has expired.");
//     }

//     // Send the password reset email
//     sendResetEmail(user.user_email, resetToken, (emailError) => {
//       if (emailError) {
//         console.error("Error sending email:", emailError);
//         return res.status(500).send("An error occurred while sending email.");
//       }

//       // Email sent successfully, render the password reset form
//       res.render("reset-form", { token: resetToken }); // Make sure "reset-form.ejs" is in your "views" folder


//     });
//   });
// });










// New /confirm route handler
// Kai patvirtinamas el pastas nusiusti dar viena zinute su prisijungimo informacija name and email
app.get("/confirm", (req, res) => {
  const { uuid } = req.query;

  const sql = "UPDATE super_users SET email_verified = 1 WHERE uuid = ?";
  connection.query(sql, [uuid], (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 1) {
      res.send("El. paštas patvirtintas! Galite prisijungti.");
    } else {
      res.send("Netaisyklingas arba pasibaigęs patvirtinimo nuorodos terminas.");
    }
  });
});

// Start the server
const PORT = process.env.PORT4;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


