//// Function update_main_vote.php container A witg AJAX
$(document).ready(function () {
  function updateVotes() {
    $.ajax({
      url: "update_main_vote.php",
      method: "GET",
      success: function (json_response) {
        console.log(json_response);
        var voteSection = $("#view-main-vote");
        voteSection.empty(); 
        var data = JSON.parse(json_response);
        if (data.votes.length > 0) {
          data.votes.forEach(function(item) {
            var html = `<div class="voter-entry">
                          <h1 class="voter-entry-title">Balsavimas: ${item.suggestion}</h1>
                          <h3 class="voter-entry-name">Balsavimo autorius: ${item.usname}</h3>
                          <div class="voter-entry-buttons">
                            <button class="vote-button" data-id="${item.id}" data-vote="yes">Pritariu</button>
                            <button class="vote-button" data-id="${item.id}" data-vote="no">Nepritariu</button>
                          </div>
                        </div>
                        <div class="vote-bars" id="vote-bars-${item.id}">
                          <div class="yes-bar"></div>
                          <div class="no-bar"></div>
                        </div>
                        `;
            voteSection.append(html);
            
            // Calculate and update the width of the vote bars
            if (item.vote_types && item.vote_types.length > 0) {
              const yesType = item.vote_types.find(type => type.vote_type === 'yes');
              const noType = item.vote_types.find(type => type.vote_type === 'no');
              if (yesType && noType) {
                const yesCount = parseInt(yesType.vote_count);
                const noCount = parseInt(noType.vote_count);
                const totalVotes = yesCount + noCount;
                const yesPercentage = (yesCount / totalVotes) * 100;
                const noPercentage = (noCount / totalVotes) * 100;
                const yesBar = $(`#vote-bars-${item.id} .yes-bar`);
                const noBar = $(`#vote-bars-${item.id} .no-bar`);
                yesBar.css("width", `${yesPercentage}%`);
                noBar.css("width", `${noPercentage}%`);

                console.log(`Yes bar width: ${yesPercentage}%`);
                console.log(`No bar width: ${noPercentage}%`);
              }
            }
          });

          // Attach event listeners to vote buttons
          $(".vote-button").on("click", function() {
            var suggestionId = $(this).data("id");
            var voteType = $(this).data("vote");
            castVote(suggestionId, voteType);
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

  // Function to cast a vote
  function castVote(suggestionId, voteType) {
    $.ajax({
      url: "update_main_vote.php",
      method: "POST",
      data: { suggestionId: suggestionId, voteType: voteType },
      success: function(response) {
        // Handle success response
        // For example, you can update the UI to reflect the new vote count
        updateVotes();
      },
      error: function(xhr, status, error) {
        console.error("Error:", error);
      }
    });
  }

  // Call updateVotes function initially
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
