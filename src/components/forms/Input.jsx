import React from 'react';

/** Text input with optional leading icon and label. */
export function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  iconRight = null,
  size = 'md',
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 50 : 44;
  const fs = size === 'sm' ? 13 : 14;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...containerStyle }}>
      {label && (
        <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-body)' }}>{label}</span>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: h, padding: '0 14px',
        background: 'var(--white)',
        border: `1px solid ${error ? 'var(--red-500)' : focus ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
        transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
      }}>
        {iconLeft && <span style={{ color: 'var(--slate-400)', display: 'inline-flex' }}>{iconLeft}</span>}
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            font: `var(--weight-medium) ${fs}px/1 var(--font-body)`, color: 'var(--text-strong)',
            minWidth: 0, ...style,
          }}
          {...rest}
        />
        {iconRight && <span style={{ color: 'var(--slate-400)', display: 'inline-flex' }}>{iconRight}</span>}
      </div>
      {(hint || error) && (
        <span style={{ font: 'var(--weight-medium) 12px/1.4 var(--font-body)', color: error ? 'var(--red-600)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
