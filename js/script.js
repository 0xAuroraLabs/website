//script.js
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

// Toast notification system
function showToast(message, type = 'success', duration = 3500) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '24px'; // changed from top to bottom
    toastContainer.style.right = '24px';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '12px';
    document.body.appendChild(toastContainer);
  }
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  toast.style.padding = '14px 24px';
  toast.style.borderRadius = '8px';
  toast.style.background = '#fff'; // white background
  toast.style.color = '#222'; // black text
  toast.style.fontWeight = 'bold';
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)'; // animate up from bottom
  toast.style.transition = 'opacity 0.3s, transform 0.3s';
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Notify form submission -> backend endpoint
const notifyForms = document.querySelectorAll('.notify-form');
notifyForms.forEach(form => {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';
    
    if (!email) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    
    try {
      await postJSON('/api/notify.js', { email });
      showToast('Thank you! You will be notified when we launch.', 'success');
      form.reset();
      console.log('📧 Email sent to backend');
    } catch (error) {
      console.error('❌ notify error:', error);
      showToast('There was an error saving your email. Please try again later.', 'error');
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
    
    try {
      await postJSON('/api/contact.js', { name, email, subject, message });
      showToast('Thank you for contacting us! We have received your message.', 'success');
      contactForm.reset();
      console.log('📧 Contact message sent to backend');
    } catch (error) {
      console.error('❌ contact error:', error);
      showToast('There was an error sending your message. Please try again later.', 'error');
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
  console.log('🚀 DOM loaded');
  addCountdownTimer();
});