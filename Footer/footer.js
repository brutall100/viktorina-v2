function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var clockElement = document.getElementById('clock');
  clockElement.innerText = hours.toLocaleString('en-US', {minimumIntegerDigits: 2}) + ':' + minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
}
setInterval(updateClock, 1000);



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("rules");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  modal.style.zIndex = "100"; // Use camelCase notation
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
