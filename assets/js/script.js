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
var secondsLeft = 25;
var timerInterval;

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
    console.log("in done");
    let section = document.querySelector(".question-flex-container");
    section.innerHTML = "";

    console.log("section inner html" + section.innerHTML);

    let doneDiv = document.createElement("div");
    doneDiv.textContent = "All Done!";
    doneDiv.className = "done";
    section.appendChild(doneDiv);

    console.log("section inner html" + section.innerHTML);
}

function checkAnswerAndPrintNextQuestion(event) {
    var targetOption = event.target;
    let section = document.querySelector(".question-flex-container");
    let answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    if (targetOption.textContent === currentQuestion.options[currentQuestion.answer]) {
        answerDiv.textContent = "Correct!"
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
        printDone();
    }
    
    section.appendChild(answerDiv);
}

function timerDecrement() {
    timerElement.textContent = secondsLeft--;
    console.log("in timerDecrement" + secondsLeft);
    if (secondsLeft <= 0) {
        timerElement.textContent = 0;
        console.log("in timerDecrement 0");
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
    console.log("in timerDecrementByCount" + secondsLeft);
    if (secondsLeft == 0) {
        console.log("in timerDecrementByCount 0");
        printDone();
        clearInterval(timerInterval);
        return 0;
    }
    else {
        return 1;
    }
}


var startBt = document.getElementById("startButton");
startBt.addEventListener("click", clearIntroTextAndPrintFirstQuestion);

var questionOptionSelector = document.querySelector(".question-flex-container");
questionOptionSelector.addEventListener("click", checkAnswerAndPrintNextQuestion);

var timerElement = document.getElementById("timer");