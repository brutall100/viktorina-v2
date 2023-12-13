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

      const mysql = require("mysql2/promise")

      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      })

      const query = `
      UPDATE super_users
      SET litai_sum = litai_sum + ?,
          litai_sum_today = litai_sum_today + ?,
          litai_sum_week = litai_sum_week + ?,
          litai_sum_month = litai_sum_month + ?
      WHERE nick_name = ?`
      const [rows, fields] = await connection.execute(query, [points, points, points, points, user_id_name])

      // Log the message after updating points
      console.log(`User: ${user_id_name} gets ${points} points`)

      const response = {
        user_id_name,
        points
      }

      res.setHeader("Content-Type", "application/json")
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.writeHead(200)
      res.end(JSON.stringify(response))

      connection.end()
    })
  } else {
    res.writeHead(404)
    res.end()
  }
})

const PORT = process.env.PORT4
server.listen(PORT, () => {
  console.log(`Server is now listening on ${PORT}`)
})

// node a_points.js
// a_points.js litus perveda i DB naudojant serveri.
