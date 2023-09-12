function addMessage(message) {
  const chatMessages = document.getElementById("chat-messages")
  const newMessageItem = document.createElement("li")
  newMessageItem.textContent = message
  chatMessages.appendChild(newMessageItem)
}

// Function to handle sending a message
function sendMessage(event) {
  if (event) {
    event.preventDefault() // Prevent form submission and page reload
  }

  const inputElement = document.getElementById("chat-input")
  const message = inputElement.value.trim()

  if (message !== "") {
    addMessage(message)

    // You can send the message to a server or perform other actions here if needed.

    inputElement.value = ""
  }
}

// Event listener for the "Send" button
const chatButton = document.getElementById("chat-button")
chatButton.addEventListener("click", sendMessage)

// Event listener for pressing Enter in the input field
const chatInput = document.getElementById("chat-input")
chatInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event)
  }
})
