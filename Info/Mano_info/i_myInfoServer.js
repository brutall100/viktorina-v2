const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())

app.post("/updateName", (req, res) => {
  const { newName, userName, userId, userLitai } = req.body

  console.log(`Received data: newName=${newName}, userName=${userName}, userId=${userId}, userLitai=${userLitai}`)

  // Simulate an update in the database (replace this with your actual database logic)
  // ...

  res.json({ message: "Name updated successfully" })
})

const PORT = 4006
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

//  C:\xampp\htdocs\aldas\Viktorina.live> cd Info
//  C:\xampp\htdocs\aldas\Viktorina.live\Info> cd Mano_info

//  C:\xampp\htdocs\aldas\Viktorina.live\Info\Mano_info> node i_myInfoServer.js
