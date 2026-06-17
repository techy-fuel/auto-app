import React from 'react';

const tones = {
  navy:    { bg: 'var(--navy-50)',    fg: 'var(--navy-700)',    bd: 'var(--navy-200)' },
  emerald: { bg: 'var(--emerald-50)', fg: 'var(--emerald-700)', bd: 'var(--emerald-200)' },
  amber:   { bg: 'var(--amber-100)',  fg: 'var(--amber-600)',   bd: '#FCE3A8' },
  red:     { bg: 'var(--red-100)',    fg: 'var(--red-600)',     bd: '#FBCFCF' },
  blue:    { bg: 'var(--blue-100)',   fg: 'var(--blue-600)',    bd: '#C3D8FB' },
  violet:  { bg: 'var(--violet-100)', fg: 'var(--violet-600)',  bd: '#DDD2FB' },
  slate:   { bg: 'var(--slate-100)',  fg: 'var(--slate-600)',   bd: 'var(--slate-200)' },
};

/** Compact status / category label. */
export function Badge({
  children,
  tone = 'slate',
  dot = false,
  solid = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const t = tones[tone] || tones.slate;
  const pad = size === 'sm' ? '2px 8px' : '3px 10px';
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: pad, fontSize: fs, fontWeight: 600,
        fontFamily: 'var(--font-display)', letterSpacing: '0.01em',
        borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap',
        background: solid ? t.fg : t.bg,
        color: solid ? 'var(--white)' : t.fg,
        border: solid ? '1px solid transparent' : `1px solid ${t.bd}`,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: solid ? 'var(--white)' : t.fg,
        }} />
      )}
      {children}
    </span>
  );
}
