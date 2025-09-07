//script.js
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth Scrolling for anchor links
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Initialize Firebase (using .env configuration)
let db = null;
let firebaseInitialized = false;

function initializeFirebase() {
  if (typeof firebase !== 'undefined' && window.firebaseConfig && window.configLoaded) {
    try {
      const app = firebase.initializeApp(window.firebaseConfig);
      db = firebase.firestore(app);
      firebaseInitialized = true;
      console.log('✅ Firebase initialized successfully with .env configuration');
      return true;
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
      return false;
    }
  } else {
    console.warn('⚠️ Firebase not available. Waiting for .env configuration...');
    return false;
  }
}

// Make initializeFirebase available globally
window.initializeFirebase = initializeFirebase;

// Prevent form submission for Notify forms (sends to Firebase using .env config)
const notifyForms = document.querySelectorAll('.notify-form');
notifyForms.forEach(form => {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';
    
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }
    
    if (!firebaseInitialized || !db) {
      alert('Firebase not initialized. Please ensure the server is running with npm start and .env file is configured.');
      return;
    }
    
    try {
      await db.collection("notifyEmails").add({ 
        email, 
        timestamp: new Date(),
        source: 'notify-form'
      });
      alert('✅ Thank you! You will be notified when we launch.');
      form.reset();
      console.log('📧 Email saved to Firebase:', email);
    } catch (error) {
      console.error('❌ Firebase error:', error);
      alert('There was an error saving your email. Please try again later.');
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

// Contact Form Submission (contact.html) - uses .env Firebase config
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const subject = contactForm.querySelector('#subject').value;
    const message = contactForm.querySelector('#message').value;
    
    if (!firebaseInitialized || !db) {
      alert('Firebase not initialized. Please ensure the server is running with npm start and .env file is configured.');
      return;
    }
    
    try {
      await db.collection("contactMessages").add({
        name,
        email,
        subject,
        message,
        timestamp: new Date(),
        source: 'contact-form'
      });
      alert('✅ Thank you for contacting us! We have received your message.');
      contactForm.reset();
      console.log('📧 Contact message saved to Firebase:', { name, email, subject });
    } catch (error) {
      console.error('❌ Firebase error:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  });
}

// MVP Launch Countdown Timer (uses .env MVP_LAUNCH_DATE)
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM loaded, initializing application...');
  
  // Start timer immediately (it will use fallback date if .env not loaded yet)
  addCountdownTimer();
  
  // Try to initialize Firebase immediately, then retry after config loads
  initializeFirebase();
  
  // Set up a retry mechanism for Firebase initialization
  let retryCount = 0;
  const maxRetries = 10;
  const retryInterval = setInterval(() => {
    if (firebaseInitialized) {
      clearInterval(retryInterval);
      console.log('✅ Firebase initialization completed');
    } else if (retryCount < maxRetries) {
      retryCount++;
      console.log(`🔄 Retrying Firebase initialization (${retryCount}/${maxRetries})...`);
      initializeFirebase();
    } else {
      clearInterval(retryInterval);
      console.error('❌ Failed to initialize Firebase after maximum retries');
    }
  }, 2000);
}); 