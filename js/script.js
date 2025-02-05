function startGame() {
    const glowPanel = document.querySelector(".glow-panel");

    // Step 1: Fade out the panel
    glowPanel.classList.add("fade-out");

    // Step 2: After fading out, transition to Level 1
    setTimeout(() => {
        window.location.href = "level1.html";
    }, 2000); // Matches the CSS fade-out duration
}
