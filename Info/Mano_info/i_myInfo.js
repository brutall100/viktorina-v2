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

// ! Jei . Galimai bus labai skirtingi div, tai gal kiekvienam div duoti atskira klase .. content-response-div-a-version/name-version..

////  Globali funkcija tikriinanti ar neina 3 vienodos raides is eiles
function hasConsecutiveLetters(input) {
    for (let i = 0; i < input.length - 2; i++) {
      if (input[i] === input[i + 1] && input[i + 1] === input[i + 2]) {
        return true;
      }
    }
    return false;
  }
  
  //// Function to display an error message
  function displayErrorMessage(message) {
    const errorMsgElement = document.getElementById('error-msg');
    if (errorMsgElement) {
      errorMsgElement.textContent = message;
    }
  }
  
  nameButton.addEventListener('click', function () {
    console.log('Name button clicked');
  
    contentDiv.innerHTML = `
          <h1>Vardo Keitimas</h1>
          <div class="content-response-div">
              <p class="pargraph_1">Lorem ipsium A</p>
              <p class="pargraph_2">Lorem ipsium B</p>
              <input type="text" id="inputFieldChange" placeholder="Type new name">
              <button class="change-btn">Keisti vardą</button>
              <h3 id='error-msg'></h3>
          </div>
      `;
  
    const inputField = document.getElementById('inputFieldChange');
    const errorMsgElement = document.getElementById('error-msg');
  
    // Check if the input field exists
    if (inputField && errorMsgElement) {
      // Handle input validation on button click
      document.querySelector('.change-btn').addEventListener('click', function () {
        const inputValue = inputField.value;
  
        // Check if the input has consecutive identical letters
        if (hasConsecutiveLetters(inputValue)) {
          displayErrorMessage('Input contains three consecutive identical letters. Please correct.');
        } else {
          displayErrorMessage(''); // Clear any existing error message
          // Continue with your logic here...
        }
      });
    } else {
      console.error("Input field or error message element not found. Make sure the elements with IDs 'inputFieldChange' and 'error-msg' exist.");
    }
  });
  



genderButton.addEventListener("click", function () {
  console.log("Gender button clicked")

  contentDiv.innerHTML = `
        <h1>Lyties Keitimas</h1>
        <div class="content-response-div">
            <p class="pargraph_1">Jei pasikeitė Jūsų lytis?</p>
            <p class="pargraph_2">Irašykite savo naujają lytį</p>
            <input type="text" id="inputFieldChange" placeholder="Jūsų naujoji lytis">
            <button class="change-btn">Lytis C</button>
        </div>
    `
})

emailButton.addEventListener("click", function () {
  console.log("Email button clicked")

  contentDiv.innerHTML = `
        <h1>Email Keitimas</h1>
        <div class="content-response-div">
            <p class="pargraph_1">email A</p>
            <p class="pargraph_2">email B</p>
            <button class="change-btn">email C</button>
        </div>
    `
})

levelButton.addEventListener("click", function () {
  console.log("Level button clicked")

  contentDiv.innerHTML = `
        <h1>Lygio Keitimas</h1>
        <div class="content-response-div">
            <p class="pargraph_1">Lygis A</p>
            <p class="pargraph_2">LygisB</p>
            <button class="change-btn">Lygis C</button>
        </div>
    `
})

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

// !nameButton.addEventListener("click", () => {
//   updateContent("Keisti vardą", "Additional name info")
//   createNewButton("New Name Button", () => {
//     const newName = prompt(`Enter new name: ${userName}`)
//     if (newName !== null) {
//       const data = {
//         newName: newName,
//         userName: userName,
//         userId: userId,
//         userLitai: userLitai
//       }
//       const url = `${serverConfig.serverAddress}:${serverConfig.ports.port6}/updateName`
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           alert(data.message)
//         })
//         .catch((error) => {
//           console.error("Error updating name:", error)
//         })
//     }
//   })
// })

// nameButton.addEventListener("click", () => {
//   updateContent("Keisti varda", "Additional name info")
//   createNewButton("New name Button", () => {
//     alert(`New name Button clicked! ${userName}`)
//   })
// })

// genderButton.addEventListener("click", () => {
//   updateContent("Keisti lytį", "Additional gender info")
//   createNewButton("New Gender Button", () => {
//     alert(`New Gender Button clicked! ${userName}`)
//   })
// })

// emailButton.addEventListener("click", () => {
//   updateContent("Keisti el. paštą", "Additional email info")
//   createNewButton("New Email Button", () => {
//     alert(`New Email Button clicked! ${userName}`)
//   })
// })

// levelButton.addEventListener("click", () => {
//   updateContent("Keisti lygį", "Additional level info")
//   createNewButton("New Level Button", () => {
//     alert(`New Level Button clicked! ${userName}`)
//   })
// })
