const secretWord = "HEART"; // Change this to a romantic word 💖
let attempts = 0;
const maxAttempts = 6;

document.addEventListener("DOMContentLoaded", function () {
    createGrid();
});

function createGrid() {
    const grid = document.getElementById("word-grid");
    grid.innerHTML = "";

    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.classList.add("letter-box");
            box.id = `box-${i}-${j}`;
            grid.appendChild(box);
        }
    }
}

function submitGuess() {
    if (attempts >= maxAttempts) return;

    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) {
        document.getElementById("message").textContent = "Enter a 5-letter word!";
        return;
    }

    let delay = 0; // Start delay counter

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box-${attempts}-${i}`);
        box.style.opacity = 0; // Make box invisible before animation

        setTimeout(() => {
            box.textContent = guess[i];
            box.style.opacity = 1; // Fade in effect
            box.classList.add("pop-effect"); // Add pop animation

            if (guess[i] === secretWord[i]) {
                box.classList.add("correct");
            } else if (secretWord.includes(guess[i])) {
                box.classList.add("present");
            } else {
                box.classList.add("absent");
            }
        }, delay);

        delay += 200; // Delay each letter by 200ms
    }

    setTimeout(() => {
        if (guess === secretWord) {
            document.getElementById("message").textContent = "You guessed it! 🎉";
            triggerConfetti(); // Launch confetti animation
            showNextLevelButton(); // Reveal the Next Level button
        } else if (attempts >= maxAttempts - 1) {
            document.getElementById("message").textContent = `Out of tries! The word was ${secretWord}.`;
        }
    }, delay + 500);

    attempts++;
    guessInput.value = "";
}

/* Function to reveal the Next Level button */
function showNextLevelButton() {
    const nextLevelBtn = document.getElementById("next-level-button");
    nextLevelBtn.classList.add("next-level-show"); // Adds animation
}

/* Confetti Animation - More confetti from different parts of the screen */
function triggerConfetti() {
    if (typeof confetti !== "function") {
        console.error("Confetti is not loaded yet!");
        return;
    }

    // Launch multiple confetti bursts from different positions
    const confettiSettings = [
        { origin: { x: 0.2, y: 0.6 } }, // Left side
        { origin: { x: 0.5, y: 0.4 } }, // Center-top
        { origin: { x: 0.8, y: 0.6 } }  // Right side
    ];

    confettiSettings.forEach((settings) => {
        confetti({
            particleCount: 100,
            spread: 90,
            startVelocity: 45,
            scalar: 1.2,
            ...settings
        });
    });
}

function resetGame() {
    attempts = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("guess-input").value = "";
    createGrid();
}
