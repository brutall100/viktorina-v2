const express = require('express');
const app = express();

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(__dirname));

// Route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/a_index.php');
});

// Create an array to store chat messages
const messages = [];

// Route to get chat messages (long polling)
app.get('/getMessages', (req, res) => {
  // Check if there are new messages
  if (req.query.lastMessageIndex < messages.length) {
    const newMessages = messages.slice(req.query.lastMessageIndex);
    res.json(newMessages);
  } else {
    // Wait for new messages (long polling)
    const checkForNewMessages = () => {
      if (req.query.lastMessageIndex < messages.length) {
        const newMessages = messages.slice(req.query.lastMessageIndex);
        res.json(newMessages);
      } else {
        setTimeout(checkForNewMessages, 1000); // Check again in 1 second
      }
    };
    checkForNewMessages();
  }
});

// Route to post new chat messages
app.post('/sendMessage', express.json(), (req, res) => {
  const message = req.body.message;
  if (message) {
    messages.push(message);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Start the server
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
