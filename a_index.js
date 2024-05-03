let data;
async function fetchData() {
  try {
    // const response = await axios.get("http://***REMOVED***:4001/data");
    const response = await axios.get("http://localhost:4001/data");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Anonymous async function to execute the code
(async function () {
  // Fetch data from the server
  data = await fetchData();

  // Uncomment the lines below to log specific data fields
  // console.log('Data:', data);
  // console.log('Question:', data.data.question);
  // console.log('ID:', data.data.id);
  // console.log('Answer:', data.data.answer);
  // console.log('Litan:', data.data.lita);
  // console.log('Bonus:', data.data.bonusLita);

  displayQuestion(data);
  generateAndDisplayRandomPoint(data.data.lita);
  generateBonusPoints(data.data.bonusLita);

  // const lita = data.data.lita;

  // Uncomment the lines below to update HTML containers with data
  //  const dataContainer = document.getElementById("dataContainer");
  //  dataContainer.innerHTML = JSON.stringify(data);
  
  //  const litaContainer = document.getElementById("lita");
  //  litaContainer.innerHTML = lita;

  //  const bonusLitaContainer = document.getElementById("lita-bonus");
  //  bonusLitaContainer.innerHTML = data.data.bonusLita;
})();


//
//
function checkServerData() {
  axios
    // .get("http://***REMOVED***:4001/data")
    .get("http://localhost:4001/data")
    .then((response) => {
      const serverData = response.data.data
      const serverId = serverData.id
      const clientId = data.data.id
      if (serverId === clientId) {
        // console.log('Serverio id matches client id.'); we can crete function with time or time goes back 3.2.1
        // Do something
      } else {
        console.log("Serverio id does not match client id. Reloading in 1 seconds...")
        setTimeout(() => {
          location.reload()
        }, 10) // 5 sekundes kolkas paskui 10milsec
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
setInterval(checkServerData, 1000) // call the function every 1 seconds

//
//
// Old question section
var userLevelis 
const userLeveli = parseInt(userLevelis);
console.log(userLeveli)


function calculateMaxOldDataCount() {
  if (userLeveli === 0 || userLeveli === 1 || userLeveli === 2) {
    return 10
  } else if (userLeveli === 3 || userLeveli === 4) {
    return 25
  } else if (userLeveli === 5) {
    return 50
  }

  return 5
}

function fetchNewestOldQuestionData() {
  axios
    // .get("http://***REMOVED***:4001/old-data")
    .get("http://localhost:4001/old-data")
    .then((response) => {
      const oldData = response.data.oldData

      const newDataDiv = document.getElementById("old-question")
      const maxOldDataCount = calculateMaxOldDataCount(userLeveli)

      if (oldData && oldData.length > 0) {
        const slicedOldData = oldData.slice(0, maxOldDataCount)

        let newDataHTML = "<ul class='question-list'>"
        slicedOldData.forEach((item) => {
          const timestamp = new Date(item.timestamp) // Format the timestamp to hours and minutes with leading zeros
          const hours = timestamp.getHours().toString().padStart(2, "0") // Ensure two digits
          const minutes = timestamp.getMinutes().toString().padStart(2, "0") // Ensure two digits
          const formattedTimestamp = `${hours}:${minutes}`

          newDataHTML += `
            <li class='question-item'>
              <span class='question-id'>${item.old_id}.</span>
              <span class='question-text'>
                <span class='question-label'>Klausimas:</span>
                <span class='question-content'>${item.old_question}</span>
              </span>
              <span class='answer-text'>${item.old_answer}</span>
              <hr class='hr-line'>
              <span class='timestamp'>${formattedTimestamp}</span>   
            </li>`
        })

        // Append the new HTML to the existing content
        newDataDiv.innerHTML += newDataHTML
      } else {
        newDataDiv.innerHTML = "<p>No new data available.</p>"
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

fetchNewestOldQuestionData()

setInterval(fetchNewestOldQuestionData, 45000)

//
// Rodyti klausima
async function displayQuestion(data) {
  const question = document.getElementById("question")
  const answer = document.getElementById("answer")
  const answerString = data.data.answer

  // Display the question immediately
  question.textContent = data.data.question

  // Hide the answer with asterisks
  const asterisks = answerString.replace(/\S/g, "*")
  answer.textContent = asterisks

  // Show the answer letters one by one with an 8-second delay
  for (let i = 0; i < 4 && i < answerString.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 8000))
    const letter =
      answerString[i] === " "
        ? " "
        : answerString[i] === "\n"
        ? "\n"
        : answerString[i] === "\t"
        ? "\t"
        : answerString[i] === "\r"
        ? "\r"
        : answerString[i] === "\f"
        ? "\f"
        : answerString[i] === "\v"
        ? "\v"
        : answerString[i]
    answer.textContent = answer.textContent.substring(0, i) + letter + answer.textContent.substring(i + 1)
  }
}

//
//                    LITAI
const generateAndDisplayRandomPoint = async (lita) => {
  const imageConfig = {
      1: { label: "Litas", src: "images/ImgLitai/1Lt.png" },
      2: { label: "Litai", src: ["images/ImgLitai/1Lt.png", "images/ImgLitai/1Lt.png"] },
      3: { label: "Litai", src: ["images/ImgLitai/1Lt.png", "images/ImgLitai/2Lt.png"] },
      4: { label: "Litai", src: ["images/ImgLitai/2Lt.png", "images/ImgLitai/2Lt.png"] },
      5: { label: "Litai", src: "images/ImgLitai/5Lt.png" }
  };

  const config = imageConfig[lita] || { label: "", src: "" };
  const litaiImg = document.getElementById("litai-img");
  litaiImg.innerHTML = '';  

  const srcs = Array.isArray(config.src) ? config.src : [config.src];
  srcs.forEach(src => {
      displayImage(src, litaiImg, "new-class1");
  });

  document.getElementById("points").innerHTML = `Verte: ${lita} ${config.label}&nbsp;`;
}


const displayImage = (src, parent, className) => {
  const imageElement = document.createElement("img");
  imageElement.src = src;
  imageElement.alt = `${src} Lito vertė pavaizduota`;  
  imageElement.classList.add(className);
  parent.appendChild(imageElement);
}


//  BONUS-LITAI
function generateBonusPoints(bonusLita) {
  const pointsElement = document.getElementById("bonus-points");
  const imageElement = document.getElementById("litai-img-bonus");

  // Reset the display style of pointsElement for each function call
  pointsElement.style.display = "block";

  if (bonusLita > 0) {
    pointsElement.innerText = `+ Bonus: ${bonusLita}`;
    let images = "";

    if (bonusLita === 10 || bonusLita === 20 || bonusLita === 50) {
      images += `<img src="images/ImgLitai/${bonusLita}Lt.png" alt="${bonusLita} Litų">`;
    } else if (bonusLita === 30) {
      images += `<img src="images/ImgLitai/10Lt.png" alt="Dešimt litų">`;
      images += `<img src="images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`;
    } else if (bonusLita === 40) {
      images += `<img src="images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`;
      images += `<img src="images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`;
    }

    imageElement.innerHTML = images;
    imageElement.style.display = "block"; // Make the div visible when there are images to show
  } else {
    pointsElement.style.display = "none";
    imageElement.style.display = "none"; // Hide the div when there are no bonus points
  }
}


// reikia prideti zinute ,niekas neatsake ,kitas klausimas po 3 sek
// vietoi kluasimo zinute,parodomas atsakumas atsakymas buvo blalal
// atsakymo input stop
//Atsakymas
const userData = {
  name: "",
  level: "",
  points: ""
}

const populateUserData = () => {
  const userDataElement = document.getElementById("user-data")
  userData.name = userDataElement.dataset.name
  userData.level = userDataElement.dataset.level
  userData.points = userDataElement.dataset.points
}

populateUserData()

window.onload = function () {
  const answerForm = document.getElementById("answer-form")
  if (answerForm) {
    answerForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const answerInput = document.getElementById("answer-input")
      if (answerInput) {
        const userAnswer = answerInput.value
        handleUserAnswer(userAnswer)
        answerInput.value = ""
      }
    })
  }

  const answerInput = document.getElementById("answer-input")
  if (answerInput) {
    answerInput.focus()
  }
}

const handleUserAnswer = async (userAnswer) => {
  const data = await fetchData()
  if (!data || !data.data || !data.data.answer) {
    console.error("Answer not found in data object")
    return
  }
  const correctAnswer = data.data.answer.toLowerCase()
  const userAnswerLower = userAnswer.toLowerCase()

  const isAnswerCorrect = checkLettersAndCompare(userAnswerLower, correctAnswer)

  if (isAnswerCorrect) {
    const litaPoints = parseInt(data.data.lita, 10) + parseInt(data.data.bonusLita, 10)
    userData.points = litaPoints.toString()
    const successMsg = `<span class="corect-answer-answered-user">${userData.name}</span> atsakė teisingai: <span class="corect-answer-answered">${userAnswer}</span>  <br> ir uždirba ${litaPoints} litų` // tvarkyti kintamaji litas lita litu
    document.getElementById("answer-msg").innerHTML = successMsg

    playGame() // atsakius teisingai paleidziama funkcija

    // const url = "http://***REMOVED***:4004/a_points.js"
    const url = "http://localhost:4004/a_points.js"
    const body = JSON.stringify({
      user_id_name: userData.name,
      points: litaPoints
    })

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });
    
    console.log("Response status:", response.status);
    
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("JSON Response:", jsonResponse);
    
      const { user_id_name, points } = jsonResponse;
      console.log(`User points updated successfully ${points}`);
      console.log("user_id_name: " + user_id_name);
      console.log("points: " + points);
    
      // oldQuestionData()
      setTimeout(() => {
        location.reload();
      }, 5000); // Perkrauna page po 5 sekundziu
    } else {
      console.error("Failed to update user pointss");
      const errorText = await response.text(); // Log the error response text
      console.error("Error response:", errorText);
    }

  } else if (!userAnswerLower.length === 0) {
    setTimeout(oldQuestionData, 3000)
  } else if (userAnswerLower.length < 1) {
    const answerInput = document.getElementById("answer-input")
    answerInput.disabled = true
    const MsgNoAnswer = `Atsakymas negali būti tuščias.`
    document.getElementById("answer-msg").textContent = MsgNoAnswer
    setTimeout(() => {
      answerInput.disabled = false
    }, 2500) // Disable answerInput for 2.5 seconds
    setTimeout(() => {
      location.reload()
    }, 1000) // Reload after 2 seconds
  } else {
    const answerInputBad = document.getElementById("answer-input")
    answerInputBad.disabled = true
    const errorMsg = `Atsakymas "${userAnswer}" yra neteisingas. Bandykite dar kartą.`
    document.getElementById("answer-msg").textContent = errorMsg
    setTimeout(() => {
      answerInputBad.disabled = false
    }, 3000) // Disable answerInput for 2.5 seconds

    setTimeout(() => {
      location.reload()
    }, 3000) // Reload after 2 seconds
  }

  document.getElementById("answer-input").value = ""
}

function checkLettersAndCompare(str1, str2) {
  const letterMap = {
    ą: "a",
    č: "c",
    ę: "e",
    ė: "e",
    į: "i",
    š: "s",
    ų: "u",
    ū: "u",
    ž: "z"
  }
  const cleanStr1 = str1.replace(/[ąčęėįšųūž]/gi, (match) => letterMap[match.toLowerCase()])
  const cleanStr2 = str2.replace(/[ąčęėįšųūž]/gi, (match) => letterMap[match.toLowerCase()])

  return cleanStr1.toLowerCase() === cleanStr2.toLowerCase()
}

//
//
// Games section
const widths = 520
const heights = 420
const lefts = null
const tops = null
const screenX = window.screenX != undefined ? window.screenX : window.screenLeft
const screenY = window.screenY != undefined ? window.screenY : window.screenTop
// let lastGameTime = 0;  Berods nereikalinga 2023 05 11 // Variable to store the time of the last game played
const GAME_A = 4
const GAME_B = 9
const GAME_C = 14

function randomGame() {
  return Math.floor(Math.random() * 20) //Tikimybe laimeti papildoma GAME 20  tarp 0-19 Games [4.9.14]
}

function playGame() {
  const gameNo = randomGame() // 4 9 14
  console.log("randomGame generates: " + gameNo) //

  if (gameNo === GAME_A || gameNo === GAME_B || gameNo === GAME_C) {
    const currentTime = Date.now()
    const lastGameTime = localStorage.getItem("lastGameTime")

    if (lastGameTime) {
      const timeSinceLastGame = (currentTime - lastGameTime) / 1000
      if (timeSinceLastGame < 300) {
        //kolkas 10 bus 300
        console.log(`Game ${gameNo} cannot be played for another ${300 - timeSinceLastGame} seconds.`) //kolkas 10 bus 300
        return
      }
    }

    localStorage.setItem("lastGameTime", currentTime)
  }

  if (gameNo === GAME_A) {
    const gameWindow1 = window.open(`Games/game1.php?name=${userData.name}`, "_blank", `width=${widths},height=${heights},left=${lefts},top=${tops}`)
  } else if (gameNo === GAME_B) {
    const gameWindow2 = window.open(`Games/game2.php?name=${userData.name}`, "_blank", `width=${widths},height=${heights},left=${lefts},top=${tops}`)
  } else if (gameNo === GAME_C) {
    const gameWindow3 = window.open(`Games/game3.php?name=${userData.name}`," _blank", `width=600, height=600, left=${lefts},top=${tops},screenX=${screenX + (window.innerWidth - widths) / 2},screenY=${screenY + (window.innerHeight - heights) / 2}`)
  }
}

//
//
//
//Funkcija paspaudus <today-top-btn>>> paiima is a_top_players.php koda ir atvaizduoja snd top 10
// Check if there is a stored state for the list
if (sessionStorage.getItem("listState") === "open") {
  // Load the list using AJAX
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "a_top_players.php?get_top_players=true", true)
  xhr.onload = function () {
    if (xhr.status === 200) {
      var todayTop = document.querySelector(".today-top")
      var list = document.createElement("ol")
      list.className = "today-top-list"
      list.innerHTML = xhr.responseText
      todayTop.appendChild(list)
    } else {
      console.log("Request failed. Returned status of " + xhr.status)
    }
  }
  xhr.send()
}

// Add click event listener to the button
document.getElementById("today-top-btn").addEventListener("click", function () {
  var todayTop = document.querySelector(".today-top")
  var list = todayTop.querySelector(".today-top-list")

  if (list) {
    // If list exists, remove it and store state as closed
    todayTop.removeChild(list)
    sessionStorage.setItem("listState", "closed")
  } else {
    // If list doesn't exist, load it using AJAX and store state as open
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "a_top_players.php?get_top_players=true", true)
    xhr.onload = function () {
      if (xhr.status === 200) {
        var list = document.createElement("ol")
        list.className = "today-top-list"
        list.innerHTML = xhr.responseText
        todayTop.appendChild(list)
        sessionStorage.setItem("listState", "open")
      } else {
        console.log("Request failed. Returned status of " + xhr.status)
      }
    }
    xhr.send()
  }
})

function redirectToLogin() {
  window.location.href = "d_regilogi.php"
}


// // Hide Welcome word Labas and exclamation after 5min
  setTimeout(function() {
    let greeting = document.getElementById('temp-greeting')
    let exclamation = document.getElementById('temp-exclamation')
    if (greeting) {
      greeting.style.display = 'none'
      exclamation.style.display = 'none'
    }
  }, 5000) // 300000 milliseconds = 5 minutes  // Kolkas palieku, kai bus sutvarkyta kad puslapis nebepersikrautu pats , bus ok.
