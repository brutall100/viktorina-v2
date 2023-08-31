let data
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/data")
    return response.data
  } catch (error) {
    console.error(error)
  }
}
;(async function () {
  data = await fetchData()
  // console.log('Data:', data);
  // console.log('Question:', data.data.question);
  // console.log('ID:', data.data.id);
  // console.log('Answer:', data.data.answer);
  // console.log('Litan:', data.data.lita);
  // console.log('Bonus:', data.data.bonusLita);
  // const dataContainer = document.getElementById("dataContainer")
  // dataContainer.innerHTML = JSON.stringify(data)
  displayQuestion(data)
  generateAndDisplayRandomPoint(data.data.lita)
  generateBonusPoints(data.data.bonusLita)
  // lita = data.data.lita
  // const litaContainer = document.getElementById("lita")
  // litaContainer.innerHTML = lita
  // const bonusLitaContainer = document.getElementById("lita-bonus")
  // bonusLitaContainer.innerHTML = data.data.bonusLita
})()

//
//
function checkServerData() {
  axios
    .get("http://localhost:3000/data")
    .then((response) => {
      const serverData = response.data.data
      const serverId = serverData.id
      const clientId = data.data.id
      if (serverId === clientId) {
        // console.log('Serverio id matches client id.');
        // Do something
      } else {
        console.log("Serverio id does not match client id. Reloading in 1 seconds...")
        setTimeout(() => {
          location.reload()
        }, 5000) // 5 sekundes kolkas paskui 10milsec
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
setInterval(checkServerData, 1000) // call the function every 1 seconds

//
//
// a_index.js

function fetchNewestOldQuestionData() {
  axios
    .get("http://localhost:3000/old-data")
    .then((response) => {
      const oldData = response.data.oldData;

      const newDataDiv = document.getElementById("old-question"); // Replace with your div's ID

      if (oldData && oldData.length > 0) {
        let newDataHTML = "<ul>";
        oldData.slice(0, 10).forEach((item) => {
          newDataHTML += ` <li>${item.old_id} Question: ${item.old_question} , Answer: ${item.old_answer}</li>`;
        });
        newDataHTML += "</ul>";
        newDataDiv.innerHTML = newDataHTML;
      } else {
        newDataDiv.innerHTML = "<p>No new data available.</p>";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

setTimeout(fetchNewestOldQuestionData, 1000)

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
  litoVerte = ""
  imageSrc = ""
  const litaiImg = document.getElementById("litai-img")
  if (lita === 1) {
    litoVerte = "Litas"
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/1Lt.png"
  } else if (lita === 2) {
    litoVerte = "Litai"
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/1Lt.png"
    displayImage(imageSrc, litaiImg, "on-off-litai1")
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/1Lt.png"
  } else if (lita === 3) {
    litoVerte = "Litai"
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/1Lt.png"
    displayImage(imageSrc, litaiImg, "on-off-litai")
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/2Lt.png"
  } else if (lita === 4) {
    litoVerte = "Litai"
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/2Lt.png"
    displayImage(imageSrc, litaiImg, "on-off-litai")
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/2Lt.png"
  } else if (lita === 5) {
    litoVerte = "Litai"
    imageSrc = "http://localhost/Viktorina.live/images/ImgLitai/5Lt.png"
  } else {
    litoVerte = ""
    imageSrc = ""
  }

  displayImage(imageSrc, litaiImg, "new-class1")
  document.getElementById("points").innerHTML = `Verte: ${lita} ${litoVerte}&nbsp;  `
}

const displayImage = (src, parent, className) => {
  const imageElement = document.createElement("img")
  imageElement.src = src
  imageElement.alt = `${lita} Litai`
  imageElement.classList.add(className)
  parent.appendChild(imageElement)
}

//  BONUS-LITAI
function generateBonusPoints(bonusLita) {
  const pointsElement = document.getElementById("bonus-points")
  const imageElement = document.getElementById("litai-img-bonus")
  if (bonusLita > 0) {
    pointsElement.innerText = ` + Bonus: ${bonusLita}`
    let images = ""
    if (bonusLita === 10 || bonusLita === 20 || bonusLita === 50) {
      images += `<img src="http://localhost/Viktorina.live/images/ImgLitai/${bonusLita}Lt.png" alt="${bonusLita} Litų">`
    } else if (bonusLita === 30) {
      {
        images += `<img src="http://localhost/Viktorina.live/images/ImgLitai/10Lt.png" alt="Dešimt litų">`
        images += `<img src="http://localhost/Viktorina.live/images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`
      }
    } else if (bonusLita === 40) {
      for (let i = 0; i < 2; i++) {
        images += `<img src="http://localhost/Viktorina.live/images/ImgLitai/20Lt.png" alt="Dvidešimt litų">`
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

    const url = "http://localhost:8000/a_points.js"
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
    })

    if (response.ok) {
      const { user_id_name, points } = await response.json()
      console.log(`User points updated successfully ${points}`)
      console.log("user_id_name: " + user_id_name)
      console.log("points: " + points)
      // oldQuestionData()
      setTimeout(() => {
        location.reload()
      }, 5000) // Perkrauna page po 5 sekundziu
    } else {
      console.error("Failed to update user points")
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
    const gameWindow1 = window.open(`http://localhost/Viktorina.live/Games/game1.php?name=${userData.name}`, "_blank", `width=${widths},height=${heights},left=${lefts},top=${tops}`)
  } else if (gameNo === GAME_B) {
    const gameWindow2 = window.open(`http://localhost/Viktorina.live/Games/game2.php?name=${userData.name}`, "_blank", `width=${widths},height=${heights},left=${lefts},top=${tops}`)
  } else if (gameNo === GAME_C) {
    const gameWindow3 = window.open(
      `http://localhost/Viktorina.live/Games/game3.php?name=${userData.name}`,
      "_blank",
      `width=600, height=600, left=${lefts},top=${tops},screenX=${screenX + (window.innerWidth - widths) / 2},screenY=${screenY + (window.innerHeight - heights) / 2}`
    )
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
  window.location.href = "http://localhost/Viktorina.live/d_regilogi.php"
}
