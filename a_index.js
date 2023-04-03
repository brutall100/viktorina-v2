let data;
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
(async function() {
  data = await fetchData();
  // console.log('Data:', data);
  // console.log('Question:', data.data.question);
  // console.log('ID:', data.data.id);
  // console.log('Answer:', data.data.answer); 
  // console.log('Litan:', data.data.lita);
  // console.log('Bonus:', data.data.bonusLita);
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = JSON.stringify(data);
  displayQuestion(data);
  generateAndDisplayRandomPoint(data.data.lita);
  generateBonusPoints(data.data.bonusLita);
  lita = data.data.lita;
  const litaContainer = document.getElementById("lita");
  litaContainer.innerHTML = lita;
  const bonusLitaContainer = document.getElementById("lita-bonus");
  bonusLitaContainer.innerHTML = data.data.bonusLita;
  
})();



function checkServerData() {
  axios.get('http://localhost:3000/data')
    .then(response => {
      const serverData = response.data.data;
      const serverId = serverData.id;
      const clientId = data.data.id;
      if (serverId === clientId) {
        // console.log('Serverio id matches client id.');
        // Do something
      } else {
        console.log('Serverio id does not match client id. Reloading in 1 seconds...');
        setTimeout(() => {
          location.reload();
        }, 10);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
setInterval(checkServerData, 1000); // call the function every 0.5 seconds




function oldQuestionData() {
  axios.get('http://localhost:3000/data')
    .then(response => {
      const serverData = response.data.data;
      const serverQuestion = serverData.question;
      const questionId = serverData.id;
      const serverAnswer = serverData.answer;
      
      console.log('Old question:', serverQuestion, 'ID:', questionId, 'Answer:', serverAnswer);

      const oldQuestionDiv = document.getElementById('old-question');
     
      oldQuestionDiv.innerHTML = `Klausimo numeris: <span class="question">${questionId}</span> - <span class="serverQuestion">${serverQuestion}</span> - <span class="serverAnswer">${serverAnswer}</span>`;

    })
    .catch(error => {
      console.error(error);
    });
}



window.onload = function() {
  document.getElementById("answer-input").focus();
};



                      // Rodyti klausima
async function displayQuestion(data) {
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  question.innerText = data.data.question;
  const answerString = data.data.answer;
  const hiddenString = answerString.replace(/./g, "*").split("").join(" ");
  answer.innerText = hiddenString;
  await displayLettersWithDelay(answerString, answer, 8000);
}

async function displayLettersWithDelay(string, element, delay) {
  for (let i = 0; i < 4 && i < string.length; i++) {
    const revealDelay = delay + (i * 1000);
    await new Promise(resolve => setTimeout(resolve, revealDelay));
    const hiddenString = element.innerText.split(" ");
    hiddenString[i] = string[i];
    element.innerText = hiddenString.join(" ");
  }
}

                      



//                    LITAI
const generateAndDisplayRandomPoint = async (lita) => {
  litoVerte = "";
  imageSrc = "";
  const litaiImg = document.getElementById("litai-img");
  if (lita === 1) {
    litoVerte = "Litas";
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
  } else if (lita === 2) {
    litoVerte = "Litai";
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
    displayImage(imageSrc, litaiImg, "on-off-litai1");
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
  } else if (lita === 3) {
    litoVerte = "Litai";
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/1Lt.png";
    displayImage(imageSrc, litaiImg, "on-off-litai");
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/2Lt.png";
  } else if (lita === 4) {
    litoVerte = "Litai";
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/2Lt.png";
    displayImage(imageSrc, litaiImg, "on-off-litai");
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/2Lt.png";
  } else if (lita === 5) {
    litoVerte = "Litai";
    imageSrc = "http://localhost/aldas/Viktorina.live/images/ImgLitai/5Lt.png";
  } else {
    litoVerte = "";
    imageSrc = "";
  }
  
  displayImage(imageSrc, litaiImg, "new-class1");
  document.getElementById("points").innerHTML = `Verte: ${lita} ${litoVerte}&nbsp;  `;
};
  
  const displayImage = (src, parent, className) => {
  const imageElement = document.createElement("img");
  imageElement.src = src;
  imageElement.alt = `${lita} Litai`;
  imageElement.classList.add(className);
  parent.appendChild(imageElement);
};
              



                        //  BONUS-LITAI
function generateBonusPoints(bonusLita) {
 
const pointsElement = document.getElementById('bonus-points')
const imageElement = document.getElementById('litai-img-bonus')
if (bonusLita > 0) {
  pointsElement.innerText= ` + Bonus: ${bonusLita}`
  let images = "";
  if(bonusLita === 10 || bonusLita === 20 || bonusLita === 50) {
      images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/${bonusLita}Lt.png" alt="${bonusLita} Litų">`
  }else if(bonusLita === 30) {
       {
        images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/10Lt.png" alt="Dešimt litų">`
        images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`
      }
  }else if(bonusLita === 40) {
      for (let i = 0; i < 2; i++) {
        images += `<img src="http://localhost/aldas/Viktorina.live/images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`
      }
  }
  imageElement.innerHTML = images
} else {
  pointsElement.style.display = "none"
}
}




// reikia prideti zinute ,niekas neatsake ,kitas klausimas po 3 sek
// vietoi kluasimo zinute,parodomas atsakumas atsakymas buvo blalal
// atsakymo input stop
                  //Atsakymas
const userData = {
  name: '',
  level: '',
  points: ''
};
const populateUserData = () => {
  const userDataElement = document.getElementById('user-data');
  userData.name = userDataElement.dataset.name;
  userData.level = userDataElement.dataset.level;
  userData.points = userDataElement.dataset.points;
}
populateUserData();
const answerForm = document.getElementById('answer-form');
answerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const answerInput = document.getElementById('answer-input');
  const userAnswer = answerInput.value;
  handleUserAnswer(userAnswer);
  answerInput.value = '';
});


let isTimeUp = false;
setTimeout(() => {
  isTimeUp = true;
  oldQuestionData();
  console.log('time is over');
}, 40000);
 


const handleUserAnswer = async (userAnswer) => {
  const data = await fetchData();
  if (!data || !data.data || !data.data.answer) {
    console.error('Answer not found in data object');
    return;
  }
  const correctAnswer = data.data.answer.toLowerCase();
  const userAnswerLower = userAnswer.toLowerCase();

  const isAnswerCorrect = checkLettersAndCompare(userAnswerLower, correctAnswer);

  if (isAnswerCorrect) {
    const litaPoints = parseInt(data.data.lita, 10) + parseInt(data.data.bonusLita, 10);
    userData.points = litaPoints.toString();
    const successMsg = `Teisingai atsakė ${userData.name}: <span class="special-atsakymas" style="color: green; font-weight: bold">${userAnswer}</span> ${userData.name} gauna ${litaPoints} litų`;
    document.getElementById('answer').innerHTML = successMsg;
  


  // const gameNo = randomGame()
  // console.log('randomGame generates: ' + gameNo)
  playGame();

  

    const url = 'http://localhost:8000/a_points.js';
    const body = JSON.stringify({
      user_id_name: userData.name,
      points: litaPoints
    });    
  
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (response.ok) {
      const { user_id_name, points } = await response.json();
      console.log(`User points updated successfully ${points}`);
      console.log("user_id_name: " + user_id_name);
      console.log("points: " + points);
      oldQuestionData()
      setTimeout(() => {
        location.reload();
      }, 5000); // Perkrauna page po 5 sekundziu
      
    } else {
      console.error('Failed to update user points');
    }
  } else if (!userAnswerLower.length === 0) {   // nedaug truksta,sutvarkyti priezasty
    setTimeout(oldQuestionData, 3000);

  } else if (userAnswerLower.length < 1) {
    const answerInput = document.getElementById('answer-input');
    answerInput.disabled = true;
    const MsgNoAnswer = `Atsakymas negali būti tuščias.`;
    document.getElementById('answer').textContent = MsgNoAnswer;
    setTimeout(() => {
      answerInput.disabled = false;
    }, 2500); // Disable answerInput for 2.5 seconds
    setTimeout(() => {
      location.reload();
    }, 1000); // Reload after 2 seconds

  }  else {
    const answerInputBad = document.getElementById('answer-input');
    answerInputBad.disabled = true;
    const errorMsg = `Atsakymas "${userAnswer}" yra neteisingas. Bandykite dar kartą.`;
    document.getElementById('answer').textContent = errorMsg;
    setTimeout(() => {
      answerInputBad.disabled = false;
    }, 3000); // Disable answerInput for 2.5 seconds

    setTimeout(() => {
      location.reload(); 
    }, 1000); // Reload after 2 seconds
  } 

 
  document.getElementById('answer-input').value = '';
};



function checkLettersAndCompare(str1, str2) {
  const letterMap = {
    'ą': 'a',
    'č': 'c',
    'ę': 'e',
    'ė': 'e',
    'į': 'i',
    'š': 's',
    'ų': 'u',
    'ū': 'u',
    'ž': 'z'
  };
  // Replace accented letters with their ASCII equivalents
  const cleanStr1 = str1.replace(/[ąčęėįšųž]/gi, match => letterMap[match.toLowerCase()]);
  const cleanStr2 = str2.replace(/[ąčęėįšųž]/gi, match => letterMap[match.toLowerCase()]);
  
  return cleanStr1.toLowerCase() === cleanStr2.toLowerCase();
}



                    // Games section


function randomGame() {
  return Math.floor(Math.random() * 10);
}


const widths = 520;      // Kontroliuoja issokancio lango dydzius ir pozicija
const heights = 300;
const lefts = window.innerWidth / 2 - widths / 2;
const tops = window.innerHeight / 2 - heights / 2;

function playGame() {
  const gameNo = 3; //randomGame();
  console.log('randomGame generates: ' + gameNo);

  if (gameNo === 3) {
    console.log(`game1 will play player ${userData.name}`);
    const gameWindow1 = window.open(`http://localhost/aldas/Viktorina.live/Games/game1.php?name=${userData.name}`, '_blank', `width=${widths},height=${heights},left=${lefts},top=${tops}`);
   
  } else if (gameNo === 6) {
    console.log(`game2 will play player ${userData.name}`);
    const gameWindow2 = window.open(`http://localhost/aldas/Viktorina.live/Games/game2.php?name=${userData.name}`, '_blank', `width=${widths},height=${heights},left=${lefts},top=${tops}`);
    
  } else if (gameNo === 9) {
    console.log(`game3 will play player ${userData.name}`);
    const gameWindow3 = window.open(`http://localhost/aldas/Viktorina.live/Games/game3.php?name=${userData.name}`, '_blank', `width=${widths},height=${heights},left=${lefts},top=${tops}`);
   
    console.log('game not ready');
  }
}








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



  



