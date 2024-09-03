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
const startButton = document.getElementById('start-button');
const gameArea = document.getElementById('game-area');
const progressArea = document.getElementById('progress-area');
const rewardsArea = document.getElementById('rewards-area');
const userInfo = document.getElementById('user-info');
const startScreen = document.getElementById('start-screen');

// Game scenarios
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
    // Additional scenarios here...
    {
        title: "Lost Device",
        description: "You lost your smartphone while traveling. What should you do first?",
        options: [
            { text: "Buy a new phone", correct: false },
            { text: "Call your provider to lock your SIM card", correct: true },
            { text: "Change your social media passwords", correct: true },
            { text: "Notify friends and family through social media", correct: false }
        ],
        explanations: [
            "Buying a new phone does not secure your lost device.",
            "Locking your SIM card will prevent unauthorized use of your mobile data and calls.",
            "Changing your passwords can help protect your accounts from unauthorized access.",
            "Notifying through social media may alert the wrong people about your loss."
        ]
    },
    // Ensure you add up to 50 scenarios following the format above.
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
    startScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
    progressArea.classList.remove('hidden');
    rewardsArea.classList.remove('hidden');
    userInfo.classList.remove('hidden');

    currentQuestionIndex = 0;
    score = 0;
    level = 1;
    currentQuestions = getRandomQuestions(QUESTIONS_PER_GAME);
    updateUI();
    loadQuestion();
    setCurrentYear();
}

// Attach event listener to the start button
startButton.addEventListener('click', startGame);

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

    showFeedback(correct ? `Correct! ${explanation}` : `Incorrect. ${explanation}`, correct);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= QUESTIONS_PER_GAME) {
            endGame();
        } else {
            loadQuestion();
            updateUI();
        }
    }, 2000); // Delay to allow players to read feedback before moving to the next question
}

// Function to show feedback
function showFeedback(message, isCorrect) {
    feedbackElement.textContent = message;
    feedbackElement.className = isCorrect ? 'correct' : 'incorrect'; // Update with appropriate class
    feedbackElement.classList.remove('hidden');
}

// Function to hide feedback
function hideFeedback() {
    feedbackElement.classList.add('hidden');
}

// Function to update the UI
function updateUI() {
    userScore.textContent = `Score: ${score}`;
    userLevel.textContent = `Level: ${level}`;

    const progress = (currentQuestionIndex / QUESTIONS_PER_GAME) * 100;
    progressFill.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);

    updateRewards();
}

// Function to update rewards
function updateRewards() {
    rewardsList.innerHTML = '';
    rewards.forEach(reward => {
        const li = document.createElement('li');
        li.textContent = reward.name;
        li.style.opacity = score >= reward.score ? '1' : '0.5';
        rewardsList.appendChild(li);
    });
}

// Function to end the game
function endGame() {
    alert(`Congratulations! You've completed the game. Your final score is ${score}. You reached level ${level}!`);
    startGame(); // Restart the game for another round
}

// Function to set the current year in the footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Start the game when the page loads
window.addEventListener('load', () => {
    startScreen.classList.remove('hidden');
});
