const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const auth = require('../middleware/auth');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/chat', auth, async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  // Fetch user's real data for context
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const [{ data: leads }, { data: inventory }] = await Promise.all([
    supabase.from('leads').select('*').eq('user_id', req.userId).limit(20),
    supabase.from('inventory').select('*').eq('user_id', req.userId).limit(20),
  ]);

  const context = `You are an AI sales assistant for a UAE car dealership CRM called AutoPilot CRM.
Always respond in the same language the user writes in (English or Urdu/Roman Urdu).
Currency is AED. Be concise, helpful, and sales-focused.

Current dealership data:
- Total leads: ${leads?.length || 0}
- Hot leads (score 70+): ${leads?.filter(l => l.score >= 70).length || 0}
- Leads in Negotiation: ${leads?.filter(l => l.status === 'Negotiation').length || 0}
- Total inventory: ${inventory?.length || 0}
- Available cars: ${inventory?.filter(v => v.status === 'Available').length || 0}
- Stock value: AED ${inventory?.filter(v => v.status === 'Available').reduce((s, v) => s + (v.price || 0), 0).toLocaleString()}`;

  try {
    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: context,
      messages,
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
