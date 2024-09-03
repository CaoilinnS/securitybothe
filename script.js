// Game state
let currentQuestionIndex = 0;
let score = 0;
let level = 1;
let currentQuestions = [];

// Constants
const QUESTIONS_PER_GAME = 25; // Number of questions per game session
const POINTS_PER_QUESTION = 10;

// DOM elements
const scenarioTitle = document.getElementById('scenario-title');
const scenarioDescription = document.getElementById('scenario-description');
const optionsContainer = document.getElementById('options-container');
const userScore = document.getElementById('user-score');
const userLevel = document.getElementById('user-level');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.getElementById('progress-bar');
const rewardsList = document.getElementById('rewards-list');
const feedbackElement = document.getElementById('feedback');
const currentYearElement = document.getElementById('current-year');
const startPage = document.getElementById('start-page');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');

// Game scenarios (Example of 10 scenarios added)
const allScenarios = [
    {
        title: "Suspicious Email",
        description: "You receive an email claiming to be from your bank, asking you to click a link and verify your account details. What do you do?",
        options: [
            { text: "Click the link and enter your details", correct: false },
            { text: "Delete the email without clicking anything", correct: true },
            { text: "Reply to the email asking for more information", correct: false },
            { text: "Forward the email to your friends to warn them", correct: false }
        ],
        explanations: [
            "This could lead to your account being compromised.",
            "Good choice! This is the safest option.",
            "Responding could encourage further phishing attempts.",
            "This could spread the phishing attempt to others."
        ]
    },
    // More scenarios here...
];

// Rewards data
const rewards = [
    { name: "Security Novice", score: 50 },
    { name: "Password Pro", score: 100 },
    { name: "Phishing Detector", score: 150 },
    { name: "Encryption Expert", score: 200 },
    { name: "Cyber Guardian", score: 250 }
];

// Function to start the game
function startGame() {
    // Hide the start page and show the game container
    startPage.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    level = 1;
    currentQuestions = getRandomQuestions(QUESTIONS_PER_GAME);
    updateUI();
    loadQuestion();
    setCurrentYear();
}

// Function to get random questions
function getRandomQuestions(num) {
    const shuffled = [...allScenarios].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// Function to load a question
function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    scenarioTitle.textContent = question.title;
    scenarioDescription.textContent = question.description;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option.text;
        button.setAttribute('aria-label', option.text);
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    hideFeedback();
}

// Function to handle option selection
function selectOption(index) {
    const question = currentQuestions[currentQuestionIndex];
    const correct = question.options[index].correct;
    const explanation = question.explanations[index];

    if (correct) {
        score += POINTS_PER_QUESTION;
        showFeedback(`Correct! ${explanation}`, true);
    } else {
        showFeedback(`Incorrect. ${explanation}`, false);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= QUESTIONS_PER_GAME) {
        setTimeout(endGame, 2000); // End game after 2 seconds
    } else {
        updateUI();
        setTimeout(loadQuestion, 2000); // Load next question after 2 seconds
    }
}

// Function to show feedback
function showFeedback(message, isCorrect) {
    feedbackElement.textContent = message;
    feedbackElement.classList.remove('hidden', 'correct', 'incorrect');
    feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');
}

// Function to hide feedback
function hideFeedback() {
    feedbackElement.classList.add('hidden');
}

// Function to update the UI
function updateUI() {
    userScore.textContent = `Score: ${score}`;
    level = Math.floor(score
