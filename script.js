const questions = [
    { question: "What does `console.log('Hello World')` do in JS?", answers: ["Prints in console ✅", "Shows popup", "Deletes a file", "Breaks the program"], correct: "Prints in console ✅" },
    { question: "Which language runs in the browser?", answers: ["Python", "JavaScript ✅", "C++", "Java"], correct: "JavaScript ✅" },
    { question: "Which HTML element is used for a clickable button?", answers: ["<input>", "<button> ✅", "<click>", "<a>"], correct: "<button> ✅" },
    { question: "Which of these is NOT a real programming language?", answers: ["Python", "JellyScript ✅", "Java", "C#"], correct: "JellyScript ✅" },
    { question: "Which CSS property changes the text color?", answers: ["color ✅", "font-color", "text-color", "font-style"], correct: "color ✅" },
    { question: "What is the default display of a `<div>` in HTML?", answers: ["block ✅", "inline", "flex", "none"], correct: "block ✅" },
    { question: "Which HTML element is used for a paragraph?", answers: ["<p> ✅", "<para>", "<paragraph>", "<text>"], correct: "<p> ✅" },
    { question: "Which JS keyword declares a constant?", answers: ["const ✅", "var", "let", "static"], correct: "const ✅" },
    { question: "Which method adds an item to the end of an array in JS?", answers: ["push() ✅", "pop()", "shift()", "unshift()"], correct: "push() ✅" },
    { question: "Which symbol starts a single-line comment in JS?", answers: ["// ✅", "/* */", "#", "<!-- -->"], correct: "// ✅" },
    { question: "What does CSS stand for?", answers: ["Cascading Style Sheets ✅", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: "Cascading Style Sheets ✅" },
    { question: "Which HTML tag is used for the largest heading?", answers: ["<h1> ✅", "<h6>", "<heading>", "<title>"], correct: "<h1> ✅" },
    { question: "Which HTML attribute is used to define inline styles?", answers: ["style ✅", "styles", "css", "class"], correct: "style ✅" },
    { question: "Which event occurs when a user clicks on an element in JS?", answers: ["onclick ✅", "onhover", "onchange", "onload"], correct: "onclick ✅" },
    { question: "Which method converts JSON to a JS object?", answers: ["JSON.parse() ✅", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"], correct: "JSON.parse() ✅" },
    { question: "Which one is a JavaScript framework?", answers: ["React ✅", "Django", "Laravel", "Flask"], correct: "React ✅" },
    { question: "Which operator checks strict equality in JS?", answers: ["=== ✅", "==", "=", "!="], correct: "=== ✅" },
    { question: "Which Git command saves changes to local repo?", answers: ["git commit ✅", "git push", "git merge", "git init"], correct: "git commit ✅" },
    { question: "Which CSS property changes background color?", answers: ["background-color ✅", "bgcolor", "color", "background"], correct: "background-color ✅" },
    { question: "Which symbol is used for ID selectors in CSS?", answers: ["# ✅", ".", "*", "$"], correct: "# ✅" }
];

const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const scoreContainer = document.getElementById('score-container');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let answersSelected = Array(questions.length).fill(null);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answersSelected.fill(null);
    scoreContainer.classList.add('hide');
    document.getElementById('quiz').classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let q = questions[currentQuestionIndex];
    questionEl.innerText = `${currentQuestionIndex + 1}. ${q.question}`;
    q.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });

    prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer, button) {
    answersSelected[currentQuestionIndex] = answer;
    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);

    if(answer === questions[currentQuestionIndex].correct) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
        // highlight correct answer
        Array.from(answerButtons.children).forEach(btn => {
            if(btn.innerText === questions[currentQuestionIndex].correct) btn.classList.add('correct');
        });
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

prevBtn.addEventListener('click', () => {
    currentQuestionIndex--;
    showQuestion();
});

restartBtn.addEventListener('click', startQuiz);

document.getElementById('next-btn').addEventListener('click', () => {
    if(currentQuestionIndex === questions.length - 1) {
        showScore();
    } else {
        currentQuestionIndex++;
        showQuestion();
    }
});

function showScore() {
    score = answersSelected.reduce((acc, ans, idx) => {
        if(ans === questions[idx].correct) return acc + 1;
        return acc;
    }, 0);

    document.getElementById('quiz').classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreEl.innerText = score;
}

// start quiz initially
startQuiz();