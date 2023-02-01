const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

let dataQnA = {};

const refreshData = (callback) => {
  const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'viktorina'
  });

  connection.connect();

  const sql = 'SELECT id, question, answer FROM question_answer ORDER BY RAND() LIMIT 1';

  connection.query(sql, (err, results) => {
      if (err) throw err;

      dataQnA = results[0];
      console.log(dataQnA);
      connection.end();
      callback(dataQnA);
  });
};

app.get('/aGetData', (req, res) => {
  res.send(dataQnA);
});

app.get('/data', (req, res) => {
  refreshData((data) => {
    res.send(data);
  });
});

setInterval(() => refreshData(() => {}), 10000);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// node server.js
