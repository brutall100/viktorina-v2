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


exports.refreshData = refreshData;
exports.dataQnA = dataQnA;





  