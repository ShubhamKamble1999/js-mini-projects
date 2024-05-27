document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const indicatorsContainer = document.querySelector(".indicators");

    const totalItems = document.querySelectorAll(".carousel-item").length;
    let currentIndex = 0;

    function updateCarousel() {
        const translateValue = -currentIndex * 100 + "%";
        carousel.style.transform = "translateX(" + translateValue + ")";

        updateIndicators();
    }

    function updateIndicators() {
        const dots = Array.from(indicatorsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function createIndicators() {
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement("div");
            dot.classList.add("indicator-dot");
            dot.addEventListener("click", () => goToSlide(i));
            indicatorsContainer.appendChild(dot);
        }
    }

    createIndicators();
    updateCarousel();
});
