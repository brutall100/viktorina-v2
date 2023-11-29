const express = require("express")
const app = express()
const mysql = require("mysql2/promise")
const moment = require("moment")
require("dotenv").config()
const cors = require("cors")
app.use(cors())

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT
// })

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/save-message", async (req, res) => {
  try {
    const { user_id, message, user_name } = req.body
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss")

    const [result] = await db.execute("INSERT INTO chat_app_db (chat_id, chat_user_id, chat_msg, chat_user_name, chat_date) VALUES (NULL, ?, ?, ?, ?)", [user_id, message, user_name, currentDate])

    console.log("Query result:", result)

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Message saved successfully" })
    } else {
      console.error("Error saving message:", result.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } catch (error) {
    console.error("Error saving message:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

async function checkAndDeleteOldestMessagesIfNeeded() {
  try {
    const [countRows] = await db.execute("SELECT COUNT(*) AS messageCount FROM chat_app_db")

    const maxMessageCount = 999

    const messageCount = countRows[0].messageCount

    if (messageCount > maxMessageCount) {
      const messagesToDelete = messageCount - maxMessageCount

      await db.execute("DELETE FROM chat_app_db ORDER BY chat_date ASC LIMIT ?", [messagesToDelete])

      console.log(`Deleted ${messagesToDelete} oldest messages`)
    }
  } catch (error) {
    console.error("Error checking and deleting oldest messages:", error)
  }
}

app.get("/get-older-messages", async (req, res) => {
  try {
    await checkAndDeleteOldestMessagesIfNeeded()

    const [rows] = await db.execute("SELECT chat_msg, chat_user_name FROM chat_app_db ORDER BY chat_date DESC LIMIT 100")

    // Log the messages before sending them to the client
    console.log("Messages sent to client:", rows)

    res.status(200).json(rows)
  } catch (error) {
    console.error("Error fetching older messages:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Start the server
const PORT = process.env.PORT5
app.listen(PORT, () => {
  console.log(`Server a_chat_server.js is running on port ${PORT}`)
})

// node a_chat_server.js
