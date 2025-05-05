// Main JavaScript functionality for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
    
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
    
    // Setup scroll-to-top button
    setupScrollToTop();
    
    // Setup email sending functionality
    setupEmailService();
    
    // Setup contact form
    setupContactForm();
});

// Initialize the router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const router = initializeRouter();
    // Other initialization code can go here
});

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
            header.classList.add('backdrop-blur-sm');
            header.classList.add('bg-gray-900/90');
        } else {
            header.classList.remove('shadow-md');
            header.classList.remove('backdrop-blur-sm');
            header.classList.remove('bg-gray-900/90');
        }
        
        // Toggle scroll-to-top button visibility
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollPosition > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        // Add active class to current section in navigation
        highlightCurrentSection(scrollPosition);
    });
}

function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    scrollToTopBtn.addEventListener('click', () => {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function highlightCurrentSection(scrollPosition) {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('text-primary-dark');
                link.classList.remove('after:w-full');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('text-primary-dark');
                activeLink.classList.add('after:w-full');
            }
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

// Email service setup
function setupEmailService() {
    // Initialize EmailJS with your user ID
    // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
    emailjs.init("YOUR_USER_ID");
}

// Form validation and submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('submit-button-loading');
        submitBtn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                showFormSuccess('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('Failed to send email.', error);
                showFormError('Failed to send message. Please try again later.');
            })
            .finally(function() {
                // Remove loading state
                submitBtn.classList.remove('submit-button-loading');
                submitBtn.disabled = false;
            });
    });
}

function showFormError(message) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = 'success-message mt-4 p-4 rounded-md bg-red-900/50 text-red-200';
    formStatus.classList.add('show');
    
    setTimeout(() => {
        formStatus.classList.remove('show');
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'success-message mt-4 p-4 rounded-md text-center';
        }, 500);
    }, 4000);
}

function showFormSuccess(message) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = 'success-message mt-4 p-4 rounded-md bg-green-900/50 text-green-200';
    formStatus.classList.add('show');
    
    setTimeout(() => {
        formStatus.classList.remove('show');
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'success-message mt-4 p-4 rounded-md text-center';
        }, 500);
    }, 4000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
