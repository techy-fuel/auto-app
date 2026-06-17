const express = require('express');
const { createClerkClient } = require('@clerk/backend');
const { createClient } = require('@supabase/supabase-js');
const auth = require('../middleware/auth');

const router = express.Router();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function adminOnly(req, res, next) {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const user = await clerk.users.getUser(req.userId);
  const email = user.emailAddresses[0]?.emailAddress;
  if (email !== ADMIN_EMAIL) return res.status(403).json({ error: 'Forbidden' });
  next();
}

router.get('/users', auth, adminOnly, async (req, res) => {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  const { data: clerkUsers } = await clerk.users.getUserList({ limit: 100, orderBy: '-created_at' });
  const { data: leads } = await supabase.from('leads').select('user_id');

  const counts = {};
  (leads || []).forEach(r => { counts[r.user_id] = (counts[r.user_id] || 0) + 1; });

  const users = clerkUsers.map(u => ({
    id: u.id,
    name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
    email: u.emailAddresses[0]?.emailAddress || '',
    leads: counts[u.id] || 0,
    lastLogin: u.lastSignInAt,
    createdAt: u.createdAt,
    banned: u.banned || false,
  }));

  res.json({ users, total: users.length });
});

router.post('/ban', auth, adminOnly, async (req, res) => {
  const { userId, action } = req.body;
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  if (action === 'ban') await clerk.users.banUser(userId);
  else await clerk.users.unbanUser(userId);
  res.json({ success: true });
});

router.post('/delete', auth, adminOnly, async (req, res) => {
  const { userId } = req.body;
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  await supabase.from('leads').delete().eq('user_id', userId);
  await supabase.from('inventory').delete().eq('user_id', userId);
  await clerk.users.deleteUser(userId);
  res.json({ success: true });
});

module.exports = router;
