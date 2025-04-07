// Main JavaScript functionality for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
    
    // Theme Toggle Functionality
    setupThemeToggle();
    
    // Mobile Menu Functionality
    setupMobileMenu();
    
    // Initialize the router when document is loaded
    initializeRouter();
    
    // Hide loader when everything is ready
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('opacity-0');
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 500);
    
    // Setup scroll events
    setupScrollEvents();
});

// Initialize the router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const router = initializeRouter();
    // Other initialization code can go here
});

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or respect OS preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        
        // Save preference to localStorage
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    
    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('show');
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
    });
    
    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
        });
    });
}

function setupScrollEvents() {
    // Add scroll event listener for parallax effects and animations
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for hero section
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Animate skill bars on scroll
        animateSkillBarsOnScroll();
        
        // Add/remove sticky class to header
        const header = document.querySelector('header');
        if (scrollPosition > 100) {
            header.classList.add('shadow-md');
            header.classList.add('bg-white/90', 'backdrop-blur-sm');
            header.classList.add('dark:bg-gray-900/90');
        } else {
            header.classList.remove('shadow-md');
            header.classList.remove('bg-white/90', 'backdrop-blur-sm');
            header.classList.remove('dark:bg-gray-900/90');
        }
    });
}

function animateSkillBarsOnScroll() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;
    
    const skillBars = document.querySelectorAll('.progress-ring__circle');
    
    const sectionPosition = skillSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        skillBars.forEach(circle => {
            const percent = circle.getAttribute('data-percent') || 0;
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            const offset = circumference - (percent / 100 * circumference);
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        });
    }
}

// Form validation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            showFormError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        showFormSuccess('Thank you! Your message has been sent.');
        contactForm.reset();
    });
}

function showFormError(message) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = 'mt-4 text-red-500';
    
    setTimeout(() => {
        formStatus.textContent = '';
    }, 3000);
}

function showFormSuccess(message) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = 'mt-4 text-green-500';
    
    setTimeout(() => {
        formStatus.textContent = '';
    }, 3000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
