import React, { useState, useEffect } from 'react';

import { db } from '../lib/supabase';
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

export function Leads({ user }) {
  
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const d = db(user?.id);

  useEffect(() => { if (user?.id) fetchLeads(); }, [user?.id]);

  async function fetchLeads() {
    setLoading(true);
    const { data } = await d.leads.select().order('created_at', { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }

  async function addLead() {
    if (!form.name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    const { error } = await d.leads.insert([{ ...form, value: parseFloat(form.value) || 0, score: parseInt(form.score) || 50 }]);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setShowForm(false); setForm(emptyForm); fetchLeads();
  }

  async function deleteLead(id) {
    await d.leads.delete(id);
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

      {showForm && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Add New Lead</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
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
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', outline: 'none', background: 'var(--white)' }}>
                {['New','Contacted','Qualified','Proposal','Negotiation','Won','Lost'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>AI Score (0-100)</label>
              <input type="number" min="0" max="100" value={form.score} onChange={e => setForm(p => ({ ...p, score: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          {error && <p style={{ color: 'var(--red-500)', font: '12px/1 var(--font-body)', marginTop: 12 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 'var(--space-5)' }}>
            <Button size="sm" variant="accent" onClick={addLead} disabled={saving}>{saving ? 'Saving...' : 'Save Lead'}</Button>
            <Button size="sm" variant="secondary" onClick={() => { setShowForm(false); setForm(emptyForm); setError(''); }}>Cancel</Button>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-soft)', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <Input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} size="sm" style={{ width: 200 }}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>} />
            <Select size="sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 140 }}
              options={[{ value: 'all', label: 'All Status' }, { value: 'New', label: 'New' }, { value: 'Contacted', label: 'Contacted' }, { value: 'Qualified', label: 'Qualified' }, { value: 'Proposal', label: 'Proposal' }, { value: 'Negotiation', label: 'Negotiation' }]} />
            <Button size="sm" variant="accent" onClick={() => setShowForm(true)}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>
              Add Lead
            </Button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading leads...</div>
        ) : (
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)' }}>
                {['Lead', 'Company', 'Value (AED)', 'AI Score', 'Status', 'Source', 'Assigned', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--divider)' }}
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
                    <div style={{ display: 'flex', gap: 6 }}>
                      {lead.phone && (
                        <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                          style={{ padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #25D366', background: '#fff', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: '#25D366', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.528 5.858L.057 23.882l6.196-1.443A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.865 0-3.618-.48-5.14-1.323l-.369-.213-3.677.857.894-3.567-.234-.38A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                          WhatsApp
                        </a>
                      )}
                      <button onClick={() => deleteLead(lead.id)} style={{ padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)', background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--red-500)', cursor: 'pointer' }}>Delete</button>
                    </div>
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
