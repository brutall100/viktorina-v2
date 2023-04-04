const http = require('http');
const url = require('url');
const mysql = require('mysql2/promise');

const port = 5000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/playGame.js') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const data = JSON.parse(body);
      const { user_id_name, points } = data;

      // Update user points logic goes here
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'viktorina'
      });

      // Update user points
      const [rows, fields] = await connection.execute(
        'UPDATE super_users SET litai_sum = litai_sum + ? WHERE nick_name = ?',
        [points, user_id_name]
      );

      const response = {
        user_id_name,
        points
      };

      res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(response));

      // Close the connection
      connection.end();
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is now listening on http://localhost:${port}`);
});



