const express = require("express")
const app = express()
const mysql = require("mysql") // Include the MySQL module
require("dotenv").config()

const port = process.env.PORT || 3333

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err)
    throw err
  }
  console.log("Connected to the database")
})

// Middleware to parse JSON and form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Route to post new chat messages
app.post("/save-message", (req, res) => {
  const { user_id, message, user_name } = req.body;

  // Logging the request data
  console.log("Received request with the following data:");
  console.log("User ID:", user_id);
  console.log("Message:", message);
  console.log("User Name:", user_name);

  // Insert the message into the database
  const sql = "INSERT INTO chat_app_db (chat_user_id, chat_msg, chat_user_name) VALUES (?, ?, ?)";
  db.query(sql, [user_id, message, user_name], (err, result) => {
    if (err) {
      console.error("Error saving message:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Message saved:", result);
      res.status(200).json({ message: "Message saved successfully" });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// node a_chat_server.js
