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

function clearIntroTextAndPrintFirstQuestion() {
    var introText = document.querySelector(".intro-flex-container");
    introText.innerHTML = "";
    printQuestion();
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
    let section = document.querySelector(".question-flex-container");
    section.innerHTML = "";

    let doneDiv = document.createElement("div");
    doneDiv.textContent = "All questions are done";
    doneDiv.className = "All Done!";
    section.appendChild(doneDiv);
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
    }

    currentQuestionCount++;
    if (currentQuestionCount < questionArray.length) {
        printQuestion();
    } else {
        printDone()
    }
    
    section.appendChild(answerDiv);
}


var startBt = document.getElementById("startButton");
startBt.addEventListener("click", clearIntroTextAndPrintFirstQuestion);

var questionOptionSelector = document.querySelector(".question-flex-container");
questionOptionSelector.addEventListener("click", checkAnswerAndPrintNextQuestion);