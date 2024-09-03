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
        // Additional 49 scenarios would follow...
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
