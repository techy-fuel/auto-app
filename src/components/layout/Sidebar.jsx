import React from 'react';
import logoWhite from '../../assets/logo-white.svg';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )},
  { id: 'leads', label: 'Leads', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { id: 'pipeline', label: 'Pipeline', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      <line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/>
    </svg>
  )},
  { id: 'inventory', label: 'Inventory', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )},
  { id: 'copilot', label: 'AI Copilot', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  )},
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2m16 0h2M12 2v2m0 16v2"/>
    </svg>
  )},
];

export function Sidebar({ active, onNavigate }) {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      minHeight: '100vh',
      background: 'var(--gradient-navy)',
      borderRight: '1px solid var(--navy-700)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 100,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--topbar-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--space-5)',
        borderBottom: '1px solid var(--navy-700)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 'var(--radius-sm)',
            background: 'var(--gradient-emerald)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(16,185,129,0.3)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L20 19 C21 21 19 23 17 22 L13 20 C12 20 12 20 11 20 L7 22 C5 23 3 21 4 19 Z" fill="white"/>
            </svg>
          </div>
          <span style={{
            font: 'var(--weight-bold) 15px/1 var(--font-display)',
            color: 'var(--white)',
            letterSpacing: '-0.01em',
          }}>AutoPilot CRM</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: 'var(--space-4) var(--space-3)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => {
            const on = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: 'pointer',
                  background: on ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: on ? 'var(--white)' : 'var(--navy-300)',
                  font: `var(--weight-${on ? 'semibold' : 'medium'}) 14px/1 var(--font-display)`,
                  transition: 'all var(--dur-fast) var(--ease-out)',
                  textAlign: 'left',
                  width: '100%',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!on) e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  if (!on) e.currentTarget.style.color = 'var(--white)';
                }}
                onMouseLeave={e => {
                  if (!on) e.currentTarget.style.background = 'transparent';
                  if (!on) e.currentTarget.style.color = 'var(--navy-300)';
                }}
              >
                {on && (
                  <span style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 20, background: 'var(--emerald-500)',
                    borderRadius: '0 4px 4px 0',
                  }} />
                )}
                <span style={{ color: on ? 'var(--emerald-400)' : 'inherit', display: 'inline-flex' }}>
                  {item.icon}
                </span>
                {item.label}
                {item.id === 'copilot' && (
                  <span style={{
                    marginLeft: 'auto',
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--gradient-emerald)',
                    color: 'var(--white)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}>AI</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--navy-700)' }}>
        {bottomItems.map(item => (
          <button
            key={item.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 'var(--radius-md)',
              border: 'none', cursor: 'pointer',
              background: 'transparent', color: 'var(--navy-300)',
              font: 'var(--weight-medium) 14px/1 var(--font-display)',
              width: '100%',
            }}
          >{item.icon}{item.label}</button>
        ))}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', marginTop: 4,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--emerald-600)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--white)', fontSize: 13, fontWeight: 700,
          }}>SA</div>
          <div>
            <div style={{ color: 'var(--white)', fontSize: 13, fontWeight: 600 }}>Sarah Ahmed</div>
            <div style={{ color: 'var(--navy-400)', fontSize: 11 }}>Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
