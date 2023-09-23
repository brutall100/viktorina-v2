const { spawn } = require("child_process")
// Start d_server.js
const dServerProcess = spawn("node", ["d_server.js"])
console.log("d_server.js started on .......... PORT0  4000")

// Start server.js
const serverProcess = spawn("node", ["server.js"])
console.log("server.js started on ............ PORT1  4001")

// /Game/playGame.js
const gameServerProcess = spawn("node", ["./Games/playGame.js"])
console.log("/Games/playGame.js started on ... PORT2  4002")

// Start /Game/game3server.js
const game3serverProcess = spawn("node", ["./Games/game3server.js"])
console.log("/Games/game3server.js started on. PORT3  4003")

// Start a_points.js
const aPointsServerProcess = spawn("node", ["a_points.js"])
console.log("a_points.js started on .......... PORT4  4004")

// Start a_chat_server.js
const aChatServerProcess = spawn("node", ["a_chat_server.js"])
console.log("a_chat_server.js started on ..... PORT5  4005")

// Handle errors
serverProcess.on("error", (err) => {
  console.error("Error starting server.js", err)
})

dServerProcess.on("error", (err) => {
  console.error("Error starting d_server.js", err)
})

gameServerProcess.on("error", (err) => {
  console.error("Error strating playGame.js", err)
})

aPointsServerProcess.on("error", (err) => {
  console.error("Error starting a_points.js", err)
})

game3serverProcess.on("error", (err) => {
  console.error("Error starting game3server.js", err)
})

aChatServerProcess.on("error", (err) => {
  console.error("Error starting a_chat_server.js", err)
})

// Handle exit events
serverProcess.on("exit", (code) => {
  console.log(`server.js exited with code ${code}`)
})

dServerProcess.on("exit", (code) => {
  console.log(`d_server.js exited with code ${code}`)
})

gameServerProcess.on("exit", (code) => {
  console.log(`playGame.js exited with code ${code}`)
})

aPointsServerProcess.on("exit", (code) => {
  console.log(`a_points.js exited with code ${code}`)
})

game3serverProcess.on("exit", (code) => {
  console.log(`game3server.js exited with code ${code}`)
})

aChatServerProcess.on("exit", (code) => {
  console.log(`a_chat_server.js exited with code ${code}`)
})