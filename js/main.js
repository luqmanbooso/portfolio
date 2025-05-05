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
    
    // Add input validation listeners for real-time feedback
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            // Remove error styling when user starts typing again
            if (input.classList.contains('border-red-500')) {
                input.classList.remove('border-red-500');
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) errorMessage.remove();
            }
        });
    });
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Reset previous error states
        clearFormErrors(contactForm);
        
        // Validate all form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const isValid = validateAllFields([nameInput, emailInput, subjectInput, messageInput]);
        
        if (!isValid) {
            showFormError('Please fix the errors in the form');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('submit-button-loading');
        submitBtn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Send email using EmailJS or Web3Forms based on implementation
        if (contactForm.getAttribute('action') && contactForm.getAttribute('action').includes('web3forms')) {
            // The form is using Web3Forms - let it handle submission
            contactForm.submit();
        } else {
            // Using EmailJS
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
        }
    });
}

// Validate a single form field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Different validation rules based on field type
    switch(field.id) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid name';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'subject':
            if (!value) {
                isValid = false;
                errorMessage = 'Subject is required';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }
    
    // Apply styling based on validation result
    if (!isValid) {
        field.classList.add('border-red-500');
        field.classList.remove('border-primary-dark', 'border-green-500');
        
        // Add error message
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = errorMessage;
        field.parentElement.appendChild(errorElement);
    } else {
        field.classList.add('border-green-500');
        field.classList.remove('border-primary-dark', 'border-red-500');
    }
    
    return isValid;
}

// Validate all fields in a form
function validateAllFields(fields) {
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Clear all error messages and styling from the form
function clearFormErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
