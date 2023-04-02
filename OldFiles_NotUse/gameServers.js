const http = require('http');
const port = 5000;

let cachedNumber = null;

function getCachedNumber() {
  // Check if there is a cached number and if it was cached less than 1 minute ago
  if (cachedNumber !== null && Date.now() - cachedNumber.timestamp < 60000) {
    console.log("Returning cached number:", cachedNumber.number);
    return cachedNumber.number;
  }

  // If there is no cached number or if it has expired, generate a new one
  const newNumber = randomNumber();
  console.log("Generated new number:", newNumber);

  // Cache the new number with a timestamp
  cachedNumber = {
    number: newNumber,
    timestamp: Date.now()
  };

  // Set a timeout to clear the cache after 1 minute
  setTimeout(() => {
    console.log("Cache expired, clearing cached number");
    cachedNumber = null;
  }, 10000);

  return newNumber;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    let userData = { name: 'unknown' };
    if (body.trim().length > 0) {
      try {
        userData = JSON.parse(body);
        console.log(`Received signal from ${userData.name}`);
      } catch (error) {
        console.error(error);
      }
    }

    const gameNo = getCachedNumber();
    let response = { gameNo };

    console.log(`Random number generated: ${gameNo}`);

    if (gameNo === 3) {
      console.log(`game1 will play player ${userData.name}`);
      response.gameName = 'game1';
      window.open('http://localhost/aldas/Viktorina.live/game1.php', '_blank');
    } else if (gameNo === 6) {
      console.log(`game2 will play player ${userData.name}`);
      response.gameName = 'game2';
    } else if (gameNo === 9) {
      console.log(`game3 will play player ${userData.name}`);
      response.gameName = 'game3';
    } else {
      console.log('game not ready');
      response.gameName = 'not ready';
    }

    res.end(JSON.stringify(response));
  });
});

function randomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});









