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




  document.addEventListener("DOMContentLoaded", function() {
    const labelBlocks = document.querySelectorAll('.form-block');

    labelBlocks.forEach(function(labelBlock) {
        const label = labelBlock.querySelector('label');
        const tooltipText = labelBlock.getAttribute('data-tooltip');

        label.addEventListener('mouseenter', function() {
            showTooltip(label, tooltipText);
        });

        label.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    function showTooltip(label, text) {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = text;
        document.body.appendChild(tooltip);

        const labelRect = label.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        tooltip.style.top = labelRect.top - tooltipRect.height - 10 + 'px';
        tooltip.style.left = labelRect.left + (labelRect.width - tooltipRect.width) / 2 + 'px';
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }
});