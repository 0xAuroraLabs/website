// Firebase Configuration - Production Ready for Vercel/GitHub
let firebaseConfig = null;
let MVP_LAUNCH_DATE = null;
let configLoaded = false;

// Load configuration from environment variables via API
async function loadConfiguration() {
  try {
    // Fetch configuration from API endpoint
    const response = await fetch('/api/config');
    if (response.ok) {
      const config = await response.json();
      firebaseConfig = config.firebaseConfig;
      MVP_LAUNCH_DATE = config.mvpLaunchDate;
      console.log('✅ Configuration loaded from Vercel environment variables');
    } else {
      throw new Error('API not available');
    }
  } catch (error) {
    console.log('⚠️ Using fallback configuration (client-side)');
  }
  
  configLoaded = true;
  
  // Set window variables for client-side usage
  window.firebaseConfig = firebaseConfig;
  window.MVP_LAUNCH_DATE = MVP_LAUNCH_DATE;
  window.configLoaded = true;
  
  console.log('Firebase config loaded:', !!firebaseConfig);
  console.log('MVP Launch date:', MVP_LAUNCH_DATE);
  
  // Trigger Firebase initialization after config is loaded
  if (typeof window.initializeFirebase === 'function') {
    window.initializeFirebase();
  }
}

// Load config when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', loadConfiguration);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { firebaseConfig, MVP_LAUNCH_DATE, configLoaded };
} 