const express = require("express")
// const axios = require("axios")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid')
require("dotenv").config()

const { sendWelcomeEmail } = require("./d_mail")
const app = express()

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


