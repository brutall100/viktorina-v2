const userDataChat = document.getElementById("chat-user-data");
const username = userDataChat.getAttribute("data-name");
const chatUserId = document.getElementById("chat-user-id").value;

// Function to add a message to the chat
function addMessageToChat(message) {
  const chatMessages = document.getElementById("chat-messages");
  const newMessageItem = document.createElement("li");
  newMessageItem.textContent = `${username}: ${message}`;
  chatMessages.appendChild(newMessageItem);

  // Save the message to local storage
  saveMessageToLocal(message);
}

// Function to save a message to local storage
function saveMessageToLocal(message) {
  let storedMessages = localStorage.getItem("chatMessages") || [];
  if (typeof storedMessages === "string") {
    storedMessages = JSON.parse(storedMessages);
  }

  // Add the new message to the stored messages
  storedMessages.push(`${username}: ${message}`);

  // Store the updated messages back to local storage
  localStorage.setItem("chatMessages", JSON.stringify(storedMessages));
}

// Function to load messages from local storage and display them
function loadMessagesFromLocal() {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = ""; // Clear existing messages

  let storedMessages = localStorage.getItem("chatMessages") || [];
  if (typeof storedMessages === "string") {
    storedMessages = JSON.parse(storedMessages);
  }

  // Display the stored messages in the chat
  storedMessages.forEach((message) => {
    const newMessageItem = document.createElement("li");
    newMessageItem.textContent = message;
    chatMessages.appendChild(newMessageItem);
  });
}

// Function to handle sending a message
function sendMessage(event) {
  if (event) {
    event.preventDefault(); // Prevent form submission and page reload
  }

  const inputElement = document.getElementById("chat-input");
  const message = inputElement.value.trim();

  if (message !== "") {
    addMessageToChat(message);

    // You can send the message to a server or perform other actions here if needed.

    inputElement.value = "";
  }
}

// Event listener for the "Send" button
const chatButton = document.getElementById("chat-button");
chatButton.addEventListener("click", sendMessage);

// Event listener for pressing Enter in the input field
const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event);
  }
});

// Load and display messages from local storage when the page loads
window.addEventListener("load", loadMessagesFromLocal);

