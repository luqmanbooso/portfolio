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
    
    // Setup custom cursor
    setupCustomCursor();
    
    // Setup enhanced navigation animations
    setupNavigationAnimations();
    
    // Setup form field animations
    setupFormFieldAnimations();
    
    // Initialize enhanced typewriter effect
    initTypewriter();
    
    // Setup 3D effect for profile image
    setupProfileImageEffect();
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

// Enhanced typewriter effect with multiple phrases and smooth animations
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    const phrases = [
        'Full Stack Developer',
        'Problem Solver',
        'Creative Coder',
        'Software Engineer',
        'Innovation Enthusiast',
        'Tech Explorer',
        'Digital Creator'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeText() {
        if (isWaiting) return;
        
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            // Typing
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            setTimeout(typeText, 80 + Math.random() * 50); // Variable typing speed
        } else if (isDeleting && currentCharIndex > 0) {
            // Deleting
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            setTimeout(typeText, 40 + Math.random() * 30); // Faster deleting
        } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Finished typing, wait then start deleting
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeText();
            }, 2000); // Wait 2 seconds before deleting
        } else if (isDeleting && currentCharIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            
            setTimeout(typeText, 500); // Brief pause before next phrase
        }
    }
    
    // Add glowing cursor effect
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor animate-pulse';
    cursor.innerHTML = '|';
    cursor.style.color = '#00d4ff';
    cursor.style.marginLeft = '2px';
    cursor.style.animation = 'blink 1s infinite';
    
    // Start animation after a short delay
    setTimeout(() => {
        typeText();
        typewriterElement.appendChild(cursor);
    }, 1000);
    
    // Add typing sound effect (optional)
    function playTypingSound() {
        // Uncomment if you want typing sounds
        // const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfCDuO1/DQfyEyoXjONQAACFZwAAD///8AAAcAEg///////w==');
        // audio.volume = 0.1;
        // audio.play().catch(() => {});
    }
}

// Setup 3D perspective hover for profile image
function setupProfileImageEffect() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    profileContainer.addEventListener('mousemove', (e) => {
        const rect = profileContainer.getBoundingClientRect();
        const x = e.clientX - rect.left; // Position within element
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateX = (y - centerY) / 10 * -1; // Reverse Y-axis rotation
        const rotateY = (x - centerX) / 10;
        
        profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    profileContainer.addEventListener('mouseleave', () => {
        profileContainer.style.transform = '';
    });
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
    
    // Reveal elements on scroll with staggered effect
    const revealContainers = document.querySelectorAll('.reveal-container');
    
    revealContainers.forEach(container => {
        const revealElements = container.querySelectorAll('.reveal-item');
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                revealElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('opacity-100', 'translate-y-0');
                        element.classList.remove('opacity-0', 'translate-y-10');
                    }, index * 150);
                });
                observer.unobserve(container);
            }
        }, { threshold: 0.2 });
        
        observer.observe(container);
    });
    
    // Animated background gradient movement
    const gradientBgs = document.querySelectorAll('.animated-gradient');
    
    gradientBgs.forEach(element => {
        const colors = element.dataset.colors ? element.dataset.colors.split(',') : ['#60A5FA', '#8B5CF6', '#EC4899'];
        let angle = 0;
        
        setInterval(() => {
            angle = (angle + 1) % 360;
            element.style.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
        }, 100);
    });
}

// Setup hover animations
function setupHoverAnimations() {
    // Project cards hover effect with enhanced 3D tilt
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxRotation = 8; // Maximum rotation in degrees
            
            const rotateY = maxRotation * ((x - centerX) / centerX);
            const rotateX = -maxRotation * ((y - centerY) / centerY);
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `0 25px 50px -12px rgba(0, 0, 0, 0.5)`;
            
            // Move highlight effect
            const highlight = card.querySelector('.card-highlight');
            if (highlight) {
                highlight.style.opacity = '1';
                highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
            
            const highlight = card.querySelector('.card-highlight');
            if (highlight) {
                highlight.style.opacity = '0';
            }
        });
    });
    
    // Button hover animation
    const animatedButtons = document.querySelectorAll('.animated-button');
    
    animatedButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 10px 20px -5px rgba(96, 165, 250, 0.5)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 5px 15px -8px rgba(96, 165, 250, 0.3)';
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

// Setup enhanced navigation animations
function setupNavigationAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add initial and hover animations for nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'absolute inset-0 block bg-primary-dark/10 rounded-full scale-0';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 700);
        });
    });
    
    // Add scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'h-1 bg-primary-dark fixed top-0 left-0 z-50 transition-all duration-300';
    document.body.appendChild(progressIndicator);
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressIndicator.style.width = `${progress}%`;
    });
}

// Setup form field animations
function setupFormFieldAnimations() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('scale-105');
            input.classList.add('border-primary-dark');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('scale-105');
            if (!input.value) {
                input.classList.remove('border-primary-dark');
            }
        });
        
        // Validate on input
        input.addEventListener('input', () => {
            if (input.type === 'email') {
                const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (input.value && !emailRegex.test(input.value)) {
                    input.classList.add('border-red-500');
                    input.classList.remove('border-primary-dark', 'border-green-500');
                } else if (input.value) {
                    input.classList.add('border-green-500');
                    input.classList.remove('border-primary-dark', 'border-red-500');
                }
            } else {
                if (input.value) {
                    input.classList.add('border-primary-dark');
                }
            }
        });
    });
    
    // Add animation for form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            contactForm.querySelectorAll('.form-group').forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add('opacity-50');
                }, index * 100);
            });
        });
    }
}

// Add this new animation for page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Page transition animation
    const transitionElement = document.createElement('div');
    transitionElement.className = 'fixed inset-0 bg-background-dark z-[9999] transform translate-y-full';
    document.body.appendChild(transitionElement);
    
    // Links that should trigger page transitions
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            
            // Animate transition in
            transitionElement.style.transform = 'translateY(0)';
            transitionElement.style.transition = 'transform 0.5s ease-in-out';
            
            setTimeout(() => {
                // Scroll to target section
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'auto'
                    });
                }
                
                // Animate transition out
                transitionElement.style.transform = 'translateY(-100%)';
                
                setTimeout(() => {
                    // Reset transition element
                    transitionElement.style.transition = 'none';
                    transitionElement.style.transform = 'translateY(100%)';
                }, 500);
            }, 500);
        });
    });
});
