import React from 'react';

const pageTitles = {
  dashboard: 'Dashboard',
  leads: 'Leads',
  pipeline: 'Pipeline',
  inventory: 'Inventory',
  copilot: 'AI Copilot',
  whatsapp: 'WhatsApp',
  finance: 'Finance',
  reports: 'Reports & Analytics',
};

export function Topbar({ page, user, onMobilePreview, onSignOut }) {
  const initials = user
    ? ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase() || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || '?'
    : '?';
  const displayName = user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.emailAddresses?.[0]?.emailAddress || '';

  return (
    <header style={{
      height: 'var(--topbar-h)',
      background: 'var(--white)',
      borderBottom: '1px solid var(--border-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-6)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-xs)',
    }}>
      <div>
        <h1 style={{
          font: 'var(--weight-bold) 20px/1 var(--font-display)',
          color: 'var(--text-strong)',
          letterSpacing: 'var(--tracking-tight)',
        }}>{pageTitles[page] || 'Dashboard'}</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 14px', height: 38,
          background: 'var(--slate-50)',
          border: '1px solid var(--border-soft)',
          borderRadius: 'var(--radius-md)',
          width: 240,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Search..." style={{
            border: 'none', outline: 'none', background: 'transparent',
            font: '14px/1 var(--font-body)', color: 'var(--text-body)',
            width: '100%',
          }} />
          <span style={{ fontSize: 11, color: 'var(--slate-400)', whiteSpace: 'nowrap' }}>⌘K</span>
        </div>

        {/* Notifications */}
        <button style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-soft)', background: 'var(--white)',
          cursor: 'pointer', position: 'relative',
          color: 'var(--slate-500)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--emerald-500)',
            border: '1.5px solid var(--white)',
          }} />
        </button>

        {/* Mobile Preview */}
        <button onClick={onMobilePreview} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '0 12px', height: 38,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-soft)', background: 'var(--white)',
          font: 'var(--weight-semibold) 12px/1 var(--font-display)',
          color: 'var(--text-body)', cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Mobile
        </button>

        {/* User + Sign Out */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt={displayName} style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--white)', boxShadow: 'var(--shadow-sm)', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--emerald-600)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--white)', fontSize: 12, fontWeight: 700,
              border: '2px solid var(--white)', boxShadow: 'var(--shadow-sm)',
            }}>{initials}</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ font: 'var(--weight-semibold) 12px/1.2 var(--font-display)', color: 'var(--text-strong)' }}>{displayName}</span>
          </div>
          <button onClick={onSignOut} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '0 10px', height: 32,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-soft)', background: 'var(--white)',
            font: 'var(--weight-medium) 12px/1 var(--font-display)',
            color: 'var(--text-muted)', cursor: 'pointer',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
