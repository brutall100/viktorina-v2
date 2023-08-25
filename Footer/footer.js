//          Clock
function updateClock() {
  var now = new Date()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var clockElement = document.getElementById("clock")
  clockElement.innerText = hours.toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":" + minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })
}
updateClock()
setInterval(updateClock, 1000)

//        Year in the middle
const currentYear = new Date().getFullYear()
const yearSpan = document.getElementById("current-year")
yearSpan.textContent = currentYear

//         Modal/Dialog
const viktorinaLink = document.getElementById("viktorina-link")
const viktorinaDialog = document.getElementById("viktorina-dialog")
const closeDialogButton = document.getElementById("close-dialog")

viktorinaLink.addEventListener("click", () => {
  viktorinaDialog.showModal()
})

closeDialogButton.addEventListener("click", () => {
  viktorinaDialog.close()
})
