import React from 'react';

/** Surface container — the base card used across the product. */
export function Card({
  children,
  variant = 'default',
  padding = 'var(--space-6)',
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-card)',
    },
    flat: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'none',
    },
    sunken: {
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'none',
    },
    glass: {
      background: 'var(--surface-glass)',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: 'var(--shadow-lg)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
    },
    navy: {
      background: 'var(--gradient-navy)',
      border: '1px solid var(--navy-700)',
      boxShadow: 'var(--shadow-lg)',
      color: 'var(--text-inverse)',
    },
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding,
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...variants[variant],
        ...(interactive && hover ? { transform: 'translateY(-2px)', boxShadow: 'var(--shadow-lg)', cursor: 'pointer' } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
