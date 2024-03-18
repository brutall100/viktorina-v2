//// Modal
const modal = document.getElementById("modal")
const img = document.getElementById("info-icon")
let timeoutId

function positionModal() {
  const iconRect = img.getBoundingClientRect()
  modal.style.top = iconRect.top + window.pageYOffset + 20 + "px"
  modal.style.left = iconRect.left + window.pageXOffset - 50 + "px"
}

img.onmouseover = modal.onmouseover = function () {
  positionModal()
  modal.style.display = "block"
  clearTimeout(timeoutId)
}

img.onmouseout = modal.onmouseout = function () {
  timeoutId = setTimeout(function () {
    modal.style.display = "none"
  }, 4000)
}

window.addEventListener("resize", function () {
  positionModal()
})

//// Function to update container B with AJAX
$(document).ready(function () {
  function updateContainerB() {
    $.ajax({
      url: "update_container_b.php", // PHP file to retrieve content of container B
      method: "GET",
      success: function (response) {
        $("#container-b").html(response) // Update content of container B
      },
      error: function (xhr, status, error) {
        console.error("Error:", error)
      }
    })
  }

  updateContainerB()

  setInterval(updateContainerB, 5000)
})
