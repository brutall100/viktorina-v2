// Get the modal
var modal = document.getElementById("modal");

// Get the image that opens the modal
var img = document.getElementById("info-icon");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user hovers over the image, display the modal
img.onmouseover = function() {
  modal.style.display = "block";
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
