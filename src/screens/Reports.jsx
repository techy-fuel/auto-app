import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/data/StatCard';
import { Badge } from '../components/core/Badge';
import { Tabs } from '../components/navigation/Tabs';
import { AiInsight } from '../components/data/AiInsight';
import { ProgressRing } from '../components/data/ProgressRing';

// Bar chart component
function BarChart({ data, color = 'var(--emerald-500)', height = 160 }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, paddingTop: 10 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
          <span style={{ font: 'var(--weight-bold) 10px/1 var(--font-display)', color: 'var(--text-muted)' }}>{d.label2 || ''}</span>
          <div style={{
            width: '100%', background: color, borderRadius: '4px 4px 0 0',
            height: `${(d.value / max) * (height - 30)}px`,
            opacity: i === data.length - 1 ? 1 : 0.6,
            transition: 'height 0.5s var(--ease-out)',
          }} />
          <span style={{ font: '10px/1 var(--font-body)', color: 'var(--text-muted)', textAlign: 'center' }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

const salesByMonth = [
  { label: 'Jan', label2: '32', value: 32 }, { label: 'Feb', label2: '28', value: 28 },
  { label: 'Mar', label2: '35', value: 35 }, { label: 'Apr', label2: '40', value: 40 },
  { label: 'May', label2: '38', value: 38 }, { label: 'Jun', label2: '38*', value: 38 },
];

const salesByModel = [
  { label: 'Corolla', label2: '12', value: 12 }, { label: 'Civic', label2: '9', value: 9 },
  { label: 'Patrol', label2: '6', value: 6 }, { label: 'LC', label2: '4', value: 4 },
  { label: 'Camry', label2: '7', value: 7 },
];

const teamPerformance = [
  { name: 'Rashid M.',   role: 'Sales Manager', sold: 18, target: 20, revenue: 'AED 1.8M', convRate: '34%', score: 91 },
  { name: 'Sara K.',     role: 'Senior Sales',  sold: 12, target: 15, revenue: 'AED 890K',  convRate: '28%', score: 78 },
  { name: 'Ahmed T.',    role: 'Sales Rep',     sold: 5,  target: 10, revenue: 'AED 360K',  convRate: '18%', score: 52 },
  { name: 'Noura H.',    role: 'Sales Rep',     sold: 3,  target: 10, revenue: 'AED 220K',  convRate: '14%', score: 38 },
];

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'team', label: 'Team Performance' },
  { value: 'vehicles', label: 'Vehicle Reports' },
];

export function Reports() {
  const [tab, setTab] = useState('overview');
  const [period, setPeriod] = useState('This Month');

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', color: 'var(--text-strong)' }}>Reports & Analytics</h2>
          <p style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>Dealership performance overview</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['This Month', 'Last Month', 'Q2 2026', 'YTD'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '7px 14px', borderRadius: 'var(--radius-md)',
              border: `1px solid ${period === p ? 'var(--emerald-500)' : 'var(--border-soft)'}`,
              background: period === p ? 'var(--emerald-50)' : 'var(--white)',
              color: period === p ? 'var(--emerald-700)' : 'var(--text-body)',
              font: `var(--weight-${period === p ? 'bold' : 'medium'}) 13px/1 var(--font-display)`,
              cursor: 'pointer',
            }}>{p}</button>
          ))}
          <Button size="sm" variant="secondary" iconLeft={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}>Export PDF</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'overview' && (
        <>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
            <StatCard label="Total Sales" value="38" delta="+12%" trend="up" accent="navy" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} />
            <StatCard label="Revenue (MTD)" value="AED 4.2M" delta="+8.1%" trend="up" accent="emerald" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>} />
            <StatCard label="Avg. Deal Size" value="AED 112K" delta="+3.4%" trend="up" accent="violet" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
            <StatCard label="Conversion Rate" value="24.6%" delta="-1.2%" trend="down" accent="amber" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
          </div>

          <AiInsight title="AI Report Summary" tone="opportunity">
            June is tracking 18% above last year. Toyota Corolla accounts for 32% of sales. Ahmed T. and Noura H. are behind target — recommend coaching session this week.
          </AiInsight>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Units Sold — Last 6 Months</h3>
              <BarChart data={salesByMonth} color="var(--navy-600)" />
            </div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Sales by Model — This Month</h3>
              <BarChart data={salesByModel} color="var(--emerald-500)" />
            </div>
          </div>
        </>
      )}

      {tab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <AiInsight title="AI Coaching Alert" tone="alert">
            Ahmed T. and Noura H. are at 50% and 30% of their monthly targets. AI recommends a joint coaching session focused on test drive conversion techniques.
          </AiInsight>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--slate-50)' }}>
                  {['Sales Rep', 'Role', 'Sold', 'Target', 'Attainment', 'Revenue', 'Conv. Rate', 'AI Score'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-soft)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map(rep => {
                  const pct = Math.round((rep.sold / rep.target) * 100);
                  const tone = pct >= 80 ? 'emerald' : pct >= 50 ? 'amber' : 'red';
                  return (
                    <tr key={rep.name} style={{ borderBottom: '1px solid var(--divider)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 18px', font: 'var(--weight-bold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{rep.name}</td>
                      <td style={{ padding: '14px 18px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{rep.role}</td>
                      <td style={{ padding: '14px 18px', font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>{rep.sold}</td>
                      <td style={{ padding: '14px 18px', font: '13px/1 var(--font-body)', color: 'var(--text-muted)' }}>{rep.target}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 60, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--slate-100)', overflow: 'hidden' }}>
                            <div style={{ width: `${Math.min(100, pct)}%`, height: '100%', background: pct >= 80 ? 'var(--emerald-500)' : pct >= 50 ? 'var(--amber-500)' : 'var(--red-500)', borderRadius: 'var(--radius-pill)' }} />
                          </div>
                          <Badge tone={tone}>{pct}%</Badge>
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px', font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>{rep.revenue}</td>
                      <td style={{ padding: '14px 18px', font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-body)' }}>{rep.convRate}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <ProgressRing value={rep.score} size={36} stroke={4} label={String(rep.score)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'vehicles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            {[
              { model: 'Toyota Corolla 2021', sold: 12, inquiries: 48, revenue: 'AED 816K',  convRate: '25%', trend: 'up' },
              { model: 'Honda Civic 2022',    sold: 9,  inquiries: 37, revenue: 'AED 648K',  convRate: '24%', trend: 'up' },
              { model: 'Nissan Patrol 2023',  sold: 6,  inquiries: 29, revenue: 'AED 1.17M', convRate: '21%', trend: 'up' },
              { model: 'Land Cruiser 2023',   sold: 4,  inquiries: 24, revenue: 'AED 740K',  convRate: '17%', trend: 'down' },
              { model: 'Toyota Camry 2022',   sold: 7,  inquiries: 31, revenue: 'AED 665K',  convRate: '23%', trend: 'up' },
              { model: 'Hyundai Tucson 2023', sold: 0,  inquiries: 15, revenue: '—',          convRate: '0%',  trend: 'down' },
            ].map(v => (
              <div key={v.model} style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-sm)', background: 'var(--slate-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚗</div>
                  <div style={{ font: 'var(--weight-bold) 13px/1.3 var(--font-display)', color: 'var(--text-strong)' }}>{v.model}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[{ l: 'Sold', v: v.sold }, { l: 'Inquiries', v: v.inquiries }, { l: 'Revenue', v: v.revenue }, { l: 'Conv. Rate', v: v.convRate }].map(f => (
                    <div key={f.l} style={{ background: 'var(--slate-50)', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{f.l}</div>
                      <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>{f.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
