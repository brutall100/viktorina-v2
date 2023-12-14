const http = require("http")
const url = require("url")
const mysql = require("mysql2/promise")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  let body = ""

  req.on("data", (chunk) => {
    body += chunk.toString()
  })

  req.on("end", async () => {
    if (!body) {
      res.writeHead(400)
      res.end("No data received")
      return
    }

    const data = JSON.parse(body)
    const { user_id_name, points } = data

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
      })

      const query = `
      UPDATE super_users
      SET litai_sum = litai_sum + ?,
          litai_sum_today = litai_sum_today + ?,
          litai_sum_week = litai_sum_week + ?,
          litai_sum_month = litai_sum_month + ?
      WHERE nick_name = ?`

      if (req.method === "POST" && parsedUrl.pathname === "/a_points.js") {
        await connection.execute(query, [points, points, points, points, user_id_name])

        console.log(`User: ${user_id_name} gets ${points} points`)

        const response = { user_id_name, points }

        res.setHeader("Content-Type", "application/json")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.writeHead(200)
        res.end(JSON.stringify(response))
      } else {
        res.writeHead(404)
        res.end("Not Found")
      }

      await connection.end()
    } catch (error) {
      console.error(error)
      res.writeHead(500)
      res.end("Server Error")
    }
  })
})

const PORT = process.env.PORT4
server.listen(PORT, () => {
  console.log(`Server is connected to: http://localhost:${PORT}`)
})

// node a_points.js
