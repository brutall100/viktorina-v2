const express = require("express") // Import the Express framework (npm install express)
const bodyParser = require("body-parser") // Parse HTTP request body (npm install body-parser)
const nodemailer = require("nodemailer") // Send email (npm install nodemailer)
const mysql = require("mysql") // MySQL database driver (npm install mysql)
const bcrypt = require("bcrypt") // Password hashing (npm install bcrypt)
const { v4: uuidv4 } = require("uuid") // Generate UUIDs (npm install uuid)
require("dotenv").config() // Load environment variables from .env file (no installation needed)
const path = require("path") // Import the "path" module for file path manipulation (part of Node.js core)

const { sendWelcomeEmail } = require("./d_mail");
const app = express();

app.set("view engine", "ejs");// Set the directory for views/templates
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err
  console.log("Connected to database Viktorina");
})

//                     LOGIN

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
          //res.redirect(`http://localhost/Viktorina.live/a_index.php?name=${nick_name}&email=${user_email}&level=${user_lvl}`)
		  res.redirect(307,`http://localhost/Viktorina.live/a_index.php`)

        } else {
          res.send("Invalid username or password")
        }
      })
    } else {
      res.send("Invalid username or password")
    }
  })
})

//                  REGISTER
app.post("/register", (req, res) => {
  const { nick_name, user_email, user_password, gender, other_gender } = req.body

  bcrypt.hash(user_password, 10, (err, hashedPassword) => {
    if (err) throw err

    const currentDate = new Date().toISOString().slice(0, 20) // Get the current date in YYYY-MM-DD format

    let genderValue = ""
    if (gender === "Other") {
      genderValue = other_gender
    } else {
      genderValue = gender
    }

    const uuid = uuidv4()

    const sql = `INSERT INTO super_users (nick_name, user_email, user_password, registration_date, user_lvl, gender_super, uuid) VALUES (?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 0, ?, ?)`

    connection.query(sql, [nick_name, user_email, hashedPassword, genderValue, uuid], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // handle duplicate entry error
          res.send("Ups, jau turime šį vartotoją!  Bandykite kitą vardą!")
        } else {
          // handle other errors
          throw err
        }
      } else {
        sendWelcomeEmail(nick_name, user_email, uuid)

        const user_lvl = 0; // set the user_lvl variable to 0
        //res.redirect(`http://localhost/Viktorina.live/a_index.php?name=${nick_name}&email=${user_email}&level=${user_lvl}`);
		res.redirect(307,`http://localhost/Viktorina.live/a_index.php`);

      }
    })
  })
})

// Generate a random token
function generateResetToken() {
  return uuidv4();
};

// Send password reset email using Nodemailer
function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  const mailOptions = {
    from: "viktorina.live@gmail.com",
    to: "brutall100@gmail.com", // `${user_email}`,
    subject: "Slaptažodžio keitimo nuoroda",
    text: `Norėdami pasikeisti slaptažodį spauskite šią nuorodą: http://localhost:${PORT}/reset/${token}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

//            MODAL PASSWORD RESET
app.post("/reset-password", (req, res) => {
  try {
    const userEmail = req.body.user_email

    const resetToken = generateResetToken()

    const expires = new Date(Date.now() + 86400000) // Set expiration time 24H.
    const updateQuery = "UPDATE super_users SET reset_token = ?, reset_token_expires = ? WHERE user_email = ?"

    connection.query(updateQuery, [resetToken, expires, userEmail], (error, results) => {
      if (error) {
        console.error("Error updating database:", error)
        res.status(500).send("An error occurred.")
      } else {
        sendResetEmail(userEmail, resetToken)
        res.render("modal-reset.ejs")
      }
    })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).send("An error occurred.")
  }
})

//                USER RESPOND, CLICK LINK and REDIRECTED TO reset-form.ejs
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
      return res.render("invalid-token");
    }

    const user = results[0];
    const resetTokenExpires = user.reset_token_expires;

    // Check if the reset token has expired
    const now = new Date();
    if (resetTokenExpires < now) {
      // Token has expired
      return res.render("invalid-token", { errorMessage: "The reset link has expired." });
    }

    // Render the password reset form with the reset token
    return res.render("reset-form", { token: resetToken });
  });
});


app.post("/reset/:token", (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log("Received token:", token);
  console.log("New password:", newPassword);
  console.log("Confirm password:", confirmPassword);

  if (newPassword !== confirmPassword) {
    console.log("Passwords do not match");
    res.render("passw-dont-match.ejs");
    return;
  }

  connection.query("SELECT * FROM super_users WHERE reset_token = ?", [token], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }

    if (rows.length === 0) {
      console.log("Invalid reset token");
      res.status(400).send("Pasibaigęs rakto galiojimo laikas.");
      return;
    }

    const user = rows[0];
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    connection.query(
      "UPDATE super_users SET user_password = ?, reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?",
      [hashedPassword, user.user_id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error");
          return;
        }

        console.log("Password updated successfully");
        res.redirect("http://localhost/Viktorina.live/d_regilogi.php"); 
      }
    );
  });
});


app.get("/reset-form/:token", (req, res) => {
  const token = req.params.token;
  res.render("reset-form.ejs", { token });
});





//            USER RESPOND, CLICK LINK and UPDATES DB WITH CONFIRMED EMAIL
// Kai patvirtinamas el pastas nusiusti dar viena zinute su prisijungimo informacija name and email  ARBA sukurti sveikinimo ejs failiuka.VSIO
app.get("/confirm", (req, res) => {
  const { uuid } = req.query

  const sql = "UPDATE super_users SET email_verified = 1 WHERE uuid = ?"
  connection.query(sql, [uuid], (err, result) => {
    if (err) throw err

    if (result.affectedRows === 1) {
      res.send("El. paštas patvirtintas! Galite prisijungti.")
    } else {
      res.send("Netaisyklingas arba pasibaigęs patvirtinimo nuorodos terminas.")
    }
  })
})

// Start the server
const PORT = process.env.PORT4;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
