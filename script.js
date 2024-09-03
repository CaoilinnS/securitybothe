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

    function startGame() {
        gameArea.classList.remove('hidden');
        progressArea.classList.remove('hidden');
        rewardsArea.classList.remove('hidden');
        userInfo.classList.remove('hidden');
        startButton.classList.add('hidden');

        currentQuestions = getRandomQuestions(25);
        loadQuestion();
    }

    function getRandomQuestions(num) {
        // Simulate fetching random questions
        return []; // Implement this correctly to fetch questions
    }

    function loadQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            console.log('No more questions or index out of bounds.');
            return;
        }
        let question = currentQuestions[currentQuestionIndex];
        scenarioTitle.textContent = question.title;
        scenarioDescription.textContent = question.description;
        optionsContainer.innerHTML = ''; // Clear previous options

        question.options.forEach((option, index) => {
            let button = document.createElement('button');
            button.textContent = option.text;
            button.className = 'option-button';
            button.onclick = function() { selectOption(option.correct); };
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(isCorrect) {
        if (isCorrect) {
            score += 10; // Increment score for correct answer
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'correct';
        } else {
            feedbackElement.textContent = 'Incorrect!';
            feedbackElement.className = 'incorrect';
        }
        feedbackElement.classList.remove('hidden');

        setTimeout(() => {
            feedbackElement.classList.add('hidden');
            if (++currentQuestionIndex < currentQuestions.length) {
                loadQuestion();
            } else {
                endGame();
            }
        }, 2000);
    }

    function endGame() {
        alert('Game over! Your score: ' + score);
        document.location.reload(); // Reload the game
    }
});
