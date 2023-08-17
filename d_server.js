const express = require("express") // Import the Express framework (npm install express)
const bodyParser = require("body-parser") // Parse HTTP request body (npm install body-parser)
const nodemailer = require("nodemailer") // Send email (npm install nodemailer)
const mysql = require("mysql") // MySQL database driver (npm install mysql)
const bcrypt = require("bcrypt") // Password hashing (npm install bcrypt)
const { v4: uuidv4 } = require("uuid") // Generate UUIDs (npm install uuid)
require("dotenv").config() // Load environment variables from .env file (no installation needed)
const path = require("path") // Import the "path" module for file path manipulation (part of Node.js core)

const { sendWelcomeEmail } = require("./d_mail")
const app = express()

app.set("view engine", "ejs") // Set the directory for views/templates
app.set("views", path.join(__dirname, "views"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

connection.connect((err) => {
  if (err) throw err
  console.log("Connected to database Viktorina")
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
          res.redirect(307, `http://localhost/Viktorina.live/a_index.php`)
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

    const currentDate = new Date().toISOString().slice(0, 20)

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

        const user_lvl = 0
        res.redirect(307, `http://localhost/Viktorina.live/a_index.php`)
      }
    })
  })
})

// Generate a random token
function generateResetToken() {
  return uuidv4()
}

// Send password reset email using Nodemailer
function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  const resetLink = `http://localhost:${PORT}/reset/${token}`
  const mailOptions = {
    from: "viktorina.live@gmail.com",
    to: "brutall100@gmail.com", // `${user_email}`,
    subject: "Slaptažodžio keitimo nuoroda",
    html: `
      <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
        <h1 style="color: #333;">Slaptažodžio keitimo nuoroda</h1>
        <p style="color: #666;">Norėdami pasikeisti slaptažodį, paspauskite žemiau esantį mygtuką:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Keisti slaptažodį</a>
        <p style="color: #666; margin-top: 20px;">Jeigu šis laiškas jums nepriklauso arba nežinote, kas jį išsiuntė, prašome ignoruoti šį laišką.</p>
      </div>
    `,
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
  const resetToken = req.params.token

  const findUserQuery = "SELECT * FROM super_users WHERE reset_token = ?"

  connection.query(findUserQuery, [resetToken], (error, results) => {
    if (error) {
      console.error("Error querying database:", error)
      return res.status(500).send("An error occurred.")
    }

    if (results.length === 0) {
      return res.render("invalid-token", { errorMessage: "Turbūt bus pasibaigęs nuorodos galiojimo laikas. Prašome pabandyti iš naujo" })
    }

    const user = results[0]
    const resetTokenExpires = user.reset_token_expires

    const now = new Date()
    if (resetTokenExpires < now) {
      return res.render("invalid-token", { errorMessage: "Pasibaigęs nuorodos galiojimo laikas.Nuoroda galioja 1 parą.", yourEmailAddress: "viktorina.live@gmail.com" })
    }

    return res.render("reset-form", { token: resetToken })
  })
})

//              USER ENTERS 2 PASW AND DB UPDATES
function generateAlertScript(successMessage, redirectUrl) {
  const backgroundImageUrl = "http://localhost/Viktorina.live/images/background/endless-constellation.png" /* background by SVGBackgrounds.com */
  return `
      <style>
      body {
        background-image: url(${backgroundImageUrl});
        margin: 0;
        display: flex;
        justify-content: center; 
        align-items: center; 
        min-height: 100vh; 
      }

      .alert-container {
        background-color: #bfac64;
        color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        font-family: 'Arial', sans-serif;
        font-size: 18px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 80%;
        max-width: 400px;
      }

      @media screen and (max-width: 480px) {
        .alert-container {
          font-size: 18px;
        }
      }
    </style>

    <div class="alert-container">
      <p>${successMessage}</p>
    </div>
    
    <script>
      setTimeout(function() {
        window.location.href = "${redirectUrl}";
      }, 5000);
    </script>`
}

app.post("/reset/:token", (req, res) => {
  const token = req.params.token
  const newPassword = req.body.password
  const confirmPassword = req.body.confirmPassword

  console.log("Received token:", token)
  console.log("New password:", newPassword)
  console.log("Confirm password:", confirmPassword)

  if (newPassword !== confirmPassword) {
    console.log("Passwords do not match")
    return res.render("passw-dont-match")
  }

  connection.query("SELECT * FROM super_users WHERE reset_token = ?", [token], (err, rows) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Internal server error")
    }

    if (rows.length === 0) {
      console.log("Invalid reset token")
      const successMessage = "Pasibaigęs rakto galiojimas. Slaptažodžio atkurimo procesą reikia atlikti iš naujo."
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(400).send(alertScript)
    }

    const user = rows[0]
    const hashedPassword = bcrypt.hashSync(newPassword, 10)

    connection.query("UPDATE super_users SET user_password = ?, reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?", [hashedPassword, user.user_id], (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).send("Internal server error")
      }

      const successMessage = "Jūsų slaptažodis buvo sėkmingai pakeistas, dabar galite prisijungti su savo naujuoju slaptažodžiu."
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(200).send(alertScript)
    })
  })
})

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
const PORT = process.env.PORT4
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
