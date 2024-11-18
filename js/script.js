// JavaScript for the banner slider

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Function to move the slider to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Wrap around to the first slide
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Move the slider
    }

    // Set an interval for automatic slider transition
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Add event listeners for buttons to control slider manually if desired
    const nextButton = document.createElement('button');
    nextButton.innerHTML = "Next Slide";
    nextButton.style.position = "absolute";
    nextButton.style.top = "50%";
    nextButton.style.right = "20px";
    nextButton.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    nextButton.style.color = "white";
    nextButton.style.border = "none";
    nextButton.style.padding = "10px";
    nextButton.style.cursor = "pointer";

    document.querySelector('.banner').appendChild(nextButton);

    nextButton.addEventListener('click', nextSlide);
});
