async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

(async function() {
  const data = await fetchData();
  console.log('Data:', data);
  console.log('ID:', data.id);
  console.log('Question:', data.question);
  console.log('Answer:', data.answer);  
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = JSON.stringify(data);
  
  displayQuestion(data);
})();


async function displayQuestion(data) {
  const questionElement = document.getElementById("question");
  questionElement.innerText = data.question;
  
  const answersElement = document.getElementById("answer");
  answersElement.innerHTML = "";
  
  const dotsElement = document.getElementById("dot-answer");
  dotsElement.innerHTML = "";
  
  const lenghtElement = document.getElementById("dot-answer-lenght");
  lenghtElement.innerText = data.answer.length;
  
  const words = data.answer.split(" ");
  const underscore = "_";
  
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      dotsElement.innerHTML += " &#x2B1C; ";
    }
    if (i < words.length - 1) {
      dotsElement.innerHTML += `${underscore}`;
    }
  }
  
  displayLettersWithDelay(answersElement, data.answer, 3000);
}

async function displayLettersWithDelay(element, string, delay) {
  for (let i = 0; i < 4; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5000 + delay * i));
    element.innerHTML += string[i];
  }
}




function generateBonusPoints() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const randomHour = Math.floor(Math.random() * 24);
  if (currentHour === randomHour) {
    const randomNumber = Math.floor(Math.random() * 5);
    return (randomNumber + 1) * 10;
  } else {
    return 0;
  }
}

const pointsElement = document.getElementById('bonus-points')
const imageElement = document.getElementById('litai-img')
const bonusPoint = generateBonusPoints()

if (bonusPoint > 0) {
  pointsElement.innerHTML = ` + Bonus: ${bonusPoint}`
  let images = "";
  if(bonusPoint === 10 || bonusPoint === 20 || bonusPoint === 50) {
      images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/${bonusPoint}Lt.png" alt="${bonusPoint} Litų">`
  }else if(bonusPoint === 30) {
       {
        images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/10Lt.png" alt="Dešimt litų">`
        images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`
      }
  }else if(bonusPoint === 40) {
      for (let i = 0; i < 2; i++) {
        images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`
      }
  }
  imageElement.innerHTML = images
} else {
  pointsElement.style.display = "none"
}




function generateAndDisplayRandomPoint() {
  let storedRandomPoint = localStorage.getItem("randomPoint");
  let storedTime = localStorage.getItem("time");

  // Check if 60 seconds have passed since the last time the point was generated
  if (storedRandomPoint && storedTime && (Date.now() - storedTime < 60000)) {
    // 60 seconds have not passed, use the stored random point
    randomPoint = storedRandomPoint;
  } else {
    // 60 seconds have passed or no stored random point, generate a new one
    randomPoint = Math.floor(Math.random() * 5) + 1;

    // Store the new random point and time in local storage
    localStorage.setItem("randomPoint", randomPoint);
    localStorage.setItem("time", Date.now());
  }

  let litoVerte = "";
  let imageSrc = "";

  // Determine the value of litoVerte and imageSrc based on the value of randomPoint
  if (randomPoint === 1) {
    litoVerte = "Litas";
  
    const image1Element = document.createElement("img");
    image1Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
    image1Element.alt = "Klausimo verte vienas Litas";
    image1Element.classList.add("on-off-litai"); // Add the new class here
    document.getElementById("litai-img").appendChild(image1Element);
    
  } 
  else if (randomPoint === 2) {
    litoVerte = "Litai";

    const image1Element = document.createElement("img");
    image1Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
    image1Element.alt = "1 Litas";
    image1Element.classList.add("on-off-litai1"); // Add the new class here
    document.getElementById("litai-img").appendChild(image1Element);

    const image2Element = document.createElement("img");
    image2Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
    image2Element.alt = "1 Litas";
    image1Element.classList.add("on-off-litai"); // Add the new class here
    document.getElementById("litai-img").appendChild(image2Element);
  }
  else if (randomPoint === 3) {
    litoVerte = "Litai";

    // Display multiple images
    const image1Element = document.createElement("img");
    image1Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
    image1Element.alt = "1 Litas";
    image1Element.classList.add("on-off-litai"); // Add the new class here
    document.getElementById("litai-img").appendChild(image1Element);

    const image2Element = document.createElement("img");
    image2Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/2Lt.png";
    image2Element.alt = "2 Litai";
    image1Element.classList.add("on-off-litai"); // Add the new class here
    document.getElementById("litai-img").appendChild(image2Element);
  }
  else if (randomPoint === 4) {
    litoVerte = "Litai";

    // Display multiple images
    const image1Element = document.createElement("img");
    image1Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/2Lt.png";
    image1Element.alt = "2 Litai";
    image1Element.classList.add("on-off-litai"); // Add the new class here
    document.getElementById("litai-img").appendChild(image1Element);

    const image2Element = document.createElement("img");
    image2Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/2Lt.png";
    image2Element.alt = "2 Litai";
    image1Element.classList.add("on-off-litai"); // Add the new class here
    document.getElementById("litai-img").appendChild(image2Element);
  }
  else if (randomPoint === 5) {
    litoVerte = "Litai";
  
    const image1Element = document.createElement("img");
    image1Element.src = "http://localhost/aldas/Viktorina.live/images/ImgLitai/5Lt.png";
    image1Element.alt = "5 Litai";
    image1Element.classList.add("new-class1"); // Add the new class here
    document.getElementById("litai-img").appendChild(image1Element);
  } 
  else {
    litoVerte = "Litai";
    imageSrc = "/ImgLitai/2Lt.png";
  }

  // Display the random point in the "points" element
  document.getElementById("points").innerHTML = `Verte: ${randomPoint} ${litoVerte} `;

  // Display the image in the "image" element
  const imageElement = document.getElementById("litai-img");
  imageElement.src = imageSrc;
  imageElement.alt = `${randomPoint} ${litoVerte}`;
  
}



function refreshPage() {
  setTimeout(() => {
    location.reload();
  }, 59000); // 8000 milliseconds = 8 seconds
}

// displayQuestion();
generateAndDisplayRandomPoint();
refreshPage();




// Get a reference to the form


//  // Get a reference to the form element
//  const form = document.getElementById('answer-form');

//  // Add an event listener to the form to handle submit events
//  form.addEventListener('submit', event => {
//    // Prevent the default form submission behavior
//    event.preventDefault();

//    // Get the value of the answer input field
//    const answer = event.target.elements.answer.value;

//    // Do something with the answer, such as sending it to a server or processing it in some way
//    // ...
//  })
   




// //  Chatt container
// function getFormattedTime() {
//   const date = new Date();
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   return `${hours}:${minutes}:${seconds}`;
// }

// const chatContainer = document.getElementById('chat-container');
// const chatMessages = document.getElementById('chat-messages');
// const chatInput = document.getElementById('chat-input');
// const chatButton = document.getElementById('chat-button');

// // Save the text to localStorage
// localStorage.setItem('inputText', chatInput.value);

// // Retrieve the text from localStorage
// const storedText = localStorage.getItem('inputText');

// // Update the input field with the stored text
// if (storedText) {
//   chatInput.value = storedText;
// }

// chatButton.addEventListener('click', () => {
//   const message = chatInput.value;
//   const time = getFormattedTime();
//   chatInput.value = '';
//   chatMessages.innerHTML += `<div><span class="time">${time}</span> ${message}</div>`;
//   chatContainer.scrollTop = chatContainer.scrollHeight;

//   // Save the messages to localStorage
//   const messages = chatMessages.innerHTML;
//   localStorage.setItem('messages', messages);
// });


// // Retrieve the messages from localStorage
// const storedMessages = localStorage.getItem('messages');

// // Update the chat dialog box with the stored messages
// if (storedMessages) {
//   chatMessages.innerHTML = storedMessages;
// }




  



