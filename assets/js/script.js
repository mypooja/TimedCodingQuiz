var dataTypeQuestion = {
    text : "Commonly used data types do not include:",
    options: ["1. Strings", "2. Boolean", "3. Alerts", "4. Numbers"],
    answer: 2,
};

var arrayQuestions = {
    text : "Arrays in JavaScript can be used to store",
    options: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the above"],
    answer: 3,
};

var conditionalQuestion = {
    text : "The condition in an if/else statement is enclonsed within ____",
    options: ["1. Quotes", "2. Curly brackets", "3. Parenthesis", "4. Square brackets"],
    answer: 1,
};

var stringQuestion = {
    text : "String vlaues must be enclonsed with ____ when being assigned to variables",
    options: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
    answer: 2,
};

var debuggingQuestion = {
    text : "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["1. JavaScript", "2. Terminal/Bash", "3. For loops", "4. Console.log"],
    answer: 3,
};

var questionArray = [dataTypeQuestion, arrayQuestions, conditionalQuestion, stringQuestion, debuggingQuestion];

var currentQuestion;
var currentQuestionCount = 0;
var secondsLeft = 75;
var timerInterval;
var score = 0;

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(timerDecrement, 1000);
}

function clearIntroTextAndPrintFirstQuestion() {
    var introText = document.querySelector(".intro-flex-container");
    introText.innerHTML = "";
    printQuestion();
    setTime();
    timerElement.textContent = secondsLeft;
}

function printQuestion() {
    let section = document.querySelector(".question-flex-container");
    section.innerHTML = "";

    let questionDiv = document.createElement("div");
    currentQuestion = questionArray[currentQuestionCount];
    questionDiv.textContent = currentQuestion.text;
    questionDiv.className = "question";
    section.appendChild(questionDiv);

    for (var i=0; i<currentQuestion.options.length; i++) {
        let questionOptionDiv = document.createElement("div");
        questionOptionDiv.textContent = currentQuestion.options[i];
        questionOptionDiv.className = "questionOption";
        section.appendChild(questionOptionDiv);
    }

}

function printDone() {
    console.log("inside print done");
    let questionSection = document.querySelector(".question-flex-container");
    questionSection.innerHTML = "";

    let scoreSection = document.querySelector(".score-flex-container");
    let doneDiv = document.createElement("div");
    doneDiv.textContent = "All Done!";
    doneDiv.className = "done";
    scoreSection.appendChild(doneDiv);

    let scoreDiv = document.createElement("div");
    scoreDiv.textContent = "Your final score is " + score;
    scoreDiv.className = "score";
    scoreSection.appendChild(scoreDiv);

    let inputForm = document.createElement("form");

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", "initials");
    labelElement.textContent = "Enter initials:";

    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.id = "initials";
    inputElement.name = "initials";

    let inputButtonElement = document.createElement("input");
    inputButtonElement.type = "button";
    inputButtonElement.value = "Submit";
    inputButtonElement.id = "inputButton";

    inputForm.appendChild(labelElement);
    inputForm.appendChild(inputElement);
    inputForm.appendChild(inputButtonElement);

    scoreSection.appendChild(inputForm);
}

function checkAnswerAndPrintNextQuestion(event) {
    if(event.target && event.target.className=="questionOption") {
        var targetOption = event.target;
        let section = document.querySelector(".question-flex-container");
        let answerDiv = document.createElement("div");
        answerDiv.className = "answer";

        if (targetOption.textContent === currentQuestion.options[currentQuestion.answer]) {
            answerDiv.textContent = "Correct!"
            score = score + 10;
        } else {
            answerDiv.textContent = "Wrong!"
            var timerReturn = timerDecrementByCount(15);
            if (!timerReturn) {
                return;
            }
        }

        currentQuestionCount++;
        if (currentQuestionCount < questionArray.length) {
            printQuestion();
        } else {
            clearInterval(timerInterval);
            printDone();
        }
    
        section.appendChild(answerDiv);
    }
}

function timerDecrement() {
    timerElement.textContent = secondsLeft--;
    if (secondsLeft <= 0) {
        timerElement.textContent = 0;
        printDone();
        clearInterval(timerInterval);
        return 0;
    }
    return 1;
}

function timerDecrementByCount(count) {
    if (secondsLeft - count >= 0) {
        secondsLeft = secondsLeft - count;
    } else {
        secondsLeft = 0;
    }
    timerElement.textContent = secondsLeft;
    if (secondsLeft == 0) {
        printDone();
        clearInterval(timerInterval);
        return 0;
    }
    else {
        return 1;
    }
}


function handleButtonClick(event) {
    event.preventDefault();
    if(event.target && event.target.id=="inputButton"){
        console.log("inside if of handleButtonClick")
        var inputTextElement = document.getElementById("initials");
        var initials = inputTextElement.value;

        localStorage.setItem("score", initials + ":" + score);
   }
}


var startBt = document.getElementById("startButton");
startBt.addEventListener("click", clearIntroTextAndPrintFirstQuestion);

var questionOptionSelector = document.querySelector(".question-flex-container");
questionOptionSelector.addEventListener("click", checkAnswerAndPrintNextQuestion);

var timerElement = document.getElementById("timer");

var scoreContainer = document.querySelector(".score-flex-container");
scoreContainer.addEventListener("click", handleButtonClick);