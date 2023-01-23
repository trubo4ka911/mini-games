// const URL =
//   "https://raw.githubusercontent.com/aaronnech/Who-Wants-to-Be-a-Millionaire/master/questions.json";
const getQuestion = document.querySelector("#question");
const getAnswer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const newGameBtn = document.querySelector("#submit-new");
const fiftyFiftyBtn = document.querySelector(".fifty-fifty");

let questionIndex = 0;
clearPage();
showQuestion();

function clearPage() {
  getQuestion.innerHTML = "";
  getAnswer.innerHTML = "";
}
newGameBtn.onclick = () => history.go();

// 50/50
fiftyFiftyBtn.onclick = hideAnswers;

const randomNumHelperFunc = (num) => Math.floor(Math.random() * num);
function hideAnswers() {
  let answer = questions[questionIndex]["answers"];
  let correct = questions[questionIndex]["correct"];

  for (el of answer) {
    // console.log(el);
    if (answer.indexOf(el) + 1 !== correct) {
      document.querySelector("#submit").classList.add("hidden");
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
    // console.log(answerHTML);
    getAnswer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer(btn) {
  const userAnswer = parseInt(btn.value);
  const rightAnswer = userAnswer === questions[questionIndex]["correct"];
  const wrongAnswer = userAnswer !== questions[questionIndex]["correct"];
  const nextQuize = questionIndex !== questions.length - 1;
  const endQuize = questionIndex === questions.length - 1;
  let score = questions[questionIndex]["score"];

  if (rightAnswer && nextQuize) {
    console.log(questionIndex);
    // if (questionIndex >= 2 && questionIndex < 3) {
    //   console.log("$1000");
    // }
    questionIndex++;
    clearPage();
    showQuestion();
  } else if (wrongAnswer) {
    console.log("wrong");
  } else if (endQuize) {
    console.log("goodbye");
    clearPage();
    showResults();
  }
}

function showResults() {
  let score = questions[questionIndex]["score"];
  console.log("showRes");
  console.log(score);
  const resultTemplate = `
          <h2 class="title">%title%</h2>
          <h3 class="summary">%message%</h3>
          <p class="result">%result%</p>
        `;
  if (questionIndex >= 1 && questionIndex < 2) {
    title = "WINNER!!!";
    message = "NOT BAD!!!";
    result = "$1000";
    console.log("$1000");
  } else if (questionIndex >= 2 && questionIndex < 3) {
    title = "WINNER!!!";
    message = "GOOD JOB!!!";
    result = "$32000";
    console.log("$32000");
  } else if ((questionIndex = 4)) {
    title = "WINNER!!!";
    message = "YOU ARE RICH!!!";
    result = "$1000000";
    console.log("$1000000");
  }
  const finalMessage = resultTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);
  quiz.innerHTML = finalMessage;
}

// submitBtn.onclick = checkAnswer;
