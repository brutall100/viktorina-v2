function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var clockElement = document.getElementById('clock');
  clockElement.innerText = hours.toLocaleString('en-US', {minimumIntegerDigits: 2}) + ':' + minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
}
setInterval(updateClock, 1000);



