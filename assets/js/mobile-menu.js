// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        toggleButton.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Insert the button into the header
        const header = document.getElementById('header');
        if (header) {
            header.appendChild(toggleButton);
        }
        
        return toggleButton;
    }
    
    // Initialize mobile menu
    function initMobileMenu() {
        const nav = document.getElementById('nav');
        const toggleButton = createMobileMenuToggle();
        
        if (!nav || !toggleButton) return;
        
        let isMenuOpen = false;
        
        // Toggle menu function
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                nav.classList.add('active');
                toggleButton.innerHTML = '<i class="fas fa-times"></i>';
                toggleButton.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                nav.classList.remove('active');
                toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                toggleButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
        
        // Close menu function
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                nav.classList.remove('active');
                toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                toggleButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
        
        // Event listeners
        toggleButton.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on navigation links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (isMenuOpen && !nav.contains(event.target) && !toggleButton.contains(event.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Touch gestures for mobile
    function initTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Swipe right to open menu (from left edge)
            if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50 && touchStartX < 50) {
                const nav = document.getElementById('nav');
                if (nav && !nav.classList.contains('active')) {
                    nav.classList.add('active');
                    const toggleButton = document.querySelector('.mobile-menu-toggle');
                    if (toggleButton) {
                        toggleButton.innerHTML = '<i class="fas fa-times"></i>';
                    }
                }
            }
        });
    }
    
    // Optimize images for mobile
    function optimizeImagesForMobile() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Ensure images are responsive
            if (!img.style.maxWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }
    
    // Add mobile-specific classes based on device
    function addMobileClasses() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
        } else if (isTablet) {
            document.body.classList.add('tablet-device');
        } else {
            document.body.classList.add('desktop-device');
        }
    }
    
    // Improve form experience on mobile
    function improveMobileForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Add appropriate input types for mobile keyboards
                if (input.name && input.name.toLowerCase().includes('email')) {
                    input.type = 'email';
                }
                if (input.name && input.name.toLowerCase().includes('phone')) {
                    input.type = 'tel';
                }
                
                // Prevent zoom on focus for iOS
                if (parseFloat(input.style.fontSize) < 16) {
                    input.style.fontSize = '16px';
                }
            });
        });
    }
    
    // Initialize all mobile enhancements
    function init() {
        // Only apply mobile enhancements on mobile devices
        if (window.innerWidth <= 768) {
            initMobileMenu();
            initTouchGestures();
            optimizeImagesForMobile();
            improveMobileForms();
        }
        
        // These apply to all devices
        initSmoothScrolling();
        addMobileClasses();
        
        // Re-initialize on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                addMobileClasses();
                
                // Reinitialize mobile features if switching to mobile
                if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
                    initMobileMenu();
                    initTouchGestures();
                }
            }, 250);
        });
    }
    
    // Start initialization
    init();
    
    // Add CSS class to hide desktop menu toggle on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media screen and (min-width: 769px) {
            .mobile-menu-toggle {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization for mobile
if ('serviceWorker' in navigator && window.innerWidth <= 768) {
    // Register service worker for better mobile performance (optional)
    // This can be implemented later for PWA features
}

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);