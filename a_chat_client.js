const userDataChat = document.getElementById("chat-user-data");
const username = userDataChat.getAttribute("data-name");
const chatUserId = document.getElementById("chat-user-id").value;

// Function to scroll to the bottom of the chat messages
function scrollToBottom() {
  const chatMessages = document.getElementById("chat-container-messages");
  console.log(chatMessages);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  console.log("Scrolled to the bottom");
}

// Function to add a message to the chat
function addMessageToChat(message) {
  const chatMessages = document.getElementById("chat-messages");
  const newMessageItem = document.createElement("li");
  newMessageItem.textContent = `${username}: ${message}`;
  chatMessages.appendChild(newMessageItem);

  // Save the message to local storage
  saveMessageToLocal(message);

  // Scroll to the bottom after adding a message
  scrollToBottom();
  console.log("Added message to chat");
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
  console.log("Saved message to local storage");
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

  console.log("Loaded messages from local storage");
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
window.addEventListener("load", () => {
  loadMessagesFromLocal(); // Load stored messages
  scrollToBottom(); // Scroll to the bottom when the page loads
});


