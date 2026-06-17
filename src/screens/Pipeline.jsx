import React, { useState, useEffect } from 'react';

import { db } from '../lib/supabase';
import { Badge } from '../components/core/Badge';
import { Avatar } from '../components/core/Avatar';
import { Button } from '../components/core/Button';
import { AiInsight } from '../components/data/AiInsight';
import { LeadScore } from '../components/data/LeadScore';

const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

const stageColors = {
  New:         { bg: 'var(--blue-100)',   fg: 'var(--blue-600)',   header: '#EFF4FE' },
  Qualified:   { bg: 'var(--emerald-100)', fg: 'var(--emerald-700)', header: '#ECFDF5' },
  Proposal:    { bg: 'var(--violet-100)', fg: 'var(--violet-600)', header: '#EDE9FE' },
  Negotiation: { bg: 'var(--amber-100)',  fg: 'var(--amber-600)',  header: '#FEF3C7' },
  Won:         { bg: 'var(--green-100)',  fg: 'var(--green-600)',  header: '#ECFDF5' },
};

const emptyForm = { name: '', company: '', value: '', score: 50, status: 'New' };

function DealCard({ deal, onMove, onDelete }) {
  const [open, setOpen] = useState(false);
  const daysSince = deal.created_at
    ? Math.floor((Date.now() - new Date(deal.created_at)) / 86400000)
    : 0;

  return (
    <div style={{
      background: 'var(--surface-card)', border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-md)', padding: 'var(--space-4)',
      boxShadow: 'var(--shadow-xs)', cursor: 'pointer',
      transition: 'box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast)',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'none'; }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Avatar name={deal.name} size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deal.name}</div>
          <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deal.company}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>
          {deal.value ? `AED ${Number(deal.value).toLocaleString()}` : '—'}
        </span>
        <LeadScore score={deal.score || 50} showBar={false} size="sm" />
      </div>
      <div style={{ marginTop: 6, font: '11px/1 var(--font-body)', color: 'var(--text-subtle)' }}>{daysSince}d in pipeline</div>

      {open && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border-soft)', display: 'flex', flexDirection: 'column', gap: 6 }} onClick={e => e.stopPropagation()}>
          <div style={{ font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', marginBottom: 4 }}>MOVE TO</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {stages.filter(s => s !== deal.status).map(s => (
              <button key={s} onClick={() => onMove(deal.id, s)} style={{
                padding: '4px 9px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-soft)', background: 'var(--white)',
                font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                color: 'var(--text-body)', cursor: 'pointer',
              }}>{s}</button>
            ))}
          </div>
          <button onClick={() => onDelete(deal.id)} style={{
            marginTop: 4, padding: '4px 9px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-soft)', background: 'var(--white)',
            font: 'var(--weight-semibold) 11px/1 var(--font-display)',
            color: 'var(--red-500)', cursor: 'pointer', alignSelf: 'flex-start',
          }}>Delete</button>
        </div>
      )}
    </div>
  );
}

export function Pipeline({ user }) {
  
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchDeals(); }, [user?.id]);

  async function fetchDeals() {
    setLoading(true);
    const d = db(user?.id);
    const { data } = await d.leads.select('*').order('created_at', { ascending: false });
    setDeals(data || []);
    setLoading(false);
  }

  async function addDeal() {
    if (!form.name.trim()) return;
    setSaving(true);
    const d = db(user?.id);
    await d.leads.insert([{ name: form.name, company: form.company, status: form.status, value: parseFloat(form.value) || 0, score: parseInt(form.score) || 50 }]);
    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    fetchDeals();
  }

  async function moveDeal(id, stage) {
    const d = db(user?.id);
    await d.leads.update({ status: stage }, id);
    fetchDeals();
  }

  async function deleteDeal(id) {
    const d = db(user?.id);
    await d.leads.delete(id);
    fetchDeals();
  }

  const byStage = s => deals.filter(d => d.status === s);
  const stageValue = s => byStage(s).reduce((sum, d) => sum + (d.value || 0), 0);
  const totalValue = deals.reduce((s, d) => s + (d.value || 0), 0);

  const atRisk = deals.filter(d => d.status === 'Negotiation' && d.created_at &&
    Math.floor((Date.now() - new Date(d.created_at)) / 86400000) > 14);

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', height: '100%' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)' }}>
          Total Pipeline: <strong style={{ color: 'var(--text-strong)' }}>AED {totalValue.toLocaleString()}</strong> across {deals.length} deals
        </div>
        <Button size="sm" variant="accent" onClick={() => setShowForm(true)}
          iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>
          Add Deal
        </Button>
      </div>

      {atRisk.length > 0 && (
        <AiInsight title="AI Pipeline Alert" tone="alert">
          {atRisk[0].name} ({atRisk[0].company}) has been in Negotiation for {Math.floor((Date.now() - new Date(atRisk[0].created_at)) / 86400000)} days — above average. Schedule a closing call this week.
        </AiInsight>
      )}

      {showForm && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-card)' }}>
          <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-4)' }}>Add Deal</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)' }}>
            {[
              { label: 'Name *', key: 'name', placeholder: 'Ahmad Al Mansouri' },
              { label: 'Company', key: 'company', placeholder: 'Al Futtaim' },
              { label: 'Value (AED)', key: 'value', placeholder: '120000' },
              { label: 'Score (0-100)', key: 'score', placeholder: '75' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Stage</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', outline: 'none', background: 'var(--white)', boxSizing: 'border-box' }}>
                {stages.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 'var(--space-4)' }}>
            <Button size="sm" variant="accent" onClick={addDeal} disabled={saving}>{saving ? 'Saving...' : 'Save Deal'}</Button>
            <Button size="sm" variant="secondary" onClick={() => { setShowForm(false); setForm(emptyForm); }}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--text-muted)' }}>Loading pipeline...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))', gap: 'var(--space-4)', flex: 1, minHeight: 0, overflowX: 'auto' }}>
          {stages.map(stage => {
            const c = stageColors[stage];
            const cards = byStage(stage);
            return (
              <div key={stage} style={{ display: 'flex', flexDirection: 'column', background: 'var(--slate-50)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minWidth: 200 }}>
                <div style={{ background: c.header, padding: '12px 14px', borderBottom: '1px solid var(--border-soft)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: c.fg }}>{stage}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: c.bg, color: c.fg, font: 'var(--weight-bold) 11px/1 var(--font-display)' }}>{cards.length}</span>
                  </div>
                  <div style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: c.fg, marginTop: 4, opacity: 0.7 }}>
                    AED {stageValue(stage).toLocaleString()}
                  </div>
                </div>
                <div style={{ flex: 1, padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
                  {cards.map(deal => <DealCard key={deal.id} deal={deal} onMove={moveDeal} onDelete={deleteDeal} />)}
                  {cards.length === 0 && (
                    <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-subtle)', font: '12px/1.5 var(--font-body)', border: '2px dashed var(--border-soft)', borderRadius: 'var(--radius-md)' }}>No deals</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
