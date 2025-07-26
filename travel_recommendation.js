// Main JavaScript file for TravelBloom website
// Handles functionality for Home, About, and Contact pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Common functionality for all pages
    initializeNavigation();
    initializeSocialLinks();
    
    // Page-specific functionality
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'about':
            initializeAboutPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
    }
}

// Utility function to determine current page
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    
    if (page === 'index' || page === '' || page === '/') {
        return 'home';
    } else if (page === 'about') {
        return 'about';
    } else if (page === 'contact') {
        return 'contact';
    }
    return 'home'; // default
}

// ===== COMMON FUNCTIONALITY =====

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Mobile navigation toggle (if needed)
    const navbar = document.querySelector('.navbar');
    let isScrolled = false;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50 && !isScrolled) {
            navbar.style.background = 'rgba(45, 55, 65, 0.6)';
            isScrolled = true;
        } else if (window.scrollY <= 50 && isScrolled) {
            navbar.style.background = 'rgba(45, 55, 65, 0.4)';
            isScrolled = false;
        }
    });
}

// Social media links functionality
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add actual social media URLs here
            const platform = getSocialPlatform(this);
            console.log(`Navigating to ${platform} social media page...`);
            
            // Example: window.open('https://twitter.com/yourhandle', '_blank');
        });
    });
}

function getSocialPlatform(element) {
    const svg = element.querySelector('svg path');
    if (!svg) return 'unknown';
    
    const pathData = svg.getAttribute('d');
    if (pathData.includes('23.953')) return 'Twitter';
    if (pathData.includes('24 12.073')) return 'Facebook';
    if (pathData.includes('12 2.163')) return 'Instagram';
    if (pathData.includes('23.498')) return 'YouTube';
    return 'Social Media';
}

// ===== HOME PAGE FUNCTIONALITY =====

function initializeHomePage() {
    initializeSearch();
    initializeBookButton();
    initializeHeroAnimations();
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const searchError = document.querySelector('.search-error');
    
    if (!searchInput || !searchBtn || !clearBtn) return;
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear functionality
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        hideSearchError();
        searchInput.focus();
    });
    
    // Real-time validation
    searchInput.addEventListener('input', function() {
        hideSearchError();
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (!query) {
            showSearchError('Please enter a valid search query.');
            return;
        }
        
        if (query.length < 2) {
            showSearchError('Search query must be at least 2 characters long.');
            return;
        }
        
        // Simulate search functionality
        console.log(`Searching for: ${query}`);
        
        // Add loading state
        searchBtn.disabled = true;
        searchBtn.textContent = 'Searching...';
        
        // Simulate API call
        setTimeout(() => {
            searchBtn.disabled = false;
            searchBtn.textContent = 'Search';
            
            // Show success message (you can customize this)
            showSearchSuccess(`Found results for "${query}"`);
            
            // Here you would typically redirect to search results page
            // window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        }, 1500);
    }
    
    function showSearchError(message) {
        searchError.textContent = message;
        searchError.style.display = 'block';
        searchError.style.color = '#FF5252';
    }
    
    function showSearchSuccess(message) {
        searchError.textContent = message;
        searchError.style.display = 'block';
        searchError.style.color = '#4CAF50';
        
        setTimeout(() => {
            hideSearchError();
        }, 3000);
    }
    
    function hideSearchError() {
        searchError.style.display = 'none';
    }
}

function initializeBookButton() {
    const bookBtn = document.querySelector('.book-btn');
    
    if (!bookBtn) return;
    
    bookBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Simulate booking process
        console.log('Initiating booking process...');
        
        // You can redirect to booking page or open modal
        // window.location.href = 'booking.html';
        
        // Or show a modal/popup
        showBookingModal();
    });
}

function showBookingModal() {
    // Create a simple modal (you can enhance this)
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #333;">Booking Coming Soon!</h3>
        <p style="margin-bottom: 1.5rem; color: #666;">Our booking system will be available soon. Thank you for your interest!</p>
        <button onclick="this.closest('[style*=position]').remove()" style="
            background: #00695C;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function initializeHeroAnimations() {
    // Add subtle animations to hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        // Animate title on load
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroDescription) {
        // Animate description on load
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroDescription.style.transition = 'all 1s ease';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 800);
    }
}

// ===== ABOUT PAGE FUNCTIONALITY =====

function initializeAboutPage() {
    initializeTeamCards();
    initializeAboutAnimations();
}

function initializeTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
        
        // Add click functionality to team member roles
        const roleButton = card.querySelector('.team-member-role');
        if (roleButton) {
            roleButton.addEventListener('click', function() {
                const memberName = card.querySelector('.team-member-name').textContent;
                const role = this.textContent;
                
                showTeamMemberInfo(memberName, role);
            });
        }
        
        // Animate cards on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
}

function showTeamMemberInfo(name, role) {
    const descriptions = {
        'John Doe': 'John Doe is our CEO and founder with over 15 years of experience in the travel industry. He leads our company with vision and passion for creating unforgettable travel experiences.',
        'Celina Thomas': 'Celina Thomas is our Team Lead who coordinates all our travel planning operations. She ensures that every trip is perfectly organized and meets our high standards.',
        'Mike Tysen': 'Mike Tysen heads our delivery department, making sure all travel arrangements are executed flawlessly and on time. He manages logistics and customer satisfaction.'
    };
    
    const description = descriptions[name] || `Learn more about ${name}, our ${role}.`;
    
    // Create info modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        margin: 20px;
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 0.5rem; color: #333;">${name}</h3>
        <p style="margin-bottom: 1rem; color: #00695C; font-weight: 600;">${role}</p>
        <p style="margin-bottom: 1.5rem; color: #666; line-height: 1.6;">${description}</p>
        <button onclick="this.closest('[style*=position]').remove()" style="
            background: #00695C;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function initializeAboutAnimations() {
    const aboutTitle = document.querySelector('.about-title');
    const teamTitle = document.querySelector('.team-title');
    const aboutDescription = document.querySelector('.about-description');
    
    // Animate elements on scroll or load
    const animateOnLoad = (element, delay = 0) => {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 1s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, delay);
    };
    
    animateOnLoad(aboutTitle, 300);
    animateOnLoad(aboutDescription, 600);
    animateOnLoad(teamTitle, 900);
}

// ===== CONTACT PAGE FUNCTIONALITY =====

function initializeContactPage() {
    initializeContactForm();
    initializeContactAnimations();
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            message: formData.get('message').trim()
        };
        
        // Validate form
        if (!validateContactForm(data)) {
            return;
        }
        
        // Submit form
        submitContactForm(data);
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateContactForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch(fieldName) {
        case 'name':
            if (!value || value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    field.style.borderColor = '#F44336';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #F44336;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function submitContactForm(data) {
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Here you would typically send data to your server
        console.log('Form submitted:', data);
        
    }, 2000);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function initializeContactAnimations() {
    const contactTitle = document.querySelector('.contact-title');
    const contactSubtitle = document.querySelector('.contact-subtitle');
    const contactForm = document.querySelector('.contact-form');
    
    // Animate elements on load
    if (contactTitle) {
        contactTitle.style.opacity = '0';
        contactTitle.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            contactTitle.style.transition = 'all 1s ease';
            contactTitle.style.opacity = '1';
            contactTitle.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (contactSubtitle) {
        contactSubtitle.style.opacity = '0';
        contactSubtitle.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            contactSubtitle.style.transition = 'all 1s ease';
            contactSubtitle.style.opacity = '1';
            contactSubtitle.style.transform = 'translateX(0)';
        }, 600);
    }
    
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            contactForm.style.transition = 'all 1s ease';
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'translateX(0)';
        }, 400);
    }
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll functionality
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add some performance optimizations
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments if needed
    console.log('Window resized');
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});