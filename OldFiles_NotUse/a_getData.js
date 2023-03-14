const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

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
      connection.end();
      callback(dataQnA);
  });
};

router.get('http://localhost:3000/aGetData', (req, res) => {
  res.send(dataQnA);
});

setInterval(() => refreshData(() => {}), 10000);

module.exports = router;








  