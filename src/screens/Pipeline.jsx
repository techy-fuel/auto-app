import React, { useState } from 'react';
import { Badge } from '../components/core/Badge';
import { Avatar } from '../components/core/Avatar';
import { Button } from '../components/core/Button';
import { AiInsight } from '../components/data/AiInsight';
import { LeadScore } from '../components/data/LeadScore';

const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

const stageColors = {
  New: { bg: 'var(--blue-100)', fg: 'var(--blue-600)', header: '#EFF4FE' },
  Qualified: { bg: 'var(--emerald-100)', fg: 'var(--emerald-700)', header: '#ECFDF5' },
  Proposal: { bg: 'var(--violet-100)', fg: 'var(--violet-600)', header: '#EDE9FE' },
  Negotiation: { bg: 'var(--amber-100)', fg: 'var(--amber-600)', header: '#FEF3C7' },
  Won: { bg: 'var(--green-100)', fg: 'var(--green-600)', header: '#ECFDF5' },
};

const deals = [
  { id: 1, name: 'Zara Malik', company: 'TechNova Pvt Ltd', value: 42000, score: 88, stage: 'Proposal', days: 12 },
  { id: 2, name: 'Ali Hassan', company: 'Digital Ventures', value: 18500, score: 72, stage: 'Qualified', days: 5 },
  { id: 3, name: 'Sana Sheikh', company: 'Growify Inc', value: 67200, score: 91, stage: 'Negotiation', days: 22 },
  { id: 4, name: 'Usman Butt', company: 'CloudBase Solutions', value: 9800, score: 45, stage: 'New', days: 2 },
  { id: 5, name: 'Fatima Noor', company: 'Nexgen Retail', value: 28400, score: 33, stage: 'New', days: 8 },
  { id: 6, name: 'Bilal Ahmed', company: 'InnoTech Corp', value: 55000, score: 79, stage: 'Qualified', days: 14 },
  { id: 7, name: 'Tariq Mehmood', company: 'Pinnacle Group', value: 88000, score: 94, stage: 'Negotiation', days: 31 },
  { id: 8, name: 'Mehwish Khan', company: 'Smart Solutions', value: 33200, score: 62, stage: 'Proposal', days: 18 },
  { id: 9, name: 'Kamran Riaz', company: 'Alpha Dynamics', value: 22000, score: 85, stage: 'Won', days: 45 },
  { id: 10, name: 'Nadia Hussain', company: 'Bright Future', value: 14600, score: 77, stage: 'Qualified', days: 9 },
];

function DealCard({ deal }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)',
      boxShadow: 'var(--shadow-xs)',
      cursor: 'grab',
      transition: 'box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast)',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Avatar name={deal.name} size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deal.name}</div>
          <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deal.company}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>
          ${deal.value.toLocaleString()}
        </span>
        <LeadScore score={deal.score} showBar={false} size="sm" />
      </div>
      <div style={{ marginTop: 8, font: '11px/1 var(--font-body)', color: 'var(--text-subtle)' }}>
        {deal.days} days in stage
      </div>
    </div>
  );
}

export function Pipeline() {
  const byStage = stage => deals.filter(d => d.stage === stage);
  const stageValue = stage => byStage(stage).reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)' }}>
            Total Pipeline: <strong style={{ color: 'var(--text-strong)' }}>${deals.reduce((s,d)=>s+d.value,0).toLocaleString()}</strong> across {deals.length} deals
          </div>
        </div>
        <Button size="sm" variant="accent" iconLeft={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        }>Add Deal</Button>
      </div>

      <AiInsight title="AI Pipeline Alert" tone="alert">
        Tariq Mehmood (Pinnacle Group, $88K) has been in Negotiation for 31 days — 14 days above average. AI recommends scheduling a closing call this week.
      </AiInsight>

      {/* Kanban */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 'var(--space-4)',
        flex: 1,
        minHeight: 0,
        overflowX: 'auto',
      }}>
        {stages.map(stage => {
          const c = stageColors[stage];
          const cards = byStage(stage);
          return (
            <div key={stage} style={{
              display: 'flex', flexDirection: 'column',
              background: 'var(--slate-50)',
              border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minWidth: 200,
            }}>
              {/* Stage header */}
              <div style={{
                background: c.header,
                padding: '12px 14px',
                borderBottom: '1px solid var(--border-soft)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: c.fg }}>{stage}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                    background: c.bg, color: c.fg,
                    font: 'var(--weight-bold) 11px/1 var(--font-display)',
                  }}>{cards.length}</span>
                </div>
                <div style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: c.fg, marginTop: 4, opacity: 0.7 }}>
                  ${stageValue(stage).toLocaleString()}
                </div>
              </div>

              {/* Cards */}
              <div style={{ flex: 1, padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
                {cards.map(deal => <DealCard key={deal.id} deal={deal} />)}
                {cards.length === 0 && (
                  <div style={{
                    padding: 'var(--space-8)',
                    textAlign: 'center',
                    color: 'var(--text-subtle)',
                    font: '12px/1.5 var(--font-body)',
                    border: '2px dashed var(--border-soft)',
                    borderRadius: 'var(--radius-md)',
                  }}>Drop deals here</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
