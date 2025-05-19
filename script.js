// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Form validation
const form = document.querySelector('.contact-form');
if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formInputs = [nameInput, emailInput, messageInput];
    
    // Create error message elements
    function createErrorElement(input) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff3860';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'none';
        input.parentNode.appendChild(errorElement);
        return errorElement;
    }
    
    // Create error elements for each input
    const nameError = createErrorElement(nameInput);
    const emailError = createErrorElement(emailInput);
    const messageError = createErrorElement(messageInput);
    
    // Add success class to input
    function setSuccess(input) {
        const formGroup = input.parentElement;
        input.classList.remove('invalid');
        input.classList.add('valid');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Add error class to input and show message
    function setError(input, message) {
        const formGroup = input.parentElement;
        input.classList.remove('valid');
        input.classList.add('invalid');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Validate name
    function validateName() {
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            setError(nameInput, 'Name is required');
            return false;
        } else if (nameValue.length < 2) {
            setError(nameInput, 'Name must be at least 2 characters');
            return false;
        } else {
            setSuccess(nameInput);
            return true;
        }
    }
    
    // Validate email
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            setError(emailInput, 'Email is required');
            return false;
        } else if (!isValidEmail(emailValue)) {
            setError(emailInput, 'Please enter a valid email address');
            return false;
        } else {
            setSuccess(emailInput);
            return true;
        }
    }
    
    // Validate message
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            setError(messageInput, 'Message is required');
            return false;
        } else if (messageValue.length < 10) {
            setError(messageInput, 'Message must be at least 10 characters');
            return false;
        } else {
            setSuccess(messageInput);
            return true;
        }
    }
    
    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // Add blur event listeners for validation when focus leaves the field
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.color = '#4CAF50';
            successMessage.style.padding = '10px';
            successMessage.style.marginTop = '15px';
            successMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            successMessage.style.borderRadius = '4px';
            
            // Check if success message already exists and remove it
            const existingSuccess = form.querySelector('.success-message');
            if (existingSuccess) {
                form.removeChild(existingSuccess);
            }
            
            form.appendChild(successMessage);
            
            // Log form data
            console.log('Form submitted:', { 
                name: nameInput.value, 
                email: emailInput.value, 
                message: messageInput.value 
            });
            
            // Reset form
            form.reset();
            
            // Reset validation styles
            formInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 5000);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const projectBtn = document.querySelector('.see-project-btn');
    const body = document.body;
    
    // Project data
    const projectData = {
        title: 'E-commerce Platform',
        image: './Resources/laptop_only.png',
        tags: ['React.js', 'Ruby on Rails', 'PostgreSQL'],
        description: 'A full-featured e-commerce platform built with React.js frontend and Ruby on Rails backend. This project includes user authentication, product catalog, shopping cart, and payment processing functionality.',
        liveLink: 'https://example.com/ecommerce',
        sourceLink: 'https://github.com/edilawit/ecommerce'
    };
    
    // Function to open modal
    function openModal() {
        // Populate modal with project data
        document.getElementById('modalProjectTitle').textContent = projectData.title;
        document.getElementById('modalProjectImage').src = projectData.image;
        
        // Show modal
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent body scrolling
        body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
        
        // Re-enable body scrolling
        body.style.overflow = 'auto';
    }
    
    // Event listeners
    if (projectBtn) {
        projectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.portfolio-item, .skills-card').forEach(el => {
    observer.observe(el);
});
