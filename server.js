const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let cachedData = null;

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

    cachedData = results[0];
    console.log(cachedData);
    connection.end();
    callback(cachedData);
  });
};

app.get('/data', (req, res) => {
  if (!cachedData) {
  refreshData((data) => {
  cachedData = data;
  res.send(cachedData);
  });
  } else {
  res.send(cachedData);
  }
  });

setInterval(() => refreshData(() => {}), 60000);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// node server.js
