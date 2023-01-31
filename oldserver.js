const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'viktorina'
});

app.get('/questions', (req, res) => {
  // Connect to the database
  connection.connect();

  // SQL query to select all rows from the question_answer table
  const query = 'SELECT id, user, question, answer FROM viktorina.question_answer';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });

  // Close the connection
  connection.end();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
  // PS C:\xampp\htdocs\aldas\Viktorina> npm start

