//global scope
let quiz = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["script", "scripting", "js", "java"],
    correctAnswerIndex: 0,
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    answers: ["script name= ''", "script src=''", "script href=''"],
    correctAnswerIndex: 1,
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      "function myfunction()",
      "function=myfunction",
      "function:myfunction",
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "How do you call a function named myfunction?",
    answers: [
      "call myfunction()",
      "callfunction myfunction()",
      ":myfunction()",
    ],
    correctAnswerIndex: 2,
  },
];
// sets parameters of the quizz
let currentcurrent;
let quizLength = 30000;
let startTime;
let interval;
let correctAnswers = 0;

// function that sets timer length and

let timer = document.querySelector("#timer");

function calcTimeRemaining() {
  return Math.ceil((startTime.getTime() + quizLength - Date.now()) / 1000);
}

function runTimeout() {
  console.log(quizLength);
  let timeRemaining = calcTimeRemaining();

  timer.innerHTML = `Time: ${timeRemaining}s`;

  if (Date.now() >= startTime.getTime() + quizLength) {
    console.log("Times up bitches!");

    finishQuiz();
  }
}

//open page and display

//click to start quiz
let startButton = document.querySelector("#start");
startButton.addEventListener("click", startQuiz);
//display question and answers
let theQuestions = document.querySelector("#questions");
let theIntro = document.querySelector("#intro");

function renderQuestion(questionIndex) {
  //clear question content from div
  theQuestions.innerHTML = "";

  let currentQuestion = quiz[questionIndex];

  // create the element
  let questionElement = document.createElement("H2");
  //set contents
  questionElement.innerHTML = currentQuestion.question;
  theQuestions.appendChild(questionElement);

  //populate answers to DOM
  currentQuestion.answers.forEach(function (answer, answerIndex) {
    let answerElement = document.createElement("button");
    answerElement.innerHTML = answer;
    answerElement.value = answerIndex;
    answerElement.classList.add("btn");
    answerElement.addEventListener("click", checkAnswer);
    theQuestions.appendChild(answerElement);
  });

  theQuestions.style.display = "block";
  theIntro.style.display = "none";
}

function checkAnswer(event) {
  console.log(
    "checked!",
    event.target.value,
    quiz[currentQuestionIndex].correctAnswerIndex
  );

  let userAnswerIndex = parseInt(event.target.value, 10);

  if (userAnswerIndex === quiz[currentQuestionIndex].correctAnswerIndex) {
    console.log("correct");
    correctAnswers++;
  } else {
    console.log("incorrect");
    // decrement time remaining
    quizLength = quizLength - 5000;
  }
  console.log(correctAnswers);
  if (currentQuestionIndex >= quiz.length - 1) {
    finishQuiz();
  } else {
    nextQuestion();
  }
}

function startQuiz() {
  timer.style.display = "block";
  console.log("startquiz");
  currentQuestionIndex = 0;
  startTime = new Date();
  correctAnswers = 0;
  quizTime = 30000;

  interval = setInterval(runTimeout, 1000);
  renderQuestion(currentQuestionIndex);
}

function nextQuestion() {
  renderQuestion(++currentQuestionIndex);
}
let finishScreen = document.querySelector("#finish");
let scoresScreen = document.querySelector("highscores");
function finishQuiz() {
  timer.style.display = "none";
  clearInterval(interval);

  finishScreen.style.display = "block";
  theQuestions.style.display = "none";

  let yourScore = calcTimeRemaining();
  let displayScore = document.querySelector("#score");
  let saveHighscoreBtn = document.querySelector("#saveScore");

  console.log(yourScore);
  displayScore.innerHTML = yourScore;
  saveHighscoreBtn.addEventListener("click", function () {
    let inputName = document.querySelector("#scorename");
    let highScore = {
      name: inputName.value,
      score: yourScore,
    };

    storeHighscore(highScore);

    showHighscoreScreen();
  });
}

let highScoresKey = "HIGH_SCORES";

function getHighScores() {
  // get scores from localstorage
  let highScorage = localStorage.getItem(highScoresKey);
  // parse and return them
  return JSON.parse(highScorage) ?? [];
}
// function that saves scores to local storage
function storeHighscore(highScore) {
  let highScores = getHighScores();
  // add high score to array
  highScores.push(highScore);
  // sort array
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  // stringify and save the array to localstorage
  let highScoreString = JSON.stringify(highScores);
  localStorage.setItem(highScoresKey, highScoreString);
}
let highscoreScreen = document.querySelector("#highscores");
function showHighscoreScreen() {
  finishScreen.style.display = "none";
  highscoreScreen.style.display = "block";
  let scoreList = document.querySelector("#scoreList");
  let highScores = getHighScores();
  for (i = 0; i < highScores.length; i++) {
    let highScore = highScores[i];
    let renderedScore = document.createElement("li");
    renderedScore.innerHTML = highScore.name + highScore.score;
    scoreList.appendChild(renderedScore);
    //to do go back button
    // veiw highscores button
  }
  function clearStorage() {
    localStorage.clear();
    scoreList.style.display = "none";
  }

  function goBack() {
    highscoreScreen.style.display = "none";
    introScreen.style.display = "block";
  }
  let goBackBtn = document.querySelector("#back");
  goBackBtn.addEventListener("click", goBack);
  let introScreen = document.querySelector("#intro");
  let clearScores = document.querySelector("#clear");
  clearScores.addEventListener("click", clearStorage);
}

//
