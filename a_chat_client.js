const userDataChat = document.getElementById("chat-user-data")
const username = userDataChat.getAttribute("chat-data-name")
const chatUserId = document.getElementById("chat-user-id").value

// Function to scroll to the bottom of the chat messages
function scrollToBottom() {
  const chatMessages = document.getElementById("chat-container-messages")
  console.log(chatMessages)
  chatMessages.scrollTop = chatMessages.scrollHeight
  console.log("Scrolled to the bottom")
}

// Function to add a user_message to the chat
function addMessageToChat(user_message) {
  const chatMessages = document.getElementById("chat-messages")
  const newMessageItem = document.createElement("li")
  newMessageItem.textContent = `${username}: ${user_message}`
  chatMessages.appendChild(newMessageItem)

  // Save the user_message to local storage
  saveMessageToLocal(user_message)

  // Scroll to the bottom after adding a user_message
  scrollToBottom()
  console.log("Added user_message to chat")
}

// Function to save a user_message to local storage
function saveMessageToLocal(user_message) {
  let storedMessages = localStorage.getItem("chatMessages") || []
  if (typeof storedMessages === "string") {
    storedMessages = JSON.parse(storedMessages)
  }

  // Add the new user_message to the stored messages
  storedMessages.push(`${username}: ${user_message}`)

  // Store the updated messages back to local storage
  localStorage.setItem("chatMessages", JSON.stringify(storedMessages))
  console.log("Saved user_message to local storage")
}

// Function to load messages from local storage and display them
function loadMessagesFromLocal() {
  const chatMessages = document.getElementById("chat-messages")
  chatMessages.innerHTML = "" // Clear existing messages

  let storedMessages = localStorage.getItem("chatMessages") || []
  if (typeof storedMessages === "string") {
    storedMessages = JSON.parse(storedMessages)
  }

  // Display the stored messages in the chat
  storedMessages.forEach((user_message) => {
    const newMessageItem = document.createElement("li")
    newMessageItem.textContent = user_message
    chatMessages.appendChild(newMessageItem)
  })

  console.log("Loaded messages from local storage")
}

// Function to handle sending a user_message
function sendMessage(event) {
  if (event) {
    event.preventDefault() // Prevent form submission and page reload
  }

  const inputElement = document.getElementById("chat-input-msg")
  const user_message = inputElement.value.trim()

  const userIdInput = document.getElementById("chat-user-id")
  const user_id = userIdInput.value

  const userNameInput = document.getElementById("chat-user-name")
  const user_name = userNameInput.value

  if (user_message !== "") {
    addMessageToChat(user_message)

    // Send the user_message to the server
    fetch("http://localhost:4005/save-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: user_message,
        user_id: user_id,
        user_name: user_name
      })
    })
      .then((response) => {
        if (response.ok) {
          console.log("Message sent to server successfully")
        } else {
          console.error("Failed to send message")
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error)
      })

    inputElement.value = ""
  }
}

// Event listener for the "Send" button
const chatButton = document.getElementById("chat-button")
chatButton.addEventListener("click", sendMessage)

// Event listener for pressing Enter in the input field
const chatInput = document.getElementById("chat-input-msg")
chatInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event)
  }
})

window.addEventListener("load", () => {
  loadMessagesFromLocal()
  scrollToBottom()
})
