// Local development Express server (NOT used on Vercel deployment).
// Provides /api/config endpoint to mirror the serverless function.
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Static assets (root directory) & JSON parsing
app.use(express.static(__dirname));
app.use(express.json());

app.get('/api/config', (req, res) => {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };

    res.json({
      firebaseConfig,
      mvpLaunchDate: process.env.MVP_LAUNCH_DATE || null
    });
  } catch (e) {
    console.error('Error in /api/config', e);
    res.status(500).json({ error: 'Failed to load config' });
  }
});

// In-memory placeholder stores for local testing
const memory = { notifyEmails: [], contactMessages: [] };

app.post('/api/notify', (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  memory.notifyEmails.push({ email, createdAt: new Date().toISOString() });
  res.json({ success: true });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: 'Missing required fields' });
  memory.contactMessages.push({ name, email, subject, message, createdAt: new Date().toISOString() });
  res.json({ success: true });
});

// Fallback to index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
  console.log('Config endpoint: http://localhost:' + PORT + '/api/config');
});
