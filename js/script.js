/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle menu with click
menuIcon.onclick = () => {
    toggleMenu();
};

// Toggle menu with keyboard (Enter or Space)
menuIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
    }
});

function toggleMenu() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Set focus to the first nav link when opening the menu
    if (navbar.classList.contains('active')) {
        const firstNavLink = navbar.querySelector('a');
        if (firstNavLink) {
            setTimeout(() => {
                firstNavLink.focus();
            }, 100);
        }
    }
}

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


/*========== sticky navbar ==========*/
let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY >= 0);


/*========== remove menu icon navbar when click navbar link (scroll) ==========*/
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (navbar.classList.contains('active') && 
        !navbar.contains(event.target) && 
        event.target !== menuIcon) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Close menu when Escape key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.focus(); // Return focus to the menu button
    }
});

// Handle "tab" key navigation in mobile menu
navbar.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && navbar.classList.contains('active')) {
        const focusableElements = navbar.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // If shift+tab on first element, move to menu icon
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            menuIcon.focus();
        }
        
        // If tab on last element and menu is open, close menu and move focus appropriately
        if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            darkModeToggle.focus();
        }
    }
});

/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

/*============================================================================
  DARK MODE FUNCTIONALITY
  - Toggles between light and dark themes
  - Uses localStorage to persist user preference
  - Checks system preference using prefers-color-scheme
  - Includes transition effect for smooth theme switching
  - Supports keyboard accessibility
============================================================================*/

// Get the dark mode toggle button
let darkModeToggle = document.querySelector('#dark-mode-toggle-btn');

// Toggle dark mode when button is clicked
darkModeToggle.onclick = () => {
    toggleDarkMode();
};

// Support keyboard navigation (Enter and Space keys)
darkModeToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default space key scrolling
        toggleDarkMode();
    }
});

// Main function to toggle dark mode
function toggleDarkMode() {
    // Add a transition class to the body for smooth color/background transitions
    document.body.classList.add('theme-transition');
    
    // Add a class for icon animation
    darkModeToggle.classList.add('icon-transition');
    
    // Toggle the dark-mode class
    document.body.classList.toggle('dark-mode');
    
    // Log the current theme state for testing
    console.log('Theme changed to:', document.body.classList.contains('dark-mode') ? 'dark' : 'light');

    // Store the user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        // Dispatch an event that can be listened to by other components
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: 'dark' } }));
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
        // Dispatch an event that can be listened to by other components
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: 'light' } }));
    }

    // Remove the transition classes after the transition is complete (300ms)
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
        darkModeToggle.classList.remove('icon-transition');
    }, 300);
}

// Check for user's preferred color scheme
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme based on user preference or system setting
function initializeTheme() {
    // Remove transition during initial load to prevent flash
    document.body.classList.add('no-transition');
    
    // Set default - always initialize with a value
    let useDarkMode = false;
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        useDarkMode = true;
    } else if (localStorage.getItem('darkMode') === 'disabled') {
        useDarkMode = false;
    } else if (prefersDarkMode.matches) {
        // If no preference is stored but system prefers dark mode
        useDarkMode = true;
        // Save this preference
        localStorage.setItem('darkMode', 'enabled');
    } else {
        // Set explicit default if nothing else matches
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Apply the theme
    if (useDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    
    // Re-enable transitions after a small delay
    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 100);
    
    console.log('Theme initialized as:', useDarkMode ? 'dark' : 'light');
}

// Call the initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Listen for changes in system preference
prefersDarkMode.addEventListener('change', (event) => {
    // Only apply system preference if user hasn't set a preference
    if (!localStorage.getItem('darkMode')) {
        if (event.matches) {
            document.body.classList.add('dark-mode');
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            document.body.classList.remove('dark-mode');
            darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
});

/*============================================================================
  REDUCED MOTION FUNCTIONALITY
  - Checks if user has requested reduced motion in their system preferences
  - Disables animations and transitions when reduced motion is preferred
============================================================================*/

/*========== scroll reveal ==========*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

/*========== Handle prefers-reduced-motion ==========*/
// Check if the user has set prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function disableAnimations() {
    // Disable scroll animations
    ScrollReveal().reveal = function() {};
    
    // Disable transition effects
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            animation-duration: 0.001s !important;
            transition-duration: 0.001s !important;
        }
    `;
    document.head.appendChild(style);
}

// Apply on page load if needed
if (prefersReducedMotion.matches) {
    disableAnimations();
}

// Listen for changes to the prefers-reduced-motion setting
prefersReducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
        disableAnimations();
    }
    // No need to re-enable animations as it would require page reload
});