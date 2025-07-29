// Firebase Configuration - Production Ready for Vercel/GitHub
let firebaseConfig = null;
let MVP_LAUNCH_DATE = null;
let configLoaded = false;

// Production configuration - will be overridden by Vercel environment variables
const productionConfig = {
  firebaseConfig: {
    apiKey: "AIzaSyBPsPMf2CIHc34yxx8L_-YFRMs5I2hC4Ok",
    authDomain: "auroral-labs.firebaseapp.com",
    projectId: "auroral-labs",
    storageBucket: "auroral-labs.firebasestorage.app",
    messagingSenderId: "318398920981",
    appId: "1:318398920981:web:78af828889e6428225511c",
    measurementId: "G-DES6GBE94P"
  },
  mvpLaunchDate: "2025-09-30T00:00:00+05:30"
};

// Load configuration for production (Vercel) or development
async function loadConfiguration() {
  try {
    // Try to load from API endpoint first (for local development with server)
    const response = await fetch('/api/config');
    if (response.ok) {
      const config = await response.json();
      firebaseConfig = config.firebaseConfig;
      MVP_LAUNCH_DATE = config.mvpLaunchDate;
      console.log('✅ Configuration loaded from API (development mode)');
    } else {
      throw new Error('API not available');
    }
  } catch (error) {
    // Use production configuration (for Vercel deployment)
    firebaseConfig = productionConfig.firebaseConfig;
    MVP_LAUNCH_DATE = productionConfig.mvpLaunchDate;
    console.log('✅ Production configuration loaded (Vercel ready)');
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