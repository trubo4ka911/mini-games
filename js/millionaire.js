const getQuestion = document.querySelector("#question");
const getAnswer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const newGameBtn = document.querySelector("#submit-new");
const fiftyFiftyBtn = document.querySelector(".fifty-fifty");
const peopleBtn = document.querySelector(".people");
const callBtn = document.querySelector(".call-friend");
const prize = document.querySelector(".prize");

let questionIndex = 0;
clearPage();
showQuestion();

function clearPage() {
  getQuestion.innerHTML = "";
  getAnswer.innerHTML = "";
}
newGameBtn.onclick = () => {
  history.go();
  playSound("intro");
};

// 50/50
fiftyFiftyBtn.onclick = hideAnswers;
let checkFlag = 0;

function hideAnswers() {
  let correct = questions[questionIndex]["correct"] - 1;
  fiftyFiftyBtn.classList.add("hidden");
  disableElement(correct);
}

function disableElement(correct) {
  do {
    allAnswer = getRandomArbitrary(0, 4);
    let elementForHide = document.querySelector("#list").childNodes[allAnswer];
    if (allAnswer === correct) {
      continue;
    }
    if (!elementForHide.classList.contains("hidden")) {
      elementForHide.classList.add("hidden");
      checkFlag++;
    }
  } while (checkFlag < 2);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// call
callBtn.onclick = call;
let checkFlag2 = 0;

function call() {
  let correct = questions[questionIndex]["correct"] - 1;
  callBtn.classList.add("hidden");
  changeElement(correct);
}

function changeElement(correct) {
  do {
    allAnswer = getRandomArbitrary(0, 4);
    let elementForHide = document.querySelector("#list").childNodes[allAnswer];
    console.log(elementForHide);
    if (allAnswer === correct) {
      continue;
    }
    if (!elementForHide.classList.contains("help-color")) {
      elementForHide.classList.add("help-color");
      checkFlag2++;
    }
  } while (checkFlag2 < 3);
}

// people
peopleBtn.onclick = people;
function people() {
  let correct = questions[questionIndex]["correct"] - 1;
  peopleBtn.classList.add("hidden");
  changeEl(correct);
}

function changeEl(correct) {
  allAnswer = getRandomArbitrary(0, 4);
  let elementForHide = document.querySelector("#list").childNodes[allAnswer];
  if (allAnswer === correct) {
    if (!elementForHide.classList.contains("people-color")) {
      elementForHide.classList.add("people-color");
    }
  }
}

function showQuestion() {
  // Question
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  getQuestion.innerHTML = title;
  // Answers
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
          <button value='%number%' onclick = checkAnswer({value}) id="submit" type="submit">
            <span>%answer%</span>
          </button>
        </li>`;
    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);
    getAnswer.innerHTML += answerHTML;
    answerNumber++;
  }
}
// Answer check
function checkAnswer(btn) {
  const userAnswer = parseInt(btn.value);
  const rightAnswer = userAnswer === questions[questionIndex]["correct"];
  const wrongAnswer = userAnswer !== questions[questionIndex]["correct"];
  const nextQuize = questionIndex !== questions.length - 1;
  const endQuize = questionIndex === questions.length - 1;
  let current = prize.querySelector(".current");
  if (rightAnswer && nextQuize) {
    console.log(questionIndex);
    playSound("correct-answer");
    current && current.classList.remove("current");
    prize.querySelectorAll("p")[14 - questionIndex].classList.add("current");
    questionIndex++;
    clearPage();
    showQuestion();
  } else if (wrongAnswer || endQuize) {
    current && current.classList.remove("current");
    clearPage();
    showResults();
  }
}
// Result
function showResults() {
  let score = questions[questionIndex]["score"];
  console.log("showRes");
  console.log(score);
  console.log(questionIndex);
  const resultTemplate = `
          <h2 class="title">%title%</h2>
          <h3 class="summary">%message%</h3>
          <p class="result">%result%</p>
        `;
  if (questionIndex >= 4 && questionIndex < 9) {
    playSound("intro");
    title = "WINNER!!!";
    message = "NOT BAD!!!";
    result = "$1000";
    console.log("$1000");
  } else if (questionIndex >= 9 && questionIndex < 14) {
    playSound("intro");
    title = "WINNER!!!";
    message = "GOOD JOB!!!";
    result = "$32000";
    console.log("$32000");
  } else if (questionIndex === 14) {
    playSound("intro");
    title = "WINNER!!!";
    message = "YOU ARE RICH!!!";
    result = "$1000000";
    console.log("$1000000");
  } else {
    playSound("wrong-answer");
    title = "We are sad(((";
    message = "Let's try again!";
    result = "$0";
    console.log("$0");
  }
  const finalMessage = resultTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);
  quiz.innerHTML = finalMessage;
}

// sounds

function playSound(source) {
  let element = document.getElementById(`sound-${source}`);
  element.pause();
  element.currentTime = 0;
  element.play();
}

window.addEventListener("load", () => {
  playSound("intro");
});
