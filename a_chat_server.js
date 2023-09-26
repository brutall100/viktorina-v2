const express = require("express")
const app = express()
const mysql = require("mysql2/promise")
const moment = require("moment")
require("dotenv").config()
const cors = require("cors")
app.use(cors())

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define a route to handle saving messages
app.post("/save-message", async (req, res) => {
  try {
    const { user_id, message, user_name } = req.body // Extract the 'message' property from the request body
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss")

    // Insert the message into the database
    const [result] = await db.execute("INSERT INTO chat_app_db (chat_id, chat_user_id, chat_msg, chat_user_name, chat_date) VALUES (NULL, ?, ?, ?, ?)", [user_id, message, user_name, currentDate])

    console.log("Query result:", result)

    if (result.affectedRows === 1) {
      // If the message was saved successfully, send a 200 OK response
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

// Function to check the message count in the database and delete the oldest messages if the count exceeds a limit
async function checkAndDeleteOldestMessagesIfNeeded() {
  try {
    const [countRows] = await db.execute("SELECT COUNT(*) AS messageCount FROM chat_app_db")

    const maxMessageCount = 10000

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
    // Call the function to check and delete oldest messages
    await checkAndDeleteOldestMessagesIfNeeded()

    // Query the database to fetch the 100 oldest messages
    const [rows] = await db.execute("SELECT chat_msg, chat_user_name FROM chat_app_db ORDER BY chat_date DESC LIMIT 100")

    // Send the fetched messages as a response
    res.status(200).json(rows)
  } catch (error) {
    console.error("Error fetching older messages:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Start the server
const PORT = process.env.PORT5
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// node a_chat_server.js
