const http = require("http");
const url = require("url");
const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log(process.cwd()); 
console.log(__dirname);

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    if (!body) {
      res.writeHead(400);
      res.end("No data received");
      return;
    }

    const data = JSON.parse(body);
    const { user_id_name, points } = data;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    const query = `
    UPDATE super_users
    SET litai_sum = litai_sum + ?,
        litai_sum_today = litai_sum_today + ?,
        litai_sum_week = litai_sum_week + ?,
        litai_sum_month = litai_sum_month + ?
    WHERE nick_name = ?`;

    if (req.method === "POST" && (parsedUrl.pathname === "/a_points.js" || parsedUrl.pathname === "/playGame.js")) {
      const [rows, fields] = await connection.execute(query, [points, points, points, points, user_id_name]);

      console.log(`User: ${user_id_name} gets ${points} points`);

      const response = { user_id_name, points };

      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*"); // Change as needed
      res.writeHead(200);
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }

    connection.end();
  });
});

const PORT = process.env.PORT4;  // Choose appropriate port || process.env.PORT2;
server.listen(PORT, () => {
  console.log(`Server is now listening on ${PORT}`);
});


// node a_points.js

