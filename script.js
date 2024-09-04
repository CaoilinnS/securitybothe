document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const gameArea = document.getElementById('game-area');
    const progressArea = document.getElementById('progress-area');
    const rewardsArea = document.getElementById('rewards-area');
    const userInfo = document.getElementById('user-info');
    const feedbackElement = document.getElementById('feedback');
    
    let currentQuestionIndex = 0;
    let score = 0;
    let level = 1;

    // Debugging: Check if buttons are found and listeners are attached
    if (!startButton || !restartButton) {
        console.error('Start or restart button not found in the DOM');
    }

    startButton.addEventListener('click', function() {
        console.log('Start button clicked');
        startGame();
    });

    restartButton.addEventListener('click', function() {
        console.log('Restart button clicked');
        restartGame();
    });

    function startGame() {
        // Ensure correct elements are shown/hidden
        startButton.classList.add('hidden'); // Hide start button
        restartButton.classList.add('hidden'); // Ensure restart button is hidden at the start
        gameArea.classList.remove('hidden'); // Show game area
        progressArea.classList.remove('hidden');
        rewardsArea.classList.remove('hidden');
        userInfo.classList.remove('hidden');
        
        // Reset game variables
        currentQuestionIndex = 0;
        score = 0;
        level = 1;
        loadQuestion(); // Call the function that loads the questions
    }

    function restartGame() {
        console.log('Game restarted'); 
        // Reset game variables and UI components to restart
        score = 0;
        level = 1;
        currentQuestionIndex = 0;
        startGame(); // Restart the game by calling startGame()
    }

    function loadQuestion() {
        console.log('Loading question ' + (currentQuestionIndex + 1));
        // Load questions and handle the game logic here
    }
});


    const allScenarios = [
        {
            title: "Software Piracy",
            description: "A friend offers to share a pirated version of an expensive software program. What should you do?",
            options: [
                { text: "Accept the offer, it's a great deal", correct: false },
                { text: "Politely decline and explain why piracy is unethical", correct: true },
                { text: "Report your friend to the software company", correct: false },
                { text: "Download the pirated software, no one will know", correct: false }
            ],
            explanations: [
                "Using pirated software is illegal and can expose your device to security risks.",
                "Declining the offer and explaining the ethical concerns is the best approach.",
                "Reporting your friend may damage the relationship and is an excessive response.",
                "Downloading pirated software is illegal and can lead to legal consequences."
            ]
        },
        {
            title: "Physical Security",
            description: "You need to leave your laptop unattended at a café. How can you best protect it?",
            options: [
                { text: "Leave it on the table, it'll be fine", correct: false },
                { text: "Lock your laptop to the table with a security cable", correct: true },
                { text: "Ask the barista to watch over your laptop", correct: false },
                { text: "Take your laptop with you, even to the restroom", correct: true }
            ],
            explanations: [
                "Leaving your laptop unattended on a table makes it an easy target for theft.",
                "Using a security cable to lock your laptop to the table deters opportunistic thieves.",
                "Relying on the barista to watch over your laptop is not a reliable security measure.",
                "Taking your laptop with you, even for short periods, is the safest option to prevent theft."
            ]
        },
        {
            title: "Wireless Networking",
            description: "You're at a hotel and need to connect to the internet. What's the best approach?",
            options: [
                { text: "Use the hotel's free Wi-Fi without hesitation", correct: false },
                { text: "Ask the hotel staff for the Wi-Fi password", correct: false },
                { text: "Use a VPN to secure your connection", correct: true },
                { text: "Wait until you get home to access sensitive information", correct: true }
            ],
            explanations: [
                "Public Wi-Fi at hotels can be insecure and expose your data to potential threats.",
                "Relying on the hotel staff's assurance of the Wi-Fi's security may not be enough.",
                "Using a VPN encrypts your connection and helps protect your data on public networks.",
                "Waiting until you're on a secure network is the safest option for sensitive tasks."
            ]
        },
        {
            title: "Mobile Device Security",
            description: "You've lost your smartphone. What should you do first?",
            options: [
                { text: "Wait and hope someone returns it", correct: false },
                { text: "Immediately report the loss to your mobile provider", correct: true },
                { text: "Try to locate the device using a tracking app", correct: true },
                { text: "Cancel all your accounts and get a new phone", correct: false }
            ],
            explanations: [
                "Passively waiting for the device to be returned increases the risk of data compromise.",
                "Reporting the loss to your mobile provider allows them to suspend service and track the device.",
                "Using a tracking app can help locate the lost device and potentially recover it.",
                "Canceling all accounts and getting a new phone is an excessive and costly response."
            ]
        },
        {
            title: "Online Shopping Security",
            description: "You're making an online purchase. What should you look for to ensure a secure transaction?",
            options: [
                { text: "Use the first payment option presented", correct: false },
                { text: "Check for a secure HTTPS connection", correct: true },
                { text: "Provide your full Social Security number for verification", correct: false },
                { text: "Save your login credentials on the website for convenience", correct: false }
            ],
            explanations: [
                "The first payment option may not be the most secure, so it's important to review all options.",
                "The presence of a secure HTTPS connection indicates the website is using encryption to protect your data.",
                "Providing sensitive information like your Social Security number increases the risk of identity theft.",
                "Saving login credentials on websites can make your accounts vulnerable if the website is compromised."
            ]
        },
        {
            title: "Removable Media Security",
            description: "You receive a USB drive from an unknown source. What should you do?",
            options: [
                { text: "Plug it into your computer to see what's on it", correct: false },
                { text: "Destroy the USB drive to be safe", correct: false },
                { text: "Scan the USB drive with antivirus software before opening it", correct: true },
                { text: "Give the USB drive to your IT department to investigate", correct: true }
            ],
            explanations: [
                "Plugging in an unknown USB drive can expose your computer to potential malware or viruses.",
                "Destroying the USB drive is an excessive measure and may not be necessary.",
                "Scanning the USB drive with antivirus software can help detect and prevent any threats before opening it.",
                "Giving the USB drive to your IT department allows them to properly investigate the contents and ensure it's safe."
            ]
        },
        {
            title: "Social Engineering Attacks",
            description: "Someone calls claiming to be from your bank and asks for your account details. What do you do?",
            options: [
                { text: "Provide the requested information to avoid issues with your account", correct: false },
                { text: "Hang up and call your bank's customer service number directly", correct: true },
                { text: "Ask the caller for their employee ID and call back the bank's main number", correct: true },
                { text: "Threaten the caller and demand they stop calling", correct: false }
            ],
            explanations: [
                "Providing sensitive information over the phone can lead to identity theft and financial loss.",
                "Hanging up and calling your bank's customer service number directly ensures you're speaking with a legitimate representative.",
                "Verifying the caller's identity by calling the bank's main number helps confirm the legitimacy of the request.",
                "Threatening the caller may escalate the situation and is an ineffective way to handle a potential social engineering attack."
            ]
        },
        {
            title: "Phishing Awareness",
            description: "You receive an email with a link claiming to be from a trusted company. What should you do?",
            options: [
                { text: "Click the link to see what it's about", correct: false },
                { text: "Forward the email to the company to let them know", correct: true },
                { text: "Reply to the sender asking for more information", correct: false },
                { text: "Delete the email and don't take any action", correct: true }
            ],
            explanations: [
                "Clicking the link could lead to a phishing attack and expose your personal information.",
                "Forwarding the email to the company allows them to investigate and take appropriate action.",
                "Replying to the sender can confirm that your email address is active, leading to more phishing attempts.",
                "Deleting the email without interaction is the safest option to avoid potential phishing scams."
            ]
        },
        {
            title: "Ransomware Prevention",
            description: "You receive an email with an attached file that claims to be an important document. What should you do?",
            options: [
                { text: "Open the attachment to see what it is", correct: false },
                { text: "Scan the attachment with antivirus software before opening it", correct: true },
                { text: "Forward the email to your IT department for investigation", correct: true },
                { text: "Reply to the sender asking for more details about the document", correct: false }
            ],
            explanations: [
                "Opening an attachment from an untrusted source can expose your device to ransomware or other malware.",
                "Scanning the attachment with antivirus software can help detect and prevent any potential threats before opening it.",
                "Forwarding the email to your IT department allows them to properly investigate the contents and ensure it's safe.",
                "Replying to the sender can confirm that your email address is active, leading to more phishing attempts."
            ]
        },
        {
            title: "Wireless Network Spoofing",
            description: "You're at a conference and see a Wi-Fi network with the same name as the conference's network. What should you do?",
            options: [
                { text: "Connect to the network, it's probably just the conference's network", correct: false },
                { text: "Ask the conference organizers about the network before connecting", correct: true },
                { text: "Connect to the network and use a VPN to secure your connection", correct: false },
                { text: "Avoid connecting to any Wi-Fi networks at the conference", correct: true }
            ],
            explanations: [
                "Connecting to a spoofed network can expose your device and data to potential threats.",
                "Checking with the conference organizers can help verify the legitimacy of the network before connecting.",
                "Using a VPN may not be enough to secure a connection to a spoofed network.",
                "Avoiding conference Wi-Fi networks altogether is the safest option to prevent potential network spoofing attacks."
            ]
        },
        {
            title: "Backup and Recovery",
            description: "Your computer has been acting strangely, and you suspect a malware infection. What should you do?",
            options: [
                { text: "Reinstall the operating system to fix the issues", correct: false },
                { text: "Restore your computer from a recent backup", correct: true },
                { text: "Ignore the issues and continue using the computer", correct: false },
                { text: "Ask your friends for help troubleshooting the problem", correct: false }
            ],
            explanations: [
                "Reinstalling the operating system can be time-consuming and may not resolve the underlying issue.",
                "Restoring your computer from a recent backup can help remove the malware and recover your data.",
                "Ignoring the issues can lead to further damage or data loss if the malware continues to spread.",
                "Asking friends for help may not be the most effective way to handle a suspected malware infection."
            ]
        },
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
        // Additional scenarios go here
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
        currentQuestions = getRandomQuestions(25); // You can adjust the number dynamically
        loadQuestion();
    }

    function restartGame() {
        // Reset the game variables and reload the first question
        score = 0;
        level = 1;
        currentQuestionIndex = 0;
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
        restartButton.classList.remove('hidden');
    }
});
