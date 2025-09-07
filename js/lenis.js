// Lenis smooth scrolling initialization
let lenis;

// Initialize Lenis when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis for smooth scrolling with more intensive parameters
  lenis = new Lenis({
    duration: 2.4,  // Increased from 1.2 for more pronounced smoothing
    easing: (t) => Math.min(1, 1.001 - Math.pow(2.5, -15 * t)), // Modified for a more dramatic curve
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1.8,  // Increased from 1 for more intensive mouse wheel effect
    smoothTouch: true,     // Enable smooth scrolling on touch devices
    touchMultiplier: 3,    // Increased touch multiplier for mobile
    infinite: false,
    lerp: 0.15,            // Linear interpolation factor - higher means more smoothing
    wheelMultiplier: 1.5,  // Make mousewheel more sensitive
    normalizeWheel: true,  // Normalizes wheel events across browsers
  });

  // Get all links that have a hash
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  // Add click event to all anchor links
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Use Lenis scrollTo method with more intensive parameters
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 2.4,  // Match the main duration setting
          easing: (t) => Math.min(1, 1.001 - Math.pow(2.5, -15 * t)),  // Match the main easing function
          immediate: false // Ensure smooth scrolling even if triggered programmatically
        });
      }
    });
  });

  // Connect Lenis to the RAF loop for smooth rendering
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  // Start the animation frame
  requestAnimationFrame(raf);

  // Add special classes and attributes when scrolling for enhanced styling
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // Set scrolling state for more responsive visual effects
    document.documentElement.setAttribute('data-scrolling', Math.abs(velocity) > 0.05);
    
    // Add scroll velocity to enable intensity-based animations
    document.documentElement.style.setProperty('--scroll-velocity', Math.min(Math.abs(velocity * 5), 10));
    
    // Add scroll direction for directional effects
    document.documentElement.setAttribute('data-scroll-direction', direction);
    
    // Add scroll progress percentage through the page
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(2));
    
    // Add intensive scroll effect class when scrolling faster
    if (Math.abs(velocity) > 0.5) {
      document.documentElement.classList.add('intensive-scroll');
      
      // Remove the class after a short delay for a smooth transition back
      clearTimeout(window.intensiveScrollTimeout);
      window.intensiveScrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('intensive-scroll');
      }, 600);
    }
  });

  // Optional: Make lenis accessible globally
  window.lenis = lenis;
  
  // Add enhanced scroll reveal functionality
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  // Create an intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add staggered delay for grouped items
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('staggered-item')) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
        } else {
          entry.target.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Observe all scroll reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
    observer.observe(el);
  });
  
  // Apply staggered animation to list items
  document.querySelectorAll('.staggered-list').forEach(list => {
    const items = list.querySelectorAll('.staggered-item');
    items.forEach((item, index) => {
      item.dataset.delay = index * 150; // 150ms delay between each item
      observer.observe(item);
    });
  });
  
  // Apply scroll animations to common elements
  setTimeout(() => {
    const commonElements = ['.hero-content', '.section-title', '.feature-item', '.card', '.team-member'];
    commonElements.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('scroll-reveal') && 
            !el.classList.contains('scroll-reveal-left') && 
            !el.classList.contains('scroll-reveal-right') &&
            !el.classList.contains('staggered-item')) {
          el.classList.add('scroll-reveal');
          observer.observe(el);
        }
      });
    });
  }, 100);
});
