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
let bonusLita = 0;
let count = 0;

const generateBonus = () => {
  const interval = Math.floor(Math.random() * 60 * 60 * 1000); // Generate a random interval in milliseconds
  setTimeout(() => {
    bonusLita = Math.floor(Math.random() * 5) * 10 + 10;
    console.log(`Generated bonus: ${bonusLita}`);
    setTimeout(() => {
      bonusLita = 0;
      console.log(`Removed bonus: ${bonusLita}`);
    }, 60000);
    if (count < 20) {
      generateBonus();
    }
  }, interval);
};


generateBonus();


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

    const randomNumber = Math.floor(Math.random() * 5) + 1;

    cachedData = {
      ...results[0],
      lita: randomNumber,
      bonusLita: bonusLita
    };

    
    console.log(cachedData);
    connection.end();
    callback(cachedData);
    
  });
};



app.get('/data', (req, res) => {
  generateBonus(); // Call generateBonus to generate a new bonusLita value

  if (!cachedData) {
    refreshData((data) => {
      cachedData = data;
      res.send({
        data: cachedData,
      });
    });
  } else {
    res.send({
      data: cachedData,
          });
  }
});


setInterval(() => {
  refreshData(() => {});
  // lita = Math.floor(Math.random() * 5) + 1;
}, 60000);

app.listen(port, () => {
  console.log(`Serveris prisijunges on http://localhost:${port}`);
});



// node server.js
