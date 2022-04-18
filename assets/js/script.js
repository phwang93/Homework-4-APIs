// DOM Variables using HTML

var classShow = document.querySelector(".show")
var classHidden = document.querySelector(".hidden")
var classHide = document.querySelector(".hide")
var timeEl = document.querySelector("#timeRemaining")
var startButton = document.querySelector(".start")
var questionToAsk = document.querySelector(".question-section")
var clickedGuess = document.querySelector(".choice-section")
var optionsEl = document.getElementById("options");
var imageEl = document.getElementById("image")
var scoreEl = document.getElementById("score")
var feedbackEl = document.getElementById("feedback")
var containerEl = document.getElementById("container")
var initialsEl = document.getElementById("initials");
var submitEl = document.getElementById("submit")
var clearEl = document.getElementById("clear")
var ulEl = document.querySelector("ul")

// Game Variables
var secondsLeft = 45;
var questionListIndex = 0;
var score = 0;
var initials;
var player = [];
var finalScore;
var playerIndex = 0;


// Function from show > hidden
function goToHidden () {
    classShow.setAttribute("class", "hidden")
}

// Functions from hidden > show
function goToShow () {
    classHidden.setAttribute("class", "show")
}


// startTimer Function
function startTimer() {

    var timerInterval = setInterval(function() {
        secondsLeft--;

        timeEl.textContent = secondsLeft;

        if(secondsLeft <= 0) {
        clearInterval(timerInterval)
        endGame();
        }

    },1000);
}


// Start Quiz Button after "click"

function startGame() {
    goToHidden();
    goToShow();
    startTimer();
    getQuestion();
}


// Function for Questions + Answers + Img
function getQuestion() {
    var currentQuestion = questionList[questionListIndex];
  
    optionsEl.innerHTML = ""
    
    imageEl.innerHTML = ""
   
    questionToAsk.textContent = currentQuestion.title;
   
    var picture = currentQuestion.image;
    var img = document.createElement("img")
    img.setAttribute("src", picture);
    imageEl.append(img)
    
    scoreEl.textContent = score;

    // Options Function

    var options = currentQuestion.options;
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        var button = document.createElement("button");
        button.textContent = option;
        
        button.addEventListener("click", function(event) {
            var selectedOption = event.target.textContent;
            if (selectedOption === currentQuestion.answer) {
                
                score += 5;
                scoreEl.textContent = score; 
                feedbackEl.textContent = "NICE!"

            } else {
                
                secondsLeft -=5;
                timeEl.textContent = secondsLeft;
                
                score -= 2;
                scoreEl.textContent = score;
                feedbackEl.textContent = "BOO!"
            }
       
        questionListIndex++
       
        if (questionListIndex >= questionList.length) {
            endGame();
        } else {
            getQuestion();
        }
        })
    optionsEl.append(button);
    }
}


// Function endGame
function endGame() {
    
    containerEl.setAttribute("class", "hidden")
    
    classHide.setAttribute("class", "show");
    
    var finalScore = score;  
    
    var finalScoreEl = document.getElementById("finalScore")
   
    finalScoreEl.textContent = finalScore;

}

// Scoring Functions

function saveHighscore() {
   
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
        score: score,
        initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
       
        window.location.href = "highscores.html";
    }
    }

// Enter Key "click"
function checkForEnter(event) {
    
    if (event.key === "Enter") {
    saveHighscore();
    }
}

// "Clicks" Functions
startButton.onclick = startGame;
submitEl.onclick = saveHighscore;
initialsEl.onkeyup = checkForEnter; 
