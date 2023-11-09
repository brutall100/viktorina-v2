const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mysql = require("mysql2/promise")
const cors = require("cors")
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

app.use(bodyParser.json())
app.use(cors())

app.post("/updateName", async (req, res) => {
  const { newName, userName, userId, userLitai } = req.body

  console.log(`Received data: newName=${newName}, userName=${userName}, userId=${userId}, userLitai=${userLitai}`)

  // Funkcija tikrina 3 iš eilės raidžių egzistavimą.
  function hasFourConsecutiveIdenticalLetters(name) {
    const regex = /(.)\1{3}/
    return regex.test(name)
  }

  try {
    const connection = await db.getConnection()

    // Check if the user with the new name already exists
    const [duplicateRows] = await connection.execute("SELECT * FROM super_users WHERE nick_name = ?", [newName])

    if (duplicateRows.length > 0) {
      console.log(`Warning: User with name '${newName}' already exists`)
      res.status(400).json({ message: "Vartotojas su šiuo vardu jau egzistuoja" })
    } else if (newName.length > 15) {
      console.log(`Warning: User name '${newName}' is too long`)
      res.status(400).json({ message: "Vartotojo vardas per ilgas. Maksimalus ilgis: 15 simbolių" })
    } else if (hasFourConsecutiveIdenticalLetters(newName)) {
      console.log(`Warning: User name '${newName}' contains four consecutive identical letters`)
      res.status(400).json({ message: "Vartotojo vardas negali turėti keturis iš eilės vienodus simbolius" })
    } else {
      // Check if the user with the old name, userId, and userLitai exists
      const [userRows] = await connection.execute("SELECT * FROM super_users WHERE nick_name = ? AND user_id = ? AND litai_sum = ?", [userName, userId, userLitai])

      if (userRows.length === 0) {
        console.log(`Warning: User with old name '${userName}', user ID '${userId}', and litai '${userLitai}' not found`)
        res.status(400).json({ message: "Vartotojas su seno vardo, ID ir litai nerastas" })
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
            // Subtract 10,000 from litai_sum
            const [subtractRows] = await connection.execute("UPDATE super_users SET litai_sum = litai_sum - 10000 WHERE user_id = ?", [userId])

            if (subtractRows.affectedRows > 0) {
              console.log(`User name updated successfully to '${newName}'`)
              res.json({ message: `Jūsų naujasis vardas ${newName}` })
            } else {
              console.log("Error subtracting 10,000 from litai_sum")
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

const PORT = process.env.PORT6
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

//  C:\xampp\htdocs\aldas\Viktorina.live> cd Info
//  C:\xampp\htdocs\aldas\Viktorina.live\Info> cd Mano_info

//  C:\xampp\htdocs\aldas\Viktorina.live\Info\Mano_info> node i_myInfoServer.js

// Pasizet ar toks vardas jau egzistuoja, jei yra atmesti pakeitimus ir nenuimti litu, jei nera galima keisti ir patikrinti bad words database kad vardas butu atitinkamas.
// padaryti laiko tarpa po pirmo keitimo kada galima bus vel pasikeisti varda using npm moment gal menesis prideti ar atimti 1 raide pakeisti 3 raides, kad nickas per smarkei nepasikeistu
// vardo keitimas 100 000 plius laikas 1 men ir raidziu restriction
