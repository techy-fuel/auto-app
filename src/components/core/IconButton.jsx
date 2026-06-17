import React from 'react';

const sizes = {
  sm: { box: 30, radius: 'var(--radius-sm)' },
  md: { box: 38, radius: 'var(--radius-md)' },
  lg: { box: 46, radius: 'var(--radius-md)' },
};

const variants = {
  solid:   { background: 'var(--navy-900)', color: 'var(--white)', border: '1px solid var(--navy-900)' },
  soft:    { background: 'var(--slate-100)', color: 'var(--navy-800)', border: '1px solid transparent' },
  outline: { background: 'var(--white)', color: 'var(--navy-700)', border: '1px solid var(--border-strong)' },
  ghost:   { background: 'transparent', color: 'var(--slate-500)', border: '1px solid transparent' },
};

/** Square icon-only button. */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    solid: 'var(--navy-800)', soft: 'var(--slate-200)',
    outline: 'var(--slate-50)', ghost: 'var(--slate-100)',
  }[variant];

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: s.box, height: s.box, borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-out)',
        ...v,
        ...(hover && !disabled ? { background: hoverBg } : {}),
        ...style,
      }}
      {...rest}
    >
      {icon}
    </button>
  );
}
