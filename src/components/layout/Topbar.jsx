import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';

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

export function Topbar({ page, user, onMobilePreview, onSignOut, onNavigate }) {
  const displayName = user?.user_metadata?.full_name || user?.email || '';
  const initials = displayName ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!user?.id) return;
    supabase.from('leads').select('id, name, company, score, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => setLeads(data || []));
  }, [user?.id]);

  useEffect(() => {
    function onClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const results = search.trim()
    ? leads.filter(l => l.name?.toLowerCase().includes(search.toLowerCase()) || l.company?.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  // Notifications from real data
  const dayAgo = Date.now() - 86400000;
  const notifications = [
    ...leads.filter(l => l.score >= 70).slice(0, 3).map(l => ({ id: `hot-${l.id}`, type: 'Hot Lead', text: `${l.name} is a hot lead (score ${l.score}) — follow up now.`, tone: 'var(--red-500)' })),
    ...leads.filter(l => new Date(l.created_at).getTime() > dayAgo).slice(0, 3).map(l => ({ id: `new-${l.id}`, type: 'New Lead', text: `${l.name} was added recently.`, tone: 'var(--emerald-500)' })),
  ];

  function goToLead() {
    setSearch(''); setShowSearch(false);
    onNavigate?.('leads');
  }

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
        <div ref={searchRef} style={{ position: 'relative' }}>
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
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
              placeholder="Search leads..."
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                font: '14px/1 var(--font-body)', color: 'var(--text-body)',
                width: '100%',
              }} />
          </div>
          {showSearch && search.trim() && (
            <div style={{
              position: 'absolute', top: 44, right: 0, width: 280,
              background: 'var(--white)', border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)',
              zIndex: 200, overflow: 'hidden',
            }}>
              {results.length === 0 ? (
                <div style={{ padding: '14px 16px', font: '13px/1 var(--font-body)', color: 'var(--text-muted)' }}>No leads found</div>
              ) : results.map(l => (
                <button key={l.id} onClick={goToLead} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 16px', border: 'none', background: 'transparent',
                  cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid var(--divider)',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{l.name}</div>
                    <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 3 }}>{l.company || l.status}</div>
                  </div>
                  <span style={{ font: 'var(--weight-bold) 11px/1 var(--font-display)', color: l.score >= 70 ? 'var(--red-500)' : 'var(--text-muted)' }}>{l.score}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button onClick={() => setShowNotif(s => !s)} style={{
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
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--emerald-500)',
                border: '1.5px solid var(--white)',
              }} />
            )}
          </button>
          {showNotif && (
            <div style={{
              position: 'absolute', top: 44, right: 0, width: 300,
              background: 'var(--white)', border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)',
              zIndex: 200, overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--divider)', font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>Notifications</div>
              {notifications.length === 0 ? (
                <div style={{ padding: '20px 16px', font: '13px/1.4 var(--font-body)', color: 'var(--text-muted)', textAlign: 'center' }}>No new notifications</div>
              ) : notifications.map(n => (
                <button key={n.id} onClick={() => { setShowNotif(false); onNavigate?.('leads'); }} style={{
                  display: 'flex', gap: 10, width: '100%', padding: '12px 16px',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  textAlign: 'left', borderBottom: '1px solid var(--divider)',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.tone, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 4 }}>{n.type}</div>
                    <div style={{ font: '12px/1.4 var(--font-body)', color: 'var(--text-muted)' }}>{n.text}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

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
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt={displayName} style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--white)', boxShadow: 'var(--shadow-sm)', objectFit: 'cover' }} />
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
