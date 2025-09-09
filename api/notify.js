const admin = require('./_firebaseAdmin');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  if (!admin) return res.status(500).json({ error: 'Admin not initialized' });

  let body = req.body;
  if (!body) {
    body = await new Promise(resolve => {
      let data='';
      req.on('data', c=> data+=c);
      req.on('end', ()=> {
        try { resolve(JSON.parse(data || '{}')); } catch { resolve({}); }
      });
    });
  }
  const { email } = body;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  try {
    await admin.firestore().collection('notifyEmails').add({
      email,
      createdAt: new Date().toISOString(),
      source: 'notify-form'
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('notify save error', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
