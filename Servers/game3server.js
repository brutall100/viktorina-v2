const express = require("express")
const mysql = require("mysql2/promise")
const rateLimit = require("express-rate-limit")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const app = express()

const limiter = rateLimit({
  windowMs: 301 * 1000, // 5 minutes
  max: 1 // limit each IP to 1 requests per windowMs
})
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

let connection
async function createConnection() {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  })
}
createConnection()

app.get("/game3_server", async (req, res) => {
  try {
    const query = 'SELECT id, question, answer FROM main_database WHERE LENGTH(question) - LENGTH(REPLACE(question, " ", "")) + 1 > 21 ORDER BY RAND() LIMIT 1'
    const [results] = await connection.query(query)

    if (results.length > 0) {
      const { question, answer, id } = results[0]
      res.json({ question, answer, id })
    } else {
      res.status(404).json({ message: "No data found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

const PORT = process.env.PORT3
app.listen(PORT, () => {
  console.log(`Server <game3server> is connected to: http://localhost:${PORT}`)
})

// node game3server.js
