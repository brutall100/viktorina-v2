// const { spawn } = require("child_process")

// // Start auth-server.js
// const dServerProcess = spawn("node", ["auth-server.js"])
// console.log("auth-server.js started on ...................... PORT0  4000")

// // Start quiz-server.js
// const serverProcess = spawn("node", ["quiz-server.js"])
// console.log("quiz-server.js started on ........................ PORT1  4001")

// // Start playGame.js
// const gameServerProcess = spawn("node", ["playGame.js"])
// console.log("playGame.js started on ...................... PORT2  4002")

// // Start game-3-server.js
// const game3serverProcess = spawn("node", ["game-3-server.js"])
// console.log("game-3-server.js started on.................... PORT3  4003")

// // Start points-server.js
// const aPointsServerProcess = spawn("node", ["points-server.js"])
// console.log("points-server.js started on ...................... PORT4  4004")

// // Start chat-server.js
// const aChatServerProcess = spawn("node", ["chat-server.js"])
// console.log("chat-server.js started on ................. PORT5  4005")

// // Start my-info-server.js
// const myInfoServer = spawn("node", ["my-info-server.js"])
// console.log("my-info-server.js started on................. PORT6  4006")

// // Start message-counter.js
// const messageCounterProcess = spawn("node", ["message-counter.js"])
// console.log("message-counter.js started ................... CRON SCRIPT")

// // Handle errors
// dServerProcess.on("error", (err) => {
//   console.error("Error starting auth-server.js", err)
// })

// serverProcess.on("error", (err) => {
//   console.error("Error starting quiz-server.js", err)
// })

// gameServerProcess.on("error", (err) => {
//   console.error("Error starting playGame.js", err)
// })

// game3serverProcess.on("error", (err) => {
//   console.error("Error starting game-3-server.js", err)
// })

// aPointsServerProcess.on("error", (err) => {
//   console.error("Error starting points-server.js", err)
// })

// aChatServerProcess.on("error", (err) => {
//   console.error("Error starting chat-server.js", err)
// })

// myInfoServer.on("error", (err) => {
//   console.error("Error starting my-info-server.js", err)
// })

// messageCounterProcess.on("error", (err) => {
//   console.error("Error starting message-counter.js", err)
// })

// // Handle exit events
// dServerProcess.on("exit", (code) => {
//   console.log(`auth-server.js exited with code ${code}`)
// })

// serverProcess.on("exit", (code) => {
//   console.log(`quiz-server.js exited with code ${code}`)
// })

// gameServerProcess.on("exit", (code) => {
//   console.log(`playGame.js exited with code ${code}`)
// })

// game3serverProcess.on("exit", (code) => {
//   console.log(`game-3-server.js exited with code ${code}`)
// })

// aPointsServerProcess.on("exit", (code) => {
//   console.log(`points-server.js exited with code ${code}`)
// })

// aChatServerProcess.on("exit", (code) => {
//   console.log(`chat-server.js exited with code ${code}`)
// })

// myInfoServer.on("exit", (code) => {
//   console.log(`my-info-server.js exited with code ${code}`)
// })

// messageCounterProcess.on("exit", (code) => {
//   console.log(`message-counter.js exited with code ${code}`)
// })

// node start-servers.js

const { spawn } = require("child_process")

function spawnProcess(scriptName, port) {
  const process = spawn("node", [scriptName])
  console.log(`${scriptName} started on port ${port}`)

  process.stderr.on("data", (data) => {
    console.error(`${scriptName} error: ${data}`)
  })

  process.on("error", (err) => {
    console.error(`Error starting ${scriptName}:`, err)
  })

  process.on("exit", (code) => {
    if (code !== 0) {
      console.log(`${scriptName} exited with non-zero code ${code}`)
    } else {
      console.log(`${scriptName} exited successfully`)
    }
  })

  return process
}

const dServerProcess = spawnProcess("auth-server.js", 4000)
const serverProcess = spawnProcess("quiz-server.js", 4001)
// const gameServerProcess = spawnProcess("playGame.js", 4002)
const game3serverProcess = spawnProcess("game-3-server.js", 4003)
const aPointsServerProcess = spawnProcess("points-server.js", 4004)
const aChatServerProcess = spawnProcess("chat-server.js", 4005)
const myInfoServer = spawnProcess("my-info-server.js", 4006)
const messageCounterProcess = spawnProcess("message-counter.js", "CRON SCRIPT")
