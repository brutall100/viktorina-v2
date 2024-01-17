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

const verificationUUID = uuidv4() // Generate a unique identifier
let connection //Global conection. This way, it can be used across different endpoints

// ? UPDATE NAME
app.post("/updateName", async (req, res) => {
  const { newName, userName, userId, userLitai } = req.body

  console.log(`Received data: newName=${newName}, userName=${userName}, userId=${userId}, userLitai=${userLitai}`)

  // Funkcija tikrina 3 iš eilės raidžių egzistavimą.
  function hasFourConsecutiveIdenticalLetters(name) {
    const regex = /(.)\1{2}/
    return regex.test(name)
  }

  try {
    const connection = await db.getConnection()

    // Check if the user with the new name already exists
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
    } else {
      // Check if the user with the old name, userId, and userLitai exists
      const [userRows] = await connection.execute("SELECT * FROM super_users WHERE nick_name = ? AND user_id = ? AND litai_sum = ?", [userName, userId, userLitai])

      if (userRows.length === 0) {
        console.log(`Warning: User with old name '${userName}', user ID '${userId}', and litai '${userLitai}' not found`)
        res.status(400).json({ message: "Vartotojas su tokiu vardu, ID ir litai nerastas" })
      } else {
        // Check if the new name contains disallowed words from the same database
        const [badWordsRows] = await connection.execute("SELECT * FROM bad_words WHERE ? LIKE CONCAT('%', curse_words, '%')", [newName])

        if (badWordsRows.length > 0) {
          const disallowedWord = badWordsRows[0].curse_words // Assuming only one disallowed word for simplicity
          console.log(`Warning: User name '${newName}' contains disallowed word '${disallowedWord}'`)
          res.status(400).json({ message: `Vartotojo vardas negali turėti neleistino žodžio: ${disallowedWord}` })
        } else {
          // Update the name if the user with the old name, userId, and userLitai exists
          const [updateRows] = await connection.execute("UPDATE super_users SET nick_name = ? WHERE user_id = ? AND litai_sum = ?", [newName, userId, userLitai])

          if (updateRows.affectedRows > 0) {
            //// Subtract 50,000 from litai_sum
            const [subtractRows] = await connection.execute("UPDATE super_users SET litai_sum = litai_sum - 50000 WHERE user_id = ?", [userId])

            if (subtractRows.affectedRows > 0) {
              console.log(`User name updated successfully to '${newName}' and 50,000 litai subtracted`)
              res.json({ message: `Jūsų naujasis vardas ${newName}` })
            } else {
              console.log("Error subtracting 50,000 from litai_sum")
              res.status(400).json({ message: "Nepavyko atnaujinti vardo" })
            }
          } else {
            console.log("Error updating user name")
            res.status(400).json({ message: "Nepavyko atnaujinti vardo" })
          }
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

    // Check if the user with the user ID and litai exists
    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE user_id = ? AND litai_sum = ?", [userId, userLitai])

    if (userRows.length === 0) {
      console.log(`Warning: User with user ID '${userId}' and litai '${userLitai}' not found`)
      res.status(400).json({ message: "Vartotojas su tokiu ID ir litais nerastas" })
    } else {
      //// Update the gender and subtract 100,000 litai if the user with the user ID and litai exists
      const [updateRows] = await connection.execute("UPDATE super_users SET gender_super = ?, litai_sum = litai_sum - 100000 WHERE user_id = ? AND litai_sum = ?", [userGender, userId, userLitai])

      if (updateRows.affectedRows > 0) {
        console.log(`User gender updated successfully to '${userGender}' and 100,000 litai subtracted`)
        res.json({ message: `Jūsų naujoji lytis ${userGender}` })
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
    // Remove the 'const' keyword to use the global connection variable
    connection = await db.getConnection()

    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE user_id = ? AND nick_name = ?", [userId, userName])

    if (userRows.length === 0) {
      console.log(`Warning: User with user ID '${userId}' and litai '${userName}' not found`)
      res.status(400).json({ message: "Vartotojas su tokiu ID ir litais nerastas" })
    } else {
      // Update the email and set email_verified to 0 if the user with the user ID and litai exists
      const [updateRows] = await connection.execute("UPDATE super_users SET user_email = ?, email_verified = 0, uuid = ? WHERE user_id = ? AND nick_name= ?", [
        userEmail,
        verificationUUID,
        userId,
        userName
      ])

      // Send a verification email
      if (updateRows.affectedRows > 0) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        })
        // todo ikelus i web keisti localhost i real addres
        const mailOptions = {
          from: "viktorina.live@gmail.com",
          to: userEmail,
          subject: "Pasikeitusio elektoninio pašto patvirtinimas",
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Verification</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
                p {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 10px;
                }
                a {
                  color: #007BFF;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <p>Sveiki,</p>
              <p>Norėdami patvirtinti savo naują el. paštą, spustelėkite žemiau esančią nuorodą:</p>
              <a href="http://localhost:4006/verify/${verificationUUID}">Patvirtinti el. paštą</a>
              <p>Jeigu negalite paspausti nuorodos, nukopijuokite šią nuorodą į savo naršyklę:</p>
              <p>http://localhost:4006/verify/${verificationUUID}</p>
              <p>Dėkojame,</p>
              <p>Jūsų Viktorina.live komanda</p>
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
              Prašome patikrinkite savo el. paštą ir patvirtinkite pakeitimus. \
              Turėtumėte nueiti į savo el. pašto programą ir paspausti mygtuką "Patvirtinti el. paštą".`
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
    // Release the connection in the 'finally' block
    if (connection) {
      connection.release()
    }
  }
})

// ? UPDATE EMAIL press BTN inside email and go here
app.get("/verify/:uuid", async (req, res) => {
  const { uuid } = req.params

  try {
    // Use the same connection instance
    const [userRows] = await connection.execute("SELECT * FROM super_users WHERE uuid = ?", [uuid])

    if (userRows.length === 1) {
      // Update email_verified to 1
      await connection.execute("UPDATE super_users SET email_verified = 1 WHERE uuid = ?", [uuid])
      res.send("Email verified successfully!")
    } else {
      res.status(400).send("Invalid verification link.")
    }
  } catch (error) {
    console.error("Error verifying email:", error)
    res.status(500).json({ message: "Server error" })
  }
})

const PORT = process.env.PORT6
app.listen(PORT, () => {
  console.log(`Server <i_myInfoServer> is connected to: http://localhost:${PORT}`)
})

// node i_myInfoServer.js
// ! jei viskas ok nusiusti i email nauja warda
// Pasizet ar toks vardas jau egzistuoja, jei yra atmesti pakeitimus ir nenuimti litu, jei nera galima keisti ir patikrinti bad words database kad vardas butu atitinkamas.
// padaryti laiko tarpa po pirmo keitimo kada galima bus vel pasikeisti varda using npm moment gal menesis,
// vardo keitimas 100 000 plius laikas 1 men
