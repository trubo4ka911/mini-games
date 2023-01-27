const rangeInputs = document.querySelectorAll('input[type="range"]');
function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

document.querySelector("button").onclick = function () {
  let l = document.querySelector("#length").value;
  let min = document.querySelector("#min").value;
  let max = document.querySelector("#max").value;

  let result = [];
  for (let i = 0; i < l; i++) {
    result.push(randomInteger(min, max));
  }

  console.log(result);
  document.querySelector("#out-input").value = result;
  return result;
};

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
