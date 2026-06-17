import React from 'react';
import { StatCard } from '../components/data/StatCard';
import { AiInsight } from '../components/data/AiInsight';
import { ProgressRing } from '../components/data/ProgressRing';
import { LeadScore } from '../components/data/LeadScore';
import { Badge } from '../components/core/Badge';
import { Button } from '../components/core/Button';
import { Avatar } from '../components/core/Avatar';

const recentLeads = [
  { id: 1, name: 'Zara Malik', company: 'TechNova Pvt Ltd', value: '$42,000', score: 88, status: 'Proposal' },
  { id: 2, name: 'Ali Hassan', company: 'Digital Ventures', value: '$18,500', score: 72, status: 'Qualified' },
  { id: 3, name: 'Sana Sheikh', company: 'Growify Inc', value: '$67,200', score: 91, status: 'Negotiation' },
  { id: 4, name: 'Usman Butt', company: 'CloudBase Solutions', value: '$9,800', score: 45, status: 'New' },
  { id: 5, name: 'Fatima Noor', company: 'Nexgen Retail', value: '$28,400', score: 33, status: 'Contacted' },
];

const statusTone = { New: 'blue', Contacted: 'slate', Qualified: 'emerald', Proposal: 'violet', Negotiation: 'amber', Won: 'emerald', Lost: 'red' };

const activities = [
  { icon: '📞', text: 'Call scheduled with TechNova', time: '2m ago', color: 'var(--blue-600)' },
  { icon: '✉️', text: 'Email sent to Digital Ventures', time: '18m ago', color: 'var(--emerald-600)' },
  { icon: '📋', text: 'Proposal sent to Growify Inc', time: '1h ago', color: 'var(--violet-600)' },
  { icon: '🤝', text: 'Deal closed — CloudBase $9.8k', time: '3h ago', color: 'var(--emerald-600)' },
  { icon: '⚠️', text: 'Follow-up overdue — Nexgen', time: '5h ago', color: 'var(--amber-600)' },
];

const pipelineStages = [
  { label: 'New', count: 24, value: '$180K', pct: 62 },
  { label: 'Qualified', count: 18, value: '$290K', pct: 48 },
  { label: 'Proposal', count: 11, value: '$440K', pct: 35 },
  { label: 'Negotiation', count: 7, value: '$520K', pct: 22 },
  { label: 'Won', count: 5, value: '$210K', pct: 16 },
];

export function Dashboard() {
  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* AI Insight banner */}
      <AiInsight
        title="AI Insight"
        tone="opportunity"
        meta="Today"
        action={
          <Button size="sm" variant="accent">View Leads</Button>
        }
      >
        3 hot leads haven't been contacted in 48+ hours — reaching out today could recover ~$128K in pipeline value.
        Zara Malik (TechNova) has a 91% close probability based on engagement signals.
      </AiInsight>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <StatCard
          label="Total Revenue"
          value="$1.24M"
          delta="12.4%"
          trend="up"
          accent="emerald"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <StatCard
          label="Active Leads"
          value="247"
          delta="8 new"
          trend="up"
          accent="navy"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatCard
          label="Pipeline Value"
          value="$3.8M"
          delta="↑ $420K"
          trend="up"
          accent="violet"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
        />
        <StatCard
          label="Win Rate"
          value="68%"
          delta="3.2%"
          trend="up"
          accent="amber"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
        />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-6)' }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

          {/* Recent Leads table */}
          <div style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 'var(--space-5) var(--space-6)',
              borderBottom: '1px solid var(--border-soft)',
            }}>
              <h2 style={{ font: 'var(--weight-bold) 16px/1 var(--font-display)', color: 'var(--text-strong)' }}>Recent Leads</h2>
              <Button size="sm" variant="secondary">View All</Button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--slate-50)' }}>
                  {['Name', 'Company', 'Value', 'Score', 'Status'].map(h => (
                    <th key={h} style={{
                      padding: '10px 20px',
                      textAlign: 'left',
                      font: 'var(--weight-semibold) 12px/1 var(--font-display)',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid var(--border-soft)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, i) => (
                  <tr key={lead.id} style={{
                    borderBottom: i < recentLeads.length - 1 ? '1px solid var(--divider)' : 'none',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={lead.name} size={32} />
                        <span style={{ font: 'var(--weight-semibold) 14px/1 var(--font-body)', color: 'var(--text-strong)' }}>{lead.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontSize: 13 }}>{lead.company}</td>
                    <td style={{ padding: '14px 20px', font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>{lead.value}</td>
                    <td style={{ padding: '14px 20px' }}><LeadScore score={lead.score} size="sm" /></td>
                    <td style={{ padding: '14px 20px' }}><Badge tone={statusTone[lead.status] || 'slate'} dot>{lead.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pipeline funnel */}
          <div style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)',
            padding: 'var(--space-6)',
          }}>
            <h2 style={{ font: 'var(--weight-bold) 16px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Pipeline Overview</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {pipelineStages.map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{s.label}</span>
                      <span style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)' }}>{s.count} leads</span>
                    </div>
                    <span style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>{s.value}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--slate-100)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${s.pct}%`, height: '100%',
                      background: 'var(--gradient-emerald)',
                      borderRadius: 'var(--radius-pill)',
                      transition: 'width 0.6s var(--ease-out)',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

          {/* AI Score Ring */}
          <div style={{
            background: 'var(--gradient-navy)',
            border: '1px solid var(--navy-700)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--navy-300)', textAlign: 'center' }}>AI Sales Score</div>
            <ProgressRing value={74} size={120} stroke={10} sublabel="This Month" />
            <p style={{ font: '12px/1.5 var(--font-body)', color: 'var(--navy-300)', textAlign: 'center' }}>
              Your team is performing 18% above average. Keep momentum going!
            </p>
          </div>

          {/* Activity Feed */}
          <div style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)',
            padding: 'var(--space-5)',
            flex: 1,
          }}>
            <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-4)' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {activities.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '12px 0',
                  borderBottom: i < activities.length - 1 ? '1px solid var(--divider)' : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                    background: 'var(--slate-50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                  }}>{a.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ font: 'var(--weight-medium) 13px/1.4 var(--font-body)', color: 'var(--text-body)', marginBottom: 2 }}>{a.text}</p>
                    <span style={{ font: '11px/1 var(--font-body)', color: 'var(--text-subtle)' }}>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
