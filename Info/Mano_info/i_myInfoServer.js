const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Define an API endpoint for updating the name
app.post('/update-name', (req, res) => {
  const newName = req.body.newName; // Assuming the client sends the new name in the request body

  // Perform the database update here (e.g., using a database library)
  // Replace the following with your actual database update code
  // db.updateName(newName);

  // Send a response to confirm the update
  res.json({ message: 'Name updated successfully' });
});

const PORT = 4006;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
