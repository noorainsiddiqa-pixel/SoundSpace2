/**
 * ============================================
 * SOUNDSPACE - MAIN JAVASCRIPT FILE
 * ============================================
 * 
 * Description: Handles all interactive functionality for SoundSpace
 * Author: CodeKstra Team
 * Created: 2025
 * 
 * Features:
 * - Space background animations (stars, shooting stars)
 * - Screen navigation system
 * - Password visibility toggle
 * - Modal management for icebreakers
 * - Form handling
 * 
 * ============================================
 */

// ============================================
// INITIALIZATION - Runs when page loads
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SoundSpace initialized');
    
    // Initialize space background animations
    initializeStars();
    initializeShootingStars();
    initializeCosmicDust();
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
});

// ============================================
// SPACE BACKGROUND ANIMATIONS
// ============================================

/**
 * Generate animated stars in the background
 * Creates 200 twinkling stars with random positions and sizes
 */
function initializeStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200; // Total number of stars to generate
    
    for (let i = 0; i < starCount; i++) {
        // Create star element
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random horizontal position (0-100%)
        star.style.left = Math.random() * 100 + '%';
        
        // Random vertical position (0-100%)
        star.style.top = Math.random() * 100 + '%';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay for staggered twinkling effect
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Random animation duration for varied twinkling speeds
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Add star to container
        starsContainer.appendChild(star);
    }
    
    console.log(`✨ Generated ${starCount} stars`);
}

/**
 * Generate shooting stars animation
 * Creates periodic shooting stars across the screen
 */
function initializeShootingStars() {
    const shootingStarsContainer = document.getElementById('shootingStars');
    
    // Create a new shooting star every 1.5 seconds (very frequent)
    setInterval(() => {
        // Create shooting star element
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random starting position across the entire screen
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 100 + '%';
        
        // Random angle for more natural shooting star paths
        const angle = Math.random() * 360;
        shootingStar.style.transform = `rotate(${angle}deg)`;
        
        // Add to container
        shootingStarsContainer.appendChild(shootingStar);
        
        // Remove after animation completes (3 seconds)
        setTimeout(() => {
            shootingStar.remove();
        }, 3000);
        
    }, 1500); // Interval: 1500ms = 1.5 seconds (lots of shooting stars!)
    
    console.log('🌠 Shooting stars initialized - Lots of them!');
}

/**
 * Generate cosmic dust particles floating through space
 * Creates a subtle particle effect throughout the viewport
 */
function initializeCosmicDust() {
    const spaceBackground = document.querySelector('.space-background');
    const dustCount = 30; // Total number of dust particles
    
    for (let i = 0; i < dustCount; i++) {
        // Create dust particle element
        const dust = document.createElement('div');
        dust.className = 'cosmic-dust';
        
        // Random horizontal position
        dust.style.left = Math.random() * 100 + '%';
        
        // Start from bottom
        dust.style.top = '100%';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        dust.style.width = size + 'px';
        dust.style.height = size + 'px';
        
        // Random animation duration (slower for dust effect)
        const duration = Math.random() * 15 + 20;
        dust.style.animationDuration = duration + 's';
        
        // Random animation delay
        dust.style.animationDelay = Math.random() * 10 + 's';
        
        // Random opacity
        dust.style.opacity = Math.random() * 0.4 + 0.2;
        
        // Add to space background
        spaceBackground.appendChild(dust);
    }
    
    console.log(`✨ Generated ${dustCount} cosmic dust particles`);
}

// ============================================
// SCREEN NAVIGATION SYSTEM
// ============================================

/**
 * Show specific screen and hide all others
 * @param {string} screenId - The ID of the screen to display
 * 
 * Usage: showScreen('landing'), showScreen('signin'), etc.
 */
function showScreen(screenId) {
    console.log(`📱 Navigating to: ${screenId}`);
    
    // Hide all screens by removing 'active' class
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen by adding 'active' class
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Scroll to top of page for better UX
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Special handling for analyzing screen
        // Auto-progress to dashboard after 3 seconds
        if (screenId === 'analyzing') {
            console.log('⏳ Analyzing music data...');
            setTimeout(() => {
                console.log('✅ Analysis complete! Showing matches...');
                showScreen('dashboard');
            }, 3000);
        }
    } else {
        console.error(`❌ Screen not found: ${screenId}`);
    }
}

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================

/**
 * Toggle password visibility for input fields
 * @param {string} inputId - The ID of the password input field
 * 
 * Usage: togglePassword('signinPassword')
 */
function togglePassword(inputId) {
    // Get the password input element
    const passwordInput = document.getElementById(inputId);
    
    // Get the toggle icon (eye icon)
    const toggleIcon = passwordInput.nextElementSibling;
    
    // Toggle between 'password' and 'text' type
    if (passwordInput.type === 'password') {
        // Show password
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈'; // Change icon to "hidden eye"
        console.log(`👁️ Password visible: ${inputId}`);
    } else {
        // Hide password
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️'; // Change icon to "visible eye"
        console.log(`🙈 Password hidden: ${inputId}`);
    }
}

// ============================================
// MODAL MANAGEMENT
// ============================================

/**
 * Open icebreaker modal with user details
 * @param {string} name - User's full name
 * @param {string} initials - User's initials (for avatar)
 * @param {Array} tags - Array of shared interests/artists
 * 
 * Usage: openModal('Alex Chen', 'AC', ['Arctic Monkeys', 'The 1975'])
 */
function openModal(name, initials, tags) {
    console.log(`💬 Opening modal for: ${name}`);
    
    // Get modal elements
    const modal = document.getElementById('icebreakerModal');
    const modalName = document.getElementById('modalName');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalTags = document.getElementById('modalTags');
    
    // Set user details
    modalName.textContent = name;
    modalAvatar.textContent = initials;
    
    // Generate tags HTML
    const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    modalTags.innerHTML = tagsHTML;
    
    // Show modal by adding 'active' class
    modal.classList.add('active');
    
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    console.log(`✅ Modal opened with ${tags.length} tags`);
}

/**
 * Close the icebreaker modal
 * Clears all input and restores normal scrolling
 */
function closeModal() {
    console.log('❌ Closing modal');
    
    // Get modal and message input elements
    const modal = document.getElementById('icebreakerModal');
    const messageInput = document.getElementById('messageInput');
    
    // Hide modal by removing 'active' class
    modal.classList.remove('active');
    
    // Clear the message input field
    messageInput.value = '';
    
    // Restore background scrolling
    document.body.style.overflow = 'auto';
}

/**
 * Select an icebreaker suggestion and populate message input
 * @param {HTMLElement} element - The clicked icebreaker option element
 * 
 * Usage: Called automatically when user clicks an icebreaker option
 */
function selectIcebreaker(element) {
    // Get the message input field
    const messageInput = document.getElementById('messageInput');
    
    // Get the text from the clicked icebreaker
    const icebreakerText = element.textContent.trim();
    
    // Populate the message input with the selected icebreaker
    messageInput.value = icebreakerText;
    
    // Focus on the input field so user can edit if needed
    messageInput.focus();
    
    console.log(`💡 Icebreaker selected: ${icebreakerText}`);
}

/**
 * Send message to match
 * Validates input and shows confirmation
 */
function sendMessage() {
    // Get message input element
    const messageInput = document.getElementById('messageInput');
    
    // Get message text and remove whitespace
    const message = messageInput.value.trim();
    
    // Validate that message is not empty
    if (message) {
        console.log(`📨 Sending message: "${message}"`);
        
        // Show success message to user
        alert(`Message sent! 🎉\n\n"${message}"\n\nThey'll receive your icebreaker soon!`);
        
        // Close the modal
        closeModal();
        
        // In production, this would send the message to backend:
        // sendMessageToServer(message);
    } else {
        // Show error if message is empty
        console.warn('⚠️ Empty message');
        alert('Please write a message or select an icebreaker first.');
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Close modal when clicking outside the modal content
 */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('icebreakerModal');
    
    // Check if click was directly on the modal backdrop (not modal content)
    if (event.target === modal) {
        console.log('🖱️ Clicked outside modal - closing');
        closeModal();
    }
});

/**
 * Close modal with Escape key
 */
document.addEventListener('keydown', function(event) {
    // Check if Escape key was pressed
    if (event.key === 'Escape' || event.key === 'Esc') {
        const modal = document.getElementById('icebreakerModal');
        
        // Check if modal is currently open
        if (modal && modal.classList.contains('active')) {
            console.log('⌨️ Escape key pressed - closing modal');
            closeModal();
        }
    }
});

// ============================================
// FORM VALIDATION UTILITIES
// ============================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email format is valid
 * 
 * Usage: if (validateEmail('user@example.com')) { ... }
 */
function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    console.log(`📧 Email validation: ${email} - ${isValid ? 'Valid' : 'Invalid'}`);
    return isValid;
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password meets requirements
 * 
 * Requirements: Minimum 8 characters
 */
function validatePassword(password) {
    // Check minimum length
    const minLength = 8;
    const isValid = password.length >= minLength;
    
    console.log(`🔒 Password validation: ${isValid ? 'Valid' : 'Too short'} (${password.length} chars)`);
    return isValid;
}

/**
 * Validate password match
 * @param {string} password1 - First password
 * @param {string} password2 - Second password (confirmation)
 * @returns {boolean} - True if passwords match
 */
function validatePasswordMatch(password1, password2) {
    const isMatch = password1 === password2;
    
    console.log(`🔐 Password match: ${isMatch ? 'Matched' : 'Not matched'}`);
    return isMatch;
}

// ============================================
// HELPER UTILITIES
// ============================================

/**
 * Debounce function - prevents function from being called too frequently
 * Useful for search inputs, window resize events, etc.
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

/**
 * Format date for display
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get random element from array
 * @param {Array} array - Array to select from
 * @returns {*} - Random element from array
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║           🎵 SOUNDSPACE 🎵                ║
║                                           ║
║   Find Friends Through Music              ║
║   Compatibility                           ║
║                                           ║
║   Team: CodeKstra                         ║
║   Version: 1.0.0                          ║
║                                           ║
╚═══════════════════════════════════════════╝
`);

// ============================================
// EXPORT FOR POTENTIAL MODULE USAGE
// ============================================

// If using ES6 modules, you can export functions:
/*
export {
    showScreen,
    togglePassword,
    openModal,
    closeModal,
    selectIcebreaker,
    sendMessage,
    validateEmail,
    validatePassword
};
*/