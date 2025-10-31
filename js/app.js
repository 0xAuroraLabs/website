// App Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for app page
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Animated counters for app stats
    function animateAppCounters() {
        const statNumbers = document.querySelectorAll('.app-stat .stat-number');
        
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
    const appStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAppCounters();
                appStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe app stats section
    const appStatsSection = document.querySelector('.app-stats');
    if (appStatsSection) {
        appStatsObserver.observe(appStatsSection);
    }

    // Enhanced notify form for app page
    const notifyForm = document.querySelector('.notify-form-app');
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!email) {
                showNotification('Please enter your email', 'We need your email to notify you when the app launches.', 'error');
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
                showNotification('Success!', 'You have been added to our waitlist. We will notify you when the app launches!');
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

    // Add hover effects to app feature cards
    const appFeatureCards = document.querySelectorAll('.app-feature-card');
    appFeatureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to phone mockup
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            phoneMockup.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${rate}px)`;
        });
    }

    // Add click animation to store badges
    const storeBadges = document.querySelectorAll('.store-badge');
    storeBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Coming Soon', 'The app will be available on both App Store and Google Play soon!');
        });
    });

    console.log('🚀 App page initialized with enhanced features');
});