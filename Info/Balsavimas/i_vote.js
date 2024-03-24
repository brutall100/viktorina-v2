//// Function vote container C witg AJAX
$(document).ready(function () {
    function updateVotes() {
      $.ajax({
        url: "update_vote.php", 
        method: "GET",
        success: function (response) {
          $("#view-it").html(response) 
        },
        error: function (xhr, status, error) {
          console.error("Error:", error)
        }
      })
    }
  
    updateVotes()
  // laikas 5sec = 5000
    setInterval(updateVotes, 500000)
  })


