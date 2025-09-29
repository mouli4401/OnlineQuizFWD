const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hyperlink Text Language", "Hyper Tool Multi Language", "Hyperlink Markup Language"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<code>"],
        answer: "<script>"
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 60;
let interval;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const quizEl = document.getElementById('quiz');
const timeEl = document.getElementById('time');

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    feedbackEl.innerText = "";
    const current = quizData[currentQuestion];
    questionEl.innerText = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsEl.appendChild(button);
    });
}

function selectAnswer(option) {
    const correct = quizData[currentQuestion].answer;
    if (option === correct) {
        feedbackEl.innerText = "Correct!";
        feedbackEl.style.color = "green";
        score++;
    } else {
        feedbackEl.innerText = `Wrong! Correct answer: ${correct}`;
        feedbackEl.style.color = "red";
    }
    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    clearInterval(interval);
    quizEl.classList.add('hide');
    resultEl.classList.remove('hide');
    scoreEl.innerText = `Your score: ${score} / ${quizData.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timer = 60;
    quizEl.classList.remove('hide');
    resultEl.classList.add('hide');
    startQuiz();
}

function startTimer() {
    interval = setInterval(() => {
        timer--;
        timeEl.innerText = timer;
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}

startQuiz();
