import React from 'react';

// AutoPilot CRM — tab navigation
/** Underline / segmented tab navigation. */
export function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  style = {},
  ...rest
}) {
  const active = value ?? (tabs[0] && (tabs[0].value ?? tabs[0]));
  const norm = tabs.map((t) => (typeof t === 'string' ? { value: t, label: t } : t));

  if (variant === 'pill') {
    return (
      <div style={{
        display: 'inline-flex', gap: 4, padding: 4,
        background: 'var(--slate-100)', borderRadius: 'var(--radius-md)', ...style,
      }} {...rest}>
        {norm.map((t) => {
          const on = t.value === active;
          return (
            <button key={t.value} type="button" onClick={() => onChange && onChange(t.value)}
              style={{
                border: 'none', cursor: 'pointer',
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                font: 'var(--weight-semibold) 13px/1 var(--font-display)',
                background: on ? 'var(--white)' : 'transparent',
                color: on ? 'var(--navy-900)' : 'var(--text-muted)',
                boxShadow: on ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}>
              {t.label}{t.count != null && <span style={{ marginLeft: 6, opacity: 0.6 }}>{t.count}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 26, borderBottom: '1px solid var(--border-soft)', ...style }} {...rest}>
      {norm.map((t) => {
        const on = t.value === active;
        return (
          <button key={t.value} type="button" onClick={() => onChange && onChange(t.value)}
            style={{
              border: 'none', background: 'none', cursor: 'pointer',
              padding: '0 0 14px', position: 'relative',
              font: `var(--weight-${on ? 'bold' : 'medium'}) 14px/1 var(--font-display)`,
              color: on ? 'var(--navy-900)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast)',
            }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              {t.label}
              {t.count != null && (
                <span style={{
                  padding: '1px 7px', borderRadius: 'var(--radius-pill)', fontSize: 11,
                  background: on ? 'var(--emerald-50)' : 'var(--slate-100)',
                  color: on ? 'var(--emerald-700)' : 'var(--text-muted)',
                }}>{t.count}</span>
              )}
            </span>
            {on && <span style={{
              position: 'absolute', left: 0, right: 0, bottom: -1, height: 2,
              background: 'var(--emerald-600)', borderRadius: '2px 2px 0 0',
            }} />}
          </button>
        );
      })}
    </div>
  );
}
