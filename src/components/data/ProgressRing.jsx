import React from 'react';

// AutoPilot CRM — circular progress ring
/** Circular progress ring — for AI Sales Score, conversion %, etc. */
export function ProgressRing({
  value = 0,
  size = 96,
  stroke = 9,
  color = 'var(--emerald-500)',
  track = 'var(--slate-150)',
  label = null,
  sublabel = null,
  gradient = true,
  style = {},
  ...rest
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const offset = c - (pct / 100) * c;
  const gid = React.useMemo(() => 'pr' + Math.random().toString(36).slice(2, 8), []);

  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }} {...rest}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {gradient && (
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        )}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={gradient ? `url(#${gid})` : color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        <span style={{
          font: `var(--weight-extra) ${Math.round(size * 0.27)}px/1 var(--font-display)`,
          color: 'var(--text-strong)', letterSpacing: '-0.02em',
        }}>{label ?? `${Math.round(pct)}`}</span>
        {sublabel && <span style={{ font: 'var(--weight-semibold) 10px/1 var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{sublabel}</span>}
      </div>
    </div>
  );
}
