let a = "";
let b = "";
let c = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/"];

const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}

function formatOut(str, maxLength) {
  let res;
  res = str.length <= maxLength ? (res = str) : str.slice(0, maxLength);
  return res;
}

document.querySelector(".ac").onclick = clearAll;

document.querySelector(".buttons").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;
  out.textContent = "";

  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a = a.replace(/^0+/, "");
      a = formatOut(a, 7);
      a += key;
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      b = formatOut(b, 7);
      out.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(sign);
    return;
  }
  // Plus - Minus
  if (key === "+/-") {
    if (a) a = -a;
    out.textContent = a;
  }
  // Percent
  let percent = (a * b) / 100;
  if (key === "%") {
    if (b === "") b = a;

    switch (sign) {
      case "+":
        a = +a + +percent;
        break;
      case "-":
        a = a - percent;
        break;
      case "x":
        a = a * percent;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Error";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / percent;
        break;
    }
    finish = true;
    out.textContent = a;
    console.table(a, b, sign);
  }

  // Calculation
  if (key === "=") {
    if (b === "") b = a;

    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = a - b;
        break;
      case "x":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Error";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
    console.table(a, b, sign);
  }
};
