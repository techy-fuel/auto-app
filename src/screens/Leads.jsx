import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/core/Badge';
import { Avatar } from '../components/core/Avatar';
import { LeadScore } from '../components/data/LeadScore';
import { AiInsight } from '../components/data/AiInsight';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Tabs } from '../components/navigation/Tabs';

const leads = [
  { id: 1, name: 'Zara Malik', email: 'zara@technova.pk', company: 'TechNova Pvt Ltd', phone: '+92 300 1234567', value: 42000, score: 88, status: 'Proposal', source: 'Website', lastContact: '2 days ago', assigned: 'Sarah A.' },
  { id: 2, name: 'Ali Hassan', email: 'ali@digitalv.com', company: 'Digital Ventures', phone: '+92 321 9876543', value: 18500, score: 72, status: 'Qualified', source: 'Referral', lastContact: '1 day ago', assigned: 'Omar K.' },
  { id: 3, name: 'Sana Sheikh', email: 'sana@growify.io', company: 'Growify Inc', phone: '+92 333 5678901', value: 67200, score: 91, status: 'Negotiation', source: 'LinkedIn', lastContact: '5h ago', assigned: 'Sarah A.' },
  { id: 4, name: 'Usman Butt', email: 'usman@cloudbase.pk', company: 'CloudBase Solutions', phone: '+92 345 2345678', value: 9800, score: 45, status: 'New', source: 'Cold Outreach', lastContact: '1 week ago', assigned: 'Raza M.' },
  { id: 5, name: 'Fatima Noor', email: 'fatima@nexgen.pk', company: 'Nexgen Retail', phone: '+92 311 3456789', value: 28400, score: 33, status: 'Contacted', source: 'Trade Show', lastContact: '3 days ago', assigned: 'Omar K.' },
  { id: 6, name: 'Bilal Ahmed', email: 'bilal@innotech.com', company: 'InnoTech Corp', phone: '+92 300 7891234', value: 55000, score: 79, status: 'Qualified', source: 'Website', lastContact: '6h ago', assigned: 'Sarah A.' },
  { id: 7, name: 'Mehwish Khan', email: 'mehwish@smartsol.pk', company: 'Smart Solutions', phone: '+92 321 6543210', value: 33200, score: 62, status: 'Contacted', source: 'Email Campaign', lastContact: '2 days ago', assigned: 'Raza M.' },
  { id: 8, name: 'Tariq Mehmood', email: 'tariq@pinnacle.com', company: 'Pinnacle Group', phone: '+92 333 1122334', value: 88000, score: 94, status: 'Negotiation', source: 'Referral', lastContact: '1h ago', assigned: 'Sarah A.' },
];

const statusTone = { New: 'blue', Contacted: 'slate', Qualified: 'emerald', Proposal: 'violet', Negotiation: 'amber', Won: 'emerald', Lost: 'red' };
const tabs = [
  { value: 'all', label: 'All Leads', count: leads.length },
  { value: 'hot', label: 'Hot', count: leads.filter(l => l.score >= 70).length },
  { value: 'warm', label: 'Warm', count: leads.filter(l => l.score >= 40 && l.score < 70).length },
  { value: 'cold', label: 'Cold', count: leads.filter(l => l.score < 40).length },
];

export function Leads() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = leads.filter(l => {
    if (activeTab === 'hot' && l.score < 70) return false;
    if (activeTab === 'warm' && (l.score < 40 || l.score >= 70)) return false;
    if (activeTab === 'cold' && l.score >= 40) return false;
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      <AiInsight title="AI Recommendation" tone="action">
        2 leads in Negotiation stage haven't had a touchpoint in 72 hours. AI suggests sending a personalized follow-up — similar leads converted 3× faster with prompt engagement.
      </AiInsight>

      {/* Toolbar */}
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--border-soft)',
          gap: 'var(--space-4)',
        }}>
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
            <Button size="sm" variant="accent" iconLeft={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            }>Add Lead</Button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--slate-50)' }}>
              {['Lead', 'Company', 'Value', 'AI Score', 'Status', 'Source', 'Last Contact', 'Assigned', ''].map(h => (
                <th key={h} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border-soft)',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => (
              <tr key={lead.id}
                style={{ borderBottom: '1px solid var(--divider)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
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
                  ${lead.value.toLocaleString()}
                </td>
                <td style={{ padding: '14px 16px' }}><LeadScore score={lead.score} size="sm" /></td>
                <td style={{ padding: '14px 16px' }}><Badge tone={statusTone[lead.status] || 'slate'} dot>{lead.status}</Badge></td>
                <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{lead.source}</td>
                <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{lead.lastContact}</td>
                <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-body)' }}>{lead.assigned}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{
                      padding: '5px 10px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-soft)', background: 'var(--white)',
                      font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                      color: 'var(--text-body)', cursor: 'pointer',
                    }}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>
            No leads match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
