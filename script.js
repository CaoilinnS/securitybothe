document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const gameArea = document.getElementById('game-area');
    const progressArea = document.getElementById('progress-area');
    const rewardsArea = document.getElementById('rewards-area');
    const userInfo = document.getElementById('user-info');
    const feedbackElement = document.getElementById('feedback');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const progressFill = document.getElementById('progress-fill');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    let currentQuestionIndex = 0;
    let score = 0;
    let level = 1;
    let currentQuestions = [];
    
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    document.addEventListener('DOMContentLoaded', function() {
        
    const allScenarios = [
        {
            title: "Suspicious Email",
            description: "You receive an email claiming to be from your bank asking you to click a link and verify your account details. What do you do?",
            options: [
                { text: "Click the link and enter your details", correct: false },
                { text: "Delete the email without clicking anything", correct: true },
                { text: "Reply to the email asking for more information", correct: false },
                { text: "Forward the email to your friends to warn them", correct: false }
            ],
            explanations: [
                "Clicking the link could lead to a phishing attack and compromise your personal information.",
                "Deleting the email is the safest option to avoid potential phishing scams.",
                "Replying to a suspicious email can confirm to the sender that your email address is active, leading to more phishing attempts.",
                "Forwarding a suspicious email can spread the potential phishing attack to others."
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
                "Using public Wi-Fi can expose your personal information to cybercriminals.",
                "Waiting to use a secure network helps protect your sensitive information from potential cyber threats.",
                "Baristas are likely not trained in cybersecurity, making this option unreliable.",
                "Using your phone's cellular data is more secure than public Wi-Fi, especially for sensitive tasks like banking."
            ]
        },
        {
            title: "Shared Documents",
            description: "You're working on a project with your team and someone shares a document with you. What's the best way to handle this?",
            options: [
                { text: "Open the document immediately to review the content", correct: false },
                { text: "Scan the document for any suspicious content before opening", correct: true },
                { text: "Ask the sender if the document is safe to open", correct: false },
                { text: "Download the document and run it through an antivirus program", correct: true }
            ],
            explanations: [
                "Opening the document immediately could expose your device to potential malware or viruses.",
                "Scanning the document for suspicious content is a prudent step to ensure its safety before opening.",
                "Relying on the sender's assurance may not be enough, as they could be unaware of the document's true nature.",
                "Running the document through an antivirus program can help detect and prevent any potential threats."
            ]
        },
        {
            title: "Password Management",
            description: "You've been using the same password for multiple accounts. What's the best way to improve your password security?",
            options: [
                { text: "Continue using the same password for convenience", correct: false },
                { text: "Create a unique password for each account", correct: true },
                { text: "Use a password manager to store and generate secure passwords", correct: true },
                { text: "Share your passwords with trusted friends and family", correct: false }
            ],
            explanations: [
                "Using the same password for multiple accounts increases the risk of compromise if one account is breached.",
                "Creating unique passwords for each account significantly enhances your overall password security.",
                "Password managers generate and store strong, unique passwords, making password management more secure and convenient.",
                "Sharing your passwords with others, even trusted individuals, can lead to unauthorized access and potential misuse of your accounts."
            ]
        },
        {
            title: "Software Updates",
            description: "You've been postponing updating your device's operating system and applications. What's the best approach?",
            options: [
                { text: "Ignore the updates, they're likely not important", correct: false },
                { text: "Update your device as soon as updates are available", correct: true },
                { text: "Only update critical applications and skip less important ones", correct: false },
                { text: "Wait until others report no issues with the updates", correct: false }
            ],
            explanations: [
                "Ignoring software updates can leave your device vulnerable to known security vulnerabilities that have been patched.",
                "Updating your device as soon as updates are available is the best practice to ensure you have the latest security protections.",
                "Selective updating can leave some applications vulnerable, making your device less secure as a whole.",
                "Waiting for others to report no issues with updates can leave your device unprotected for an extended period, increasing the risk of exploitation."
            ]
        },
        {
            title: "Social Media Privacy",
            description: "You're sharing personal information on social media. What's the best way to protect your privacy?",
            options: [
                { text: "Share everything publicly, it's more engaging", correct: false },
                { text: "Only share personal information with close friends and family", correct: true },
                { text: "Disable all privacy settings on your social media accounts", correct: false },
                { text: "Share general, non-personal updates to avoid privacy concerns", correct: true }
            ],
            explanations: [
                "Sharing personal information publicly on social media can expose you to potential privacy and security risks.",
                "Limiting the sharing of personal information to close friends and family helps protect your privacy.",
                "Disabling privacy settings on social media accounts can compromise your personal information and make it accessible to anyone.",
                "Sharing general, non-personal updates on social media can help you stay engaged without exposing sensitive information."
            ]
        },
        // Add 45 more scenarios following the same structure
    ];


    function startGame() {
        startButton.classList.add('hidden');
        gameArea.classList.remove('hidden');
        progressArea.classList.remove('hidden');
        rewardsArea.classList.remove('hidden');
        userInfo.classList.remove('hidden');

        currentQuestionIndex = 0;
        score = 0;
        level = 1;
        currentQuestions = getRandomQuestions(25);
        loadQuestion();
    }

    function restartGame() {
        document.location.reload();
    }

    function getRandomQuestions(num) {
        const shuffled = allScenarios.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function loadQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            endGame();
            return;
        }
        const question = currentQuestions[currentQuestionIndex];
        scenarioTitle.textContent = question.title;
        scenarioDescription.textContent = question.description;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.onclick = function() { selectOption(option.correct, question.explanations[index]); };
            optionsContainer.appendChild(button);
        });

        currentQuestionElement.textContent = currentQuestionIndex + 1;
        totalQuestionsElement.textContent = currentQuestions.length;
        updateProgressBar();
        updateScoreAndLevel();
    }

    function selectOption(isCorrect, explanation) {
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => button.classList.remove('selected'));
        event.target.classList.add('selected');

        if (isCorrect) {
            score += 10;
            feedbackElement.textContent = 'Correct! ' + explanation;
            feedbackElement.className = 'correct';
        } else {
            feedbackElement.textContent = 'Incorrect. ' + explanation;
            feedbackElement.className = 'incorrect';
        }
        feedbackElement.classList.remove('hidden');

        setTimeout(() => {
            feedbackElement.classList.add('hidden');
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                loadQuestion();
            } else {
                endGame();
            }
        }, 2000);
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
        progressFill.style.width = progress + '%';
    }

    function updateScoreAndLevel() {
        scoreElement.textContent = score;
        levelElement.textContent = level;
    }

    function endGame() {
        alert(`Game over! Your score: ${score}`);
        restartGame();
    }
});
