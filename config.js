// Firebase Configuration - Production Ready for Vercel/GitHub
let firebaseConfig = null;
let MVP_LAUNCH_DATE = null;
let configLoaded = false;

// Optional static fallback (used when /api/config not reachable, e.g. Live Server)
// These Firebase values are PUBLIC identifiers (not secrets). If you rotate them, update here.
const fallbackFirebaseConfig = {
  apiKey: 'AIzaSyBPsPMf2CIHc34yxx8L_-YFRMs5I2hC4Ok',
  authDomain: 'auroral-labs.firebaseapp.com',
  projectId: 'auroral-labs',
  storageBucket: 'auroral-labs.firebasestorage.app',
  messagingSenderId: '318398920981',
  appId: '1:318398920981:web:78af828889e6428225511c',
  measurementId: 'G-DES6GBE94P'
};
const fallbackLaunchDate = '2025-09-30T00:00:00+05:30';

// Load configuration from environment variables via API with fallbacks
async function loadConfiguration() {
  const currentOrigin = window.location.origin;
  const candidates = [];

  // Primary: same-origin (works on Vercel / when using node server)
  candidates.push(currentOrigin + '/api/config');

  // If running from a static live server (e.g. 127.0.0.1:5500) also try localhost:3000
  if (!/3000$/.test(window.location.port)) {
    candidates.push('http://localhost:3000/api/config');
  }

  let success = false;
  for (const url of candidates) {
    try {
      console.log('🔎 Trying config endpoint:', url);
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const cfg = await response.json();
      firebaseConfig = cfg.firebaseConfig || null;
      MVP_LAUNCH_DATE = cfg.mvpLaunchDate || null;
      console.log('✅ Loaded configuration from', url);
      success = true;
      break;
    } catch (e) {
      console.warn('⚠️ Failed to load config from', url, '-', e.message);
    }
  }

  if (!success) {
    console.warn('⚠️ No config endpoint reachable. If you are using Live Server, also run: npm start (Express dev server on :3000)');
    console.warn('   Or deploy to Vercel where /api/config is provided by the serverless function.');
  // Apply fallback so Firebase can still initialize in purely static mode.
  firebaseConfig = fallbackFirebaseConfig;
  MVP_LAUNCH_DATE = fallbackLaunchDate;
  console.log('✅ Using static fallback Firebase configuration');
  }

  configLoaded = true;
  window.firebaseConfig = firebaseConfig;
  window.MVP_LAUNCH_DATE = MVP_LAUNCH_DATE;
  window.configLoaded = true;

  console.log('Firebase config loaded:', !!firebaseConfig);
  console.log('MVP Launch date:', MVP_LAUNCH_DATE);

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