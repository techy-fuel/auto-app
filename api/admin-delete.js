import { createClerkClient } from '@clerk/backend';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  const { userId } = req.body;

  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  let callerEmail;
  try {
    const payload = await clerk.verifyToken(token);
    const caller = await clerk.users.getUser(payload.sub);
    callerEmail = caller.emailAddresses[0]?.emailAddress;
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (callerEmail !== ADMIN_EMAIL) return res.status(403).json({ error: 'Forbidden' });

  // Delete user data from Supabase
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  await supabase.from('leads').delete().eq('user_id', userId);
  await supabase.from('inventory').delete().eq('user_id', userId);

  // Delete from Clerk
  await clerk.users.deleteUser(userId);

  return res.status(200).json({ success: true });
}
