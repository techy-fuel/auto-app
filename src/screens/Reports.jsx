import React, { useState, useEffect } from 'react';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/data/StatCard';
import { Badge } from '../components/core/Badge';
import { Tabs } from '../components/navigation/Tabs';
import { AiInsight } from '../components/data/AiInsight';
import { ProgressRing } from '../components/data/ProgressRing';
import { supabase } from '../lib/supabase';

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


const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'team', label: 'Team Performance' },
  { value: 'vehicles', label: 'Vehicle Reports' },
];

export function Reports({ user }) {
  const [tab, setTab] = useState('overview');
  const [period, setPeriod] = useState('This Month');
  const [stats, setStats] = useState({ total: 0, revenue: 0, avgDeal: 0, convRate: 0 });
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [salesByStage, setSalesByStage] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    supabase.from('leads').select('value, stage, status, created_at').eq('user_id', user.id).then(({ data }) => {
      const leads = data || [];
      const won = leads.filter(l => l.stage === 'Won' || l.status === 'won');
      const totalRevenue = won.reduce((s, l) => s + (l.value || 0), 0);
      setStats({
        total: leads.length,
        revenue: totalRevenue,
        avgDeal: won.length ? Math.round(totalRevenue / won.length) : 0,
        convRate: leads.length ? ((won.length / leads.length) * 100).toFixed(1) : 0,
      });

      // Leads by month (last 6 months)
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const now = new Date();
      const monthCounts = {};
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        monthCounts[`${d.getFullYear()}-${d.getMonth()}`] = { label: months[d.getMonth()], value: 0 };
      }
      leads.forEach(l => {
        const d = new Date(l.created_at);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (monthCounts[key]) monthCounts[key].value++;
      });
      setSalesByMonth(Object.values(monthCounts).map(m => ({ ...m, label2: String(m.value) })));

      // Leads by stage
      const stageCounts = {};
      leads.forEach(l => { const s = l.stage || 'Unknown'; stageCounts[s] = (stageCounts[s] || 0) + 1; });
      setSalesByStage(Object.entries(stageCounts).map(([label, value]) => ({ label, label2: String(value), value })));
    });
  }, [user?.id]);

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h2 style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', color: 'var(--text-strong)' }}>Reports & Analytics</h2>
          <p style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>Dealership performance overview</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-4)' }}>
            <StatCard label="Total Leads" value={stats.total} accent="navy" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} />
            <StatCard label="Total Revenue" value={stats.revenue ? `AED ${(stats.revenue/1000).toFixed(0)}K` : 'AED 0'} accent="emerald" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>} />
            <StatCard label="Avg. Deal Size" value={stats.avgDeal ? `AED ${(stats.avgDeal/1000).toFixed(0)}K` : 'AED 0'} accent="violet" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
            <StatCard label="Conversion Rate" value={`${stats.convRate}%`} accent="amber" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
          </div>

          <AiInsight title="AI Report Summary" tone="opportunity">
            {stats.total > 0 ? `${stats.total} total leads tracked. ${stats.convRate}% conversion rate. ${stats.revenue ? `AED ${(stats.revenue/1000).toFixed(0)}K revenue from won deals.` : ''}` : 'Add leads to unlock AI-powered sales reports.'}
          </AiInsight>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Leads Added — Last 6 Months</h3>
              {salesByMonth.length > 0 ? <BarChart data={salesByMonth} color="var(--navy-600)" /> : <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: '20px 0' }}>No data yet</div>}
            </div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Leads by Stage</h3>
              {salesByStage.length > 0 ? <BarChart data={salesByStage} color="var(--emerald-500)" /> : <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: '20px 0' }}>No data yet</div>}
            </div>
          </div>
        </>
      )}

      {tab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <AiInsight title="Team Performance" tone="opportunity">
            Team performance tracking coming soon. Add your team members to unlock this feature.
          </AiInsight>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)', font: '14px/1.5 var(--font-body)' }}>
            No team data yet. This section will show individual sales rep performance once you add team members.
          </div>
        </div>
      )}

      {tab === 'vehicles' && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)', font: '14px/1.5 var(--font-body)' }}>
          Add inventory vehicles to see vehicle-level sales reports here.
        </div>
      )}
    </div>
  );
}
