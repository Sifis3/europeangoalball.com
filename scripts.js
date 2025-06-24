// EGCA European 2025 Goalball Tournament - JavaScript
// Handles interactivity, navigation, form validation, and dynamic content

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const newsletterForm = document.getElementById('newsletterForm');

// Accessibility controls
const decreaseFontBtn = document.getElementById('decreaseFont');
const normalFontBtn = document.getElementById('normalFont');
const increaseFontBtn = document.getElementById('increaseFont');
const defaultThemeBtn = document.getElementById('defaultTheme');
const highContrastThemeBtn = document.getElementById('highContrastTheme');
const darkThemeBtn = document.getElementById('darkTheme');
const toggleImagesBtn = document.getElementById('toggleImages');
const imageToggleText = document.getElementById('imageToggleText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollToTop();
    initializeAnimations();
    initializeContactForm();
    initializeNewsletterForm();
    initializeTeams();
    initializeModal();
    initializeFilters();
    initializeAccessibilityControls();
    initializeFadeInSections();
});

// Accessibility Controls
function initializeAccessibilityControls() {
    // Font size controls
    if (decreaseFontBtn) {
        decreaseFontBtn.addEventListener('click', function() {
            document.body.classList.remove('font-large', 'font-extra-large');
            document.body.classList.add('font-small');
            updateFontButtons('small');
        });
    }

    if (normalFontBtn) {
        normalFontBtn.addEventListener('click', function() {
            document.body.classList.remove('font-small', 'font-large', 'font-extra-large');
            updateFontButtons('normal');
        });
    }

    if (increaseFontBtn) {
        increaseFontBtn.addEventListener('click', function() {
            document.body.classList.remove('font-small');
            if (document.body.classList.contains('font-large')) {
                document.body.classList.add('font-extra-large');
                updateFontButtons('extra-large');
            } else {
                document.body.classList.add('font-large');
                updateFontButtons('large');
            }
        });
    }

    // Theme controls
    if (defaultThemeBtn) {
        defaultThemeBtn.addEventListener('click', function() {
            document.body.classList.remove('high-contrast', 'dark-theme');
            updateThemeButtons('default');
        });
    }

    if (highContrastThemeBtn) {
        highContrastThemeBtn.addEventListener('click', function() {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('high-contrast');
            updateThemeButtons('high-contrast');
        });
    }

    if (darkThemeBtn) {
        darkThemeBtn.addEventListener('click', function() {
            document.body.classList.remove('high-contrast');
            document.body.classList.add('dark-theme');
            updateThemeButtons('dark');
        });
    }

    // Image toggle
    if (toggleImagesBtn) {
        toggleImagesBtn.addEventListener('click', function() {
            document.body.classList.toggle('hide-images');
            const isHidden = document.body.classList.contains('hide-images');
            if (imageToggleText) {
                imageToggleText.textContent = isHidden ? 'Show Images' : 'Hide Images';
            }
            toggleImagesBtn.setAttribute('aria-pressed', isHidden);
        });
    }
}

function updateFontButtons(activeSize) {
    const buttons = [decreaseFontBtn, normalFontBtn, increaseFontBtn];
    buttons.forEach(btn => btn && btn.classList.remove('active'));
    
    switch(activeSize) {
        case 'small':
            decreaseFontBtn && decreaseFontBtn.classList.add('active');
            break;
        case 'normal':
            normalFontBtn && normalFontBtn.classList.add('active');
            break;
        case 'large':
            increaseFontBtn && increaseFontBtn.classList.add('active');
            break;
        case 'extra-large':
            increaseFontBtn && increaseFontBtn.classList.add('active');
            break;
    }
}

function updateThemeButtons(activeTheme) {
    const buttons = [defaultThemeBtn, highContrastThemeBtn, darkThemeBtn];
    buttons.forEach(btn => btn && btn.classList.remove('active'));
    
    switch(activeTheme) {
        case 'default':
            defaultThemeBtn && defaultThemeBtn.classList.add('active');
            break;
        case 'high-contrast':
            highContrastThemeBtn && highContrastThemeBtn.classList.add('active');
            break;
        case 'dark':
            darkThemeBtn && darkThemeBtn.classList.add('active');
            break;
    }
}

// Fade-in sections on scroll
function initializeFadeInSections() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
}

// Navigation functionality
function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Update ARIA attributes
    const isOpen = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    navMenu.setAttribute('aria-hidden', !isOpen);
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
}

// Scroll to top functionality
function initializeScrollToTop() {
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.content-card, .highlight-card, .team-card, .member-card, .news-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact form functionality
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Newsletter form functionality
function initializeNewsletterForm() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', validateNewsletterEmail);
            emailInput.addEventListener('input', clearNewsletterError);
        }
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(newsletterForm);
    const email = formData.get('email');
    
    if (validateNewsletterEmail({ target: { value: email } })) {
        // Simulate newsletter subscription
        showNewsletterSuccess();
        newsletterForm.reset();
        clearNewsletterError();
    }
}

function validateNewsletterEmail(e) {
    const email = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
        showNewsletterError('Please enter a valid email address');
        return false;
    } else {
        clearNewsletterError();
        return true;
    }
}

function showNewsletterError(message) {
    const errorElement = document.getElementById('newsletter-email-error');
    const formGroup = document.querySelector('#newsletterForm .form-group');
    
    if (errorElement && formGroup) {
        errorElement.textContent = message;
        formGroup.classList.add('error');
    }
}

function clearNewsletterError() {
    const errorElement = document.getElementById('newsletter-email-error');
    const formGroup = document.querySelector('#newsletterForm .form-group');
    
    if (errorElement && formGroup) {
        errorElement.textContent = '';
        formGroup.classList.remove('error');
    }
}

function showNewsletterSuccess() {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.innerHTML = `
        <h3>✅ Subscription Successful!</h3>
        <p>Thank you for subscribing to our newsletter. You'll receive updates about the tournament.</p>
    `;
    
    const newsletterCard = document.querySelector('.newsletter-signup');
    if (newsletterCard) {
        newsletterCard.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    if (validateForm(data)) {
        // Simulate form submission
        showSuccessMessage();
        contactForm.reset();
        clearAllErrors();
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter your full name (at least 2 characters)');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject) {
        showFieldError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    switch (field.id) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
            } else {
                clearFieldError('name');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
            } else {
                clearFieldError('email');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
            } else {
                clearFieldError('message');
            }
            break;
    }
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    const formGroup = field.closest('.form-group');
    
    if (errorElement && formGroup) {
        errorElement.textContent = message;
        formGroup.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
    }
}

function clearFieldError(fieldIdOrEvent) {
    const fieldId = typeof fieldIdOrEvent === 'string' ? fieldIdOrEvent : fieldIdOrEvent.target.id;
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    const formGroup = field.closest('.form-group');
    
    if (errorElement && formGroup) {
        errorElement.textContent = '';
        formGroup.classList.remove('error');
        field.removeAttribute('aria-invalid');
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const formGroups = document.querySelectorAll('.form-group.error');
    const invalidFields = document.querySelectorAll('[aria-invalid="true"]');
    
    errorElements.forEach(el => el.textContent = '');
    formGroups.forEach(el => el.classList.remove('error'));
    invalidFields.forEach(el => el.removeAttribute('aria-invalid'));
}

function showSuccessMessage() {
    if (successMessage) {
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

// Teams data and functionality
const teamsData = [
    {
        id: 1,
        name: "German Eagles",
        country: "Germany",
        flag: "🇩🇪",
        region: "western",
        players: 6,
        coach: "Hans Mueller",
        founded: 2010,
        achievements: ["European Championship 2022", "World Championship Bronze 2021"],
        description: "One of Europe's strongest teams with exceptional defensive skills and tactical awareness."
    },
    {
        id: 2,
        name: "Spanish Bulls",
        country: "Spain",
        flag: "🇪🇸",
        region: "southern",
        players: 7,
        coach: "Carlos Rodriguez",
        founded: 2008,
        achievements: ["European Championship Silver 2020", "Mediterranean Cup 2021"],
        description: "Known for their aggressive playing style and powerful offensive strategies."
    },
    {
        id: 3,
        name: "French Lions",
        country: "France",
        flag: "🇫🇷",
        region: "western",
        players: 6,
        coach: "Marie Dubois",
        founded: 2012,
        achievements: ["European Championship 2019", "World Championship Semifinalist 2022"],
        description: "Technical excellence and teamwork define this championship-winning squad."
    },
    {
        id: 4,
        name: "Italian Stallions",
        country: "Italy",
        flag: "🇮🇹",
        region: "southern",
        players: 8,
        coach: "Giuseppe Romano",
        founded: 2015,
        achievements: ["European Championship Bronze 2021", "Regional Championship 2022"],
        description: "Rising stars with incredible potential and determination to succeed."
    },
    {
        id: 5,
        name: "Polish Eagles",
        country: "Poland",
        flag: "🇵🇱",
        region: "eastern",
        players: 6,
        coach: "Piotr Kowalski",
        founded: 2009,
        achievements: ["Eastern European Championship 2020", "World Championship Participant 2021"],
        description: "Disciplined team with strong fundamentals and excellent court positioning."
    },
    {
        id: 6,
        name: "Swedish Wolves",
        country: "Sweden",
        flag: "🇸🇪",
        region: "northern",
        players: 7,
        coach: "Erik Lindqvist",
        founded: 2011,
        achievements: ["Nordic Championship 2021", "European Championship Semifinalist 2020"],
        description: "Fast-paced team known for their quick transitions and strategic gameplay."
    },
    {
        id: 7,
        name: "Dutch Storm",
        country: "Netherlands",
        flag: "🇳🇱",
        region: "western",
        players: 6,
        coach: "Jan van Berg",
        founded: 2013,
        achievements: ["Benelux Championship 2022", "European Championship Qualifier 2021"],
        description: "Innovative team that brings creativity and unpredictability to every match."
    },
    {
        id: 8,
        name: "Greek Titans",
        country: "Greece",
        flag: "🇬🇷",
        region: "southern",
        players: 8,
        coach: "Dimitris Papadopoulos",
        founded: 2007,
        achievements: ["Host Nation Advantage", "Balkan Championship 2021"],
        description: "The host nation's pride, playing with home crowd support and local knowledge."
    }
];

function initializeTeams() {
    const teamsGrid = document.getElementById('teamsGrid');
    if (teamsGrid) {
        renderTeams(teamsData);
    }
}

function renderTeams(teams) {
    const teamsGrid = document.getElementById('teamsGrid');
    if (!teamsGrid) return;
    
    teamsGrid.innerHTML = teams.map(team => `
        <div class="team-card" data-team-id="${team.id}" data-region="${team.region}" 
             role="button" tabindex="0" aria-label="View details for ${team.name}">
            <div class="team-flag" aria-hidden="true">${team.flag}</div>
            <h3 class="team-name">${team.name}</h3>
            <p class="team-country">${team.country}</p>
            <div class="team-info">
                <span class="team-players">${team.players} players</span>
                <span class="team-region">${team.region}</span>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to team cards
    const teamCards = teamsGrid.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const teamId = parseInt(this.getAttribute('data-team-id'));
            showTeamModal(teamId);
        });
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const teamId = parseInt(this.getAttribute('data-team-id'));
                showTeamModal(teamId);
            }
        });
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('teamModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeTeamModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeTeamModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeTeamModal();
        }
    });
}

function showTeamModal(teamId) {
    const team = teamsData.find(t => t.id === teamId);
    if (!team) return;
    
    const modal = document.getElementById('teamModal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    modalTitle.textContent = team.name;
    modalBody.innerHTML = `
        <div class="team-modal-content">
            <div class="team-modal-header">
                <div class="team-flag" style="font-size: 4rem; text-align: center; margin-bottom: 1rem;">${team.flag}</div>
                <h3 style="text-align: center; color: var(--primary-color); margin-bottom: 0.5rem;">${team.country}</h3>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">Founded: ${team.founded}</p>
            </div>
            
            <div class="team-modal-details">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="text-align: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--border-radius);">
                        <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">Players</h4>
                        <p style="font-size: 1.5rem; font-weight: 600; margin: 0;">${team.players}</p>
                    </div>
                    <div style="text-align: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--border-radius);">
                        <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">Coach</h4>
                        <p style="font-weight: 500; margin: 0;">${team.coach}</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary-color); margin-bottom: 1rem;">About the Team</h4>
                    <p style="line-height: 1.6;">${team.description}</p>
                </div>
                
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Recent Achievements</h4>
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        ${team.achievements.map(achievement => `<li style="margin-bottom: 0.5rem; color: var(--text-secondary);">${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Trap focus within modal
    trapFocus(modal);
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter teams
            if (filter === 'all') {
                renderTeams(teamsData);
            } else {
                const filteredTeams = teamsData.filter(team => team.region === filter);
                renderTeams(filteredTeams);
            }
        });
    });
    
    // Match filter buttons (for results page)
    const matchFilterButtons = document.querySelectorAll('[data-match-filter]');
    matchFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-match-filter');
            
            // Update active filter button
            matchFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would filter matches based on the selected filter
            // For now, we'll just show a message since matches are not yet available
            console.log(`Filtering matches by: ${filter}`);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
}, 100);

// Replace the original scroll event listener with the debounced version
window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility enhancements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a production environment, you might want to send this to a logging service
});

// Service worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here in a production environment
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        showFieldError,
        clearFieldError,
        teamsData
    };
}