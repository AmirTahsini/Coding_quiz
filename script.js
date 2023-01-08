var timer = document.querySelector(".timer");
var startButton = document.querySelector(".button");
var question = document.querySelector(".question");
var answers = document.querySelector(".answers");
var result = document.querySelector(".result");
var scores = document.querySelector(".scores");
var finalMessage = document.querySelector(".final");
var form = document.querySelector("form");
var homeMessage = document.querySelector("#homeMessage");
var userInitials = document.querySelector("#initials");
var scoreLink = document.querySelector("#scoreLink");
var scoresList = document.querySelector(".scoresList");
var currentIndex = 0;
var timeLeft;
var timeInterval;
var savedScores = JSON.parse(localStorage.getItem("scores")) || [];
var userScore = 0;
var questions = [
    {
        question: "Which symbol is used to designate jQuery code?",
        answers: {
            a: "$",
            b: "!",
            c: "/",
        },
        correct: "$"
    }, {
        question: "Which is a popular css library?",
        answers: {
            a: "jQuery",
            b: "React",
            c: "bootstrap",
        },
        correct: "bootstrap"
    }, {
        question: "Which is not a common HTML element?",
        answers: {
            a: "function",
            b: "script",
            c: "header",
        },
        correct: "function"
    }, {
        question: "Which git command checks which working branch you're in?",
        answers: {
            a: "git commit",
            b: "git status",
            c: "git pull",
        },
        correct: "git status"
    }, {
        question: "Which symbol to you start with to select an id in css?",
        answers: {
            a: "?",
            b: ".",
            c: "#",
        },
        correct: "#"
    }    
]


function startTimer() {
    timeLeft = 50;
    timeInterval = setInterval(function(){
       timeLeft--;
       timer.textContent = "Time Remaining: " + timeLeft;
       if(timeLeft === 0) {
        finalMessage.textContent = "Time has run out";
        finalMessage.style.display = "block";
        clearInterval(timeInterval);
        setCorrect();
    }
    }, 1000)
}  

function startQuiz() {
    startTimer();
    renderQuiz();
}

function renderQuiz() {
        startButton.style.display = 'none';
        homeMessage.style.display = 'none';
        question.innerHTML = questions[currentIndex].question;
        var buttonA = document.createElement('button');
        var buttonB = document.createElement('button');
        var buttonC = document.createElement('button');
        buttonA.innerHTML = questions[currentIndex].answers.a;
        buttonB.innerHTML = questions[currentIndex].answers.b;
        buttonC.innerHTML = questions[currentIndex].answers.c;
        buttonA.addEventListener("click", answerCheck);
        buttonB.addEventListener("click", answerCheck);
        buttonC.addEventListener("click", answerCheck);
        answers.innerHTML = "";
        answers.append(buttonA, buttonB, buttonC);
}

function answerCheck(event) {
    var userAnswer = event.target.textContent;
    var correctAnswer = questions[currentIndex].correct;
    console.log(event.target.textContent);
    if (userAnswer === correctAnswer) {
    userScore += 10;
    result.innerHTML = "Correct";
    }
    else {
    result.innerHTML = "Incorrect";
    timeLeft -= 5;
    }
    currentIndex++;
    if(currentIndex >= questions.length) {
        finalMessage.style.display = "block";
        clearInterval(timeInterval);
        setCorrect();
    }
    else {
        renderQuiz();
    }
}

function setCorrect() {
    scores.textContent = "You scored " + userScore + " out of 50 points";
    form.style.display = "block";
  }

function saveScore(event) {
    event.preventDefault();
    var data = {
        initials:userInitials.value,
        scores:userScore
    }
    savedScores.push(data);
    localStorage.setItem("scores", JSON.stringify(savedScores));
}

function viewScores() {
    scoresList.style.display = "block";
    for(var i = 0; i < savedScores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = "User initials: " + savedScores[i].initials + " - Score: " + savedScores[i].scores;
        scoresList.appendChild(newLi);
    }
}



startButton.addEventListener("click", startQuiz);
form.addEventListener("submit", saveScore);
scoreLink.addEventListener("click", viewScores);
