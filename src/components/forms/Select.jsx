import React from 'react';

/** Native-backed select styled to match Input. */
export function Select({
  label = null,
  options = [],
  value,
  onChange,
  size = 'md',
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 50 : 44;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...containerStyle }}>
      {label && (
        <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-body)' }}>{label}</span>
      )}
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        height: h, background: 'var(--white)',
        border: `1px solid ${focus ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
        transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
      }}>
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none',
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            padding: '0 36px 0 14px', height: '100%',
            font: 'var(--weight-medium) 14px/1 var(--font-body)', color: 'var(--text-strong)',
            cursor: 'pointer', ...style,
          }}
          {...rest}
        >
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span style={{ position: 'absolute', right: 14, pointerEvents: 'none', color: 'var(--slate-400)', fontSize: 12 }}>▾</span>
      </div>
    </label>
  );
}
