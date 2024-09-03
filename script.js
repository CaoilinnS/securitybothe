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

// Game scenarios (50 questions)
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
    {
        title: "Public Wi-Fi",
        description: "You're at a coffee shop and need to check your bank account. The shop offers free Wi-Fi. What's the best course of action?",
        options: [
            { text: "Use the free Wi-Fi to check your account", correct: false },
            { text: "Wait until you're on a secure network", correct: true },
            { text: "Ask the barista if the Wi-Fi is secure", correct: false },
            { text: "Use your phone's data instead of Wi-Fi", correct: true }
        ],
        explanations: [
            "Public Wi-Fi networks are often unsecured and your data could be intercepted.",
            "Smart decision! It's best to use secure networks for sensitive transactions.",
            "The staff may not know the security status of the Wi-Fi.",
            "Using cellular data is generally more secure than public Wi-Fi."
        ]
    },
    {
        title: "Password Sharing",
        description: "A close friend asks for your email password to access a shared document. What do you do?",
        options: [
            { text: "Share the password; they’re a close friend", correct: false },
            { text: "Suggest they create a new document with their own account", correct: true },
            { text: "Share the password, but change it afterward", correct: false },
            { text: "Refuse and explain why it’s a bad idea", correct: true }
        ],
        explanations: [
            "Sharing passwords can compromise your account security.",
            "This maintains both security and convenience.",
            "Changing the password afterward is better, but still risky.",
            "It's important to educate others on password security."
        ]
    },
    {
        title: "Software Updates",
        description: "You receive a notification to update your software. What should you do?",
        options: [
            { text: "Ignore the notification; updates always slow down my device", correct: false },
            { text: "Update later when you have more time", correct: false },
            { text: "Update immediately from the software’s official site", correct: true },
            { text: "Download the update from a third-party website", correct: false }
        ],
        explanations: [
            "Ignoring updates can leave your device vulnerable to threats.",
            "Delaying updates increases the risk of vulnerabilities.",
            "Updating from the official site ensures safety.",
            "Third-party sites may provide malicious versions of the software."
        ]
    },
    // Additional scenarios
    {
        title: "Antivirus Alert",
        description: "Your antivirus software alerts you about a potential threat. What do you do?",
        options: [
            { text: "Ignore the alert; it’s probably a false alarm", correct: false },
            { text: "Disable the antivirus software", correct: false },
            { text: "Run a full system scan", correct: true },
            { text: "Uninstall the software causing the alert", correct: false }
        ],
        explanations: [
            "Ignoring alerts can lead to security breaches.",
            "Disabling antivirus software exposes your device to threats.",
            "Running a full system scan helps identify and eliminate threats.",
            "Uninstalling software should only be done if confirmed to be malicious."
        ]
    },
    {
        title: "Two-Factor Authentication",
        description: "A service you use offers two-factor authentication (2FA). What should you do?",
        options: [
            { text: "Enable 2FA for additional security", correct: true },
            { text: "Ignore it; one password is enough", correct: false },
            { text: "Disable 2FA if it’s already enabled", correct: false },
            { text: "Use 2FA only for financial accounts", correct: false }
        ],
        explanations: [
            "2FA provides an additional layer of security.",
            "A single password is often insufficient to protect your account.",
            "Disabling 2FA reduces security.",
            "Using 2FA for all accounts enhances overall security."
        ]
    },
    {
        title: "Phishing Phone Call",
        description: "You receive a phone call from someone claiming to be from tech support, asking for remote access to your computer. What do you do?",
        options: [
            { text: "Give them access to solve the issue quickly", correct: false },
            { text: "Ask for their contact details and hang up", correct: true },
            { text: "Tell them you’ll call them back and disconnect", correct: true },
            { text: "Ignore the call and block the number", correct: false }
        ],
        explanations: [
            "Granting access can lead to data theft or malware installation.",
            "Asking for contact details can help verify legitimacy.",
            "Calling back ensures you’re speaking to the right person.",
            "Blocking the number may prevent further contact, but doesn’t address the issue."
        ]
    },
    {
        title: "Social Media Privacy",
        description: "You’re setting up a new social media account. How do you handle your privacy settings?",
        options: [
            { text: "Leave everything public for maximum engagement", correct: false },
            { text: "Set your account to private and review friend requests", correct: true },
            { text: "Ignore privacy settings; they’re not important", correct: false },
            { text: "Share your posts only with friends", correct: true }
        ],
        explanations: [
            "Public settings can expose you to privacy risks.",
            "Private accounts limit who can see your content.",
            "Ignoring privacy settings can lead to exposure of sensitive information.",
            "Limiting posts to friends protects your privacy."
        ]
    },
    {
        title: "USB Drive Found",
        description: "You find a USB drive in the parking lot. What should you do?",
        options: [
            { text: "Plug it into your computer to check the contents", correct: false },
            { text: "Hand it over to your IT department or security team", correct: true },
            { text: "Leave it where you found it", correct: false },
            { text: "Take it home for personal use", correct: false }
        ],
        explanations: [
            "Plugging in unknown USB drives can expose your computer to malware.",
            "Reporting found drives ensures they are handled safely.",
            "Leaving it can lead to someone else picking it up and potentially being compromised.",
            "Using unknown drives poses a significant security risk."
        ]
    },
    {
        title: "Weak Password Warning",
        description: "Your account prompts you to update your weak password. What do you do?",
        options: [
            { text: "Ignore the warning and keep your password", correct: false },
            { text: "Change to a strong, unique password", correct: true },
            { text: "Update the password to something easy to remember", correct: false },
            { text: "Set your password to 'password123'", correct: false }
        ],
        explanations: [
            "Ignoring weak password warnings puts your account at risk.",
            "A strong, unique password enhances security.",
            "Easy-to-remember passwords are often easy to guess.",
            "'password123' is one of the most common and easily guessed passwords."
        ]
    },
    // More scenarios would follow in this format...
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
    level = Math.floor(score / 50) + 1;
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
    startGame(); // Restart the game
}

// Function to set the current year in the footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Start the game when the page loads
window.addEventListener('load', startGame);
