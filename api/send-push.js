import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Lazily initialise Firebase Admin (only when first push is sent).
let messaging = null;
async function getMessaging() {
  if (messaging) return messaging;
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT env var not configured');
  }
  const admin = await import('firebase-admin');
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }
  messaging = admin.messaging();
  return messaging;
}

// Sends a push notification to a user's devices (or broadcast to all).
// Body: { userId?, title, body }  — admin only.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authToken = (req.headers.authorization || '').replace('Bearer ', '');
  const { data: { user: caller }, error } = await supabaseAdmin.auth.getUser(authToken);
  if (error || !caller) return res.status(401).json({ error: 'Invalid token' });
  if (caller.email !== ADMIN_EMAIL) return res.status(403).json({ error: 'Forbidden' });

  const { userId, title, body } = req.body || {};
  if (!title || !body) return res.status(400).json({ error: 'title and body required' });

  // Gather target device tokens
  let query = supabaseAdmin.from('device_tokens').select('token');
  if (userId) query = query.eq('user_id', userId);
  const { data: rows, error: dbError } = await query;
  if (dbError) return res.status(500).json({ error: dbError.message });

  const tokens = (rows || []).map(r => r.token);
  if (tokens.length === 0) return res.status(200).json({ sent: 0, message: 'No devices registered' });

  try {
    const msg = await getMessaging();
    const result = await msg.sendEachForMulticast({
      tokens,
      notification: { title, body },
    });
    return res.status(200).json({ sent: result.successCount, failed: result.failureCount });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
