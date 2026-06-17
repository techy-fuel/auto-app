import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const { userId } = req.body;

  const { data: { user: caller }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !caller) return res.status(401).json({ error: 'Invalid token' });
  if (caller.email !== ADMIN_EMAIL) return res.status(403).json({ error: 'Forbidden' });

  // Delete user data from Supabase
  await supabaseAdmin.from('leads').delete().eq('user_id', userId);
  await supabaseAdmin.from('inventory').delete().eq('user_id', userId);

  // Delete auth user
  await supabaseAdmin.auth.admin.deleteUser(userId);

  return res.status(200).json({ success: true });
}
