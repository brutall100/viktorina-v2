const database = {
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      answers: "Paris",
    },
    {
      id: 2,
      question: "What is the largest ocean in the world?",
      answers: "Pacific Ocean",
    },
    {
      id: 3,
      question: "What is the highest mountain in the world?",
      answers: "Everest",
    },
    {
      id: 4,
      question: "What is the longest river in the world?",
      answers: "Nile",
    },
    {
      id: 5,
      question: "Kas megsta saldainius?",
      answers: "Giedrius Pamparam",
    },
    {
      id: 6,
      question: "Kas daro netvarka?",
      answers: "Viktorija",
    },
    {
      id: 7,
      question: "Seimos Narys?",
      answers: "Ugis 1",
    },
    {
      id: 8,
      question: "Aldo gimimo metai?",
      answers: "1986",
    },
  ]
};

fetch('a_get_data.php')
  .then(response => response.json())
  .then(data => {
    database.questions = data;
    const question = getRandomQuestion();
    displayQuestion(question);
  })
  .catch(error => console.error(error));





function getRandomQuestion() {
  // Generate a random index based on the length of the questions array
  const randomIndex = Math.floor(Math.random() * database.questions.length);

  // Get the question object at the random index
  const question = database.questions[randomIndex];

  return question;
}


function displayQuestion(question) {
  const questionElement = document.getElementById("question")
  questionElement.innerText = question.question

  const answersElement = document.getElementById("answers")
  answersElement.innerHTML = ""

  const dotsElement = document.getElementById("dot-answer")
  dotsElement.innerHTML = ""

  const lenghtElement = document.getElementById("dot-answer-lenght")
  lenghtElement.innerText = question.answers.length

  // Split the answer into an array of words
  const words = question.answers.split(" ");
  const underscore = "_"
  // Loop through the words and add a dot for each character
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      dotsElement.innerHTML += " &#x2B1C; "
    }
  
    // Add a space after each word, except for the last word
    if (i < words.length - 1) {
  dotsElement.innerHTML += `${underscore}`
    }
  }
  
  
  displayLettersWithDelay(answersElement, question.answers, 3000)
}



function displayLettersWithDelay(element, string, delay) {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      element.innerHTML += string[i];
    }, 5000 + delay * i);
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
  // Generate a random point from 1 to 5
  const randomPoint = Math.floor(Math.random() * 5) + 1;
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
  }, 17000); // 8000 milliseconds = 8 seconds
}

const question = getRandomQuestion();
displayQuestion(question);
generateAndDisplayRandomPoint();
refreshPage();

// Get a reference to the form



 // Get a reference to the form element
 const form = document.getElementById('answer-form');

 // Add an event listener to the form to handle submit events
 form.addEventListener('submit', event => {
   // Prevent the default form submission behavior
   event.preventDefault();

   // Get the value of the answer input field
   const answer = event.target.elements.answer.value;

   // Do something with the answer, such as sending it to a server or processing it in some way
   // ...
 })
   




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




  



