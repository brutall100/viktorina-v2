const http = require("http")
const url = require("url")
require("dotenv").config()

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true)

  if (req.method === "POST" && parsedUrl.pathname === "/a_points.js") {
    let body = ""

    req.on("data", (chunk) => {
      body += chunk.toString()
    })

    req.on("end", async () => {
      const data = JSON.parse(body)
      const { user_id_name, points } = data

      // Update user points logic goes here
      const mysql = require("mysql2/promise")

      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      })

      // Update user points
      const [rows, fields] = await connection.execute("UPDATE super_users SET litai_sum = litai_sum + ?, litai_sum_today = litai_sum_today + ? WHERE nick_name = ?", [points, points, user_id_name])

      const response = {
        user_id_name,
        points
      }

      res.setHeader("Content-Type", "application/json")
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.writeHead(200)
      res.end(JSON.stringify(response))

      // Close the connection
      connection.end()
    })
  } else {
    res.writeHead(404)
    res.end()
  }
})

const PORT = process.env.PORT4
server.listen(PORT, () => {
  console.log(`Server is now listening on http://localhost:${PORT}`)
})

// node a_points.js
// a_points.js litus perveda i DB naudojant serveri.
