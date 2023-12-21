const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const { sendWelcomeEmail } = require("./d_mail")
const emailService = require("./d_mail_reset")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

connection.connect((err) => {
  if (err) throw err
  console.log("Connected to database Viktorina")
})

//                     LOGIN
app.post("/login", (req, res) => {
  const allowedHostnames = ["localhost", "viktorina.live", "viktorina.fun"]
  if (!allowedHostnames.includes(req.hostname)) {
    throw "Knock knock, FBI!!!" // reiks papildyti ejs failiuku, pagrazinti uzdeti baisu background.
  }

  const { nick_name, user_password } = req.body
  const sql = `SELECT * FROM super_users WHERE nick_name = ?`

  connection.query(sql, [nick_name], (err, result) => {
    if (err) throw err

    if (result.length > 0) {
      const { user_password: hashedPassword, user_email, user_lvl } = result[0]

      bcrypt.compare(user_password, hashedPassword, (err, match) => {
        if (err) throw err

        if (match) {
          console.log("User logged in:", nick_name)
          // res.redirect(307, `http://viktorina.live/a_index.php`)
          res.redirect(307, `http://localhost/Viktorina.live/a_index.php`)
        } else {
          console.log("Invalid password for user:", nick_name)
          const successMessage = `Labas ${nick_name}, įvedei neteisingą slaptažodį.`
          // const redirectUrl = "http://viktorina.live/d_regilogi.php"
          const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
          const alertScript = generateAlertScript(successMessage, redirectUrl)
          return res.status(401).send(alertScript)
        }
      })
    } else {
      console.log("User not found:", nick_name)
      const successMessage = `Toks vartotojas dar neregistruotas.`
      // const redirectUrl = "http://viktorina.live/d_regilogi.php"
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(403).send(alertScript)
    }
  })
})

//                  REGISTER
app.post("/register", (req, res) => {
  const allowedHostnames = ["localhost", "viktorina.live", "viktorina.fun"]
  if (!allowedHostnames.includes(req.hostname)) {
    throw "Knock knock, FBI!!!"
  }

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
          console.log("Toks vartotojas jau yra")
          const successMessage = "Viskas būtų kaip ir OK, bet toks vartotojas jau yra 😟."
          // const redirectUrl = "http://viktorina.live/d_regilogi.php"
          const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
          const alertScript = generateAlertScript(successMessage, redirectUrl)
          return res.status(400).send(alertScript)
        } else {
          console.error("An error occurred in registration system:", err)
          const successMessage = `
            Iškilo nenumatyta problema. Jei tokia iškilo, praneškite
            <a href="mailto:${process.env.MAIL_ADDRESS}">${process.env.MAIL_ADDRESS}</a> ir problemą spręsime.
          `
          const alertScript = generateAlertScript(successMessage, null)
          return res.status(500).send(alertScript)
        }
      } else {
        sendWelcomeEmail(nick_name, user_email, uuid)

        const user_lvl = 0
        // res.redirect(307, `http://viktorina.live/a_index.php`)
        res.redirect(307, `http://localhost/Viktorina.live/a_index.php`)
      }
    })
  })
})

//            MODAL PASSWORD RESET
async function updateResetToken(userEmail, resetToken, expires) {
  return new Promise((resolve, reject) => {
    const updateQuery = "UPDATE super_users SET reset_token = ?, reset_token_expires = ? WHERE user_email = ?"
    connection.query(updateQuery, [resetToken, expires, userEmail], (error, results) => {
      if (error) {
        console.error("Error updating database:", error)
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

app.post("/reset-password", async (req, res) => {
  try {
    const userEmail = req.body.user_email

    const user = await getUserByEmail(userEmail)

    if (!user) {
      const successMessage = "Toks el.paštas nėra registruotas."
      // const redirectUrl = "http://viktorina.live/d_regilogi.php"
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(400).send(alertScript)
    }

    if (!user.email_verified) {
      const successMessage = "Toks el.paštas nebuvo ir nėra patvirtintas."
      // const redirectUrl = "http://viktorina.live/d_regilogi.php"
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(400).send(alertScript)
    }

    const resetToken = emailService.generateResetToken()
    const expires = new Date(Date.now() + 3600000) // Set expiration time to 1 hour

    await updateResetToken(userEmail, resetToken, expires)
    await emailService.sendResetEmail(userEmail, resetToken, PORT)

    res.render("modal-reset")
  } catch (error) {
    console.error("Error:", error)
    res.status(500).send("An error occurreddd.")
  }
})

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM super_users WHERE user_email = ?"
    connection.query(selectQuery, [email], (error, results) => {
      if (error) {
        console.error("Error querying database:", error)
        reject(error)
      } else {
        if (results.length > 0) {
          resolve(results[0])
        } else {
          resolve(null)
        }
      }
    })
  })
}

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
      return res.render("invalid-token", { errorMessage: "Pasibaigęs nuorodos galiojimo laikas.Nuoroda galioja 1 valandą.", yourEmailAddress: "viktorina.live@gmail.com" })
    }

    return res.render("reset-form", { token: resetToken })
  })
})

//              USER ENTERS 2 PASW AND DB UPDATES

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
      console.log("Pasibaigęs rakto galiojimo laikas.")
      const successMessage = "😔 Pasibaigęs rakto galiojimas. 🗝️ Slaptažodžio atkurimo procesą reikia atlikti iš naujo. 😞"
      // const redirectUrl = "http://viktorina.live/d_regilogi.php"
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

      const successMessage = "😄 Jūsų slaptažodis buvo sėkmingai pakeistas. 🎉 Dabar galite prisijungti su savo naujuoju slaptažodžiu. 😊"
      // const redirectUrl = "http://viktorina.live/d_regilogi.php"
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(200).send(alertScript)
    })
  })
})

//            USER REGISTRATION OK, CLICK LINK IN EMAIL and UPDATES DB WITH CONFIRMED EMAIL
app.get("/confirm", (req, res) => {
  const { uuid } = req.query

  const sql = "UPDATE super_users SET email_verified = 1 WHERE uuid = ?"
  connection.query(sql, [uuid], (err, result) => {
    if (err) throw err

    if (result.affectedRows === 1) {
      const successMessage = "El. paštas patvirtintas! Galite prisijungti."
      // const redirectUrl = "http://viktorina.live/d_regilogi.php"
      const redirectUrl = "http://localhost/Viktorina.live/d_regilogi.php"
      const alertScript = generateAlertScript(successMessage, redirectUrl)
      return res.status(200).send(alertScript)
    } else {
      res.send("Netaisyklingas arba pasibaigęs patvirtinimo nuorodos terminas.")
    }
  })
})

//            Alert script message
function generateAlertScript(successMessage, redirectUrl) {
const backgroundImageUrl = "http://localhost/Viktorina.live/Servers/images/background/VK_cover9.png"
return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      background-image: url(${backgroundImageUrl});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .alert-container {
      background-color: rgba(101, 224, 238, 0.3);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      font-family: 'Arial', sans-serif;
      font-size: 1em;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 80%;
      max-width: 400px;
    }


    /* Smaller Devices */
    @media screen and (max-width: 480px) {
      .alert-container {
        font-size: 2em;
        color: red;
        padding: 15px;
      }
    }

    /* Medium Devices, Tablets */
    @media screen and (min-width: 481px) and (max-width: 768px) {
      .alert-container {
        font-size: 2.3em;
        color: green;
        padding: 18px;
      }
    }

    /* Larger Devices, Small Laptops */
    @media screen and (min-width: 769px) and (max-width: 1024px) {
      .alert-container {
        font-size: 2.6em;
        color: blue;
        padding: 20px;
      }
    }

    /* Extra Large Devices, Wide Screens */
    @media screen and (min-width: 1025px) {
      .alert-container {
        font-size: 2.7em;
        color: black;
        padding: 25px;
      }
    }
  </style>
  <div class="alert-container">
    <p>${successMessage}</p>
  </div>

    // <script>
      //   setTimeout(function() {
      //     window.location.href = "${redirectUrl}";
      //   }, 5000);
      // 
    </script>`
}

const PORT = process.env.PORT0
app.listen(PORT, () => {
  console.log(`Server <d_server> listening on port ${PORT}`)
})
