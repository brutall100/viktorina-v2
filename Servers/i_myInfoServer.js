const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mysql = require("mysql2/promise")
const { v4: uuidv4 } = require("uuid")
const nodemailer = require("nodemailer")
const cors = require("cors")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

app.use(bodyParser.json())
app.use(cors())

const verificationUUID = uuidv4() 
let connection 

//// Function to check if a month has passed
function hasMonthPassed(lastUpdateTimestamp) {
  const now = new Date().getTime()
  const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000 
  return now - lastUpdateTimestamp >= oneMonthInMillis
}

//// Funkcija tikrina 3 iš eilės raidžių egzistavimą.
function hasFourConsecutiveIdenticalLetters(name) {
  const regex = /(.)\1{2}/
  return regex.test(name)
}

//// NEW NAME check if contains disallowed words
async function hasDisallowedWords(newName, connection) {
  const [badWordsRows] = await connection.execute("SELECT * FROM bad_words")

  for (const badWordRow of badWordsRows) {
    const disallowedWord = badWordRow.curse_words

    if (newName.toLowerCase().includes(disallowedWord.toLowerCase())) {
      return true
    }
  }
  return false
}

//// NEW GENDER check if contains disallowed words
async function hasDisallowedWordsForGender(newGenderValue, connection) {
  const [badWordsRows] = await connection.execute("SELECT * FROM bad_words")

  for (const badWordRow of badWordsRows) {
    const disallowedWord = badWordRow.curse_words

    if (newGenderValue.toLowerCase().includes(disallowedWord.toLowerCase())) {
      return true
    }
  }
  return false
}

//// LVL kainos
function calculateLitaiSubtract(currentLevel, newLevel) {
  let litaiSubtract = 0

  for (let level = currentLevel; level < newLevel; level++) {
    switch (level) {
      case 0:
        litaiSubtract += 100000
        break
      case 1:
        litaiSubtract += 200000
        break
      case 2:
        litaiSubtract += 300000
        break
      case 3:
        litaiSubtract += 500000
        break
      case 4:
        litaiSubtract += 999999
        break
      default:
        break
    }
  }

  return litaiSubtract
}

// ? UPDATE NAME
app.post("/updateName", async (req, res) => {
  const { newName, userName, userId, userLitai } = req.body

  console.log(`Received data: newName=${newName}, userName=${userName}, userId=${userId}, userLitai=${userLitai}`)

  try {
    const connection = await db.getConnection()

    const [duplicateRows] = await connection.execute("SELECT * FROM super_users WHERE nick_name = ?", [newName])

    if (duplicateRows.length > 0) {
      console.log(`Warning: User with name '${newName}' already exists`)
      res.status(400).json({ message: "Vartotojas su šiuo vardu jau egzistuoja" })
    } else if (newName.length > 21) {
      console.log(`Warning: User name '${newName}' is too long`)
      res.status(400).json({ message: "Vartotojo vardas per ilgas. Maksimalus ilgis: 21 simbolis" })
    } else if (hasFourConsecutiveIdenticalLetters(newName)) {
      console.log(`Warning: User name '${newName}' contains 3 consecutive identical letters`)
      res.status(400).json({ message: "Vartotojo vardas negali turėti tris iš eilės vienodus simbolius" })
    } else if (await hasDisallowedWords(newName, connection)) {
      console.log(`Warning: User name '${newName}' contains disallowed words`)
      res.status(400).json({ message: "Vartotojo vardas negali turėti neleistinų žodžių" })
    } else {
      // Check if the user with the old name, userId, and userLitai exists
      const [userRows] = await connection.execute("SELECT * FROM super_users WHERE nick_name = ? AND user_id = ? AND litai_sum = ?", [userName, userId, userLitai])

      if (userRows.length === 0) {
        console.log(`Warning: User with old name '${userName}', user ID '${userId}', and litai '${userLitai}' not found`)
        res.status(400).json({ message: "Vartotojas su tokiu vardu, ID ir litais nerastas" })
      } else {
        const lastUpdateTimestamp = userRows[0].last_name_update_timestamp || 0

        if (hasMonthPassed(lastUpdateTimestamp)) {
          const [updateRows] = await connection.execute("UPDATE super_users SET nick_name = ?, last_name_update_timestamp = CURRENT_TIMESTAMP WHERE user_id = ? AND litai_sum = ?", [
            newName,
            userId,
            userLitai
          ])

          if (updateRows.affectedRows > 0) {
            //// Subtract 50,000 from litai_sum
            const [subtractRows] = await connection.execute("UPDATE super_users SET litai_sum = litai_sum - 50000 WHERE user_id = ?", [userId])

            if (subtractRows.affectedRows > 0) {
              console.log(`User name updated successfully to '${newName}' and 50,000 litai subtracted`)
              res.json({ message: `Jūsų naujasis vardas: ${newName}` })
            } else {
              console.log("Error subtracting 50,000 from litai_sum")
              res.status(400).json({ message: "Nepavyko atnaujinti vardo" })
            }
          } else {
            console.log("Error updating user name")
            res.status(400).json({ message: "Nepavyko atnaujinti vardo" })
          }
        } else {
          console.log("Error: User can only update name once a month")
          res.status(400).json({ message: "Vartotojas gali keisti vardą tik kartą per mėnesį" })
        }
      }
    }
    connection.release()
  } catch (error) {
    console.error("Error updating name:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// ? UPDATE GENDER
app.post("/updateGender", async (req, res) => {
  const { userGender, userName, userId, userLitai } = req.body

  console.log(`Received data: userGender=${userGender}, userName=${userName}, userId=${userId}, userLitai=${userLitai}`)

  try {
    const connection = await db.getConnection()

    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE user_id = ? AND litai_sum = ?", [userId, userLitai])

    if (userRows.length === 0) {
      console.log(`Warning: User with user ID '${userId}' and litai '${userLitai}' not found`)
      res.status(400).json({ message: "Vartotojas su tokiu ID ir litais nerastas" })
    } else {
      //// Update the gender and subtract 100,000 litai if the user with the user ID and litai exists
      const [updateRows] = await connection.execute("UPDATE super_users SET gender_super = ?, litai_sum = litai_sum - 100000 WHERE user_id = ? AND litai_sum = ?", [userGender, userId, userLitai])

      if (updateRows.affectedRows > 0) {
        console.log(`User gender updated successfully to '${userGender}' and 100,000 litai subtracted`)
        res.json({ message: `Jūsų naujoji lytis: ${userGender}` })
      } else {
        console.log("Error updating user gender or subtracting litai")
        res.status(400).json({ message: "Nepavyko atnaujinti lyties arba nuskaičiouti  litų" })
      }
    }
    connection.release()
  } catch (error) {
    console.error("Error updating gender:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// ? UPDATE EMAIL
app.post("/updateEmail", async (req, res) => {
  const { userEmail, userName, userId, userLitai } = req.body

  console.log(`Received data: userEmail=${userEmail}, userName=${userName}, userId=${userId}, userLitai=${userLitai}`)

  try {
    connection = await db.getConnection()

    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE user_id = ? AND nick_name = ?", [userId, userName])

    if (userRows.length === 0) {
      console.log(`Warning: User with user ID '${userId}' and litai '${userName}' not found`)
      res.status(400).json({ message: "Vartotojas su tokiu ID ir litais nerastas" })
    } else {
      if (userEmail !== userRows[0].user_email) {
        // Check if the new email already exists in the database
        const [emailCheckRows] = await connection.execute("SELECT * FROM super_users WHERE user_email = ?", [userEmail])

        if (emailCheckRows.length > 0) {
          console.log(`Warning: Email '${userEmail}' already exists in the database`)
          res.status(400).json({ message: "El. paštas jau egzistuoja duomenų bazėje." })
          return // Stop execution if the email already exists
        }
      }

      // Update the email and set email_verified to 0 if the user with the user ID and litai exists
      const [updateRows] = await connection.execute("UPDATE super_users SET user_email = ?, email_verified = 0, uuid = ? WHERE user_id = ? AND nick_name= ?", [
        userEmail,
        verificationUUID,
        userId,
        userName
      ])

      //// Send a verification email
      if (updateRows.affectedRows > 0) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        })

        const mailOptions = {
          from: "viktorina.live@gmail.com",
          to: userEmail,
          subject: "Pasikeitusio elektoninio pašto patvirtinimas",
          html: `
          <!DOCTYPE html>
          <html lang="lt">
          
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap">
              <title>Email patvirtinimas</title>
              <style>
                  * {
                      box-sizing: border-box;
                      padding: 0;
                      margin: 0;
                  }
          
                  body {
                      font-family: 'Arial', sans-serif;
                      background-color: #054878;
                      color: #333;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                  }
          
                  .email-box {
                      background-color: #c0dcf0;
                      border-radius: 15px;
                      box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
                      padding: 30px;
                      text-align: center;
                  }
          
                  p {
                      font-size: 16px;
                      line-height: 1.5;
                      margin-bottom: 20px;
                      margin-top: 15px;
                  }
          
                  a {
                      display: inline-block;
                      color: #28df89;
                      background-color: #2f2a61;
                      text-decoration: none;
                      padding: 15px 30px;
                      border-radius: 8px;
                      transition: background-color 0.3s;
                      margin-bottom: 10px;
                  }
          
                  a:hover {
                      background-color: #554f98;
                      border-radius: 9px;
                  }
          
                  .verification-link {
                      display: block;
                      font-size: 18px;
                      color: #28df89;
                      text-decoration: underline;
                      margin-top: 15px;
                      padding: 10px;
                      box-shadow: 5px 2px 4px rgba(0, 0, 0, 0.5);
                      margin-bottom: 50px;
                  }
          
                  .custom-class {
                      margin-top: -20px;
                  }
          
                  .thank-you {
                      font-family: 'Noto Sans', sans-serif;
                      margin-top: 10px;
                  }
          
                  .thank-you {
                      margin-top: 30px; 
                      /* line-height: 0.1; */
                  }
          
                  .thank-you-p {
                      /* line-height: 0.1; */
                      color: #554f98;
                  }
              </style>
          </head>
          
          <body>
              <div class="email-box">
                  <h1>Sveiki, ${userName}</h1>
                  <p>Norėdami patvirtinti savo naują el. paštą, spustelėkite žemiau esantį mygtuką:</p>
                  <a href="http://localhost:4006/verify/${verificationUUID}">Patvirtinti el. paštą</a>
                  <p>Jeigu negalite paspausti nuorodos, nukopijuokite šią nuorodą į savo naršyklę:</p>
                  <p class="verification-link">http://localhost:4006/verify/${verificationUUID}</p>
                  <p class="custom-class">Ar gavote šį laišką per klaidą? Tiesiog ignoruokite!</p>
                  <div class="thank-you">
                      <h5 class="thank-you-p">Dėkojame,</h5>
                      <h5 class="thank-you-p">Jūsų Viktorina.live komanda</h5>
                  </div>
              </div>
          </body>
          
          </html>
          `
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error)
            res.status(500).json({ message: "Error sending verification email" })
          } else {
            console.log("Email sent:", info.response)
            res.json({
              message: `Jūsų naujas el. paštas ${userEmail}. \
              Savo el. pašto programoje spauskite mygtuką "Patvirtinti el. paštą".`
            })
          }
        })
      } else {
        console.log("Error updating user email")
        res.status(400).json({ message: "Nepavyko atnaujinti el. pašto" })
      }
    }
  } catch (error) {
    console.error("Error updating email:", error)
    res.status(500).json({ message: "Server error" })
  } finally {
    if (connection) {
      connection.release()
    }
  }
})

// ? UPDATE EMAIL press BTN inside email and go here
app.get("/verify/:uuid", async (req, res) => {
  const { uuid } = req.params
  try {
    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE uuid = ?", [uuid])

    if (userRows.length === 1) {
      await connection.execute("UPDATE super_users SET email_verified = 1 WHERE uuid = ?", [uuid])
      res.send(`
      <!DOCTYPE html>
      <html lang="lt">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Elektroninis paštas patvitintas</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #054878;
                  color: #2a2a2a;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  margin: 0;
              }
      
              .success-message {
                  background-color: #ffdbdb;
                  padding: 5em 1em;
                  border-radius: 8px;
                  text-align: center;
                  word-wrap: break-word; 
              }
      
              @media screen and (max-width: 800px) {
                  .success-message {
                      padding: 2em 1em;
                      max-width: 20em;
                  }
              }
              
              @media screen and (max-width: 400px) {
                  .success-message {
                      padding: 4em .5em;
                      margin: 2em;
                      max-width: 20em;
                  }
              }
      
              #countdown {
                  color: #600200;
              }
      
          </style>
      </head>
      
      <body>
          <div class="success-message">
              <h1>Elektroninis paštas patvirtintas!</h1>
              <h2>Būsite nukreipti į prisijungimo puslapį po <span id="countdown">5</span> sekundžių.</h2>
          </div>
      
          <script>
              function redirectToLoginPage() {
                  let countdown = 5;
      
                  const countdownElement = document.getElementById("countdown");
                  const countdownInterval = setInterval(() => {
                      countdownElement.textContent = countdown;
      
                      if (countdown <= 0) {
                          clearInterval(countdownInterval);
                          window.location.href = "http://localhost/Viktorina.live/d_regilogi.php";
                      }
      
                      countdown--;
                  }, 1000);
              }
              
              document.addEventListener("DOMContentLoaded", redirectToLoginPage);
          </script>
      </body>
      
      </html>
      `)
    } else {
      res.status(400).send(`
      <!DOCTYPE html>
      <html lang="lt">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pasibaigusi arba neteisinga patvitinimo nuoroda</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #3c181c;
                  color: #121212;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  margin: 0;
              }
      
              .error-message {
                  background-color: #afc1cb;
                  border-radius: 8px;
                  padding: 5em 1em;
                  border-radius: 8px;
                  text-align: center;
                  word-wrap: break-word;
                  text-align: center;
              }
      
              @media screen and (max-width: 800px) {
                  .error-message {
                      padding: 2em 1em;
                      max-width: 20em;
                  }
              }
      
              @media screen and (max-width: 400px) {
                  .error-message {
                      padding: 4em .5em;
                      margin: 2em;
                      max-width: 20em;
                  }
              }
      
              #countdown {
                  color: #600200;
              }
          </style>
      </head>
      
      <body>
          <div class="error-message">
              <h1>Pasibaigusi arba neteisinga patvitinimo nuoroda!</h1>
              <h2>Būsite nukreipti į prisijungimo puslapį po <span id="countdown">5</span> sekundžių.</h2>
          </div>
      
          <script>
              let countdown = 5;
              const countdownElement = document.getElementById('countdown');
              const countdownInterval = setInterval(() => {
                  countdown--;
                  countdownElement.textContent = countdown;
                  if (countdown <= 0) {
                      clearInterval(countdownInterval);
                      window.location.href = "http://localhost/Viktorina.live/d_regilogi.php"
                  }
              }, 1000);
          </script>
      </body>
      
      </html>
      
      `)
    }
  } catch (error) {
    console.error("Error verifying email:", error)
    res.status(500).json({ message: "Server error" })
  }
})


// ? UPDATE LEVEL
app.post("/updateLevel", async (req, res) => {
  const { newLevel, userId, userLitai } = req.body

  console.log(`Received data: newLevel=${newLevel}, userId=${userId}, userLitai=${userLitai}`)

  try {
    const connection = await db.getConnection()

    // Check if the user with the given userId and userLitai exists
    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE user_id = ? AND litai_sum = ?", [userId, userLitai])

    if (userRows.length === 0) {
      console.log(`Warning: User with user ID '${userId}' and litai '${userLitai}' not found`)
      res.status(400).json({ message: "Vartotojas su tokiu ID ir litais nerastas" })
    } else {
      const currentUserLevel = userRows[0].user_lvl || 0

      // Check if the user is trying to update to a higher level
      if (newLevel > currentUserLevel + 1) {
        console.log(`Warning: User with user ID '${userId}' cannot directly update to level '${newLevel}'`)
        res.status(400).json({ message: "Negalima tiesiogiai pereiti į šį lygį" })
      } else {
        const litaiSubtract = calculateLitaiSubtract(currentUserLevel, newLevel)

        // Check if the user has enough litai_sum
        if (userRows[0].litai_sum < litaiSubtract) {
          console.log(`Warning: User with user ID '${userId}' does not have enough litai`)
          res.status(400).json({ message: "Nepakanka litų šiam veiksmui atlikti" })
        } else {
          const [updateRows] = await connection.execute("UPDATE super_users SET user_lvl = ?, litai_sum = litai_sum - ? WHERE user_id = ? AND litai_sum = ?", [
            newLevel,
            litaiSubtract,
            userId,
            userLitai
          ])

          if (updateRows.affectedRows > 0) {
            console.log(`User level updated successfully to '${newLevel}' and ${litaiSubtract} litai subtracted`)
            res.json({ message: `Jūsų naujas lygis ${newLevel}` })
          } else {
            console.log("Error updating user level or subtracting litai")
            res.status(400).json({ message: "Nepavyko atnaujinti lygio arba nuskaičiuoti litų" })
          }
        }
      }
    }
    connection.release()
  } catch (error) {
    console.error("Error updating level:", error)
    res.status(500).json({ message: "Server error" })
  }
})


const PORT = process.env.PORT6
app.listen(PORT, () => {
  console.log(`Server <i_myInfoServer> is connected to: http://localhost:${PORT}`)
})

// node i_myInfoServer.js

