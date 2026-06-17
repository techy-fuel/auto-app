import React from 'react';

// AutoPilot CRM — AI insight card
const tones = {
  default:     { glyph: '✦', ring: 'rgba(16,185,129,0.4)' },
  opportunity: { glyph: '▲', ring: 'rgba(16,185,129,0.4)' },
  alert:       { glyph: '!', ring: 'rgba(245,158,11,0.45)' },
  action:      { glyph: '→', ring: 'rgba(37,99,235,0.4)' },
};

/** AI recommendation / insight card — the signature "intelligence" surface. */
export function AiInsight({
  children,
  title = 'AI Insight',
  tone = 'default',
  meta = null,
  action = null,
  style = {},
  ...rest
}) {
  const t = tones[tone] || tones.default;
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex', gap: 14,
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0) 100%), var(--white)',
        border: '1px solid var(--emerald-100)',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        flexShrink: 0, width: 38, height: 38, borderRadius: 'var(--radius-sm)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--gradient-emerald)', color: 'var(--white)',
        fontSize: 17, fontWeight: 700,
        boxShadow: `0 0 0 4px ${t.ring}`,
      }}>{t.glyph}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            font: 'var(--weight-bold) 11px/1 var(--font-display)',
            letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--emerald-700)',
          }}>{title}</span>
          {meta && <span style={{ font: 'var(--weight-medium) 11px/1 var(--font-body)', color: 'var(--text-subtle)' }}>{meta}</span>}
        </div>
        <p style={{
          margin: 0, font: 'var(--weight-medium) 14px/1.5 var(--font-body)', color: 'var(--text-body)',
          textWrap: 'pretty',
        }}>{children}</p>
        {action && <div style={{ marginTop: 12 }}>{action}</div>}
      </div>
    </div>
  );
}
