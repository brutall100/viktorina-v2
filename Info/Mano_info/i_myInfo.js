const nameButton = document.getElementById("name-button")
const genderButton = document.getElementById("gender-button")
const emailButton = document.getElementById("email-button")
const levelButton = document.getElementById("level-button")

const contentDiv = document.getElementById("updateDiv")
const paragraph1Elements = contentDiv.getElementsByClassName("paragraph_1")
const paragraph2Elements = contentDiv.getElementsByClassName("paragraph_2")
const changeButton = contentDiv.querySelector(".change-btn")

//// Variables defined in the <script> tag in HTML
console.log(userName)
console.log(userId)
console.log(userLitai)
console.log(userGender)
console.log(userEmail)
console.log(userLevel)

////  Globali funkcija tikrina ar neina 3 vienodoi simboliai is eiles
function hasConsecutiveLetters(input) {
  for (let i = 0; i < input.length - 2; i++) {
    if (input[i] === input[i + 1] && input[i + 1] === input[i + 2]) {
      return true
    }
  }
  return false
}

//// Globali funkcija tikrina vardo ilgi MAX 21
function isNameLengthValid(name) {
  return name.length <= 21
}

//// Function to display an error message
function displayErrorMessage(message) {
  const errorMsgElement = document.getElementById("error-msg");

  if (errorMsgElement) {
    errorMsgElement.textContent = message;

    if (message) {
      errorMsgElement.style.display = "block";
    } else {
      errorMsgElement.style.display = "none";
    }
  }
}

//// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

//// Global function for updating user information on the server
function updateOnServer(newData, endpoint) {
  const url = `http://localhost:4006/${endpoint}`

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newData)
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message)
    })
    .catch((error) => {
      console.error(`Error updating user information (${endpoint}):`, error)
    })
}

// ? BTN NAME
nameButton.addEventListener("click", function () {
  console.log("Name button clicked")

  contentDiv.innerHTML = `
        <h1>Vardo Keitimas</h1>
        <div class="content-response-div">
            <p class="pargraph_1">Lorem ipsium A</p>
            <p class="pargraph_2">Lorem ipsium B</p>
            <input type="text" id="inputFieldChange" placeholder="Type new name">
            <button class="change-btn">Keisti vardą</button>
            <h3 id='error-msg'></h3>
        </div>
    `

  const inputField = document.getElementById("inputFieldChange")
  const errorMsgElement = document.getElementById("error-msg")

  document.querySelector(".change-btn").addEventListener("click", function () {
    const inputValue = inputField.value

    if (hasConsecutiveLetters(inputValue)) {
      displayErrorMessage("😬 Oops! Trys vienodi simboliai iš eilės. Nepraeis! 🚫✏️")
    } else if (!isNameLengthValid(inputValue)) {
      displayErrorMessage("🤔 Vardo ilgis viršija 21 simbolį. Trumpinam! 📏✏️")
    } else {
      displayErrorMessage("") 
      const newDataForName = {
        newName: inputValue,
        userName: userName,
        userId: userId,
        userLitai: userLitai
      }
      updateOnServer(newDataForName, "updateName")
    }
  })
})

// ? BTN GENDER
genderButton.addEventListener("click", function () {
  console.log("Gender button clicked")

  contentDiv.innerHTML = `
    <h1>Lyties Keitimas</h1>
    <div class="content-response-div">
        <p class="pargraph_1">Jei pasikeitė Jūsų lytis?</p>
        <p class="pargraph_2">Irašykite savo naujają lytį</p>
        <input type="text" id="inputFieldChange" placeholder="Jūsų naujoji lytis">
        <button class="change-btn">Lyties keitimas</button>
        <h3 id='error-msg'></h3>
    </div>
  `

  const inputField = document.getElementById("inputFieldChange")
  const errorMsgElement = document.getElementById("error-msg")

  document.querySelector(".change-btn").addEventListener("click", function () {
    const newGenderValue = inputField.value

    if (hasConsecutiveLetters(newGenderValue)) {
      displayErrorMessage("😬 Oops! Trys vienodi simboliai iš eilės. Nepraeis! 🚫✏️")
    } else if (!isNameLengthValid(newGenderValue)) {
      displayErrorMessage("🤔 Tokia lytis neegzistuoja. Viršija 21 simbolį. Trumpinam! 📏✏️")
    } else {
      displayErrorMessage("")
      const newDataForGender = {
        userName: userName,
        userId: userId,
        userLitai: userLitai,
        userGender: newGenderValue
      }
      updateOnServer(newDataForGender, "updateGender")
    }
  })
})

// ? BTN Email
emailButton.addEventListener("click", function () {
  console.log("Email button clicked")

  contentDiv.innerHTML = `
    <h1>Email Keitimas</h1>
    <div class="content-response-div">
      <p class="pargraph_1">email A</p>
      <p class="pargraph_2">email B</p>
      <input type="text" id="inputFieldChange" placeholder="Type new email">
      <button class="change-btn">Keisti el. paštą</button>
      <h3 id='error-msg'></h3>
    </div>
  `

  const inputField = document.getElementById("inputFieldChange")
  const errorMsgElement = document.getElementById("error-msg")

  document.querySelector(".change-btn").addEventListener("click", function () {
    const newEmailValue = inputField.value

    if (isValidEmail(newEmailValue)) {
      displayErrorMessage("")

      const newDataForEmail = {
        userName: userName,
        userId: userId,
        userLitai: userLitai,
        userEmail: newEmailValue
      }
      updateOnServer(newDataForEmail, "updateEmail")
    } else {
      displayErrorMessage("Netinkams formatas. Būtinai įveskite savo tikrajį el. paštą")
    }
  })
})

// ? BTN Level
const userExistingLevel = userLevel;

function getUserLevelClass(buttonLevel, userLevel) {
  return userLevel >= buttonLevel ? "user-level" : "";
}

levelButton.addEventListener("click", function () {
  console.log("Level button clicked");

  if (userExistingLevel >= 5) {
    contentDiv.innerHTML = `
      <h1>Lygio Keitimas</h1>
      <div class="content-response-div">
        <p class="expert-lvl">Sveikiname! Jūs jau pasiekėte maksimalų lygį <span class="level-number">Ekspertas (Lygis 5)</span>! 💃🕺🎉</p>
      </div>
    `;
  } else {
    contentDiv.innerHTML = `
      <h1>Lygio Keitimas</h1>
      <div class="content-response-div">
        <button class="level-button ${getUserLevelClass(5, userExistingLevel)}" data-level="5" ${userExistingLevel >= 5 ? "disabled" : ""}><span class="emoji">🏅</span> Lygis 5 - 999 999 <span class="label">[Ekspertas]</span></button>
        <button class="level-button ${getUserLevelClass(4, userExistingLevel)}" data-level="4" ${userExistingLevel >= 4 ? "disabled" : ""}><span class="emoji">👊</span> Lygis 4 - 500 000 <span class="label">[Patyręs]</span></button>
        <button class="level-button ${getUserLevelClass(3, userExistingLevel)}" data-level="3" ${userExistingLevel >= 3 ? "disabled" : ""}><span class="emoji">❤️‍🔥</span> Lygis 3 - 300 000 <span class="label">[Vidutiniokas]</span></button>
        <button class="level-button ${getUserLevelClass(2, userExistingLevel)}" data-level="2" ${userExistingLevel >= 2 ? "disabled" : ""}><span class="emoji">👏</span> Lygis 2 - 200 000 <span class="label">[Pradedantysis]</span></button>
        <button class="level-button ${getUserLevelClass(1, userExistingLevel)}" data-level="1" ${userExistingLevel >= 1 ? "disabled" : ""}><span class="emoji">👌</span> Lygis 1 - 100 000 <span class="label">[Naujokas]</span></button>
        <h3 id='error-msg'></h3>
      </div>
    `;

    const levelButtons = document.querySelectorAll(".level-button");
    const errorMsgElement = document.getElementById("error-msg");

    levelButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const level = this.dataset.level;
        console.log(`Button clicked for level ${level}`);

        if (parseInt(level) <= parseInt(userExistingLevel) + 1) {
          const newDataForLevel = {
            userId: userId,
            userLitai: userLitai,
            newLevel: level
          };

          try {
            await updateOnServer(newDataForLevel, "updateLevel");
            displayErrorMessage("");
          } catch (error) {
            displayErrorMessage(error.message);
          }
        } else {
          displayErrorMessage("📛 Negalima peršokti lygio. Galima tik pasikelti 1 lygiu. 🆙");
        }
      });
    });
  }
});



// Vardo, levelio, lyties, ketimas turetu buti mokamas. LITAIS
//  Tvarkyti paragrapha

// Vartotojo vardai negali turėti keturių iš eilės vienodų simbolių.
// Pavyzdys: "VVVVardas" yra nepriimtinas dėl keturių iš eilės 'V' simbolių.

// Vartotojo vardai negali viršyti 15 simbolių ilgio.
// Pavyzdys: "aaaaaaaaaaaaaaaaaaaaaaaaa" per ilgas.

// Vartotojo vardai neturi turėti draudžiamų žodžių.
// Pavyzdys: "Vardas blet" turi draudžiamą žodį "blet".

// Vartotojo vardai turi būti unikalūs, ir vardo, kuris jau egzistuoja, negalima naudoti.
// Pavyzdys: "Vardas" yra nepriimtinas, nes vartotojas su tokiu vardu jau egzistuoja.

// Vartotojo vardo keitimas kainuoja 10 000 litų. Jums turi būti pakankamai litų sąskaitoje norint tęsti.

// Kai pateikiate tinkamą vartotojo vardą ir jis sėkmingai atnaujinamas, gausite patvirtinimo pranešimą.

// Pavyzdys: "Aldas" buvo sėkmingai atnaujintas į "Aldas."
