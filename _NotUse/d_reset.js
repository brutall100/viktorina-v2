const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');

const app = express();
const PORT = 7700;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// Generate a random token
function generateResetToken() {
  return uuidv4();
}

// Send password reset email using Nodemailer
function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'viktorina.live@gmail.com',
    to: 'viktorina.live@gmail.com',
    subject: 'Password Reset Request',
    text: `Click the following link to reset your password: http://localhost:${PORT}/reset/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Handle password reset request
app.post('/reset-password', (req, res) => {
  try {
    const userEmail = req.body.user_email;

    const resetToken = generateResetToken();
    console.log('Generated reset token:', resetToken);

    // Update the database with the reset token and expiration time
    const expires = new Date(Date.now() + 3600000); // Set expiration time (e.g., 1 hour)
    const updateQuery = 'UPDATE super_users SET reset_token = ?, reset_token_expires = ? WHERE user_email = ?';

    connection.query(updateQuery, [resetToken, expires, userEmail], (error, results) => {
      if (error) {
        console.error('Error updating database:', error);
        res.status(500).send('An error occurred.');
      } else {
        // Send a password reset email
        sendResetEmail(userEmail, resetToken);

        // Send a response indicating that the password reset process has started
        res.send('Password reset process initiated. Check your email for instructions.');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


