const cron = require("node-cron")
const mysql = require("mysql")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

console.log("Message counter script has started.")

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}
const pool = mysql.createPool(dbConfig)

// Function to count votes for each user
function countUserVotes() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT user_id, COUNT(id_of_vote) AS voteCount 
      FROM user_votes 
      GROUP BY user_id`

    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

// Function to update litai_sum for a user
function updateLitaiSum(userId, voteCount) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE super_users
      SET litai_sum = litai_sum + ?,
          litai_sum_today = litai_sum_today + ?,
          litai_sum_week = litai_sum_week + ?,
          litai_sum_month = litai_sum_month + ?,
          vote_litai = vote_litai + ?
      WHERE user_id = ?`

    const params = [voteCount, voteCount, voteCount, voteCount, voteCount, userId]

    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Function to delete old votes
function deleteOldVotes() {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM user_votes 
      WHERE id_of_vote < DATE_SUB(NOW(), INTERVAL 1 HOUR)`

    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Schedule a cron job to update super_users and delete old votes every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const userVotes = await countUserVotes()
    console.log("User Vote Counts:")
    userVotes.forEach(async ({ user_id, voteCount }) => {
      console.log(`User ${user_id} has ${voteCount} votes.`)
      await updateLitaiSum(user_id, voteCount)
      console.log(`litai_sum updated for User ${user_id}.`)
    })
    await deleteOldVotes() // Delete old votes after updating super_users
    console.log("Old votes deleted.")
  } catch (error) {
    console.error("Error:", error)
  }
})

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
    const query = `
      UPDATE super_users
      SET litai_sum = litai_sum + ?,
          litai_sum_today = litai_sum_today + ?,
          litai_sum_week = litai_sum_week + ?,
          litai_sum_month = litai_sum_month + ?
      WHERE nick_name = ?`

    pool.query(query, [points, points, points, points, username], (error, results) => {
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
  { threshold: 50, points: 5 } // Example: 50 messages earn 5 points
]

cron.schedule("0 * * * *", async () => {
  try {
    const users = await getAllUsers()

    for (const username of users) {
      const messageCount = await countUserMessages(username)
      console.log(`Messages sent by ${username} in the last hour: ${messageCount}`)

      // Determine the points to award based on the message count
      let awardedPoints = 0
      for (const { threshold, points } of messagePointsMapping) {
        if (messageCount >= threshold) {
          awardedPoints = points
        } else {
          break // Stop checking once the threshold isn't met
        }
      }

      if (awardedPoints > 0) {
        await updateUserPoints(username, awardedPoints)
        console.log(`${username} earned ${awardedPoints} point(s).`)
      }
    }
  } catch (error) {
    console.error("Error:", error)
  }
})

//
//
// Cron script that  Empty     litai_sum_today, litai_sum_week, litai_sum_month
// Schedule a cron job to empty litai_sum_today column every day at midnight (0 0 * * *)
cron.schedule("0 0 * * *", async () => {
  try {
    await resetLitaiSumToday()
    console.log("litai_sum_today reset for all Super Users.")
  } catch (error) {
    console.error("Error:", error)
  }
})

function resetLitaiSumToday() {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE super_users SET litai_sum_today = 0", (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Schedule a cron job to reset litai_sum_week to 0 every Sunday at midnight (0 0 * * 0)
cron.schedule("0 0 * * 0", async () => {
  try {
    await resetLitaiSumWeek()
    console.log("litai_sum_week reset for all Super Users.")
  } catch (error) {
    console.error("Error:", error)
  }
})

function resetLitaiSumWeek() {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE super_users SET litai_sum_week = 0", (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Schedule a cron job to reset litai_sum_month to 0 on the last day of the month at midnight (0 0 28-31 * *)
cron.schedule("0 0 28-31 * *", async () => {
  try {
    await resetLitaiSumMonth()
    console.log("litai_sum_month reset for all Super Users.")
  } catch (error) {
    console.error("Error:", error)
  }
})

function resetLitaiSumMonth() {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE super_users SET litai_sum_month = 0", (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

//? Log message that script is working
cron.schedule("* * * * *", () => {
  console.log("Message counter script is running...")
})

//
// node messageCounter.js

// Start a Node.js Script: pm2 start server.js messageCounter.js
// List Running Processes: pm2 list
// View Logs for a Process: pm2 logs
// Monitor CPU/Memory Usage: pm2 monit
// pm2 restart all
// pm2 delete <pid> 1
