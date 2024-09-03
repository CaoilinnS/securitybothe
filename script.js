// Function to load a question
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        console.error("No more questions available.");
        endGame(); // Call end game if index is out of bounds
        return; // Exit function to avoid errors
    }

    const question = currentQuestions[currentQuestionIndex];
    if (!question) {
        console.error("Question data is undefined.");
        return; // Exit function if question data is not available
    }

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
    if (!question) {
        console.error("Failed to retrieve current question data.");
        return; // Safety check to prevent runtime errors
    }

    const correct = question.options[index].correct;
    const explanation = question.explanations[index];

    showFeedback(correct ? `Correct! ${explanation}` : `Incorrect. ${explanation}`, correct);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= currentQuestions.length) {
            endGame();
        } else {
            loadQuestion();
            updateUI();
        }
    }, 2000); // Delay to allow players to read feedback before moving to the next question
}
