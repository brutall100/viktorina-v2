const mysql = require('mysql');
const cron = require('node-cron');

// Configure your MySQL database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'viktorina'
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to count messages for a specific user within the past hour
function countUserMessages(username) {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT COUNT(*) AS messageCount FROM chat_app_db WHERE chat_user_name = ? AND chat_date >= ?',
      [username, oneHourAgo],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].messageCount);
        }
      }
    );
  });
}

// Function to fetch a list of all users from the database
function getAllUsers() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT DISTINCT chat_user_name FROM chat_app_db', (error, results) => {
      if (error) {
        reject(error);
      } else {
        const users = results.map((row) => row.chat_user_name);
        resolve(users);
      }
    });
  });
}

// Schedule the script to run every minute for testing
cron.schedule('*/1 * * * *', async () => {
  try {
    const users = await getAllUsers();
    
    for (const username of users) {
      const messageCount = await countUserMessages(username);
      console.log(`Messages sent by ${username} in the last hour: ${messageCount}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});



// node messageCounter.js
