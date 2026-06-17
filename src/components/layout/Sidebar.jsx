import React from 'react';
import logoWhite from '../../assets/logo-white.svg';

const mainNav = [
  { id: 'dashboard', label: 'Dashboard', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )},
  { id: 'inventory', label: 'Inventory', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="17" r="1"/><circle cx="20" cy="17" r="1"/>
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )},
  { id: 'copilot', label: 'AI Assistant', badge: 'AI', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  )},
];

const automationNav = [
  { id: 'whatsapp', label: 'WhatsApp', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  )},
  { id: 'finance', label: 'Finance', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  )},
  { id: 'reports', label: 'Reports', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )},
];

const navItems = mainNav;
const bottomItems = [
  { id: 'settings', label: 'Settings', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2m16 0h2M12 2v2m0 16v2"/>
    </svg>
  )},
];

function NavBtn({ item, active, onNavigate }) {
  const on = active === item.id;
  return (
    <button
      onClick={() => onNavigate(item.id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 'var(--radius-md)',
        border: 'none', cursor: 'pointer',
        background: on ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: on ? 'var(--white)' : 'var(--navy-300)',
        font: `var(--weight-${on ? 'semibold' : 'medium'}) 14px/1 var(--font-display)`,
        transition: 'all var(--dur-fast) var(--ease-out)',
        textAlign: 'left', width: '100%', position: 'relative',
      }}
      onMouseEnter={e => { if (!on) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--white)'; } }}
      onMouseLeave={e => { if (!on) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy-300)'; } }}
    >
      {on && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, background: 'var(--emerald-500)', borderRadius: '0 4px 4px 0' }} />}
      <span style={{ color: on ? 'var(--emerald-400)' : 'inherit', display: 'inline-flex' }}>{item.icon}</span>
      {item.label}
      {item.badge && (
        <span style={{ marginLeft: 'auto', padding: '2px 7px', borderRadius: 'var(--radius-pill)', background: 'var(--gradient-emerald)', color: 'var(--white)', fontSize: 10, fontWeight: 700 }}>{item.badge}</span>
      )}
    </button>
  );
}

export function Sidebar({ active, onNavigate, isAdmin, user }) {
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
      <nav style={{ flex: 1, padding: 'var(--space-4) var(--space-3)', overflowY: 'auto' }}>
        {/* Main nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mainNav.map(item => <NavBtn key={item.id} item={item} active={active} onNavigate={onNavigate} />)}
        </div>

        {/* Automation section */}
        <div style={{ marginTop: 20 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            color: 'var(--navy-500)', textTransform: 'uppercase',
            padding: '0 14px', marginBottom: 6,
          }}>Automation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {automationNav.map(item => <NavBtn key={item.id} item={item} active={active} onNavigate={onNavigate} />)}
          </div>
        </div>

        {/* Admin section */}
        {isAdmin && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--navy-500)', textTransform: 'uppercase', padding: '0 14px', marginBottom: 6 }}>Admin</div>
            <NavBtn item={{ id: 'admin', label: 'User Management', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}} active={active} onNavigate={onNavigate} />
          </div>
        )}

      </nav>

      {/* Bottom */}
      <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--navy-700)' }}>
        {bottomItems.map(item => (
          <NavBtn key={item.id} item={item} active={active} onNavigate={onNavigate} />
        ))}
        {user && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', marginTop: 4,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--emerald-600)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--white)', fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}>{(user.email?.[0] || 'U').toUpperCase()}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: 'var(--white)', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
              <div style={{ color: 'var(--navy-400)', fontSize: 11 }}>{isAdmin ? 'Admin' : 'User'}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
