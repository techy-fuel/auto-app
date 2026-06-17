import React from 'react';

function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}
const palette = ['#0A2540', '#059669', '#2563EB', '#7C3AED', '#D97706', '#0E7490'];
function colorFor(name = '') {
  let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

/** User / customer avatar with image or generated initials. */
export function Avatar({
  name = '',
  src = null,
  size = 40,
  status = null,
  style = {},
  ...rest
}) {
  const statusColors = { online: 'var(--emerald-500)', away: 'var(--amber-500)', offline: 'var(--slate-300)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, ...style }} {...rest}>
      <span style={{
        width: size, height: size, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: src ? 'var(--slate-200)' : colorFor(name),
        color: 'var(--white)', font: `var(--weight-bold) ${Math.round(size * 0.38)}px/1 var(--font-display)`,
        border: '2px solid var(--white)', boxShadow: 'var(--shadow-xs)',
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials(name)}
      </span>
      {status && (
        <span style={{
          position: 'absolute', right: 0, bottom: 0,
          width: Math.max(8, size * 0.26), height: Math.max(8, size * 0.26),
          borderRadius: '50%', background: statusColors[status] || statusColors.offline,
          border: '2px solid var(--white)',
        }} />
      )}
    </span>
  );
}
