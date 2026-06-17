import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Verify caller is admin
  const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !caller) return res.status(401).json({ error: 'Invalid token' });
  if (caller.email !== ADMIN_EMAIL) return res.status(403).json({ error: 'Forbidden' });

  // Fetch all users via admin API
  const { data: { users: allUsers }, error: listError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
  if (listError) return res.status(500).json({ error: listError.message });

  // Fetch lead counts per user
  const { data: leadsData } = await supabaseAdmin.from('leads').select('user_id');
  const leadCounts = {};
  (leadsData || []).forEach(r => { leadCounts[r.user_id] = (leadCounts[r.user_id] || 0) + 1; });

  const users = allUsers.map(u => ({
    id: u.id,
    name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Unknown',
    email: u.email || '',
    leads: leadCounts[u.id] || 0,
    lastLogin: u.last_sign_in_at || null,
    createdAt: u.created_at || null,
    banned: u.banned_until ? new Date(u.banned_until) > new Date() : false,
  }));

  return res.status(200).json({ users, total: users.length });
}
