const express = require('express');
const mysql = require('mysql');
const port = 7000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'viktorina',
});

connection.connect();

app.get('/game3_server', (req, res) => {
  connection.query(
    'SELECT id, question, answer FROM main_database WHERE LENGTH(question) - LENGTH(REPLACE(question, " ", "")) + 1 > 21 ORDER BY RAND() LIMIT 1',
    function(error, results, fields) {
      if (error) throw error;
      const question = results[0].question;
      const answer = results[0].answer;
      const id = results[0].id;
      res.json({ question, answer, id });
    }
  );
});

app.listen(port, () => {
  console.log(`Serveris prisijunges on http://localhost:${port}`)
});




// C:\xampp\htdocs\aldas\Viktorina.live\Games> node game3server.js