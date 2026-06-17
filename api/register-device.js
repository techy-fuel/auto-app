import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Saves a device's push token for the logged-in user.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authToken = (req.headers.authorization || '').replace('Bearer ', '');
  if (!authToken) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authToken);
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  const { token, platform } = req.body || {};
  if (!token) return res.status(400).json({ error: 'token required' });

  const { error } = await supabaseAdmin
    .from('device_tokens')
    .upsert(
      { user_id: user.id, token, platform: platform || 'android', updated_at: new Date().toISOString() },
      { onConflict: 'token' }
    );

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
}
