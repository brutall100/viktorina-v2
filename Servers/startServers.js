// const { spawn } = require("child_process")

// // Start d_server.js
// const dServerProcess = spawn("node", ["d_server.js"])
// console.log("d_server.js started on ...................... PORT0  4000")

// // Start server.js
// const serverProcess = spawn("node", ["server.js"])
// console.log("server.js started on ........................ PORT1  4001")

// // Start playGame.js
// const gameServerProcess = spawn("node", ["playGame.js"])
// console.log("playGame.js started on ...................... PORT2  4002")

// // Start game3server.js
// const game3serverProcess = spawn("node", ["game3server.js"])
// console.log("game3server.js started on.................... PORT3  4003")

// // Start a_points.js
// const aPointsServerProcess = spawn("node", ["a_points.js"])
// console.log("a_points.js started on ...................... PORT4  4004")

// // Start a_chat_server.js
// const aChatServerProcess = spawn("node", ["a_chat_server.js"])
// console.log("a_chat_server.js started on ................. PORT5  4005")

// // Start i_myInfoServer.js
// const myInfoServer = spawn("node", ["i_myInfoServer.js"])
// console.log("i_myInfoServer.js started on................. PORT6  4006")

// // Start messageCounter.js
// const messageCounterProcess = spawn("node", ["messageCounter.js"])
// console.log("messageCounter.js started ................... CRON SCRIPT")

// // Handle errors
// dServerProcess.on("error", (err) => {
//   console.error("Error starting d_server.js", err)
// })

// serverProcess.on("error", (err) => {
//   console.error("Error starting server.js", err)
// })

// gameServerProcess.on("error", (err) => {
//   console.error("Error starting playGame.js", err)
// })

// game3serverProcess.on("error", (err) => {
//   console.error("Error starting game3server.js", err)
// })

// aPointsServerProcess.on("error", (err) => {
//   console.error("Error starting a_points.js", err)
// })

// aChatServerProcess.on("error", (err) => {
//   console.error("Error starting a_chat_server.js", err)
// })

// myInfoServer.on("error", (err) => {
//   console.error("Error starting i_myInfoServer.js", err)
// })

// messageCounterProcess.on("error", (err) => {
//   console.error("Error starting messageCounter.js", err)
// })

// // Handle exit events
// dServerProcess.on("exit", (code) => {
//   console.log(`d_server.js exited with code ${code}`)
// })

// serverProcess.on("exit", (code) => {
//   console.log(`server.js exited with code ${code}`)
// })

// gameServerProcess.on("exit", (code) => {
//   console.log(`playGame.js exited with code ${code}`)
// })

// game3serverProcess.on("exit", (code) => {
//   console.log(`game3server.js exited with code ${code}`)
// })

// aPointsServerProcess.on("exit", (code) => {
//   console.log(`a_points.js exited with code ${code}`)
// })

// aChatServerProcess.on("exit", (code) => {
//   console.log(`a_chat_server.js exited with code ${code}`)
// })

// myInfoServer.on("exit", (code) => {
//   console.log(`i_myInfoServer.js exited with code ${code}`)
// })

// messageCounterProcess.on("exit", (code) => {
//   console.log(`messageCounter.js exited with code ${code}`)
// })

// node startServers.js

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

const dServerProcess = spawnProcess("d_server.js", 4000)
const serverProcess = spawnProcess("server.js", 4001)
// const gameServerProcess = spawnProcess("playGame.js", 4002)
const game3serverProcess = spawnProcess("game3server.js", 4003)
const aPointsServerProcess = spawnProcess("a_points.js", 4004)
const aChatServerProcess = spawnProcess("a_chat_server.js", 4005)
const myInfoServer = spawnProcess("i_myInfoServer.js", 4006)
const messageCounterProcess = spawnProcess("messageCounter.js", "CRON SCRIPT")
