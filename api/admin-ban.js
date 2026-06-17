import { createClerkClient } from '@clerk/backend';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  const { userId, action } = req.body; // action: 'ban' | 'unban'

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

  if (action === 'ban') {
    await clerk.users.banUser(userId);
  } else {
    await clerk.users.unbanUser(userId);
  }

  return res.status(200).json({ success: true });
}
