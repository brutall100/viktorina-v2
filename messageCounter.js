const beep = require("beepbeep")
function makeBeepSound() {
  beep()
}
makeBeepSound() // Make a beep sound when the script starts

console.log("Message counter script has started.")

const mysql = require("mysql")
const cron = require("node-cron")
require("dotenv").config()

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const pool = mysql.createPool(dbConfig)

// Function to count messages for a specific user within the past hour
function countUserMessages(username) {
  const oneHourAgo = new Date()
  oneHourAgo.setHours(oneHourAgo.getHours() - 1)

  return new Promise((resolve, reject) => {
    pool.query("SELECT COUNT(*) AS messageCount FROM chat_app_db WHERE chat_user_name = ? AND chat_date >= ?", [username, oneHourAgo], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results[0].messageCount)
      }
    })
  })
}

// Function to fetch a list of all users from the database
function getAllUsers() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT DISTINCT chat_user_name FROM chat_app_db", (error, results) => {
      if (error) {
        reject(error)
      } else {
        const users = results.map((row) => row.chat_user_name)
        resolve(users)
      }
    })
  })
}

// Function to update user points in the database
function updateUserPoints(username, points) {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE super_users SET litai_sum = litai_sum + ?, litai_sum_today = litai_sum_today + ? WHERE nick_name = ?", [points, points, username], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Schedule the script to run every hour for counting messages and updating points
// Define a mapping of message thresholds and points
const messagePointsMapping = [
  { threshold: 10, points: 1 },
  { threshold: 20, points: 2 },
  { threshold: 30, points: 3 },
  { threshold: 40, points: 4 },
  { threshold: 50, points: 5 }, // Example: 50 messages earn 5 points
];

cron.schedule("0 * * * *", async () => {
  try {
    const users = await getAllUsers();

    for (const username of users) {
      const messageCount = await countUserMessages(username);
      console.log(`Messages sent by ${username} in the last hour: ${messageCount}`);

      // Determine the points to award based on the message count
      let awardedPoints = 0;
      for (const { threshold, points } of messagePointsMapping) {
        if (messageCount >= threshold) {
          awardedPoints = points;
        } else {
          break; // Stop checking once the threshold isn't met
        }
      }

      if (awardedPoints > 0) {
        await updateUserPoints(username, awardedPoints);
        console.log(`${username} earned ${awardedPoints} point(s).`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
});


//
// node messageCounter.js

// Start a Node.js Script: pm2 start server.js messageCounter.js
// List Running Processes: pm2 list
// View Logs for a Process: pm2 logs
// Monitor CPU/Memory Usage: pm2 monit
// pm2 restart all
// pm2 delete <pid> 1

