// EGCA European 2025 Goalball Tournament - Main JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    initializeNavigation();
    initializeTeamsFilter();
    initializeResultsTabs();
    initializeForms();
    initializeAnimations();
    initializeDownloads();
    initializeScrollToTop();
});

// Accessibility Features
function initializeAccessibility() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle state
    if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-checked', savedTheme === 'dark');
        
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update ARIA state
            this.setAttribute('aria-checked', newTheme === 'dark');
            
            // Announce to screen readers
            const announcement = newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
            announceToScreenReader(announcement);
        });
        
        // Keyboard shortcut for dark mode (Alt + D)
        document.addEventListener('keydown', function(e) {
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                darkModeToggle.click();
            }
        });
    }
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger icon
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }
}

// Scroll to Top functionality
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
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

// Teams Filter
function initializeTeamsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (filterButtons.length === 0 || teamCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter teams
            teamCards.forEach(card => {
                const group = card.getAttribute('data-group');
                
                if (filter === 'all' || group === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Announce filter change
            const filterText = this.textContent;
            announceToScreenReader(`Showing ${filterText.toLowerCase()}`);
        });
    });
    
    // Team card expand functionality
    const expandButtons = document.querySelectorAll('.team-expand');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.team-card');
            const details = card.querySelector('.team-details');
            
            if (details.style.maxHeight && details.style.maxHeight !== '0px') {
                details.style.maxHeight = '0px';
                details.style.overflow = 'hidden';
                this.textContent = 'View Details';
                this.setAttribute('aria-expanded', 'false');
            } else {
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.overflow = 'visible';
                this.textContent = 'Hide Details';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Results Tabs
function initializeResultsTabs() {
    const tabButtons = document.querySelectorAll('.results-tab');
    const tabSections = document.querySelectorAll('.results-section');
    
    if (tabButtons.length === 0 || tabSections.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide sections
            tabSections.forEach(section => {
                if (section.id === targetTab + '-tab') {
                    section.classList.add('active');
                    section.style.display = 'block';
                } else {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }
            });
            
            // Announce tab change
            const tabText = this.textContent;
            announceToScreenReader(`Switched to ${tabText} tab`);
        });
        
        // Keyboard navigation for tabs
        button.addEventListener('keydown', function(e) {
            const currentIndex = Array.from(tabButtons).indexOf(this);
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                    tabButtons[targetIndex].focus();
                    tabButtons[targetIndex].click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                    tabButtons[targetIndex].focus();
                    tabButtons[targetIndex].click();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabButtons[0].focus();
                    tabButtons[0].click();
                    break;
                case 'End':
                    e.preventDefault();
                    tabButtons[tabButtons.length - 1].focus();
                    tabButtons[tabButtons.length - 1].click();
                    break;
            }
        });
    });
}

// Forms
function initializeForms() {
    // Bug report form
    const bugReportForm = document.querySelector('.bug-report-form');
    if (bugReportForm) {
        bugReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBugReportSubmit(this);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this);
        });
    }
    
    // Form validation
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        removeFieldError(field);
    } else {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        showFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field) {
    removeFieldError(field); // Remove existing error first
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'field-error';
    errorMessage.setAttribute('role', 'alert');
    errorMessage.textContent = field.validationMessage;
    
    field.parentNode.appendChild(errorMessage);
    field.setAttribute('aria-describedby', field.id + '-error');
    errorMessage.id = field.id + '-error';
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
        field.removeAttribute('aria-describedby');
    }
}

function handleBugReportSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create mailto link
    const subject = encodeURIComponent(`Bug Report: ${data.type || 'General Issue'}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Issue Type: ${data.type}
Browser/Device: ${data.browser}

Description:
${data.description}
    `);
    
    const mailtoLink = `mailto:kleio.thessaloniki@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success message
    showFormSuccess('Thank you for your bug report! Your email client should open with the report ready to send.');
    form.reset();
}

function handleNewsletterSubmit(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    // Simulate newsletter signup (in real implementation, this would send to a server)
    setTimeout(() => {
        showFormSuccess('Thank you for subscribing to our newsletter! You will receive tournament updates at ' + email);
        form.reset();
    }, 1000);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
}

function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create mailto link
    const subject = encodeURIComponent(`Contact Form: ${data.subject || 'General Inquiry'}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Priority: ${data.priority}

Message:
${data.message}
    `);
    
    const mailtoLink = `mailto:kleio.thessaloniki@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
    
    form.reset();
}

function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.setAttribute('role', 'alert');
    successDiv.innerHTML = `
        <div style="
            background-color: var(--success-color);
            color: white;
            padding: var(--space-md);
            border-radius: var(--radius-md);
            margin: var(--space-md) 0;
            text-align: center;
        ">
            ${message}
        </div>
    `;
    
    // Insert at the top of the page
    const main = document.querySelector('.main-content') || document.body;
    main.insertBefore(successDiv, main.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to top to show message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animations
function initializeAnimations() {
    // Simple intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in-section class
    const animatedElements = document.querySelectorAll('.fade-in-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(el);
    });
}

// Download Functions
function initializeDownloads() {
    // These functions would typically connect to a real download system
    // For now, they provide user feedback
    
    window.downloadInvitation = function(format) {
        const formatText = format === 'pdf' ? 'PDF' : 'Image';
        showDownloadMessage(`Downloading invitation as ${formatText}...`);
        
        // In a real implementation, this would trigger an actual download
        setTimeout(() => {
            showDownloadMessage(`Invitation ${formatText} download complete!`);
        }, 2000);
    };
    
    window.downloadResource = function(type) {
        const resourceNames = {
            'rules': 'Tournament Rules',
            'accommodation': 'Accommodation Guide',
            'travel': 'Travel Information',
            'schedule': 'Tournament Schedule'
        };
        
        const resourceName = resourceNames[type] || 'Resource';
        showDownloadMessage(`Downloading ${resourceName}...`);
        
        setTimeout(() => {
            showDownloadMessage(`${resourceName} download complete!`);
        }, 1500);
    };
}

function showDownloadMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'download-message';
    messageDiv.setAttribute('role', 'status');
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: var(--space-md);
            border-radius: var(--radius-md);
            box-shadow: 0 4px 12px var(--shadow-medium);
            z-index: var(--z-tooltip);
            max-width: 300px;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
    
    // Announce to screen readers
    announceToScreenReader(message);
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

// Initialize teams if on teams page
if (document.getElementById('teamsGrid')) {
    renderTeams(teamsData);
    initializeTeamModal();
    initializeTeamFilters();
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

function initializeTeamModal() {
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
                    <div style="text-align: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
                        <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">Players</h4>
                        <p style="font-size: 1.5rem; font-weight: 600; margin: 0;">${team.players}</p>
                    </div>
                    <div style="text-align: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
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
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function initializeTeamFilters() {
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
    const scrollTopBtn = document.getElementById('scrollTop');
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
}, 250));

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content (when focused on skip link)
    if (e.key === 'Enter' && e.target.classList.contains('skip-link')) {
        e.preventDefault();
        const main = document.querySelector('main') || document.querySelector('#main-content');
        if (main) {
            main.setAttribute('tabindex', '-1');
            main.focus();
        }
    }
    
    // Close modals/dropdowns with Escape
    if (e.key === 'Escape') {
        // Close any open dropdowns or modals
        const activeDropdowns = document.querySelectorAll('.dropdown.active, .modal.active');
        activeDropdowns.forEach(element => {
            element.classList.remove('active');
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update focus for accessibility
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // In production, you might want to send this to an error tracking service
    // For now, we'll just log it
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        announceToScreenReader,
        validateField,
        debounce,
        teamsData
    };
}