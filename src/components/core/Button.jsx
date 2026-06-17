import React from 'react';

const sizes = {
  sm: { padding: '0 14px', height: 34, fontSize: 13, gap: 6, radius: 'var(--radius-sm)' },
  md: { padding: '0 18px', height: 42, fontSize: 14, gap: 8, radius: 'var(--radius-md)' },
  lg: { padding: '0 24px', height: 50, fontSize: 15, gap: 10, radius: 'var(--radius-md)' },
};

const variants = {
  primary: {
    background: 'var(--navy-900)',
    color: 'var(--white)',
    border: '1px solid var(--navy-900)',
  },
  accent: {
    background: 'var(--gradient-emerald)',
    color: 'var(--white)',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(5,150,105,0.4), 0 6px 18px rgba(16,185,129,0.28)',
  },
  secondary: {
    background: 'var(--white)',
    color: 'var(--navy-900)',
    border: '1px solid var(--border-strong)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--navy-700)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'var(--red-600)',
    color: 'var(--white)',
    border: '1px solid var(--red-600)',
  },
};

/**
 * Primary action button for AutoPilot CRM.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    primary: { background: 'var(--navy-800)' },
    accent: { filter: 'brightness(1.05)' },
    secondary: { background: 'var(--slate-50)', borderColor: 'var(--slate-400)' },
    ghost: { background: 'var(--slate-100)' },
    danger: { background: 'var(--red-500)' },
  }[variant] : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        font: `var(--weight-semibold) ${s.fontSize}px/1 var(--font-display)`,
        letterSpacing: 'var(--tracking-snug)',
        borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
        transform: active ? 'translateY(1px)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-out), filter var(--dur-fast), transform var(--dur-fast), border-color var(--dur-fast)',
        ...v,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
