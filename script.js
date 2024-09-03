document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const gameArea = document.getElementById('game-area');
    const progressArea = document.getElementById('progress-area');
    const rewardsArea = document.getElementById('rewards-area');
    const userInfo = document.getElementById('user-info');
    const feedbackElement = document.getElementById('feedback');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const optionsContainer = document.getElementById('options-container');
    let currentQuestionIndex = 0;
    let score = 0;
    let currentQuestions = [];

    startButton.addEventListener('click', startGame);

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
        // Add 48 more scenarios following the structure above.
    ];

    function startGame() {
        startButton.classList.add('hidden');
        gameArea.classList.remove('hidden');
        progressArea.classList.remove('hidden');
        rewardsArea.classList.remove('hidden');
        userInfo.classList.remove('hidden');

        currentQuestionIndex = 0;
        score = 0;
        currentQuestions = getRandomQuestions(25);
        loadQuestion();
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
    }

    function selectOption(isCorrect, explanation) {
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

    function endGame() {
        alert('Game over! Your score: ' + score);
        document.location.reload(); // Optionally reset the game
    }
});
