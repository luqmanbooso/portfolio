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
        '> initializing_developer.exe...',
        '> const role = "Full Stack Developer";',
        '> let passion = "Creating Solutions";',
        '> while(learning) { improve(); }',
        '> console.log("Ready to Code!");',
        '> import { creativity } from "mind";',
        '> function buildDreams() { return true; }'
    ];
    
    // Create typing container and cursor
    typewriterElement.classList.add('typing-container');
    typewriterElement.innerHTML = '';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'typed-text';
    
    const cursorElement = document.createElement('span');
    cursorElement.className = 'typewriter-cursor';
    cursorElement.innerHTML = '|';
    
    typewriterElement.appendChild(textSpan);
    typewriterElement.appendChild(cursorElement);
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    const typingSpeed = 80; // Slower for smoother effect
    const deletingSpeed = 40; // Slower for smoother deletion
    const waitAtEnd = 2500; // Wait time at end of phrase
    const waitAtStart = 800; // Wait time at start of phrase
    
    function typeAnimation() {
        if (isWaiting) return;
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Remove character
            textSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    typeAnimation();
                }, waitAtStart);
                return;
            }
        } else {
            // Add character
            textSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    typeAnimation();
                }, waitAtEnd);
                return;
            }
        }
        
        // Continue animation with appropriate speed
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeAnimation, speed + Math.random() * 50); // Add slight randomness
    }
    
    // Start animation after initial delay
    setTimeout(() => {
        typeAnimation();
    }, 1000);
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

// Setup custom coding-themed cursor
function setupCustomCursor() {
    // Create main cursor element with terminal styling
    const cursor = document.createElement('div');
    cursor.className = 'fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-200 ease-out';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #60A5FA;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
        box-shadow: 
            0 0 10px rgba(96, 165, 250, 0.5),
            inset 0 0 10px rgba(96, 165, 250, 0.2);
    `;
    document.body.appendChild(cursor);
    
    // Create cursor dot with terminal green
    const cursorDot = document.createElement('div');
    cursorDot.className = 'fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-100';
    cursorDot.style.cssText = `
        width: 4px;
        height: 4px;
        background: #10B981;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
    `;
    document.body.appendChild(cursorDot);
    
    // Create cursor text for hover states
    const cursorText = document.createElement('div');
    cursorText.className = 'fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:block font-mono text-xs text-blue-400 opacity-0 transition-all duration-200';
    cursorText.style.cssText = `
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        margin-top: 25px;
        background: rgba(0, 0, 0, 0.9);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid rgba(96, 165, 250, 0.3);
        font-size: 10px;
        white-space: nowrap;
    `;
    document.body.appendChild(cursorText);
    
    // Mouse move handler
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorText.style.left = `${e.clientX}px`;
        cursorText.style.top = `${e.clientY}px`;
    });
    
    // Enhanced hover effects for different elements
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input, textarea');
    const codeElements = document.querySelectorAll('code, pre');
    
    // Links hover effect
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#10B981';
            cursor.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.7), inset 0 0 15px rgba(16, 185, 129, 0.3)';
            cursorText.textContent = '> click';
            cursorText.style.opacity = '1';
            cursorDot.style.background = '#60A5FA';
        });
        
        link.addEventListener('mouseleave', () => {
            resetCursor();
        });
    });
    
    // Buttons hover effect
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
            cursor.style.borderColor = '#F59E0B';
            cursor.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.6), inset 0 0 12px rgba(245, 158, 11, 0.3)';
            cursorText.textContent = '$ execute';
            cursorText.style.opacity = '1';
            cursorText.style.color = '#F59E0B';
            cursorDot.style.background = '#F59E0B';
        });
        
        button.addEventListener('mouseleave', () => {
            resetCursor();
        });
    });
    
    // Input fields hover effect
    inputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursor.style.borderColor = '#8B5CF6';
            cursor.style.boxShadow = '0 0 8px rgba(139, 92, 246, 0.5), inset 0 0 8px rgba(139, 92, 246, 0.2)';
            cursorText.textContent = '| input';
            cursorText.style.opacity = '1';
            cursorText.style.color = '#8B5CF6';
            cursorDot.style.background = '#8B5CF6';
        });
        
        input.addEventListener('mouseleave', () => {
            resetCursor();
        });
    });
    
    // Code elements hover effect
    codeElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
            cursor.style.borderColor = '#EC4899';
            cursor.style.boxShadow = '0 0 10px rgba(236, 72, 153, 0.6), inset 0 0 10px rgba(236, 72, 153, 0.3)';
            cursorText.textContent = '</> code';
            cursorText.style.opacity = '1';
            cursorText.style.color = '#EC4899';
            cursorDot.style.background = '#EC4899';
        });
        
        element.addEventListener('mouseleave', () => {
            resetCursor();
        });
    });
    
    function resetCursor() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = '#60A5FA';
        cursor.style.boxShadow = '0 0 10px rgba(96, 165, 250, 0.5), inset 0 0 10px rgba(96, 165, 250, 0.2)';
        cursorText.style.opacity = '0';
        cursorText.style.color = '#60A5FA';
        cursorDot.style.background = '#10B981';
    }
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        cursorText.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
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
