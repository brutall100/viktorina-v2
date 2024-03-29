//// Function update_main_vote.php container A witg AJAX
$(document).ready(function () {
  function updateVotes() {
    $.ajax({
      url: "update_main_vote.php",
      method: "GET",
      success: function (response) {
        var voteSection = $("#view-main-vote");
        voteSection.empty(); // Clear existing content
        var data = JSON.parse(response);
        if (data.length > 0) {
          data.forEach(function(item) {
            var html = `<div class="voter-entry">
                          <p class="voter-entry-p">Balsavimas: ${item.suggestion}</p>
                          <div class="voter-entry-buttons">
                            <button class="vote-button" data-id="${item.id}" data-vote="yes">Pritariu</button>
                            <button class="vote-button" data-id="${item.id}" data-vote="no">Nepritariu</button>
                          </div>
                        </div>
                        <div class="vote-bars" id="vote-bars-${item.id}">
                          <div class="yes-bar"></div>
                          <div class="no-bar"></div>
                        </div>`;
            voteSection.append(html);
          });
        } else {
          voteSection.html('<p>No votes found.</p>');
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      }
    });
  }

  updateVotes();
  setInterval(updateVotes, 50000);
});





//// Function update_vote.php container C witg AJAX
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
  setInterval(updateVotes, 50000)
})

//// ToolTip
document.addEventListener("DOMContentLoaded", function () {
  const labelBlocks = document.querySelectorAll(".form-block")

  labelBlocks.forEach(function (labelBlock) {
    const label = labelBlock.querySelector("label")
    const tooltipText = labelBlock.getAttribute("data-tooltip")

    label.addEventListener("mouseenter", function () {
      showTooltip(label, tooltipText)
    })

    label.addEventListener("mouseleave", function () {
      hideTooltip()
    })
  })

  function showTooltip(label, text) {
    const tooltip = document.createElement("div")
    tooltip.classList.add("tooltip")
    tooltip.innerHTML = text
    document.body.appendChild(tooltip)

    const labelRect = label.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    tooltip.style.top = labelRect.top - tooltipRect.height - 10 + "px"
    tooltip.style.left = labelRect.left + (labelRect.width - tooltipRect.width) / 2 + "px"
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip")
    if (tooltip) {
      tooltip.parentNode.removeChild(tooltip)
    }
  }
})
