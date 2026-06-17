import React from 'react';
import { AiInsight } from '../components/data/AiInsight';
import { Button } from '../components/core/Button';
import { ProgressRing } from '../components/data/ProgressRing';
import { Badge } from '../components/core/Badge';

// Simple SVG line chart
function SalesChart() {
  const data = [180, 220, 195, 260, 240, 310, 290, 350, 380, 420, 460, 510];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 560, h = 140, pad = 10;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const fill = `${path} L${points[points.length-1][0]},${h} L${points[0][0]},${h} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 20}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#chartGrad)" />
      <path d={path} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {points.map((p, i) => (
        <text key={i} x={p[0]} y={h + 16} textAnchor="middle" fontSize="10" fill="#94A3B8">{months[i]}</text>
      ))}
      <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="5" fill="#10B981" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

const leadFunnel = [
  { label: 'New Leads',  count: 320, pct: 100, color: '#0A2540' },
  { label: 'Contacted',  count: 238, pct: 74,  color: '#10B981' },
  { label: 'Interested', count: 156, pct: 49,  color: '#10B981' },
  { label: 'Test Drive', count: 92,  pct: 29,  color: '#10B981' },
  { label: 'Booked',     count: 48,  pct: 15,  color: '#10B981' },
];

const topVehicles = [
  { name: 'Toyota Corolla 2021', inquiries: 48, sold: 12, price: 'AED 68K' },
  { name: 'Honda Civic 2022',    inquiries: 37, sold: 9,  price: 'AED 72K' },
  { name: 'Nissan Patrol 2023',  inquiries: 29, sold: 6,  price: 'AED 185K' },
  { name: 'Toyota Land Cruiser', inquiries: 24, sold: 4,  price: 'AED 220K' },
];

const aiInsights = [
  { text: 'Toyota Corolla 2021 is receiving 3× more inquiries than average — consider featuring it on the homepage.', action: 'View vehicle', tone: 'opportunity' },
  { text: 'Rashid M. has 6 leads with no follow-up in 3+ days. Assign tasks or auto-send WhatsApp reminders.', action: 'View leads', tone: 'alert' },
];

export function Dashboard() {
  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      {/* Page header */}
      <div>
        <h2 style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)', color: 'var(--text-strong)' }}>Dashboard</h2>
        <p style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>
          Tuesday, 17 June · Here's your dealership at a glance
        </p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)' }}>
        {[
          { label: 'Total Vehicles', value: '142', delta: '+6', trend: 'up', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="17" r="1"/><circle cx="20" cy="17" r="1"/></svg> },
          { label: 'Active Leads',   value: '128', delta: '+18%', trend: 'up', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
          { label: 'Sold This Month',value: '38',  delta: '+12%', trend: 'up', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
          { label: 'Revenue (MTD)',   value: 'AED 4.2M', delta: '+8.1%', trend: 'up', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
          { label: 'Conversion Rate', value: '24.6%', delta: '-1.2%', trend: 'down', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
        ].map(s => {
          const tc = s.trend === 'up' ? 'var(--emerald-700)' : 'var(--red-600)';
          const tb = s.trend === 'up' ? 'var(--emerald-50)' : 'var(--red-100)';
          return (
            <div key={s.label} style={{
              background: 'var(--white)', border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ color: 'var(--navy-600)', display: 'inline-flex' }}>{s.icon}</span>
              </div>
              <div style={{ font: 'var(--weight-extra) 24px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.value}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 'var(--radius-pill)', background: tb, color: tc, font: 'var(--weight-bold) 11px/1 var(--font-display)' }}>
                {s.trend === 'up' ? '▲' : '▼'} {s.delta}
              </span>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        {aiInsights.map((ins, i) => (
          <AiInsight key={i} title="AI INSIGHT" tone={ins.tone} action={<Button size="sm" variant="accent">{ins.action} →</Button>}>
            {ins.text}
          </AiInsight>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-5)' }}>

        {/* Sales Analytics */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>Sales Analytics</h3>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--emerald-700)', fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)', display: 'inline-block' }} />
              +18% YoY
            </span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-8)', marginBottom: 16 }}>
            <div>
              <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginBottom: 4 }}>Units sold</div>
              <div style={{ font: 'var(--weight-bold) 26px/1 var(--font-display)', color: 'var(--text-strong)' }}>682</div>
            </div>
            <div>
              <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginBottom: 4 }}>Avg. deal</div>
              <div style={{ font: 'var(--weight-bold) 26px/1 var(--font-display)', color: 'var(--text-strong)' }}>AED 112K</div>
            </div>
          </div>
          <SalesChart />
        </div>

        {/* Lead Funnel */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Lead Funnel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {leadFunnel.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ font: 'var(--weight-medium) 13px/1 var(--font-body)', color: 'var(--text-body)' }}>{s.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      minWidth: 32, textAlign: 'right',
                      font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)',
                    }}>{s.count}</span>
                    <span style={{ font: '12px/1 var(--font-body)', color: 'var(--text-muted)', minWidth: 32 }}>{s.pct}%</span>
                  </div>
                </div>
                <div style={{ height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--slate-100)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${s.pct}%`, height: '100%', borderRadius: 'var(--radius-pill)',
                    background: i === 0 ? 'var(--navy-900)' : 'var(--gradient-emerald)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 'var(--space-5)' }}>

        {/* Top Performing Vehicles */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>Top Performing Vehicles</h3>
            <Button size="sm" variant="secondary">View All</Button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)' }}>
                {['Vehicle', 'Inquiries', 'Sold', 'Price'].map(h => (
                  <th key={h} style={{ padding: '10px 20px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-soft)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topVehicles.map((v, i) => (
                <tr key={v.name} style={{ borderBottom: '1px solid var(--divider)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚗</div>
                      <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{v.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>{v.inquiries}</td>
                  <td style={{ padding: '14px 20px', font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--emerald-700)' }}>{v.sold}</td>
                  <td style={{ padding: '14px 20px', font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-body)' }}>{v.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Sales Score */}
        <div style={{
          background: 'var(--gradient-navy)',
          border: '1px solid var(--navy-700)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--navy-300)' }}>AI Sales Score</div>
          <ProgressRing value={82} size={110} stroke={10} sublabel="SCORE" />
          <p style={{ font: '12px/1.55 var(--font-body)', color: 'var(--navy-300)', textAlign: 'center' }}>
            Strong month. <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>Response time</span> and <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>follow-up rate</span> are driving your score up.
          </p>
        </div>
      </div>
    </div>
  );
}
