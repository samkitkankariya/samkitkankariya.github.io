// Check if main.js already exists and has content
// ... existing code ...

// About Section Animation
document.addEventListener('DOMContentLoaded', function() {
    // Observer for expertise items
    const expertiseItems = document.querySelectorAll('.expertise-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const educationItem = document.querySelector('.education-item');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observer for expertise items with staggered delay
    expertiseItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observer for timeline items with staggered delay
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        observer.observe(item);
    });

    // Observer for education item
    if (educationItem) {
        educationItem.style.animationDelay = '0.3s';
        observer.observe(educationItem);
    }

    // Add animation to section headings
    const sectionHeadings = document.querySelectorAll('.heading, .timeline-heading, .education-heading');
    sectionHeadings.forEach(heading => {
        heading.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(20px)';
    });

    const headingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sectionHeadings.forEach(heading => {
        headingObserver.observe(heading);
    });
});

// ... existing code ... 