const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const gameNo = randomNumber();
  let response = { gameNo };
  
  console.log(`Random number generated: ${gameNo}`);
  
  if (gameNo === 3) {
    console.log('game1');
    response.gameName = 'game1';
  } else if (gameNo === 6) {
    console.log('game2');
    response.gameName = 'game2';
  } else if (gameNo === 9) {
    console.log('game3');
    response.gameName = 'game3';
  } else {
    console.log('game not ready');
    response.gameName = 'not ready';
  }
  
  res.end(JSON.stringify(response));
});

function randomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});




