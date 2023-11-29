const express = require("express")
const cors = require("cors")
const app = express()

const sensitiveData = {
  SERVER_ADDRESS: "http://***REMOVED***",
  PORT0: 4000,
  PORT1: 4001,
  PORT2: 4002,
  PORT3: 4003,
  PORT4: 4004,
  PORT5: 4005,
  PORT6: 4006
}

console.log("Sensitive Data:", sensitiveData)

app.use(cors())

app.get("/sensitive-data", (req, res) => {
  res.json({ data: sensitiveData })
})

const port = 4007
app.listen(port, () => {
  console.log(`Server envServer is running on port ${port}`)
})
