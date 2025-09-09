// Serverless function for Vercel: /api/config
// Returns public Firebase configuration & launch date.
// NOTE: Firebase "apiKey" etc. are NOT secrets. Security is enforced via Firestore / Storage rules.

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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

    return res.status(200).json({
      firebaseConfig,
      mvpLaunchDate: process.env.MVP_LAUNCH_DATE || null
    });
  } catch (err) {
    console.error('Error building config response', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
