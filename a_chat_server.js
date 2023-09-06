const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const mysql = require("mysql")

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "viktorina"
})

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err)
    return
  }
  console.log("Connected to MySQL database")
})

io.on("connection", (socket) => {
  console.log("A user connected")

  // Retrieve messages from the database and send them to the connected client
  dbConnection.query("SELECT * FROM chat_app_db", (err, rows) => {
    if (err) {
      console.error("Error retrieving messages:", err)
      return
    }

    // Send the retrieved messages to the connected client
    rows.forEach((row) => {
      socket.emit("chat message", { user: row.user, message: row.msg })
    })
  })

  // Handle messages sent by clients (as before)
  socket.on("chat message", (message) => {
    console.log(`Message: ${message}`)

    // Save the message to the database
    const user = "John" // Replace with the actual user
    dbConnection.query("INSERT INTO chat_app_db (msg, user) VALUES (?, ?)", [message, user], (err, results) => {
      if (err) {
        console.error("Error saving message:", err)
        return
      }
      console.log("Message saved to the database")
    })

    // Broadcast the message to all connected clients
    io.emit("chat message", { user: "John", message }) // Change 'John' to the actual user
  })

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})

server.listen(9000, () => {
  console.log("Server is running on port 9000")
})

// node a_chat_server.js
