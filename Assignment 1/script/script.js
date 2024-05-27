const mobileMenu = document.getElementById('pop-up-navbar');
const mobileHeader = document.getElementById('nav-header-mobile');

mobileMenu.style.display = 'none';


mobileHeader.addEventListener('click', function () {
    var computedStyles = window.getComputedStyle(mobileMenu);

    console.log("mobileMenu computed styles: ", computedStyles.display);

    if (computedStyles.display === 'block') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'block';
    }
});

const indicatorsContainer = document.querySelector(".indicator-container");
const reviewCards = document.querySelectorAll(".review-card");

reviewCards.forEach((card, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("review-indicator");
    indicator.addEventListener("click", () => showReview(index));
    indicatorsContainer.appendChild(indicator);

    if (index === 0) {
        indicator.classList.add("active");
    }
});

const reviewContainer = document.querySelector(".review-slid-container");

function showReview(index) {
    const scrollValue = index * reviewCards[0].offsetWidth + 32;
    reviewContainer.scrollLeft = scrollValue;

    const indicators = document.querySelectorAll(".review-indicator");
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
    });
}



// const indicatorsContainer = document.querySelector(".indicator-container");
// const reviewCards = document.querySelectorAll(".review-card");

// reviewCards.forEach((card, index) => {
//     const indicator = document.createElement("div");
//     indicator.classList.add("review-indicator");
//     indicator.addEventListener("click", () => showReview(index));
//     indicatorsContainer.appendChild(indicator);
// });

// function showReview(index) {
//     reviewCards.forEach((card, i) => {
//         console.log(" :--> ",i, index);
//         card.style.transform = `translateX(${(i - index) * 350}px)`;
//     });

//     const indicators = document.querySelectorAll(".review-indicator");
//     indicators.forEach((indicator, i) => {
//         indicator.classList.toggle("active", i === index);
//     });
// }
