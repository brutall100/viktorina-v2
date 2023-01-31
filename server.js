const express = require('express');
const app = express();
const port = 3000;

app.get('/data', (req, res) => {
  const { refreshData, dataQnA } = require('./a_getData');

  refreshData((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

