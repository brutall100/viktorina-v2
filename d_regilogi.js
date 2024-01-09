const signUpButton = document.getElementById("signUp")
const signInButton = document.getElementById("signIn")
let container = document.getElementById("container")

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active")
})

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active")
})

// Add event listener to form's submit button
document.getElementById("register-form").addEventListener("submit", validateForm)

function validateForm(event) {
  event.preventDefault()

  const nameInput = document.getElementById("name-input")
  const emailInput = document.getElementById("user-email")
  const passwordInput = document.getElementById("password-input")

  const nameError = document.getElementById("name-error")
  const emailError = document.getElementById("email-error")
  const passwordError = document.getElementById("password-error")

  if (!nameInput.value) {
    nameError.textContent = "Vardas būtinas"
  } else {
    nameError.textContent = ""
  }

  if (!emailInput.value) {
    emailError.textContent = "El. paštas būtinas"
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
    emailError.textContent = "Neteisingas email"
  } else {
    emailError.textContent = ""
  }

  if (!passwordInput.value) {
    passwordError.textContent = "Slaptažodis būtinas"
  } else {
    passwordError.textContent = ""
  }

  if (nameInput.value && emailInput.value && passwordInput.value) {
    event.target.submit()
  }
}

//// Toggle visibility on selection, then want add your GENDER
document.getElementById("gender-select").addEventListener("change", function () {
  if (this.value === "Other") {
    document.getElementById("other-gender-container").style.display = "block"
  } else {
    document.getElementById("other-gender-container").style.display = "none"
  }
})

//// JavaScript to show the modal
const forgotPasswordLink = document.querySelector(".forgot-password")
const modal = document.getElementById("forgotPasswordModal")
const closeModalButton = modal.querySelector("#close-modal")

forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault()
  modal.style.display = "block"
})

closeModalButton.addEventListener("click", function () {
  modal.style.display = "none"
})

//// Function that changes Heading and paragraph every month
const monthlyHeadings = [
  "Sausio Sniego Sąmyšis 🌨️⛄😄",
  "February Heading",
  "March Heading",
  "April Heading",
  "May Heading",
  "June Heading",
  "July Heading",
  "August Heading",
  "September Heading",
  "October Heading",
  "November Heading",
  "December Heading"
]

const monthlyParagraphs = [
  "Sausis atnešė tiek daug sniego ❄️ ir šalčio 🥶 ,kad net pamiršote slaptažodį 🔒",
  "February Paragraph",
  "March Paragraph",
  "April Paragraph",
  "May Paragraph",
  "June Paragraph",
  "July Paragraph",
  "August Paragraph",
  "September Paragraph",
  "October Paragraph",
  "November Paragraph",
  "December Paragraph"
]

const currentMonth = new Date().getMonth()

document.getElementById("monthlyHeading").textContent = monthlyHeadings[currentMonth]
document.getElementById("monthlyParagraph").textContent = monthlyParagraphs[currentMonth]
