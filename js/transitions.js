document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); 
            let target = this.href;

            document.body.style.opacity = 0; 
            setTimeout(() => {
                window.location.href = target;
            }, 500); 
        });
    });
});
