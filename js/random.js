const rangeInputs = document.querySelectorAll('input[type="range"]');
const unique = document.querySelector("#unique");

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
  let check = max - min;

  let result = [];
  if (check < l || min > max) {
    return (document.querySelector("#out-input").value = "Error");
  } else if (unique.checked === true) {
    result.push(rndNumbers(min, max, l));
  } else {
    for (let i = 0; i < l; i++) {
      result.push(randomInteger(min, max));
    }
  }

  document.querySelector("#out-input").value = result;
  return result;
};

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function rndNumbers(min, max, count) {
  if (count > max - min + 1) throw "impossible";
  let set = new Set();
  while (set.size < count) {
    let num = (Math.random() * (max - min + 1) + min) | 0;
    set.add(num);
  }
  return [...set];
}
