// Loading Screen Functionality
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Simulate loading process
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Initialize all other functionality after loading
            initMainFunctionality();
        }, 500);
    }, 1500); // 1.5 second loading time
}

// Main functionality that runs after loading screen
function initMainFunctionality() {
    console.log('🚀 Initializing main functionality');
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Initialize Lenis Smooth Scroll if available
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Intersection Observer for animated counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    animateCounter(statNumber, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe all stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });

    // Particle background for hero section
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            container.appendChild(particle);
        }
    }

    createParticles();

    // Now initialize all your existing functionality
    initExistingFunctionality();
}

// Your existing functionality (keep all your original code)
function initExistingFunctionality() {
    console.log('🔄 Initializing existing functionality');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links is now handled by Lenis in lenis.js
    // This is kept here for browsers that don't support JavaScript or as a fallback
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        // Only add fallback if Lenis is not active
        if (typeof window.lenis === 'undefined') {
            link.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Backend submission API helpers
    async function postJSON(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
    }

    // Custom Modal notification system
    function showNotification(title, message, type = 'success') {
        const modal = document.getElementById('notification-modal');
        const titleEl = document.getElementById('notification-title');
        const textEl = document.getElementById('notification-text');
        const iconEl = modal.querySelector('.notification-icon i');
        
        titleEl.textContent = title;
        textEl.textContent = message;
        
        // Update icon based on type
        if (type === 'error') {
            iconEl.className = 'fas fa-exclamation-circle';
            iconEl.parentElement.classList.add('error');
        } else {
            iconEl.className = 'fas fa-check-circle';
            iconEl.parentElement.classList.remove('error');
        }
        
        modal.classList.add('show');
        
        // Auto close after 4 seconds
        setTimeout(() => {
            closeNotification();
        }, 4000);
    }

    function closeNotification() {
        const modal = document.getElementById('notification-modal');
        modal.classList.remove('show');
    }

    // Button loading state
    function setButtonLoading(button, loading = true) {
        if (loading) {
            button.classList.add('btn-loading');
            if (!button.querySelector('.btn-text')) {
                button.innerHTML = `<span class="btn-text">${button.textContent}</span>`;
            }
        } else {
            button.classList.remove('btn-loading');
            const textSpan = button.querySelector('.btn-text');
            if (textSpan) {
                button.textContent = textSpan.textContent;
            }
        }
    }

    // Initialize modal close functionality
    const closeBtn = document.getElementById('notification-close');
    const modal = document.getElementById('notification-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNotification);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeNotification();
            }
        });
    }

    // Notify form submission -> backend endpoint
    const notifyForms = document.querySelectorAll('.notify-form');
    notifyForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const email = emailInput ? emailInput.value : '';
            
            if (!email) {
                showNotification('Invalid Email', 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            setButtonLoading(submitBtn, true);
            
            try {
                await postJSON('/api/notify.js', { email });
                showNotification('Success!', 'Thank you! You will be notified when we launch.');
                form.reset();
                console.log('📧 Email sent to backend');
            } catch (error) {
                console.error('❌ notify error:', error);
                showNotification('Error', 'There was an error saving your email. Please try again later.', 'error');
            } finally {
                // Remove loading state
                setButtonLoading(submitBtn, false);
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                // Toggle current
                item.classList.toggle('active');
            });
        });
    }

    // Contact form submission -> backend endpoint
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Show loading state
            setButtonLoading(submitBtn, true);
            
            try {
                await postJSON('/api/contact.js', { name, email, subject, message });
                showNotification('Message Sent!', 'Thank you for contacting us! We have received your message.');
                contactForm.reset();
                console.log('📧 Contact message sent to backend');
            } catch (error) {
                console.error('❌ contact error:', error);
                showNotification('Error', 'There was an error sending your message. Please try again later.', 'error');
            } finally {
                // Remove loading state
                setButtonLoading(submitBtn, false);
            }
        });
    }

    // MVP Launch Countdown Timer
    function addCountdownTimer() {
        console.log('⏰ Timer function called');
        // Try to find the timer div on the home page first
        let timerDiv = document.getElementById('mvp-countdown');
        console.log('Timer div found:', !!timerDiv);
        
        if (!timerDiv) {
            // Fallback: find the coming soon section in app.html
            const comingSoonSection = document.querySelector('.coming-soon');
            if (!comingSoonSection) return;
            timerDiv = document.createElement('div');
            timerDiv.id = 'mvp-countdown';
            comingSoonSection.insertBefore(timerDiv, comingSoonSection.children[1]);
        }

        // Set target date from .env configuration
        const launchDate = window.MVP_LAUNCH_DATE ? new Date(window.MVP_LAUNCH_DATE) : new Date('2025-09-30T00:00:00+05:30');
        console.log('🎯 MVP Launch date from .env:', window.MVP_LAUNCH_DATE || 'Using fallback date');

        function updateTimer() {
            const now = new Date();
            const diff = launchDate - now;
            if (diff <= 0) {
                timerDiv.innerHTML = '<span style="font-size: 2.5rem; color: #2ed8a7;">🎉 MVP Launched! 🎉</span>';
                clearInterval(timerInterval);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            
            // Check if we're on product or app page for green text
            const isProductOrAppPage = document.body.classList.contains('product-page') || document.body.classList.contains('app-page');
            const textColor = isProductOrAppPage ? 'var(--primary-color)' : 'white';
            
            const timerText = `
                <div class="mvp-title">🚀MVP LAUNCHING🚀</div>
                <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div class="countdown-number" style="font-size: 1.5rem; display: block;">${days}</div>
                        <div style="font-size: 0.6rem; opacity: 0.8; color: ${textColor};">DAYS</div>
                    </div>
                    <div style="font-size: 1rem; opacity: 0.6; color: ${textColor};">:</div>
                    <div style="text-align: center;">
                        <div class="countdown-number" style="font-size: 1.5rem; display: block;">${hours}</div>
                        <div style="font-size: 0.6rem; opacity: 0.8; color: ${textColor};">HOURS</div>
                    </div>
                    <div style="font-size: 1rem; opacity: 0.6; color: ${textColor};">:</div>
                    <div style="text-align: center;">
                        <div class="countdown-number" style="font-size: 1.5rem; display: block;">${minutes}</div>
                        <div style="font-size: 0.6rem; opacity: 0.8; color: ${textColor};">MINUTES</div>
                    </div>
                    <div style="font-size: 1rem; opacity: 0.6; color: ${textColor};">:</div>
                    <div style="text-align: center;">
                        <div class="countdown-number" style="font-size: 1.5rem; display: block;">${seconds}</div>
                        <div style="font-size: 0.6rem; opacity: 0.8; color: ${textColor};">SECONDS</div>
                    </div>
                </div>
            `;
            
            timerDiv.innerHTML = timerText;
        }

        updateTimer();
        var timerInterval = setInterval(updateTimer, 1000);
        console.log('⏰ Countdown timer started');
    }

    // Initialize countdown timer
    addCountdownTimer();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded');
    initLoadingScreen();
});

// Fallback: if loading screen doesn't exist, initialize main functionality directly
document.addEventListener('DOMContentLoaded', function() {
    // Check if loading screen exists
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) {
        console.log('📝 No loading screen found, initializing directly');
        initMainFunctionality();
    }
});