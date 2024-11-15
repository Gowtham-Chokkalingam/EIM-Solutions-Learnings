// finder.js
function showPopupMessage(message) {
  const popup = document.getElementById("popupMessage");
  popup.textContent = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

function findNearestValue() {
  const compareValue = parseFloat(document.getElementById("compareInput").value);

  if (isNaN(compareValue) || compareValue <= 0 || compareValue >= 3) {
    showPopupMessage("Please enter a valid number greater than 0 and less than 3.");
    return;
  }

  const Retracement = [0.236, 0.382, 0.5, 0.618, 0.707, 0.786, 0.886];
  const ProjectionValue = {
    0.236: 3.0,
    0.382: 2.618,
    0.5: 2.0,
    0.618: 1.618,
    0.707: 1.414,
    0.786: 1.272,
    0.886: 1.13,
  };

  const nearestValue = Retracement.reduce((closest, current) => {
    return Math.abs(current - compareValue) < Math.abs(closest - compareValue) ? current : closest;
  });

  const projection = ProjectionValue[nearestValue];
  document.getElementById("nearestValueOutput").textContent = `Nearest Retracement Value: ${nearestValue}`;
  document.getElementById("projectionValueOutput").textContent = `Projection Value: ${projection}`;
}
