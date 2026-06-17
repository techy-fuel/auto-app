import { createClerkClient } from '@clerk/backend';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Verify caller is admin via Clerk
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  let callerEmail;
  try {
    const payload = await clerk.verifyToken(token);
    const caller = await clerk.users.getUser(payload.sub);
    callerEmail = caller.emailAddresses[0]?.emailAddress;
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (callerEmail !== ADMIN_EMAIL) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Fetch all users from Clerk
  const { data: clerkUsers } = await clerk.users.getUserList({ limit: 100, orderBy: '-created_at' });

  // Fetch lead counts per user from Supabase
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const { data: leadCounts } = await supabase
    .from('leads')
    .select('user_id')
    .then(({ data }) => {
      const counts = {};
      (data || []).forEach(r => { counts[r.user_id] = (counts[r.user_id] || 0) + 1; });
      return { data: counts };
    });

  const users = clerkUsers.map(u => ({
    id: u.id,
    name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
    email: u.emailAddresses[0]?.emailAddress || '',
    leads: leadCounts[u.id] || 0,
    lastLogin: u.lastSignInAt ? new Date(u.lastSignInAt).toISOString() : null,
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
    banned: u.banned || false,
  }));

  return res.status(200).json({ users, total: users.length });
}
