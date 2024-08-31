// Game state
let currentScenario = 0;
let score = 0;
let level = 1;

// DOM elements
const scenarioTitle = document.getElementById('scenario-title');
const scenarioDescription = document.getElementById('scenario-description');
const optionsContainer = document.getElementById('options-container');
const userScore = document.getElementById('user-score');
const userLevel = document.getElementById('user-level');
const progressFill = document.getElementById('progress-fill');
const rewardsList = document.getElementById('rewards-list');

// Game scenarios
const scenarios = [
    {
        title: "Suspicious Email",
        description: "You receive an email claiming to be from your bank, asking you to click a link and verify your account details. What do you do?",
        options: [
            { text: "Click the link and enter your details", correct: false },
            { text: "Delete the email without clicking anything", correct: true },
            { text: "Reply to the email asking for more information", correct: false },
            { text: "Forward the email to your friends to warn them", correct: false }
        ]
    },
    {
        title: "Public Wi-Fi",
        description: "You're at a coffee shop and need to check your bank account. The shop offers free Wi-Fi. What's the best course of action?",
        options: [
            { text: "Use the free Wi-Fi to check your account", correct: false },
            { text: "Wait until you're on a secure network", correct: true },
            { text: "Ask the barista if the Wi-Fi is secure", correct: false },
            { text: "Use your phone's data instead of Wi-Fi", correct: true }
        ]
    },
    // Add 18 more scenarios here...
];

// Function to start the game
function startGame() {
    currentScenario = 0;
    score = 0;
    level = 1;
    updateUI();
    loadScenario();
}

// Function to load a scenario
function loadScenario() {
    const scenario = scenarios[currentScenario];
    scenarioTitle.textContent = scenario.title;
    scenarioDescription.textContent = scenario.description;
    optionsContainer.innerHTML = '';
    
    scenario.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

// Function to handle option selection
function selectOption(index) {
    const scenario = scenarios[currentScenario];
    if (scenario.options[index].correct) {
        score += 10;
        showFeedback("Correct! Good job staying secure.");
    } else {
        showFeedback("Oops! That wasn't the safest choice. Here's why: " + getExplanation(currentScenario, index));
    }
    
    currentScenario++;
    if (currentScenario >= scenarios.length) {
        endGame();
    } else {
        updateUI();
        loadScenario();
    }
}

// Function to show feedback
function showFeedback(message) {
    alert(message); // For simplicity, we're using an alert. In a real app, you'd want a more sophisticated feedback mechanism.
}

// Function to get explanation for incorrect answers
function getExplanation(scenarioIndex, optionIndex) {
    // Add explanations for each incorrect option in each scenario
    const explanations = [
        ["This could lead to your account being compromised.", "Good choice! This is the safest option.", "Responding could encourage further phishing attempts.", "This could spread the phishing attempt to others."],
        ["Public Wi-Fi networks are often unsecured and your data could be intercepted.", "Smart decision! It's best to use secure networks for sensitive transactions.", "The staff may not know the security status of the Wi-Fi.", "Using cellular data is generally more secure than public Wi-Fi."],
        // Add explanations for the other 18 scenarios...
    ];
    
    return explanations[scenarioIndex][optionIndex];
}

// Function to update the UI
function updateUI() {
    userScore.textContent = `Score: ${score}`;
    userLevel.textContent = `Level: ${level}`;
    const progress = (currentScenario / scenarios.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update level based on score
    level = Math.floor(score / 50) + 1;
    
    // Update rewards
    updateRewards();
}

// Function to update rewards
function updateRewards() {
    const rewards = [
        { name: "Security Novice", score: 50 },
        { name: "Password Pro", score: 100 },
        { name: "Phishing Detector", score: 150 },
        { name: "Encryption Expert", score: 200 },
        { name: "Cyber Guardian", score: 250 }
    ];
    
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
    alert(`Congratulations! You've completed all scenarios. Your final score is ${score}.`);
    startGame(); // Restart the game
}

// Start the game when the page loads
window.addEventListener('load', startGame);
