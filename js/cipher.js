const finalPhrase = [
    "WILL",
    "YOU",
    "BE MY",
    "VALENTINE"
];

// Each letter is associated with a unique number
const letterToNumber = {
    "W": 12, "I": 45, "L": 33, "L": 33, "Y": 19, "O": 8, "U": 27,
    "B": 35, "E": 23, "M": 50, "Y": 19, "V": 6, "A": 11, "L": 33,
    "E": 23, "N": 29, "T": 5, "I": 45, "N": 29, "E": 23
};

// Riddles revealing letters that correspond to cipher numbers
const riddles = [
    { question: "What was the name of the restaurant I took you to on our first date?", answer: "SAGEWOOD", letters: { "S": 14, "A": 11, "G": 21, "E": 23, "W": 12, "O": 8, "D": 9 } },
    { question: 'Fill in the blank: "Goodnight, sweet dreams, _______, bye."', answer: "LOVE YOU", letters: { "L": 33, "O": 8, "V": 6, "E": 23, "Y": 19, "O": 8, "U": 27 } },
    { question: "Pet name I call you the most?", answer: "BUBS", letters: { "B": 35, "U": 27, "B": 35, "S": 14 } },
    { question: "What Disney movie did you make me watch when you were in Scottburgh?", answer: "LEMONADE MOUTH", letters: { 
        "L": 33, "E": 23, "M": 50, "O": 8, "N": 29, "A": 11, "D": 9, 
        "E": 23, "M": 50, "O": 8, "U": 27, "T": 5, "H": 16 
    }}
];

let revealedLetters = { "I": true }; // **Auto-fills "I"**
let correctRiddleCount = 0; // **Tracks how many riddles are solved**

document.addEventListener("DOMContentLoaded", function () {
    initializeCipher();
});

function initializeCipher() {
    const cipherGrid = document.getElementById("cipher-grid");
    const riddleContainer = document.getElementById("riddle-list");

    // Create separate rows for each word
    finalPhrase.forEach(word => {
        const row = document.createElement("div");
        row.classList.add("cipher-row");

        word.split("").forEach(letter => {
            if (letter !== " ") {  // 🚀 Prevents spaces from getting an input box
                const inputBox = document.createElement("input");
                inputBox.type = "text";
                inputBox.maxLength = 1;
                inputBox.classList.add("cipher-box");
                inputBox.dataset.letter = letter;
                inputBox.dataset.number = letterToNumber[letter];

                const numberLabel = document.createElement("div");
                numberLabel.classList.add("number-label");
                numberLabel.textContent = letterToNumber[letter];

                const container = document.createElement("div");
                container.style.display = "flex";
                container.style.flexDirection = "column";
                container.style.alignItems = "center";

                container.appendChild(inputBox);
                container.appendChild(numberLabel);
                row.appendChild(container);

                // **🚀 Automatically Fill "I" on Page Load**
                if (letter === "I") {
                    inputBox.value = "I";
                    inputBox.style.backgroundColor = "#c7ffc7"; // Light green to show it's auto-filled
                    inputBox.disabled = true; // Make it uneditable
                }
            } else {
                // 🚀 **Adds spacing between words while keeping alignment**
                const spaceBox = document.createElement("div");
                spaceBox.style.width = "20px"; // Adjust for proper spacing
                row.appendChild(spaceBox);
            }
        });

        cipherGrid.appendChild(row);
    });

    // Create riddles with input fields
    riddles.forEach((riddle, index) => {
        const riddleBlock = document.createElement("div");
        riddleBlock.classList.add("riddle-block");

        const riddleText = document.createElement("p");
        riddleText.classList.add("riddle");
        riddleText.textContent = `${index + 1}. ${riddle.question}`;

        const riddleInput = document.createElement("input");
        riddleInput.type = "text";
        riddleInput.classList.add("riddle-input");
        riddleInput.dataset.index = index;
        riddleInput.placeholder = "Your Answer";

        riddleInput.addEventListener("change", function () {
            checkRiddleAnswer(riddle, this);
        });

        riddleBlock.appendChild(riddleText);
        riddleBlock.appendChild(riddleInput);
        riddleContainer.appendChild(riddleBlock);
    });
}

function checkRiddleAnswer(riddle, inputElement) {
    const userAnswer = inputElement.value.toUpperCase().trim();
    if (userAnswer === riddle.answer) {
        inputElement.style.borderColor = "green";
        revealLetters(riddle.letters);

        correctRiddleCount++; // **Increase the correct count**
        triggerConfetti(1); // 🎉 **Confetti burst for a correct answer!**

        // 🎆 **BIG Confetti Explosion & Reveal Final Level Button**
        if (correctRiddleCount === riddles.length) {
            triggerConfetti(10);
            showFinalLevelButton();
        }
    } else {
        inputElement.style.borderColor = "red";
    }
}

function revealLetters(letters) {
    for (const [letter, number] of Object.entries(letters)) {
        const inputs = document.querySelectorAll(".cipher-box");
        inputs.forEach(input => {
            if (parseInt(input.dataset.number) === number) {
                input.value = letter;
                revealedLetters[letter] = true;
            }
        });
    }
}

function checkCipher() {
    const inputs = document.querySelectorAll(".cipher-box");
    let isCorrect = true;

    inputs.forEach(input => {
        if (!revealedLetters[input.dataset.letter]) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        document.getElementById("cipher-message").textContent = "You solved it! 🎉";
        showFinalLevelButton();
    } else {
        document.getElementById("cipher-message").textContent = "Not all letters are revealed yet!";
    }
}

/* 🎉 Confetti Function (Inside Cipher Container) */
function triggerConfetti(count) {
    const cipherContainer = document.getElementById("cipher-container");
    const rect = cipherContainer.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: {
                    x: (rect.left + rect.right) / 2 / window.innerWidth, // Centered in cipher container
                    y: (rect.top + rect.bottom) / 2 / window.innerHeight - 0.1
                }
            });
        }, i * 300); // Each burst slightly delayed
    }
}

/* 🚀 Reveal Final Level Button */
function showFinalLevelButton() {
    const finalButton = document.getElementById("final-level-button");
    finalButton.classList.remove("hidden"); // Show button
    finalButton.classList.add("final-level-animate"); // Add animation
}
