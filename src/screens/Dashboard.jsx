import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { db } from '../lib/supabase';
import { AiInsight } from '../components/data/AiInsight';
import { Button } from '../components/core/Button';
import { ProgressRing } from '../components/data/ProgressRing';

function SalesChart({ data }) {
  const vals = data.length ? data : [0];
  const max = Math.max(...vals, 1);
  const min = Math.min(...vals);
  const w = 560, h = 140, pad = 10;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const points = vals.map((v, i) => {
    const x = pad + (i / Math.max(vals.length - 1, 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
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
        <text key={i} x={p[0]} y={h + 16} textAnchor="middle" fontSize="10" fill="#94A3B8">{months[i] || ''}</text>
      ))}
      <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="5" fill="#10B981" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

export function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState({ vehicles: 0, leads: 0, available: 0, sold: 0, stockValue: 0 });
  const [topVehicles, setTopVehicles] = useState([]);
  const [funnelData, setFunnelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, [user?.id]);

  async function fetchData() {
    setLoading(true);
    const d = db(user?.id);
    const [{ data: vehicles }, { data: leads }] = await Promise.all([
      d.inventory.select('*'),
      d.leads.select('*'),
    ]);

    const v = vehicles || [];
    const l = leads || [];

    const available = v.filter(x => x.status === 'Available').length;
    const sold = v.filter(x => x.status === 'Sold').length;
    const stockValue = v.filter(x => x.status === 'Available').reduce((s, x) => s + (x.price || 0), 0);

    // Funnel from leads statuses
    const statuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'];
    const total = l.length || 1;
    const funnel = statuses.map(st => ({
      label: st, count: l.filter(x => x.status === st).length,
      pct: Math.round((l.filter(x => x.status === st).length / total) * 100),
    }));

    // Top vehicles by make/model from sold inventory
    const makeMap = {};
    v.filter(x => x.status === 'Sold').forEach(x => {
      const key = `${x.make} ${x.model}`;
      makeMap[key] = (makeMap[key] || 0) + 1;
    });
    const top = Object.entries(makeMap).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([name, sold]) => ({ name, sold }));

    setStats({ vehicles: v.length, leads: l.length, available, sold, stockValue });
    setFunnelData(funnel);
    setTopVehicles(top);
    setLoading(false);
  }

  const today = new Date().toLocaleDateString('en-AE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      <div>
        <h2 style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)', color: 'var(--text-strong)' }}>Dashboard</h2>
        <p style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>{today} · Here's your dealership at a glance</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)' }}>
        {[
          { label: 'Total Vehicles', value: loading ? '…' : stats.vehicles, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="17" r="1"/><circle cx="20" cy="17" r="1"/></svg> },
          { label: 'Active Leads',   value: loading ? '…' : stats.leads, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
          { label: 'Available Now',  value: loading ? '…' : stats.available, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
          { label: 'Sold',           value: loading ? '…' : stats.sold, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg> },
          { label: 'Stock Value',    value: loading ? '…' : `AED ${(stats.stockValue/1000000).toFixed(1)}M`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
        ].map((s, i) => (
          <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)' }}>{s.label}</span>
              <span style={{ color: 'var(--navy-600)', display: 'inline-flex' }}>{s.icon}</span>
            </div>
            <div style={{ font: 'var(--weight-extra) 24px/1 var(--font-display)', color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <AiInsight title="AI INSIGHT" tone="opportunity">
        {stats.leads > 0 ? `${stats.leads} active leads in your pipeline. ${stats.available} vehicles available for demo. Follow up with leads in Negotiation stage today.` : 'Add your first leads and inventory to unlock AI-powered insights.'}
      </AiInsight>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-5)' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>Sales Analytics</h3>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-8)', marginBottom: 16 }}>
            <div>
              <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginBottom: 4 }}>Units sold</div>
              <div style={{ font: 'var(--weight-bold) 26px/1 var(--font-display)', color: 'var(--text-strong)' }}>{stats.sold}</div>
            </div>
            <div>
              <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginBottom: 4 }}>Stock value</div>
              <div style={{ font: 'var(--weight-bold) 26px/1 var(--font-display)', color: 'var(--text-strong)' }}>AED {(stats.stockValue/1000000).toFixed(1)}M</div>
            </div>
          </div>
          <SalesChart data={[stats.vehicles, stats.available, stats.sold, stats.leads].filter(Boolean)} />
        </div>

        {/* Lead Funnel */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Lead Funnel</h3>
          {funnelData.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', font: '13px/1.5 var(--font-body)' }}>No leads yet. Add leads to see funnel data.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {funnelData.map((s, i) => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ font: 'var(--weight-medium) 13px/1 var(--font-body)', color: 'var(--text-body)' }}>{s.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>{s.count}</span>
                      <span style={{ font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{s.pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--slate-100)', overflow: 'hidden' }}>
                    <div style={{ width: `${s.pct}%`, height: '100%', borderRadius: 'var(--radius-pill)', background: i === 0 ? 'var(--navy-900)' : 'var(--gradient-emerald)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 'var(--space-5)' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>Top Sold Vehicles</h3>
          </div>
          {topVehicles.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', color: 'var(--text-muted)', font: '13px/1.5 var(--font-body)' }}>No sold vehicles yet. Mark inventory as Sold to see top performers.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--slate-50)' }}>
                  {['Vehicle', 'Units Sold'].map(h => (
                    <th key={h} style={{ padding: '10px 20px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-soft)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topVehicles.map((v, i) => (
                  <tr key={v.name} style={{ borderBottom: '1px solid var(--divider)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚗</div>
                        <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{v.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--emerald-700)' }}>{v.sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ background: 'var(--gradient-navy)', border: '1px solid var(--navy-700)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--navy-300)' }}>AI Sales Score</div>
          <ProgressRing value={stats.leads > 0 ? Math.min(99, 60 + stats.sold * 2) : 0} size={110} stroke={10} sublabel="SCORE" />
          <p style={{ font: '12px/1.55 var(--font-body)', color: 'var(--navy-300)', textAlign: 'center' }}>
            {stats.leads > 0 ? `${stats.sold} sold · ${stats.available} available · Score improves as you close more deals.` : 'Add inventory and leads to get your AI Score.'}
          </p>
        </div>
      </div>
    </div>
  );
}
