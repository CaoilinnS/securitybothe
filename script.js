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

    const allScenarios = [
        // Updated scenario data...
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
