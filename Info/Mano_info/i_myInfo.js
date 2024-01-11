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


nameButton.addEventListener("click", function () {
  console.log("Name button clicked")
  
  contentDiv.innerHTML = `
        <h1>Updated Keitimo info</h1>
        <div class="content-response-div">
            <p class="pargraph_1">VARDAS A</p>
            <p class="pargraph_2">VARDAS B</p>
            <button class="change-btn">VARDAS C</button>
        </div>
    `;
})

genderButton.addEventListener("click", function () {
  console.log("Gender button clicked")
  
  contentDiv.innerHTML = `
        <h1>Updated Keitimo info</h1>
        <div class="content-response-div">
            <p class="pargraph_1">Lytis A</p>
            <p class="pargraph_2">Lytis B</p>
            <button class="change-btn">Lytis C</button>
        </div>
    `;
})

emailButton.addEventListener("click", function () {
  console.log("Email button clicked")
  
  contentDiv.innerHTML = `
        <h1>Updated Keitimo info</h1>
        <div class="content-response-div">
            <p class="pargraph_1">email A</p>
            <p class="pargraph_2">email B</p>
            <button class="change-btn">email C</button>
        </div>
    `;
})

levelButton.addEventListener("click", function () {
  console.log("Level button clicked")
  
  contentDiv.innerHTML = `
        <h1>Updated Keitimo info</h1>
        <div class="content-response-div">
            <p class="pargraph_1">Lygis A</p>
            <p class="pargraph_2">LygisB</p>
            <button class="change-btn">Lygis C</button>
        </div>
    `;
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
