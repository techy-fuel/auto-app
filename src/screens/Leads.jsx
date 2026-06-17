import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/core/Button';
import { Badge } from '../components/core/Badge';
import { Avatar } from '../components/core/Avatar';
import { LeadScore } from '../components/data/LeadScore';
import { AiInsight } from '../components/data/AiInsight';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Tabs } from '../components/navigation/Tabs';

const statusTone = { New: 'blue', Contacted: 'slate', Qualified: 'emerald', Proposal: 'violet', Negotiation: 'amber', Won: 'emerald', Lost: 'red' };

const emptyForm = { name: '', email: '', company: '', phone: '', value: '', score: 50, status: 'New', source: '', assigned: '' };

export function Leads() {
  const { user } = useUser();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  }

  async function addLead() {
    if (!form.name.trim()) { setError('Name is required'); return; }
    setSaving(true);
    setError('');
    const { error } = await supabase.from('leads').insert([{
      ...form,
      value: parseFloat(form.value) || 0,
      score: parseInt(form.score) || 50,
      user_id: user?.id,
    }]);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setShowForm(false);
    setForm(emptyForm);
    fetchLeads();
  }

  async function deleteLead(id) {
    await supabase.from('leads').delete().eq('id', id);
    fetchLeads();
  }

  const filtered = leads.filter(l => {
    if (activeTab === 'hot' && l.score < 70) return false;
    if (activeTab === 'warm' && (l.score < 40 || l.score >= 70)) return false;
    if (activeTab === 'cold' && l.score >= 40) return false;
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (search && !l.name?.toLowerCase().includes(search.toLowerCase()) && !l.company?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tabs = [
    { value: 'all', label: 'All Leads', count: leads.length },
    { value: 'hot', label: 'Hot', count: leads.filter(l => l.score >= 70).length },
    { value: 'warm', label: 'Warm', count: leads.filter(l => l.score >= 40 && l.score < 70).length },
    { value: 'cold', label: 'Cold', count: leads.filter(l => l.score < 40).length },
  ];

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      <AiInsight title="AI Recommendation" tone="action">
        Leads in Negotiation stage without a touchpoint in 72+ hours convert 3× faster with a personalized follow-up.
      </AiInsight>

      {/* Add Lead Form */}
      {showForm && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Add New Lead</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            {[
              { label: 'Full Name *', key: 'name', placeholder: 'Ahmad Al Mansouri' },
              { label: 'Email', key: 'email', placeholder: 'ahmad@example.com' },
              { label: 'Company', key: 'company', placeholder: 'Al Futtaim Group' },
              { label: 'Phone', key: 'phone', placeholder: '+971 50 123 4567' },
              { label: 'Deal Value (AED)', key: 'value', placeholder: '120000' },
              { label: 'Assigned To', key: 'assigned', placeholder: 'Rashid M.' },
              { label: 'Source', key: 'source', placeholder: 'Website / WhatsApp / Referral' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', background: 'var(--white)' }}>
                {['New','Contacted','Qualified','Proposal','Negotiation','Won','Lost'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>AI Score (0-100)</label>
              <input type="number" min="0" max="100" value={form.score}
                onChange={e => setForm(p => ({ ...p, score: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          {error && <p style={{ color: 'var(--red-500)', font: '12px/1 var(--font-body)', marginTop: 12 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 'var(--space-5)' }}>
            <Button size="sm" variant="accent" onClick={addLead} disabled={saving}>{saving ? 'Saving...' : 'Save Lead'}</Button>
            <Button size="sm" variant="secondary" onClick={() => { setShowForm(false); setForm(emptyForm); setError(''); }}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-soft)', gap: 'var(--space-4)' }}>
          <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="sm"
              style={{ width: 200 }}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
            />
            <Select
              size="sm"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'New', label: 'New' },
                { value: 'Contacted', label: 'Contacted' },
                { value: 'Qualified', label: 'Qualified' },
                { value: 'Proposal', label: 'Proposal' },
                { value: 'Negotiation', label: 'Negotiation' },
              ]}
              style={{ width: 140 }}
            />
            <Button size="sm" variant="accent" onClick={() => setShowForm(true)}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>
              Add Lead
            </Button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading leads...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)' }}>
                {['Lead', 'Company', 'Value (AED)', 'AI Score', 'Status', 'Source', 'Assigned', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--divider)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={lead.name} size={34} />
                      <div>
                        <div style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{lead.name}</div>
                        <div style={{ font: '12px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 3 }}>{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', font: '13px/1 var(--font-body)', color: 'var(--text-body)' }}>{lead.company}</td>
                  <td style={{ padding: '14px 16px', font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>
                    {lead.value ? `AED ${Number(lead.value).toLocaleString()}` : '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}><LeadScore score={lead.score} size="sm" /></td>
                  <td style={{ padding: '14px 16px' }}><Badge tone={statusTone[lead.status] || 'slate'} dot>{lead.status}</Badge></td>
                  <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{lead.source}</td>
                  <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-body)' }}>{lead.assigned}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => deleteLead(lead.id)} style={{ padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)', background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--red-500)', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>
            {leads.length === 0 ? 'No leads yet. Click "Add Lead" to get started!' : 'No leads match your filters.'}
          </div>
        )}
      </div>
    </div>
  );
}
