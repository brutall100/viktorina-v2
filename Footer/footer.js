function updateClock() {
  var now = new Date()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var clockElement = document.getElementById('clock')
  clockElement.innerText = hours.toLocaleString('en-US', {minimumIntegerDigits: 2}) + ':' + minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})
}
updateClock()

setInterval(updateClock, 1000)



document.getElementById("viktorina-link").addEventListener("click", function(event) {
  event.preventDefault();
  var url = this.getAttribute("href");
  var windowFeatures = "width=800,height=600"; // Adjust the dimensions as needed
  window.open(url, "_blank", windowFeatures);
});

