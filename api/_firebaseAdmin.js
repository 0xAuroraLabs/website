// Shared firebase-admin initialization for serverless functions.
// Requires env var FIREBASE_SERVICE_ACCOUNT (base64 encoded JSON of service account key)
let adminInstance;
try {
  const admin = require('firebase-admin');
  if (!admin.apps.length) {
    const b64 = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!b64) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT env var');
    const json = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(json)
    });
  }
  adminInstance = require('firebase-admin');
} catch (e) {
  console.error('firebase-admin init error:', e.message);
}
module.exports = adminInstance;
