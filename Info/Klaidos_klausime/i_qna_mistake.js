const modal = document.getElementById("modal");
const img = document.getElementById("info-icon");
let timeoutId;

img.onmouseover = modal.onmouseover = function() {
  modal.style.display = "block";
  clearTimeout(timeoutId); 
}

img.onmouseout = modal.onmouseout = function() {
  timeoutId = setTimeout(function() {
    modal.style.display = "none";
  }, 4000); 
}

