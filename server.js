const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_MEASUREMENT_ID',
  'MVP_LAUNCH_DATE'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('Please check your .env file and ensure all variables are set.');
  process.exit(1);
}

console.log('✅ All required environment variables loaded from .env file');

// Serve static files
app.use(express.static('.'));

// Serve config as JSON endpoint (secure - only Firebase config, no sensitive data)
app.get('/api/config', (req, res) => {
  try {
    const config = {
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      },
      mvpLaunchDate: process.env.MVP_LAUNCH_DATE
    };
    
    console.log('📤 Serving Firebase configuration to client');
    res.json(config);
  } catch (error) {
    console.error('❌ Error serving config:', error);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('🔐 Environment variables loaded from .env file');
  console.log('📅 MVP Launch Date:', process.env.MVP_LAUNCH_DATE);
  console.log('🔥 Firebase Project:', process.env.FIREBASE_PROJECT_ID);
}); 