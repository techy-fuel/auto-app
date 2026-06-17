const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const auth = require('../middleware/auth');

const router = express.Router();
const supabase = () => createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

router.get('/', auth, async (req, res) => {
  const { data, error } = await supabase().from('leads').select('*').eq('user_id', req.userId).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', auth, async (req, res) => {
  const { data, error } = await supabase().from('leads').insert([{ ...req.body, user_id: req.userId }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

router.patch('/:id', auth, async (req, res) => {
  const { data, error } = await supabase().from('leads').update(req.body).eq('id', req.params.id).eq('user_id', req.userId).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

router.delete('/:id', auth, async (req, res) => {
  const { error } = await supabase().from('leads').delete().eq('id', req.params.id).eq('user_id', req.userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

module.exports = router;
