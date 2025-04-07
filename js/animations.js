// Advanced animations for the portfolio

// Initialize animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counters for statistics
    initCounters();
    
    // Initialize typing animation
    initTypewriter();
    
    // Setup scroll-triggered animations
    setupScrollAnimations();
    
    // Setup hover animations
    setupHoverAnimations();
    
    // Setup cursor effects
    setupCustomCursor();
});

// Animate counting up for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize typewriter effect
function initTypewriter() {
    const typeElement = document.querySelector('.typewriter h1');
    if (!typeElement) return;
    
    const phrases = [
        'Hello World!',
        'I build web applications.',
        'I solve problems.',
        'I create experiences.'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // milliseconds
    const deletingSpeed = 50; // milliseconds
    const pauseEnd = 1000; // pause at the end of phrase
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Remove a character
            typeElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typeElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine speed based on whether deleting or not
        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        // If complete phrase is typed
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of typing
            typeSpeed = pauseEnd;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase after deleting
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    // Parallax effect for sections
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxSections.forEach(section => {
            const speed = section.dataset.speed || 0.1;
            section.style.backgroundPositionY = `${scrollY * speed}px`;
        });
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Setup hover animations
function setupHoverAnimations() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('scale-105', 'shadow-xl');
            const image = card.querySelector('.project-image');
            if (image) image.classList.add('scale-110');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('scale-105', 'shadow-xl');
            const image = card.querySelector('.project-image');
            if (image) image.classList.remove('scale-110');
        });
    });
    
    // Skill icons hover effect
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('animate-bounce');
        });
        
        icon.addEventListener('mouseleave', () => {
            setTimeout(() => {
                icon.classList.remove('animate-bounce');
            }, 1000);
        });
    });
}

// Setup custom cursor
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-8 h-8 rounded-full border-2 border-primary-light dark:border-primary-dark pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'fixed w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect to links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-150');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-150');
        });
    });
    
    // Hide default cursor
    document.body.classList.add('cursor-none');
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.classList.add('opacity-0');
        cursorDot.classList.add('opacity-0');
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.classList.remove('opacity-0');
        cursorDot.classList.remove('opacity-0');
    });
}
