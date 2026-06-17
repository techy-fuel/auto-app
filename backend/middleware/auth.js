const { createClerkClient } = require('@clerk/backend');

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

module.exports = async function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const payload = await clerk.verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
