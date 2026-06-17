import React from 'react';

/** KPI / metric tile for the dashboard. */
export function StatCard({
  label,
  value,
  delta = null,
  trend = 'up',
  icon = null,
  accent = 'navy',
  sparkline = null,
  style = {},
  ...rest
}) {
  const accents = {
    navy:    'var(--navy-900)',
    emerald: 'var(--emerald-600)',
    amber:   'var(--amber-500)',
    blue:    'var(--blue-600)',
    violet:  'var(--violet-600)',
  };
  const trendColor = trend === 'up' ? 'var(--emerald-700)' : trend === 'down' ? 'var(--red-600)' : 'var(--slate-500)';
  const trendBg = trend === 'up' ? 'var(--emerald-50)' : trend === 'down' ? 'var(--red-100)' : 'var(--slate-100)';

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex', flexDirection: 'column', gap: 14,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          font: 'var(--weight-semibold) 13px/1 var(--font-display)',
          color: 'var(--text-muted)', letterSpacing: '0.01em',
        }}>{label}</span>
        {icon && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34, borderRadius: 'var(--radius-sm)',
            background: 'var(--slate-50)', color: accents[accent] || accents.navy,
          }}>{icon}</span>
        )}
      </div>

      <div style={{
        font: 'var(--weight-extra) 30px/1 var(--font-display)',
        color: 'var(--text-strong)', letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        {delta != null && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 8px', borderRadius: 'var(--radius-pill)',
            background: trendBg, color: trendColor,
            font: 'var(--weight-bold) 12px/1 var(--font-display)',
          }}>
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'} {delta}
          </span>
        )}
        {sparkline}
      </div>
    </div>
  );
}
