const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'viktorina'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database Viktorina');
});

app.post('/login', (req, res) => {
  const { nick_name, user_password } = req.body;
  const sql = `SELECT * FROM super_users WHERE nick_name = ?`;
  connection.query(sql, [nick_name], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const { user_password: hashedPassword, user_email, user_lvl } = result[0]; // get user_lvl from result
      bcrypt.compare(user_password, hashedPassword, (err, match) => {
        if (err) throw err;
        if (match) {
          res.redirect(`http://localhost/aldas/Viktorina.live/a_index.php?name=${nick_name}&email=${user_email}&level=${user_lvl}`);
        } else {
          res.send('Invalid username or password');
        }
      });
    } else {
      res.send('Invalid username or password');
    }
  });
});


app.post('/register', (req, res) => {
  const { nick_name, user_email, user_password, gender, other_gender } = req.body;

  bcrypt.hash(user_password, 10, (err, hashedPassword) => {
    if (err) throw err;

    const currentDate = new Date().toISOString().slice(0, 20); // Get the current date in YYYY-MM-DD format

    let genderValue = '';
    if (gender === 'Other') {
      genderValue = other_gender;
    } else {
      genderValue = gender;
    }

    const sql = `INSERT INTO super_users (nick_name, user_email, user_password, registration_date, user_lvl, gender_super) VALUES (?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 0, ?)`;

    connection.query(sql, [nick_name, user_email, hashedPassword, genderValue], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // handle duplicate entry error
          res.send('User already exists');
        } else {
          // handle other errors
          throw err;
        }
      } else {
        // handle successful registration
        const user_lvl = 0; // set the user_lvl variable to 0
        res.redirect(`http://localhost/aldas/Viktorina.live/a_index.php?name=${nick_name}&email=${user_email}&level=${user_lvl}`);
      }      
    });
  });
});



app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

