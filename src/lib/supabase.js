import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Scoped queries — always filter by user_id so each dealership sees only their data
export function db(userId) {
  return {
    leads: {
      select: (cols = '*') => supabase.from('leads').select(cols).eq('user_id', userId),
      insert: (rows) => supabase.from('leads').insert(rows.map(r => ({ ...r, user_id: userId }))),
      update: (data, id) => supabase.from('leads').update(data).eq('id', id).eq('user_id', userId),
      delete: (id) => supabase.from('leads').delete().eq('id', id).eq('user_id', userId),
    },
    inventory: {
      select: (cols = '*') => supabase.from('inventory').select(cols).eq('user_id', userId),
      insert: (rows) => supabase.from('inventory').insert(rows.map(r => ({ ...r, user_id: userId }))),
      update: (data, id) => supabase.from('inventory').update(data).eq('id', id).eq('user_id', userId),
      delete: (id) => supabase.from('inventory').delete().eq('id', id).eq('user_id', userId),
    },
  };
}
