import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function verifySupabaseToken(token) {
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) throw new Error('Invalid token');
  return user;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let user;
  try {
    user = await verifySupabaseToken(token);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Fetch user's CRM data for context
  const [{ data: leads }, { data: inventory }] = await Promise.all([
    supabaseAdmin.from('leads').select('name, status, value, stage').eq('user_id', user.id).limit(20),
    supabaseAdmin.from('inventory').select('make, model, price, status').eq('user_id', user.id).limit(20),
  ]);

  const crmContext = `You are AutoPilot AI Copilot, an expert UAE car dealership sales assistant.

Current CRM snapshot for this user:
- Leads: ${leads?.length ?? 0} total
${(leads || []).map(l => `  • ${l.name} — ${l.stage || l.status} — AED ${l.value || 'N/A'}`).join('\n')}

- Inventory: ${inventory?.length ?? 0} vehicles
${(inventory || []).map(v => `  • ${v.make} ${v.model} — AED ${v.price} — ${v.status}`).join('\n')}

Answer concisely and helpfully. Use markdown formatting for lists and tables. Focus on actionable sales advice for UAE market.`;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in environment variables' });
  }

  // Anthropic requires messages to alternate user/assistant starting with user
  // Filter and normalize roles
  const normalized = messages
    .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }))
    .filter((m, i, arr) => {
      // Remove consecutive same roles, keep last
      if (i === 0) return m.role === 'user';
      return m.role !== arr[i - 1].role;
    });

  if (normalized.length === 0 || normalized[normalized.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Last message must be from user' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: crmContext,
      messages: normalized,
    });
    return res.status(200).json({ content: response.content[0].text });
  } catch (e) {
    console.error('Anthropic error:', e.message);
    return res.status(500).json({ error: `AI error: ${e.message}` });
  }
}
