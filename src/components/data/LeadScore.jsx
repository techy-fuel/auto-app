import React from 'react';

const temps = {
  hot:  { label: 'Hot',  fg: 'var(--lead-hot)',  bg: 'var(--lead-hot-bg)',  bar: 'var(--lead-hot)' },
  warm: { label: 'Warm', fg: 'var(--lead-warm)', bg: 'var(--lead-warm-bg)', bar: 'var(--lead-warm)' },
  cold: { label: 'Cold', fg: 'var(--lead-cold)', bg: 'var(--lead-cold-bg)', bar: 'var(--lead-cold)' },
};

function tempFor(score) {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
}

/** AI lead-score indicator — temperature + 0-100 score with a mini bar. */
export function LeadScore({
  score = 0,
  temperature = null,
  showBar = true,
  size = 'md',
  style = {},
  ...rest
}) {
  const temp = temperature || tempFor(score);
  const t = temps[temp] || temps.cold;
  const compact = size === 'sm';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, ...style }} {...rest}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: compact ? '2px 8px' : '4px 10px', borderRadius: 'var(--radius-pill)',
        background: t.bg, color: t.fg,
        font: `var(--weight-bold) ${compact ? 11 : 12}px/1 var(--font-display)`,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.bar }} />
        {t.label}
      </span>
      {showBar && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 64, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--slate-150)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, Math.max(0, score))}%`, height: '100%', background: t.bar, borderRadius: 'var(--radius-pill)' }} />
          </div>
          <span style={{
            font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)',
            fontVariantNumeric: 'tabular-nums', minWidth: 22,
          }}>{score}</span>
        </div>
      )}
    </div>
  );
}
