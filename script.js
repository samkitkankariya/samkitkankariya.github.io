 // JavaScript to toggle mobile menu slider
        document.addEventListener("DOMContentLoaded", function () {
            const menuToggle = document.querySelector(".js-menu-toggle");
            const mobileMenu = document.querySelector(".site-mobile-menu");

            menuToggle.addEventListener("click", function () {
                mobileMenu.classList.toggle("active");
            });
        });

const nameElement = document.getElementById('name');
const words = ['Samkit Kankariya.','Traveler.', 'Videographer.', 'Content Writer.', 'Video Editor.'];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < words[wordIndex].length) {
        nameElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100); // Delay between each character typing
    } else {
        setTimeout(backspaceEffect, 1500); // Delay after typing the word
    }
}

function backspaceEffect() {
    if (charIndex > 0) {
        nameElement.textContent = nameElement.textContent.slice(0, -1);
        charIndex--;
        setTimeout(backspaceEffect, 50); // Delay between each backspace
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        nameElement.textContent = ""; // Clear the name element before typing the next word
        setTimeout(typeEffect, 500); // Delay after backspacing to start typing the next word
    }
}

typeEffect(); // Start the animation when the page loads

 function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItem = entry.target;
                const animation = timelineItem.dataset.aosAnimation;
                timelineItem.classList.add('aos-animate', animation);
            }
        });
    }

    function setupIntersectionObserver() {
        const timelineItems = document.querySelectorAll('.item');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2 // Adjust the threshold value as per your requirement
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        timelineItems.forEach(item => observer.observe(item));
    }

    // Call the setupIntersectionObserver function when the page is loaded
    window.addEventListener('load', setupIntersectionObserver);
//BLOG
