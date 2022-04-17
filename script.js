// DOM Variables QS
var classShow = document.querySelector('.show')
var classHidden = document.querySelector('.hidden')
var classHide = document.querySelector('.hide')
var timeEl = document.querySelector('#countdown')
var startButton = document.querySelector('.start')
var questionEl = document.querySelector('.question')
var clickedWrong = document.querySelector('.choice-section')
var ulEl = document.querySelector('ul')

// DOM Variables ElementsbyId

var answersEl = document.getElementById('answers')
var scoreEl = document.getElementById('score')
var responseEl = document.getElementById('response')
var containerEl = document.getElementById('container')
var nameEl = document.getElementById('name')
var clearEl = document.getElementById('clear')
var submitEl = document.getElementById('submit')

// Player Variables

var secondsLeft = 60
var questionListIndex = 0
var score = 0
var name
var player = []
var finalscore
var playerIndex = 0

// Hidden to shown

function goToHidden () {
    classShow.setAttribute('class','hidden')
}

function goToShow () {
    classHidden.setAttribute('class', 'show')
}

// Timer Function

function startTimer() {
    var timerInterval = setInterval(function(){
        secondsLeft --;
        timeEl.textContent = secondsLeft;

        if(secondsLeft <=0) {
            clearInterval(timerInterval)
            endGame();
        }
    }, 1000);
}

startButton.onclick = startGame;
submitEl.onclick = saveHighscore;
nameEl.onkeyup = checkForEnter;

// Start Quiz Functions

function startGame() {
    goToHidden();
    goToShow();
    startTimer();
    getQuestion();
}

// Functions to GetQuestions

function getQuestion() {
    var currentQuestion = questionList[questionListIndex];

    answersEl.innerHTML = ""
    
    questionEl.textContent = currentQuestion.title;

    scoreEl.textContent = score;

    var answers = currentQuestion.answers;
    for (var i = 0; i < answers.length; i++) {
        var answer = answers[i];
        var button = document.createElement("button");
        button.textContent = answer;

        button.addEventListener('click', function(event) {
            var selectedAnswer = event.target.textContent;
            if (selectedAnswer === currentQuestion.answer) {
                score += 1;
                scoreEl.textContent = score;
                responseEl.textContent = "NICE!"
            } else {
                secondsLeft -= 5;
                timeEl.textContent = secondsLeft;
                score -= 1;
                scoreEl.textContent = score;
                responseEl.textContent = "DANG!"
            }
            
            questionListIndex++
            if (questionListIndex >= questionList.length) {
                endGame();
            } else {
                getQuestion();
            }
        })
        answersEl.append(button);
    }
}

// EndGame Functions

function endGame() {
    containerEl.setAttribute('class', 'hidden')
    classHide.setAttribute('class', 'show');

    var finalscoreEl = document.getElementById('final');

    finalscoreEl.textContent = finalscore;

}

// Saving Finalscore functions

function saveHighscore() {
    var name = nameEl.ariaValueMax.trim();

    if (name !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore ={
            score: score,
            name: name
        };
        
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }
}

// Saving Highscore functions

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// Show Highscore Functions

function displayHighscore() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score){
        var liTag = document.createElement('li');
        liTag.textContent = score.name + ": " + score.score;

        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    });
}

// Functions to Clear the Highscores

function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

displayHighscore();