const questions = {
    web: {
        easy: [
            { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "None"], c: 0 }
        ],
        medium: [
            { q: "Which CSS property controls text size?", a: ["font-style", "text-size", "font-size", "size"], c: 2 }
        ],
        hard: [
            { q: "Which JS keyword is used to declare constant?", a: ["let", "var", "const", "static"], c: 2 }
        ]
    },
    math: {
        easy: [
            { q: "5 + 3 = ?", a: ["5", "8", "10", "12"], c: 1 }
        ],
        medium: [
            { q: "12 × 4 = ?", a: ["48", "36", "24", "16"], c: 0 }
        ],
        hard: [
            { q: "√144 = ?", a: ["10", "11", "12", "13"], c: 2 }
        ]
    },
    gk: {
        easy: [
            { q: "Capital of India?", a: ["Mumbai", "Delhi", "Chennai", "Kolkata"], c: 1 }
        ],
        medium: [
            { q: "National animal of India?", a: ["Lion", "Elephant", "Tiger", "Leopard"], c: 2 }
        ],
        hard: [
            { q: "Who wrote the Indian National Anthem?", a: ["Tagore", "Gandhi", "Nehru", "Bose"], c: 0 }
        ]
    }
};

let quiz = [];
let index = 0;
let score = 0;

function startQuiz() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;

    quiz = shuffle([...questions[category][difficulty]]);
    index = 0;
    score = 0;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    if (index >= quiz.length) {
        endQuiz();
        return;
    }

    const q = quiz[index];
    document.getElementById("question").innerText = q.q;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    shuffle(q.a).forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => checkAnswer(opt, q);
        optionsDiv.appendChild(div);
    });

    updateProgress();
}

function checkAnswer(selected, q) {
    if (selected === q.a[q.c]) score++;
    index++;
    loadQuestion();
}

function updateProgress() {
    const percent = ((index) / quiz.length) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
}

function endQuiz() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    document.getElementById("score").innerText =
        `${score} / ${quiz.length}`;

    document.getElementById("feedback").innerText =
        score === quiz.length ? "Excellent 🎉" :
        score >= quiz.length / 2 ? "Good Job 👍" : "Keep Practicing 💪";
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
