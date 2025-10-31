// Product Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for product page
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Animated counters for product stats
    function animateProductCounters() {
        const statNumbers = document.querySelectorAll('.product-stat .stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Intersection Observer for animated counters
    const productStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProductCounters();
                productStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe product stats section
    const productStatsSection = document.querySelector('.product-stats');
    if (productStatsSection) {
        productStatsObserver.observe(productStatsSection);
    }

    // Enhanced notify form for product page
    const notifyForm = document.querySelector('.notify-form-product');
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!email) {
                showNotification('Please enter your email', 'We need your email to add you to our waitlist.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Invalid Email', 'Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            setButtonLoading(submitBtn, true);

            // Simulate API call
            setTimeout(() => {
                showNotification('Welcome to the Waitlist!', 'You have been added to our exclusive waitlist. We will notify you when the product launches with special early-bird discounts!');
                notifyForm.reset();
                setButtonLoading(submitBtn, false);
            }, 2000);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add hover effects to spec cards
    const specCards = document.querySelectorAll('.spec-card');
    specCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to collar mockup
    const collarMockup = document.querySelector('.collar-mockup');
    if (collarMockup) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            collarMockup.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${rate}px)`;
        });
    }

    // Add interactive floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(255, 255, 255, 1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.9)';
        });
    });

    // Tech feature animations
    const techFeatures = document.querySelectorAll('.tech-feature');
    techFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    console.log('🚀 Product page initialized with enhanced features');
});