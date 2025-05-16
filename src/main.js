import "./styles/style.css";

const takeQuizzButton = document.querySelector(".start-quiz");
const landingPageSection = document.querySelector(".welcome-intro");

takeQuizzButton.onclick = () => {
    landingPageSection.classList.toggle('inactive-intro');
};

