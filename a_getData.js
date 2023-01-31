const express = require('express');
const mysql = require('mysql2');

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
      setTimeout(() => refreshData(callback), 10000);
  });
};

async function getData() {
  return new Promise((resolve, reject) => {
      refreshData((data) => {
          resolve(data);
      });
  });
}

(async () => {
  const data = await getData();
  console.log(data);
  console.log(data.id);
  console.log(data.question);
  console.log(data.answer);
})();

exports.refreshData = refreshData;
exports.dataQnA = dataQnA;






  