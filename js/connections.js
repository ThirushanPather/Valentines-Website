const words = [
    "Fireroom", "55 Koi", "Beira Alta", "Attikos", // Marsupials
    "Bridger- ton", "Rick and Morty", "Demon Slayer", "Attack on Titan",     // Chocolate Bars
    "It Takes Two", "Skribbl.io", "iMessage Pool", "Wii",    // Slang For Money
    "Kind", "Beautiful", "Smart", "Perfect"        // Naked ___
];

const groups = {
    "Restaurants we ate at in 2025": ["Fireroom", "55 Koi", "Beira Alta", "Attikos"],
    "Series we've watched together": ["Bridger- ton", "Rick and Morty", "Demon Slayer", "Attack on Titan"],
    "Games we've played together": ["It Takes Two", "Skribbl.io", "iMessage Pool", "Wii"],
    "Adjectives to describe you": ["Kind", "Beautiful", "Smart", "Perfect"]
};

let selectedWords = [];
let attempts = 4;
let correctGroupsCount = 0;

document.addEventListener("DOMContentLoaded", function () {
    initializeGame();
    document.getElementById("reveal-words").disabled = true;
});

function initializeGame() {
    const grid = document.getElementById("connections-grid");
    grid.innerHTML = "";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(4, auto)";
    grid.style.gap = "10px";

    const shuffledWords = words.sort(() => Math.random() - 0.5);

    shuffledWords.forEach(word => {
        const tile = document.createElement("div");
        tile.classList.add("word-tile");
        tile.textContent = word;
        tile.style.color = "black";
        tile.onclick = () => selectWord(tile);
        grid.appendChild(tile);
    });

    updateAttempts();
}

function selectWord(tile) {
    if (tile.classList.contains("selected")) {
        tile.classList.remove("selected");
        selectedWords = selectedWords.filter(word => word !== tile.textContent);
    } else {
        if (selectedWords.length < 4) {
            tile.classList.add("selected");
            selectedWords.push(tile.textContent);
        }
    }
}

function submitGroup() {
    if (selectedWords.length !== 4) {
        document.getElementById("message").textContent = "Select exactly 4 words.";
        return;
    }

    const groupNames = Object.keys(groups);
    let foundGroup = null;

    for (const groupName of groupNames) {
        const groupWords = groups[groupName];
        if (selectedWords.every(word => groupWords.includes(word))) {
            foundGroup = groupName;
            break;
        }
    }

    if (foundGroup) {
        displayGroup(foundGroup, selectedWords);
        correctGroupsCount++;

        // Single confetti burst when a group is correct
        triggerConfetti(1);

        // Show Next Level button and trigger 10 confetti bursts when all groups are correct
        if (correctGroupsCount === 4) {
            document.getElementById("next-level-button").classList.add("next-level-show");
            triggerConfetti(10);
        }
    } else {
        attempts--;
        updateAttempts();
        if (attempts === 0) {
            document.getElementById("message").textContent = "Game Over! Out of attempts.";
            document.getElementById("reveal-words").disabled = false;
        } else {
            document.getElementById("message").textContent = "Incorrect group. Try again.";
        }
    }

    selectedWords = [];
    document.querySelectorAll(".word-tile.selected").forEach(tile => tile.classList.remove("selected"));
}

/* Confetti Animation */
function triggerConfetti(burstCount) {
    if (typeof confetti !== "function") {
        console.error("Confetti is not loaded yet!");
        return;
    }

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 90,
                startVelocity: 45,
                scalar: 1.2,
                origin: { x: Math.random(), y: Math.random() * 0.6 } // Randomized position
            });
        }, i * 200); // Stagger each burst slightly
    }
}



function displayGroup(groupName, words) {
    removeWords(words);

    const correctPanel = document.getElementById("correct-groups");
    const groupBox = document.createElement("div");
    groupBox.classList.add("group-box");
    groupBox.innerHTML = `<p><strong>${groupName}</strong></p><p>${words.join(", ")}</p>`;
    correctPanel.appendChild(groupBox);
}

function removeWords(wordsToRemove) {
    wordsToRemove.forEach(word => {
        const tile = Array.from(document.querySelectorAll(".word-tile")).find(t => t.textContent === word);
        if (tile) tile.remove();
    });
}

function updateAttempts() {
    document.getElementById("attempts-remaining").textContent = `Attempts left: ${attempts}`;
}

function resetGame() {
    selectedWords = [];
    attempts = 4;
    correctGroupsCount = 0;

    document.getElementById("connections-grid").innerHTML = "";
    document.getElementById("correct-groups").innerHTML = "<h2>Correct Groups</h2>";
    document.getElementById("message").textContent = "";
    document.getElementById("attempts-remaining").textContent = `Attempts left: ${attempts}`;
    document.getElementById("reveal-words").disabled = true;
    document.getElementById("next-level-button").classList.remove("show");

    initializeGame();
}
